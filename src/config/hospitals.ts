import { HospitalConfig, HospitalId } from '@/types/hospital'

// 안암병원 설정
const anamConfig: HospitalConfig = {
  id: 'anam',
  name: {
    full: '고려대학교 안암병원 진료협력센터',
    short: '안암병원',
    hospital: '고려대학교 안암병원',
    center: '진료협력센터',
    english: 'KOREA UNIVERSITY ANAM HOSPITAL REFERRAL CENTER'
  },
  contact: {
    phone: '1577-0083',
    fax: '02-920-5844',
    reservation: '1577-0083',
    referralCenter: '02-920-5114'
  },
  address: {
    zipCode: '02841',
    full: '서울시 성북구 고려대로 73 (안암동 5가)',
    short: '서울시 성북구'
  },
  links: {
    homepage: 'https://anam.kumc.or.kr',
    reservation: 'https://anam.kumc.or.kr/reservation',
    naver: 'https://map.naver.com/v5/entry/place/11583195',
    youtube: 'https://www.youtube.com/@Korea_University_Anam_Hospital'
  },
  logo: {
    header: '/images/anam/logo-header.png',
    footer: '/images/anam/logo-footer.png'
  },
  certifications: {
    emr: {
      image: '/images/common/cert-emr.png',
      scope: '전자의무기록시스템(EMR) 인증',
      validity: '2022.11.01 ~ 2025.10.31'
    },
    isms: {
      image: '/images/common/cert-isms.png',
      scope: '의료정보시스템(EMR, OCS) 및 홈페이지 서비스 운영',
      validity: '2023.10.18 ~ 2026.10.17'
    }
  },
  copyright: 'Korea University Anam Hospital'
}

// 구로병원 설정
const guroConfig: HospitalConfig = {
  id: 'guro',
  name: {
    full: '고려대학교 구로병원 진료협력센터',
    short: '구로병원',
    hospital: '고려대학교 구로병원',
    center: '진료협력센터',
    english: 'KOREA UNIVERSITY GURO HOSPITAL REFERRAL CENTER'
  },
  contact: {
    phone: '1577-9966',
    fax: '02-2626-1115',
    reservation: '1577-9966',
    referralCenter: '02-2626-3280'
  },
  address: {
    zipCode: '08308',
    full: '서울시 구로구 구로동로 148 (구로동)',
    short: '서울시 구로구'
  },
  links: {
    homepage: 'https://guro.kumc.or.kr',
    reservation: 'https://guro.kumc.or.kr/reservation',
    naver: 'https://map.naver.com/v5/entry/place/11710215',
    youtube: 'https://www.youtube.com/@gurohospital'
  },
  logo: {
    header: '/images/guro/logo-header.png',
    footer: '/images/guro/logo-footer.png'
  },
  certifications: {
    emr: {
      image: '/images/common/cert-emr.png',
      scope: '전자의무기록시스템(EMR) 인증',
      validity: '2022.11.01 ~ 2025.10.31'
    },
    isms: {
      image: '/images/common/cert-isms.png',
      scope: '의료정보시스템(EMR, OCS) 및 홈페이지 서비스 운영',
      validity: '2023.10.18 ~ 2026.10.17'
    }
  },
  copyright: 'Korea University Guro Hospital'
}

// 안산병원 설정
const ansanConfig: HospitalConfig = {
  id: 'ansan',
  name: {
    full: '고려대학교 안산병원 진료협력센터',
    short: '안산병원',
    hospital: '고려대학교 안산병원',
    center: '진료협력센터',
    english: 'KOREA UNIVERSITY ANSAN HOSPITAL REFERRAL CENTER'
  },
  contact: {
    phone: '1577-7576',
    fax: '031-412-4266',
    reservation: '1577-7576',
    referralCenter: '031-412-5103'
  },
  address: {
    zipCode: '15355',
    full: '경기도 안산시 단원구 적금로 123 (고잔동)',
    short: '경기도 안산시'
  },
  links: {
    homepage: 'https://ansan.kumc.or.kr',
    reservation: 'https://ansan.kumc.or.kr/reservation',
    naver: 'https://map.naver.com/v5/entry/place/11664050',
    youtube: 'https://www.youtube.com/@ansanhospital'
  },
  logo: {
    header: '/images/ansan/logo-header.png',
    footer: '/images/ansan/logo-footer.png'
  },
  certifications: {
    emr: {
      image: '/images/common/cert-emr.png',
      scope: '전자의무기록시스템(EMR) 인증',
      validity: '2022.11.01 ~ 2025.10.31'
    },
    isms: {
      image: '/images/common/cert-isms.png',
      scope: '의료정보시스템(EMR, OCS) 및 홈페이지 서비스 운영',
      validity: '2023.10.18 ~ 2026.10.17'
    }
  },
  copyright: 'Korea University Ansan Hospital'
}

// 모든 병원 설정 맵
export const hospitalConfigs: Record<HospitalId, HospitalConfig> = {
  anam: anamConfig,
  guro: guroConfig,
  ansan: ansanConfig
}

// 현재 병원 ID 가져오기 (환경 변수에서)
export const getCurrentHospitalId = (): HospitalId => {
  const hospitalId = process.env.NEXT_PUBLIC_HOSPITAL_ID as HospitalId

  // 유효하지 않은 ID면 기본값 'anam' 반환
  if (!hospitalId || !['anam', 'guro', 'ansan'].includes(hospitalId)) {
    console.warn(`Invalid NEXT_PUBLIC_HOSPITAL_ID: ${hospitalId}. Defaulting to 'anam'.`)
    return 'anam'
  }

  return hospitalId
}

// 현재 병원 설정 가져오기
export const getCurrentHospitalConfig = (): HospitalConfig => {
  const hospitalId = getCurrentHospitalId()
  return hospitalConfigs[hospitalId]
}

// 특정 병원 설정 가져오기
export const getHospitalConfig = (hospitalId: HospitalId): HospitalConfig => {
  return hospitalConfigs[hospitalId]
}
