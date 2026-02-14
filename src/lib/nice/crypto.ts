import crypto from 'crypto'

const NICE_TOKEN_API = 'https://svc.niceapi.co.kr:22001/digital/niceid/api/v1.0/common/crypto/token'

interface TokenKeys {
  tokenVersionId: string
  siteCode: string
  key: Buffer
  iv: Buffer
  hmacKey: Buffer
  createdAt: number
}

/** 인메모리 토큰 저장소 (5분 TTL) */
const tokenStore = new Map<string, TokenKeys>()
const TOKEN_TTL_MS = 5 * 60 * 1000

function cleanupExpiredTokens() {
  const now = Date.now()
  for (const [id, token] of tokenStore.entries()) {
    if (now - token.createdAt > TOKEN_TTL_MS) {
      tokenStore.delete(id)
    }
  }
}

/** NICE API에서 암호화 토큰 요청 */
export async function requestCryptoToken(): Promise<{
  tokenVersionId: string
  token: string
  siteCode: string
}> {
  const clientId = process.env.NICE_CLIENT_ID
  const clientSecret = process.env.NICE_CLIENT_SECRET
  const productId = process.env.NICE_PRODUCT_ID || '2101979031'

  if (!clientId || !clientSecret) {
    throw new Error('NICE_CLIENT_ID and NICE_CLIENT_SECRET must be configured')
  }

  const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const reqDtim = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, '')
    .slice(0, 14)
  const reqNo = crypto.randomBytes(15).toString('hex').slice(0, 30)

  const response = await fetch(NICE_TOKEN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authorization}`,
      ProductID: productId
    },
    body: JSON.stringify({
      dataHeader: { CNTY_CD: 'ko' },
      dataBody: {
        req_dtim: reqDtim,
        req_no: reqNo,
        enc_mode: '1'
      }
    })
  })

  if (!response.ok) {
    throw new Error(`NICE token API failed: ${response.status}`)
  }

  const result = await response.json()
  const dataBody = result.dataBody

  if (dataBody.rsp_cd !== 'P000') {
    throw new Error(`NICE token error: ${dataBody.rsp_cd} - ${dataBody.res_msg}`)
  }

  const tokenVal = dataBody.token_val
  const siteCode = dataBody.site_code
  const tokenVersionId = dataBody.token_version_id

  // 키 파생
  const { key, iv, hmacKey } = deriveKeys(reqDtim, reqNo, tokenVal)

  // 토큰 저장
  cleanupExpiredTokens()
  storeTokenKeys(tokenVersionId, { tokenVersionId, siteCode, key, iv, hmacKey, createdAt: currentTimestamp * 1000 })

  return { tokenVersionId, token: tokenVal, siteCode }
}

/** SHA-256으로 key/iv/hmacKey 파생 */
export function deriveKeys(
  reqDtim: string,
  reqNo: string,
  tokenVal: string
): { key: Buffer; iv: Buffer; hmacKey: Buffer } {
  const value = `${reqDtim.trim()}${reqNo.trim()}${tokenVal.trim()}`
  const hash = crypto.createHash('sha256').update(value).digest()
  const hashHex = hash.toString('hex')

  const key = Buffer.from(hashHex.substring(0, 16), 'utf8')
  const iv = Buffer.from(hashHex.substring(hashHex.length - 16), 'utf8')
  const hmacKey = Buffer.from(hashHex.substring(0, 32), 'utf8')

  return { key, iv, hmacKey }
}

/** AES-128-CBC 암호화 */
export function encryptAES128CBC(plainText: string, key: Buffer, iv: Buffer): string {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  let encrypted = cipher.update(plainText, 'utf8', 'base64')
  encrypted += cipher.final('base64')
  return encrypted
}

/** AES-128-CBC 복호화 */
export function decryptAES128CBC(encData: string, key: Buffer, iv: Buffer): string {
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  let decrypted = decipher.update(encData, 'base64', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

/** HMAC-SHA256 무결성 값 생성 */
export function generateIntegrityValue(encData: string, hmacKey: Buffer): string {
  return crypto.createHmac('sha256', hmacKey).update(encData).digest('base64')
}

/** HMAC-SHA256 무결성 검증 */
export function verifyIntegrityValue(encData: string, integrityValue: string, hmacKey: Buffer): boolean {
  const expected = generateIntegrityValue(encData, hmacKey)
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(integrityValue))
}

/** 토큰 키 저장 */
export function storeTokenKeys(tokenVersionId: string, keys: TokenKeys): void {
  tokenStore.set(tokenVersionId, keys)
}

/** 토큰 키 조회 (만료 시 null) */
export function getTokenKeys(tokenVersionId: string): TokenKeys | null {
  const keys = tokenStore.get(tokenVersionId)
  if (!keys) return null

  if (Date.now() - keys.createdAt > TOKEN_TTL_MS) {
    tokenStore.delete(tokenVersionId)
    return null
  }

  return keys
}
