import { NextRequest, NextResponse } from 'next/server'
import { getTokenKeys, decryptAES128CBC, verifyIntegrityValue } from '@/lib/nice/crypto'

export async function POST(request: NextRequest) {
  try {
    const { tokenVersionId, encData, integrityValue } = await request.json()

    if (!tokenVersionId || !encData || !integrityValue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const keys = getTokenKeys(tokenVersionId)
    if (!keys) {
      return NextResponse.json({ error: 'Token expired or not found' }, { status: 400 })
    }

    // 무결성 검증
    if (!verifyIntegrityValue(encData, integrityValue, keys.hmacKey)) {
      return NextResponse.json({ error: 'Integrity verification failed' }, { status: 400 })
    }

    // AES 복호화
    const decrypted = decryptAES128CBC(encData, keys.key, keys.iv)
    const resultData = JSON.parse(decrypted)

    // NICE 응답에서 필요한 필드 추출
    const birthDate = resultData.birthdate
      ? `${resultData.birthdate.slice(0, 4)}-${resultData.birthdate.slice(4, 6)}-${resultData.birthdate.slice(6, 8)}`
      : ''

    const phone = resultData.mobileno ? resultData.mobileno.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : ''

    return NextResponse.json({
      name: resultData.utf8_name || resultData.name || '',
      phone,
      birthDate,
      gender: resultData.gender === '1' ? 'M' : 'F',
      di: resultData.di || '',
      ci: resultData.ci || ''
    })
  } catch (error) {
    console.error('NICE decrypt error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
