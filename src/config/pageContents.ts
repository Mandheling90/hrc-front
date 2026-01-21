import { HospitalId, HospitalPageContent } from '@/types/hospital'
import { getCurrentHospitalId } from './hospitals'

// 안암병원 페이지 콘텐츠
const anamContent: HospitalPageContent = {
  referral: {
    intro: [
      '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,',
      '의뢰하신 환자의 진료정보를 확인할 수 있는 시스템입니다.'
    ],
    services: [
      {
        id: 'referral',
        icon: 'ReferralIcon',
        title: '진료의뢰',
        description: '진료정보교류와 심평원 중계포털을\n이용한 전자의뢰가 가능합니다.',
        href: '/referral/request'
      },
      {
        id: 'patient-query',
        icon: 'PatientIcon',
        title: '의뢰 환자 조회',
        description: '의뢰해주신 환자의\n진료정보 조회가 가능합니다.',
        href: '#'
      },
      {
        id: 'consulting',
        icon: 'ConsultingIcon',
        title: 'e-Consulting',
        description: '고려대학교 안암병원 자문의를 통해\n온라인으로 의료상담이 가능합니다.',
        href: '#'
      },
      {
        id: 'network',
        icon: 'NetworkIcon',
        title: '협력네트워크',
        description: '온라인으로 협력병의원\n체결신청이 가능합니다.',
        href: '#'
      }
    ]
  },
  referralRequest: {
    intro: [
      '고려대학교안암병원 진료협력센터는 지역병원에서 의뢰된 환자에게 최적의 의료서비스를 제공하는 3차 의료기관으로서의 기능을 수행하고 있습니다.',
      '다양한 진료의뢰시스템을 통해 지역병원 및 지역주민에게 진료의뢰 편의성을 제공하며, 신속한 의료서비스를 제공받으실 수 있도록 최선을 다하고 있습니다.'
    ],
    phone: '02-920-5892~4',
    operatingHours: {
      weekday: '08:30~17:30',
      saturday: '09:00~12:30'
    },
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '진료협력센터 의뢰', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    services: [
      {
        id: 'phone-request',
        icon: 'PhoneRequestIcon',
        title: '전화의뢰',
        description: ['T. 02-920-5892~4', '평일 08:30~17:30', '토요일 09:00~12:30'],
        href: '#',
        mobileSpan: 2
      },
      {
        id: 'electronic-request',
        icon: 'DocumentReferralIcon',
        title: '전자의뢰',
        description: '진료정보교류',
        href: '/referral/request/exchange',
        mobileSpan: 1
      },
      {
        id: 'hospital-portal-request',
        icon: 'HospitalPortalIcon',
        title: '전자의뢰',
        description: '심평원 중계포털',
        href: '#',
        mobileSpan: 1
      }
    ]
  },
  referralExchange: {
    intro: [
      '의료기관간 진료기록을 진료에 참조할 수 있도록 전자적으로 진료정보를 공유하는 서비스로 1·2차 병의원에서 3차병원으로,',
      '또는 1차의원에서 다른 1·2차 병의원으로 환자의 진단 및 치료, 검사를 위해 전자적으로 진료의뢰를 할 수 있습니다.'
    ],
    services: [
      {
        id: 'continuity',
        icon: 'ContinuityIcon',
        title: '진료의 연속성 보장',
        description: ''
      },
      {
        id: 'safety',
        icon: 'SafetyIcon',
        title: '환자 안전 강화',
        description: ''
      },
      {
        id: 'quality',
        icon: 'QualityIcon',
        title: '의료서비스 질 향상',
        description: ''
      }
    ],
    procedureSteps: [
      {
        text: '진료정보교류에 대한 개인정보제공 동의 필요(최초 1회)',
        highlighted: true
      },
      {
        text: '포털(마이차트, mychart.kr)에서 본인인증을 통한 동의'
      },
      {
        text: '의료기관 방문을 통한 동의 (전자 또는 서면)'
      }
    ],
    applicationSteps: [
      {
        text: '보건복지부 마이차트 회원가입(http://mychart.kr)'
      },
      {
        text: '이용신청서 작성'
      },
      {
        text: '승인 (거점의료기관 승인 → 한국보건의료정보원 최종 승인!)'
      }
    ],
    contact: '고려대학교 안암병원 진료협력센터 : 02-920-5892'
  }
}

// 구로병원 페이지 콘텐츠
const guroContent: HospitalPageContent = {
  referral: {
    intro: [
      '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,',
      '의뢰하신 환자 및 회송된 환자의 진료정보를 확인할 수 있는 시스템입니다.'
    ],
    services: [
      {
        id: 'referral',
        icon: 'ReferralIcon',
        title: '진료의뢰',
        description: '진료정보교류와 심평원 중계포털을\n이용한 전자의뢰가 가능합니다.',
        href: '/referral/request'
      },
      {
        id: 'patient-query',
        icon: 'PatientIcon',
        title: '의뢰 환자 조회',
        description: '의뢰해주신 환자의\n진료정보 조회가 가능합니다.',
        href: '#'
      },
      {
        id: 'network',
        icon: 'NetworkIcon',
        title: '협력네트워크',
        description: '온라인으로 협력병의원\n체결신청이 가능합니다.',
        href: '#'
      }
    ]
  },
  referralRequest: {
    intro: [
      '고려대학교 구로병원 진료협력센터는 지역병원에서 의뢰된 환자에게 최적의 의료서비스를 제공하는 3차 의료기관으로서의 기능을 수행하고 있습니다.',
      '다양한 진료의뢰시스템을 통해 지역병원 및 지역주민에게 진료의뢰 편의성을 제공하며, 신속한 의료서비스를 제공받으실 수 있도록 최선을 다하고 있습니다.'
    ],
    phone: '02-2626-1681',
    operatingHours: {
      weekday: '08:30~17:30',
      saturday: '09:00~12:30'
    },
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료협력센터', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '진료의뢰', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    services: [
      {
        id: 'phone-request',
        icon: 'PhoneRequestIcon',
        title: '전화의뢰',
        description: ['T. 02-2626-1681', '평일 08:30~17:30', '토요일 09:00~12:30'],
        href: '#',
        mobileSpan: 2
      },
      {
        id: 'electronic-request',
        icon: 'DocumentReferralIcon',
        title: '전자의뢰',
        description: '진료정보교류',
        href: '/referral/request/exchange',
        mobileSpan: 1
      },
      {
        id: 'hospital-portal-request',
        icon: 'HospitalPortalIcon',
        title: '전자의뢰',
        description: '심평원 중계포털',
        href: '#',
        mobileSpan: 1
      },
      {
        id: 'sns-request',
        icon: 'SNSTalkIcon',
        title: 'SNS 의뢰',
        description: '고대구로병원 카카오톡 채널',
        href: '#',
        mobileSpan: 1
      }
    ]
  },
  referralExchange: {
    intro: [
      '의료의 연속성을 보장하기 위해 의료기관 간 진료기록을 진료에 참조할 수 있도록 전자적으로 진료정보를 공유하는 서비스입니다.'
    ],
    referralDescription: [
      {
        text: '1·2차 병의원에서 3차병원으로, 또는 1차의원에서 다른 1·2차 병의원으로 환자의 진단 및 치료, 검사를 위해 전자적으로 진료의뢰(진료의뢰서)를 할 수 있습니다.'
      }
    ],
    procedureSteps: [
      {
        text: '진료정보교류에 대한 개인정보제공 동의 필요(최초 1회)',
        highlighted: true
      },
      {
        text: '포털(마이차트, mychart.kr)에서 본인인증을 통한 동의'
      },
      {
        text: '의료기관 방문을 통한 동의 (전자 또는 서면)'
      }
    ],
    applicationSteps: [
      {
        text: '보건복지부 마이차트 회원가입(http://mychart.kr)'
      },
      {
        text: '이용신청서 작성'
      },
      {
        text: '승인 (거점의료기관 승인 → 한국보건의료정보원 최종 승인!)'
      }
    ],
    contact: ['고려대학교 구로병원 진료협력센터 : 02-2626-1681', '한국보건의료정보원(진료정보교류센터) : 1666-7598']
  }
}

// 안산병원 페이지 콘텐츠
const ansanContent: HospitalPageContent = {
  referral: {
    intro: [
      '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,',
      '의뢰하신 환자 및 회송된 환자의 진료정보를 확인할 수 있는 시스템입니다.'
    ],
    services: [
      {
        id: 'referral',
        icon: 'ReferralIcon',
        title: '진료의뢰',
        description: '진료정보교류와 심평원 중계포털을\n이용한 전자의뢰가 가능합니다.',
        href: '/referral/request'
      },
      {
        id: 'patient-query',
        icon: 'PatientIcon',
        title: '의뢰 환자 조회',
        description: '의뢰해주신 환자의 진료정보 조회가 가능합니다.',
        href: '#'
      },
      {
        id: 'network',
        icon: 'NetworkIcon',
        title: '협력네트워크',
        description: '온라인으로 협력병의원\n체결신청이 가능합니다.',
        href: '#'
      }
    ]
  },
  referralRequest: {
    intro: [
      '고려대학교 안산병원 진료협력센터는 지역병원에서 의뢰된 환자에게 최적의 의료서비스를 제공하는 3차 의료기관으로서의 기능을 수행하고 있습니다.',
      '다양한 진료의뢰시스템을 통해 지역병원 및 지역주민에게 진료의뢰 편의성을 제공하며, 신속한 의료서비스를 제공받으실 수 있도록 최선을 다하고 있습니다.'
    ],
    phone: '031-412-5103',
    operatingHours: {
      weekday: '08:30~17:30',
      saturday: '09:00~12:30'
    },
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '진료협력센터 의뢰', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    services: [
      {
        id: 'phone-request',
        icon: 'PhoneRequestIcon',
        title: '전화의뢰',
        description: ['T. 031-412-5103', '평일 08:30~17:30', '토요일 09:00~12:30'],
        href: '#',
        mobileSpan: 2
      },
      {
        id: 'electronic-request',
        icon: 'DocumentReferralIcon',
        title: '전자의뢰',
        description: '진료정보교류',
        href: '/referral/request/exchange',
        mobileSpan: 1
      },
      {
        id: 'hospital-portal-request',
        icon: 'HospitalPortalIcon',
        title: '전자의뢰',
        description: '심평원 중계포털',
        href: '#',
        mobileSpan: 1
      }
    ]
  },
  referralExchange: {
    intro: [
      '의료기관간 진료기록을 진료에 참조할 수 있도록 전자적으로 진료정보를 공유하는 서비스로 1·2차 병의원에서 3차병원으로,',
      '또는 1차의원에서 다른 1·2차 병의원으로 환자의 진단 및 치료, 검사를 위해 전자적으로 진료의뢰를 할 수 있습니다.'
    ],
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '진료협력센터 의뢰', href: '/referral/request', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '진료정보교류 의뢰', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    services: [
      {
        id: 'continuity',
        icon: 'ContinuityIcon',
        title: '진료의 연속성 보장',
        description: ''
      },
      {
        id: 'safety',
        icon: 'SafetyIcon',
        title: '환자 안전 강화',
        description: ''
      },
      {
        id: 'quality',
        icon: 'QualityIcon',
        title: '의료서비스 질 향상',
        description: ''
      }
    ],
    procedureSteps: [
      {
        text: '진료정보교류에 대한 개인정보제공 동의 필요(최초 1회)',
        highlighted: true
      },
      {
        text: '포털(마이차트, mychart.kr)에서 본인인증을 통한 동의'
      },
      {
        text: '의료기관 방문을 통한 동의 (전자 또는 서면)'
      }
    ],
    applicationSteps: [
      {
        text: '보건복지부 마이차트 회원가입(http://mychart.kr)'
      },
      {
        text: '이용신청서 작성'
      },
      {
        text: '승인 (거점의료기관 승인 → 한국보건의료정보원 최종 승인!)'
      }
    ],
    contact: '고려대학교 안산병원 진료협력센터 : 031-412-5103'
  }
}

// 모든 병원 페이지 콘텐츠 맵
export const hospitalPageContents: Record<HospitalId, HospitalPageContent> = {
  anam: anamContent,
  guro: guroContent,
  ansan: ansanContent
}

// 현재 병원의 페이지 콘텐츠 가져오기
export const getCurrentPageContent = (): HospitalPageContent => {
  const hospitalId = getCurrentHospitalId()
  return hospitalPageContents[hospitalId]
}

// 특정 병원의 페이지 콘텐츠 가져오기
export const getPageContent = (hospitalId: HospitalId): HospitalPageContent => {
  return hospitalPageContents[hospitalId]
}
