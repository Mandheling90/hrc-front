import { HospitalId, HospitalPageContent, ReferralHiraInfo } from '@/types/hospital'
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
        href: '/referral/network'
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
        href: '/referral/request/hira',
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
  },
  referralHira: {
    pageTitle: '심평원중계시스템 의뢰',
    intro: [
      '2020.11.1부터 [협력기관간 진료의뢰-회송 시범사업 지침] 개정으로 별도 신청없이 심평원 중계시스템을 통해 고려대학교 안암병원으로',
      '의사의 판단에 따라 적절한 요양급여를 위해 상급종합병원으로 진료가 필요하고, 개인정보 제공에 동의한 환자를 진료의뢰 하실 수 있습니다.'
    ],
    breadcrumbs: [
      { label: '홈', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral/request', iconAfter: true },
      { label: '심평원중계시스템 의뢰', href: '/referral/request/hira', iconAfter: true }
    ],
    businessPurpose: [
      { text: '단계적 의뢰 강화에 따른 의료전달체계 확립' },
      { text: '내실있는 진료정보 교류 촉진 및 지역 내 의뢰 활성화 지원' }
    ],
    steps: [
      {
        stepNumber: 'STEP. 01',
        title: '심평원 중계시스템 접속 (https://ef.hira.or.kr)',
        linkText: 'https://ef.hira.or.kr',
        image: {
          src: '/images/service/hira-step1.png',
          alt: '심평원 중계시스템 접속 화면',
          width: 1042,
          height: 525
        },
        highlights: [
          { className: 'highlight1', number: 1 },
          { className: 'highlight2', number: 2 }
        ],
        descriptions: [
          { number: 1, text: '요양기관 공인인증서 로그인' },
          { number: 2, text: '진료의뢰·회송 메뉴 선택' }
        ]
      },
      {
        stepNumber: 'STEP. 02',
        title: '의뢰서 작성',
        image: {
          src: '/images/service/hira-step2.png',
          alt: '의뢰서 작성 화면',
          width: 1042,
          height: 471
        },
        highlights: [
          { className: 'highlight3', number: 3 },
          { className: 'highlight4', number: 4 }
        ],
        descriptions: [
          { number: 3, text: '의뢰서 작성' },
          { number: 4, text: '필수 입력 항목 입력 후 전송' },
          { number: 5, text: '진료협력센터에서 환자에게 전화하여 예약진행' }
        ]
      }
    ],
    contact: '고려대학교 안암병원 진료협력센터 : 02-920-5892'
  },
  network: {
    intro: [
      '고려대학교 안암병원은 국민 의료 환경 및 의료의 질 향상을 위해 의료전달체계 확립에 힘쓰며,',
      '진료의뢰 및 회송 체계 활성화를 위해 협력 병·의원 체결을 진행하고 있습니다.'
    ],
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '협력네트워크', href: '/referral/network', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '협력네트워크 소개 & 신청', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    benefits: [
      { text: '협약서(협력병원), 협력증서(협력병의원) 제공' },
      { text: '병원 주차장 무료 이용' },
      {
        text: '종합검진 20% 감면(기본검진에 한함) 및 고대안암병원 장례식장 빈소사용료 20% 감면 (감면 대상: 원장님 본인, 배우자, 본인의 직계존비속)'
      },
      { text: '병원 및 진료가 주최 각종 연수강좌 안내' },
      { text: '응급환자 신속 대처를 위한 교수 직통 핫라인 제공' },
      { text: '직원 직무교육 및 서비스교육 제공' },
      { text: '상호교류가 활발한 병·의원장 외래교수 위촉' },
      { text: '초진환자 의뢰 시 빠른 예약 서비스 제공' },
      { text: '협력병·의원 의료진에 대한 상하반기 일요일 종합검진 실시(약 40% 감면)' }
    ],
    target: {
      hospital: [{ text: '협력병원: 상호협력이 우수한 병원급 이상의 의료기관을 대상으로 매월 선정' }],
      clinic: [{ text: '협력의원: 진료의뢰 및 회송을 통한 상호협력이 우수한 의원을 대상으로 매월 선정' }]
    },
    applicationMethod: [
      { text: '홈페이지 신청: 온라인 신청하기에서 협력병의원 체결 신청서를 작성하여 저장' },
      { text: '팩스 신청: 홈페이지에서 협력의원 체결 신청서를 다운로드하여 작성 후 진료협력센터로 팩스 접수' }
    ],
    processSteps: [
      { stepNumber: '01', title: '신청서 접수', icon: 'DocumentIcon' },
      { stepNumber: '02', title: '원내심사', icon: 'ReviewIcon' },
      { stepNumber: '03', title: '병원장 최종 승인', icon: 'ApprovalIcon' },
      { stepNumber: '04', title: '협약체결', icon: 'HandshakeIcon' },
      { stepNumber: '05', title: '협력증서 전달', icon: 'CertificateIcon' }
    ],
    contact: {
      phone: '02-920-5964',
      fax: '02-920-6523'
    },
    downloadLink: '#',
    applicationLinks: {
      hospital: '#',
      clinic: '#'
    }
  },
  signupAgreement: {
    hospitalName: '고려대학교 안암병원',
    intro:
      '고려대학교 안암병원은 개인정보보호법에 의거하여 귀하의 개인정보를 수집함에 있어 아래의 내용을 안내하고 있습니다.',
    purpose: {
      title: '1. 개인 정보의 수집 목적 및 이용',
      items: [
        '홈페이지 회원가입 및 관리, 홈페이지 기본서비스 제공',
        '- 이용자 확인 및 의사소통 경로 확보',
        '- 홈페이지 이용 관련 서비스 제공'
      ]
    },
    items: {
      title: '2. 수집하려는 개인정보의 항목',
      required:
        '- 필수 항목 : 아이디, 이름, 생년월일, 성별, 면허종류(회원구분), 면허번호, 핸드폰번호, 이메일주소, 이메일 수신여부, 진료회송여부, SMS서비스 동의여부, 소속병원명, 요양기관번호, 병원주소, 대표전화',
      autoCollected:
        '*서비스 이용 과정이나 서비스 제공 업무 처리 과정에서 다음과 같은 정보들이 자동으로 생성되어 수집될 수 있습니다. (서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보)'
    },
    retention: {
      title: '3. 개인정보의 보유 이용기간',
      period:
        '홈페이지 회원가입 탈퇴시까지 혹은 회원에서 제명 처리된 일까지 (즉시 파기 처리함) 단, 진료서비스 제공을 위하여 수집된 경우 의료법 기준에 준함 (의료법 시행규칙 제15조에 명시된 기간)',
      dormant:
        "정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 동법 시행령에 따라 연속하여 1년동안 서비스를 이용하지 않은 회원(이하 '휴면계정'이라 한다)의 개인정보를 보호하기 위해 개인정보 파기 등 필요한 조치를 취합니다."
    },
    refusal: {
      title: '4. 동의를 거부할 권리 / 동의거부에 따른 안내',
      description:
        '고객께서는 본 안내에 따른 개인정보 수집에 대하여, 거부할 수 있는 권리가 있습니다. 본 개인정보에 대해 거부할 경우 회원에게 제공되는 서비스 이용에 제한될 수 있음을 알려드립니다.'
    }
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
        href: '/referral/network'
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
        href: '/referral/request/hira',
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
  },
  referralHira: {
    pageTitle: '심평원중계시스템 의뢰',
    intro: [
      '2020.11.1부터 [협력기관간 진료의뢰-회송 시범사업 지침] 개정으로 별도 신청없이 심평원 중계시스템을 통해 고려대학교구로병원으로',
      '의사의 판단에 따라 적절한 요양급여를 위해 상급종합병원으로 진료가 필요하고, 개인정보 제공에 동의한 환자를 진료의뢰 하실 수 있습니다.'
    ],
    breadcrumbs: [
      { label: '홈', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰/조회', href: '/referral/request', iconAfter: true },
      { label: '심평원중계시스템 의뢰', href: '/referral/request/hira', iconAfter: true }
    ],
    businessPurpose: [
      { text: '단계적 의뢰 강화에 따른 의료전달체계 확립' },
      { text: '내실있는 진료정보 교류 촉진 및 지역 내 의뢰 활성화 지원' }
    ],
    target: [
      {
        text: '의사의 판단에 따라 적절한 요양급여를 위해 상급종합병원으로 진료의뢰가 필요한 환자로 개인정보 제공에 동의한 환자'
      }
    ],
    steps: [
      {
        stepNumber: 'STEP. 01',
        title: '심평원 중계시스템 접속 (https://ef.hira.or.kr)',
        linkText: 'https://ef.hira.or.kr',
        image: {
          src: '/images/service/hira-step1.png',
          alt: '심평원 중계시스템 접속 화면',
          width: 1042,
          height: 525
        },
        highlights: [
          { className: 'highlight1', number: 1 },
          { className: 'highlight2', number: 2 }
        ],
        descriptions: [
          { number: 1, text: '요양기관 공인인증서 로그인' },
          { number: 2, text: '진료의뢰·회송 메뉴 선택' }
        ]
      },
      {
        stepNumber: 'STEP. 02',
        title: '의뢰서 작성',
        image: {
          src: '/images/service/hira-step2.png',
          alt: '의뢰서 작성 화면',
          width: 1042,
          height: 471
        },
        highlights: [
          { className: 'highlight3', number: 3 },
          { className: 'highlight4', number: 4 }
        ],
        descriptions: [
          { number: 3, text: '의뢰서 작성' },
          { number: 4, text: '필수 입력 항목 입력 후 전송' },
          { number: 5, text: '진료협력센터에서 환자에게 전화하여 예약진행' }
        ]
      }
    ],
    contact: '고려대학교 구로병원 진료협력센터 : 02-2626-1681'
  },
  network: {
    intro: [
      '고려대학교 구로병원은 국민 의료 환경 및 의료의 질 향상을 위해 의료전달체계 확립에 힘쓰며,',
      '진료의뢰 및 회송 체계 활성화를 위해 협력 병·의원 체결을 진행하고 있습니다.'
    ],
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '협력네트워크', href: '/referral/network', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '협력네트워크 소개 & 신청', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    benefits: [
      { text: '협약서(협력병원), 협력증서(협력병의원) 제공' },
      { text: '병원 주차장 무료 이용' },
      {
        text: '종합검진 20% 감면(기본검진에 한함) 및 고대구로병원 장례식장 빈소사용료 20% 감면 (감면 대상: 원장님 본인, 배우자, 본인의 직계존비속)'
      },
      { text: '병원 및 진료가 주최 각종 연수강좌 안내' },
      { text: '응급환자 신속 대처를 위한 교수 직통 핫라인 제공' },
      { text: '직원 직무교육 및 서비스교육 제공' },
      { text: '상호교류가 활발한 병·의원장 외래교수 위촉' },
      { text: '초진환자 의뢰 시 빠른 예약 서비스 제공' },
      { text: '협력병·의원 의료진에 대한 상하반기 일요일 종합검진 실시(약 40% 감면)' }
    ],
    target: {
      hospital: [{ text: '협력병원: 상호협력이 우수한 병원급 이상의 의료기관을 대상으로 매월 선정' }],
      clinic: [{ text: '협력의원: 진료의뢰 및 회송을 통한 상호협력이 우수한 의원을 대상으로 매월 선정' }]
    },
    applicationMethod: [
      { text: '홈페이지 신청: 온라인 신청하기에서 협력병의원 체결 신청서를 작성하여 저장' },
      { text: '팩스 신청: 홈페이지에서 협력의원 체결 신청서를 다운로드하여 작성 후 진료협력센터로 팩스 접수' }
    ],
    processSteps: [
      { stepNumber: '01', title: '신청서 접수', icon: 'DocumentIcon' },
      { stepNumber: '02', title: '원내심사', icon: 'ReviewIcon' },
      { stepNumber: '03', title: '병원장 최종 승인', icon: 'ApprovalIcon' },
      { stepNumber: '04', title: '협약체결', icon: 'HandshakeIcon' },
      { stepNumber: '05', title: '협력증서 전달', icon: 'CertificateIcon' }
    ],
    contact: {
      phone: '02-2626-1681',
      fax: '02-2626-1115'
    },
    downloadLink: '#',
    applicationLinks: {
      hospital: '#',
      clinic: '#'
    }
  },
  signupAgreement: {
    hospitalName: '고려대학교 구로병원',
    intro:
      '고려대학교 구로병원은 개인정보보호법에 의거하여 귀하의 개인정보를 수집함에 있어 아래의 내용을 안내하고 있습니다.',
    purpose: {
      title: '1. 개인 정보의 수집 목적 및 이용',
      items: [
        '홈페이지 회원가입 및 관리, 홈페이지 기본서비스 제공',
        '- 이용자 확인 및 의사소통 경로 확보',
        '- 홈페이지 이용 관련 서비스 제공'
      ]
    },
    items: {
      title: '2. 수집하려는 개인정보의 항목',
      required:
        '- 필수 항목 :아이디, 이름, 생년월일, 성별, 면허종류(회원구분), 면허번호, 핸드폰번호, 이메일주소, 이메일 수신여부, 진료회송여부, SMS서비스 동의여부, 소속병원명, 요양기관번호, 병원주소, 대표전화',
      autoCollected:
        '*서비스 이용 과정이나 서비스 제공 업무 처리 과정에서 다음과 같은 정보들이 자동으로 생성되어 수집될 수 있습니다. (서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보)'
    },
    retention: {
      title: '3. 개인정보의 보유 이용기간',
      period:
        '홈페이지 회원가입 탈퇴시까지 혹은 회원에서 제명 처리된 일까지 (즉시 파기 처리함) 단, 진료서비스 제공을 위하여 수집된 경우 의료법 기준에 준함 (의료법 시행규칙 제15조에 명시된 기간)',
      dormant:
        "정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 동법 시행령에 따라 연속하여 1년동안 서비스를 이용하지 않은 회원(이하 '휴면계정'이라 한다)의 개인정보를 보호하기 위해 개인정보 파기 등 필요한 조치를 취합니다."
    },
    refusal: {
      title: '4. 동의를 거부할 권리 / 동의거부에 따른 안내',
      description:
        '고객께서는 본 안내에 따른 개인정보 수집에 대하여, 거부할 수 있는 권리가 있습니다. 본 개인정보에 대해 거부할 경우 회원에게 제공되는 서비스 이용에 제한될 수 있음을 알려드립니다.'
    }
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
        href: '/referral/network'
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
        href: '/referral/request/hira',
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
  },
  referralHira: {
    pageTitle: '심평원중계시스템 의뢰',
    intro: [
      '2020.11.1부터 [협력기관간 진료의뢰-회송 시범사업 지침] 개정으로 별도 신청없이 심평원 중계시스템을 통해 고려대학교 안산병원으로',
      '의사의 판단에 따라 적절한 요양급여를 위해 상급종합병원으로 진료가 필요하고, 개인정보 제공에 동의한 환자를 진료의뢰 하실 수 있습니다.'
    ],
    breadcrumbs: [
      { label: '홈', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral/request', iconAfter: true },
      { label: '심평원중계시스템 의뢰', href: '/referral/request/hira', iconAfter: true }
    ],
    businessPurposeServices: [
      {
        id: 'delivery-system',
        icon: 'ChartStepperIcon',
        title: '단계적 의뢰 강화에 따른 의료전달체계 확립',
        description: ''
      },
      {
        id: 'referral-activation',
        icon: 'DoctorIcon',
        title: '내실있는 진료정보 교류 촉진 및 지역 내 의뢰 활성화 지원',
        description: ''
      }
    ],
    steps: [
      {
        stepNumber: 'STEP. 01',
        title: '심평원 중계시스템 접속 (https://ef.hira.or.kr)',
        linkText: 'https://ef.hira.or.kr',
        image: {
          src: '/images/service/hira-step1.png',
          alt: '심평원 중계시스템 접속 화면',
          width: 1042,
          height: 525
        },
        highlights: [
          { className: 'highlight1', number: 1 },
          { className: 'highlight2', number: 2 }
        ],
        descriptions: [
          { number: 1, text: '요양기관 공인인증서 로그인' },
          { number: 2, text: '진료의뢰·회송 메뉴 선택' }
        ]
      },
      {
        stepNumber: 'STEP. 02',
        title: '의뢰서 작성',
        image: {
          src: '/images/service/hira-step2.png',
          alt: '의뢰서 작성 화면',
          width: 1042,
          height: 471
        },
        highlights: [
          { className: 'highlight3', number: 3 },
          { className: 'highlight4', number: 4 }
        ],
        descriptions: [
          { number: 3, text: '의뢰서 작성' },
          { number: 4, text: '필수 입력 항목 입력 후 전송' },
          { number: 5, text: '진료협력센터에서 환자에게 전화하여 예약진행' }
        ]
      }
    ],
    contact: ['고려대학교 안산병원 진료협력센터 : 031-412-5103', 'HIRA 건강보험심사평가원 : 1644-2000']
  },
  network: {
    intro: [
      '고려대학교 안산병원은 국민 의료 환경 및 의료의 질 향상을 위해 의료전달체계 확립에 힘쓰며,',
      '진료의뢰 및 회송 체계 활성화를 위해 협력 병·의원 체결을 진행하고 있습니다.'
    ],
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '협력네트워크', href: '/referral/network', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '협력네트워크 소개 & 신청', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    benefits: [
      { text: '협약서(협력병원), 협력증서(협력병의원) 제공' },
      { text: '병원 주차장 무료 이용' },
      {
        text: '종합검진 20% 감면(기본검진에 한함) 및 고대안산병원 장례식장 빈소사용료 20% 감면 (감면 대상: 원장님 본인, 배우자, 본인의 직계존비속)'
      },
      { text: '병원 및 진료가 주최 각종 연수강좌 안내' },
      { text: '응급환자 신속 대처를 위한 교수 직통 핫라인 제공' },
      { text: '직원 직무교육 및 서비스교육 제공' },
      { text: '상호교류가 활발한 병·의원장 외래교수 위촉' },
      { text: '초진환자 의뢰 시 빠른 예약 서비스 제공' },
      { text: '협력병·의원 의료진에 대한 상하반기 일요일 종합검진 실시(약 40% 감면)' }
    ],
    target: {
      hospital: [{ text: '협력병원: 상호협력이 우수한 병원급 이상의 의료기관을 대상으로 매월 선정' }],
      clinic: [{ text: '협력의원: 진료의뢰 및 회송을 통한 상호협력이 우수한 의원을 대상으로 매월 선정' }]
    },
    applicationMethod: [
      { text: '홈페이지 신청: 온라인 신청하기에서 협력병의원 체결 신청서를 작성하여 저장' },
      { text: '팩스 신청: 홈페이지에서 협력의원 체결 신청서를 다운로드하여 작성 후 진료협력센터로 팩스 접수' }
    ],
    processSteps: [
      { stepNumber: '01', title: '신청서 접수', icon: 'DocumentIcon' },
      { stepNumber: '02', title: '원내심사', icon: 'ReviewIcon' },
      { stepNumber: '03', title: '병원장 최종 승인', icon: 'ApprovalIcon' },
      { stepNumber: '04', title: '협약체결', icon: 'HandshakeIcon' },
      { stepNumber: '05', title: '협력증서 전달', icon: 'CertificateIcon' }
    ],
    contact: {
      phone: '031-412-5103',
      fax: '031-412-4266'
    },
    downloadLink: '#',
    applicationLinks: {
      hospital: '#',
      clinic: '#'
    }
  },
  signupAgreement: {
    hospitalName: '고려대학교안산병원',
    intro:
      '고려대학교안산병원은 개인정보보호법에 의거하여 귀하의 개인정보를 수집함에 있어 아래의 내용을 안내하고 있습니다.',
    purpose: {
      title: '1. 개인 정보의 수집 목적 및 이용',
      items: [
        '홈페이지 회원가입 및 관리, 홈페이지 기본서비스 제공',
        '- 이용자 확인 및 의사소통 경로 확보',
        '- 홈페이지 이용 관련 서비스 제공'
      ]
    },
    items: {
      title: '2. 수집하려는 개인정보의 항목',
      required:
        '- 필수 항목 :아이디, 이름, 생년월일, 성별, 면허종류(회원구분), 면허번호, 핸드폰번호, 이메일주소, 이메일 수신여부, 진료회송여부, SMS서비스 동의여부, 소속병원명, 요양기관번호, 병원주소, 대표전화',
      autoCollected:
        '*서비스 이용 과정이나 서비스 제공 업무 처리 과정에서 다음과 같은 정보들이 자동으로 생성되어 수집될 수 있습니다. (서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보)'
    },
    retention: {
      title: '3. 개인정보의 보유 이용기간',
      period:
        '홈페이지 회원가입 탈퇴시까지 혹은 회원에서 제명 처리된 일까지 (즉시 파기 처리함) 단, 진료서비스 제공을 위하여 수집된 경우 의료법 기준에 준함 (의료법 시행규칙 제15조에 명시된 기간)',
      dormant:
        "정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 동법 시행령에 따라 연속하여 1년동안 서비스를 이용하지 않은 회원(이하 '휴면계정'이라 한다)의 개인정보를 보호하기 위해 개인정보 파기 등 필요한 조치를 취합니다."
    },
    refusal: {
      title: '4. 동의를 거부할 권리 / 동의거부에 따른 안내',
      description:
        '고객께서는 본 안내에 따른 개인정보 수집에 대하여, 거부할 수 있는 권리가 있습니다. 본 개인정보에 대해 거부할 경우 회원에게 제공되는 서비스 이용에 제한될 수 있음을 알려드립니다.'
    }
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
