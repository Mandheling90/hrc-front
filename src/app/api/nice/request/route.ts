import { NextResponse } from 'next/server'
import { requestCryptoToken, encryptAES128CBC, generateIntegrityValue, getTokenKeys } from '@/lib/nice/crypto'

export async function POST() {
  try {
    const { tokenVersionId, siteCode } = await requestCryptoToken()

    const keys = getTokenKeys(tokenVersionId)
    if (!keys) {
      return NextResponse.json({ error: 'Token keys not found' }, { status: 500 })
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/nice/callback`

    const requestData = JSON.stringify({
      requestno: `REQ_${Date.now()}`,
      returnurl: returnUrl,
      sitecode: siteCode,
      authtype: 'M',
      popupyn: 'Y',
      receivedata: ''
    })

    const encData = encryptAES128CBC(requestData, keys.key, keys.iv)
    const integrityValue = generateIntegrityValue(encData, keys.hmacKey)

    return NextResponse.json({
      tokenVersionId,
      encData,
      integrityValue
    })
  } catch (error) {
    console.error('NICE request error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
