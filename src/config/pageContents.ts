import { HospitalId, HospitalPageContent } from '@/types/hospital'
import { getCurrentHospitalId } from './hospitals'

// 안암병원 페이지 콘텐츠
const anamContent: HospitalPageContent = {
  referral: {
    intro: [
      '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,\n의뢰하신 환자 및 회송된 환자의 진료정보를 확인할 수 있는 시스템입니다.'
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
        href: '/network'
      }
    ]
  },
  referralRequest: {
    intro: [
      '고려대학교안암병원 진료협력센터는 지역병원에서 의뢰된 환자에게 최적의 의료서비스를 제공하는 3차 의료기관으로서의 기능을 수행하고 있습니다.',
      '다양한 진료의뢰시스템을 통해 지역병원 및 지역주민에게 진료의뢰 편의성을 제공하며, 신속한 의료서비스를 제공받으실 수 있도록 최선을 다하고 있습니다.'
    ],
    phone: '02-920-5964~4',
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
        description: ['T. 02-920-5964~4', '평일 08:30~17:30', '토요일 09:00~12:30'],
        href: '#',
        mobileSpan: 2,
        layoutType: 'icon-title'
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
        text: '의료기관 방문을 통한 동의(전자 또는 서면)'
      }
    ],
    applicationSteps: [
      {
        text: '보건복지부 마이차트 회원가입 (http://mychart.kr)'
      },
      {
        text: '이용신청서 작성'
      },
      {
        text: '승인 (거점의료기관 승인 -> 한국보건의료정보원 최종 승인)'
      }
    ],
    contact: '고려대학교 안암병원 진료협력센터 : 02-920-5964'
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
          src: '/images/referral/hira/hira-step1.png',
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
          src: '/images/referral/hira/hira-step2.png',
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
    contact: '고려대학교 안암병원 진료협력센터 : 02-920-5964'
  },
  network: {
    intro: [
      '고려대학교 안암병원은 진료, 교육, 연구에 관한 사항을 상호 협력함으로써 국민의료환경 및 의료의 질을 향상시키고\n의료전달체계를 확립하여 의료계의 발전을 도모하고자 협력네트워크를 운영하고 있습니다.',
      '원장님의 적극적인 지원과 관심으로 진료의뢰 및 회송체계를 활성화시키고자 노력하고 있으며,\n더욱 원활한 의뢰·회송체계를 위해 협력병·의원 체결을 하고자 합니다.',
      '협력병·의원 체결 신청을 해주시면 절차에 따라 체결 진행하겠습니다.'
    ],
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral', icon: 'ChevronDownIcon', iconAfter: true },
      { label: 'network', href: '/network', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '협력네트워크 소개 & 신청', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    benefits: [
      { text: '협약서(협력병원), 협력증서(협력병의원) 제공' },
      { text: '병원 주차장 무료 이용' },
      {
        text: '종합검진 20% 감면(기본검진에 한함) 및 고대안암병원 장례식장 빈소사용료 20% 감면 (감면 대상: 원장님 본인, 배우자, 본인의 직계존비속)'
      },
      { text: '병원 및 진료과 주최 각종 연수강좌 안내' },
      { text: '응급환자 신속 대처를 위한 교수 직통 핫라인 제공' },
      { text: '직원 직무교육 및 서비스교육 제공' },
      { text: '상호교류가 활발한 병·의원장 외래교수 위촉' },
      { text: '초진환자 의뢰 시 빠른 예약 서비스 제공' },
      { text: '협력병·의원 의료진에 대한 상하반기 일요일 종합검진 실시(약 50% 감면)' }
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
    downloadLinks: [
      { label: '협력병원 신청서 다운로드', href: '#' },
      { label: '협력의원 신청서 다운로드', href: '#' }
    ],
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
  },
  aboutIntro: {
    introBox: {
      title: undefined,
      messages: [
        '고려대학교안암병원 진료협력센터는 1·2차 의료기관에서 의뢰한 환자의 효율적인 진료를 위하여 \n환자의뢰, 진료결과 회신, 회송을 통해 지역사회 의료기관과 균형적인 의료발전을 도모하고, \n의료전달 체계의 중심적 역할을 수행하여 지역주민 건강의 유지, 증진에 기여하고자 설립되었습니다.',
        '지역사회와의 상생을 기반으로 최적의 의료서비스를 제공하기위해\n협력 병·의원 원장님들과 긴밀하고 활발한 협력네트워크를 만들어나가도록 하겠습니다.'
      ]
    },
    mainTasks: [
      { text: '가능한 신속 정확한 진료가 이루어질 수 있도록 도와드리고 있습니다.' },
      {
        text: '개인정보공개 동의한 환자에 한하여, 의뢰한 환자의 진료결과, 진행사항에 대해 회신서를 제공하고 있습니다.'
      },
      {
        text: '급성기 치료 종료 후 지속적 치료가 필요한 경우 환자 및 보호자 상담을 통해 1,2차 의료기관으로 회송하고 있습니다.'
      },
      { text: '상호협력이 우수한 병·의원을 대상으로 협력병·의원 협약 체결을 진행하고 있습니다.' }
    ],
    operationInfo: {
      cards: [
        {
          icon: 'OperationTimeIcon',
          title: '운영시간',
          rows: [
            { label: '평일', value: '08:30 ~ 17:30' },
            { label: '토요일', value: '09:00 ~ 12:30' }
          ]
        },
        {
          icon: 'OperationPhoneFaxIcon',
          title: '전용 전화 및 팩스',
          rows: [
            { label: 'Tel', value: '02-920-5964' },
            { label: 'Fax', value: '02-920-6523' }
          ]
        }
      ],
      note: '일요일, 공휴일 휴무입니다.'
    },
    procedureFlow: {
      steps: [
        {
          chip: '진료의뢰',
          items: [{ text: '진료의뢰서 작성' }],
          stepIcon: 'FlowStep01Icon'
        },
        {
          chip: '진료예약',
          items: [{ text: '전화의뢰' }, { text: '전자의뢰(심평원중계포털, 진료정보교류시스템)' }],
          stepIcon: 'FlowStep02Icon'
        },
        {
          chip: '환자진료',
          items: [{ text: '신속, 정확한 진료' }],
          stepIcon: 'FlowStep03Icon'
        },
        {
          chip: '진료결과 회신',
          items: [
            { text: '우편발송' },
            {
              text: '인터넷 결과 조회 : KRC 홈페이지(https://anamrefer.kumc.or.kr)',
              href: 'https://anamrefer.kumc.or.kr'
            }
          ],
          stepIcon: 'FlowStep04Icon'
        },
        {
          chip: '회송(되의뢰)',
          items: [
            { text: '급성기 치료 종료 후 의뢰주신 병원으로 되의뢰' },
            { text: '환자(보호자)와 충분한 상담 후 지속적 치료가 가능한 의료기관으로 회송' }
          ],
          stepIcon: 'FlowStep05Icon'
        }
      ]
    }
  },
  aboutGreeting: {
    slogan: '원장님의 진료 여정에 함께하는 든든한 동반자가 되겠습니다.',
    image: {
      src: '/images/about/greeting/director-anam.png',
      alt: '고려대학교안암병원 진료협력센터장 최혁순',
      width: 500,
      height: 600
    },
    message: [
      '안녕하십니까?\n항상 환자분들의 건강을 위해 헌신하시는 원장님과 의료진 여러분께 깊은 감사와 존경의 인사를 드립니다. 귀 병원의 변함없는 노력과 따뜻한 진료가 많은 환자들에게 희망이 되고 있음을 잘 알고 있습니다.',
      '저희 고려대학교 안암병원은 지역 의료기관과의 긴밀한 협력을 바탕으로, 환자 중심의 의료서비스를 제공하고자 최선을 다하고 있습니다.',
      '앞으로도 원장님과 긴밀한 협력을 통해 환자분들께 최상의 의료서비스를 제공할 수 있도록 최선을 다하겠습니다.',
      '언제든지 진료협력과 관련하여 도움이 필요하시다면 진료협력센터로 편하게 연락 주시기 바랍니다.',
      '귀 병원의 지속적인 발전과 원장님의 건승을 기원합니다.\n감사합니다.'
    ],
    signature: {
      name: '최 혁 순',
      title: '고려대학교안암병원 진료협력센터장'
    }
  },
  aboutOrganization: {
    nodes: [
      {
        title: '진료협력센터장',
        children: [
          {
            title: '진료협력부센터장',
            children: [
              {
                title: '진료협력센터 팀장',
                phone: '02-920-5891',
                children: [
                  {
                    title: '진료협력센터 부팀장',
                    phone: '02-920-6355',
                    children: [
                      {
                        title: '진료의뢰',
                        phone: '02-920-5964'
                      },
                      {
                        title: '입원회송',
                        phone: '02-920-5964'
                      },
                      {
                        title: '외래회송',
                        phone: '02-920-6153'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  aboutLocation: {
    address: {
      jibun: '안암동5가 126-1',
      road: '서울 성북구 고려대로 73 고려대병원'
    },
    coordinates: {
      latitude: 37.587,
      longitude: 127.0268
    },
    mapLinks: {
      naver: 'https://map.naver.com/v5/search/서울 성북구 고려대로 73',
      daum: 'https://map.kakao.com/?q=서울 성북구 고려대로 73',
      google: 'https://maps.google.com/?q=서울 성북구 고려대로 73'
    },
    subway: {
      line: '6호선',
      station: '안암역(안암병원)',
      exit: '1번 출구',
      walkTime: '3분 소요',
      description: '6호선 안암역(안암병원) 1번 출구 도보(3분 소요)'
    },
    bus: [
      {
        name: '고려대이공대 · 고대병원 하차',
        directions: [
          {
            label: '안암동 주민센터 방면',
            routes: [
              { number: '273', type: 'blue' },
              { number: '2115', type: 'blue' },
              { number: '1111', type: 'blue' },
              { number: '성북 04', type: 'green' }
            ]
          },
          {
            label: '안암역 방면',
            routes: [
              { number: '273', type: 'blue' },
              { number: '2115', type: 'blue' },
              { number: '1111', type: 'blue' },
              { number: '성북 04', type: 'green' }
            ]
          }
        ]
      },
      {
        name: '고대병원 하차',
        directions: [
          {
            label: '안암동 주민센터 방면',
            routes: [{ number: '성북 04', type: 'green' }]
          },
          {
            label: '안암역 방면',
            routes: [{ number: '성북 04', type: 'green' }]
          }
        ]
      },
      {
        name: '안암오거리 하차',
        directions: [
          {
            label: '대광초교 방면',
            routes: [
              { number: '101', type: 'blue' },
              { number: '111', type: 'blue' },
              { number: 'N51', type: 'blue' },
              { number: '144', type: 'blue' },
              { number: '173', type: 'blue' }
            ]
          },
          {
            label: '우신향병원 방면',
            routes: [
              { number: '101', type: 'blue' },
              { number: '111', type: 'blue' },
              { number: 'N51', type: 'blue' },
              { number: '133', type: 'blue' },
              { number: '173', type: 'blue' },
              { number: '1017', type: 'blue' },
              { number: '7211', type: 'blue' }
            ]
          }
        ]
      },
      {
        name: '벽산아파트 하차',
        directions: [
          {
            label: '',
            routes: [{ number: '1222', type: 'green' }]
          }
        ]
      }
    ],
    airport: {
      steps: [
        { type: 'bus', label: '6011' },
        { type: 'destination', label: '인천국제공항 T1' },
        { type: 'bus', label: '성북 04' },
        { type: 'destination', label: '4호선 성신여대역' },
        { type: 'destination', label: '고대병원하차' }
      ]
    }
  }
}

// 구로병원 페이지 콘텐츠
const guroContent: HospitalPageContent = {
  referral: {
    intro: [
      '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,\n의뢰하신 환자 및 회송된 환자의 진료정보를 확인할 수 있는 시스템입니다.'
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
        href: '/network'
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
        description: ['T. 02-2626-1681', '평일 08:30~17:30'],
        href: '#',
        mobileSpan: 2,
        layoutType: 'icon-title'
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
        description: ['고대구로병원 카카오톡 채널', '평일 08:30~17:30'],
        href: '#',
        mobileSpan: 2,
        layoutType: 'icon-title'
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
        text: '의료기관 방문을 통한 동의(전자 또는 서면)'
      }
    ],
    applicationSteps: [
      {
        text: '보건복지부 마이차트 회원가입 (http://mychart.kr)'
      },
      {
        text: '이용신청서 작성'
      },
      {
        text: '승인 (거점의료기관 승인 -> 한국보건의료정보원 최종 승인)'
      }
    ],
    contact: ['고려대학교 구로병원 진료협력센터 : 02-2626-1681', '한국보건의료정보원(진료정보교류콜센터) : 1666-7598']
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
          src: '/images/referral/hira/hira-step1.png',
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
          src: '/images/referral/hira/hira-step2.png',
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
      '진료, 교육, 연구에 관한 사항을 상호 협력함으로써 국민의료환경 및 의료의 질을 향상시키고',
      '의료전달체계를 확립하여 의료계의 발전을 도모하고자 협력네트워크를 운영하고 있습니다.'
    ],
    introStyle: 'withIcon',
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral', icon: 'ChevronDownIcon', iconAfter: true },
      { label: 'network', href: '/network', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '협력네트워크 소개 & 신청', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    cooperationContent: [
      { text: '진료를 위한 상호협력' },
      { text: '의료정보 공유' },
      { text: '의학적 지식 및 기술 상호교류' },
      { text: '진료과별 간담회 및 초청 교육' },
      { text: '협력병·의원 지정 표시' }
    ],
    benefits: [
      { text: '현판(협력병원), 협력증서(협력병·의원) 제공' },
      { text: '병원 주차장 무료 이용' },
      {
        text: '종합검진(기본검진 20% 감면) 및 장례식장(빈소사용료 일부) 감면\n감면대상 : 원장님 본인, 배우자, 본인의 직계존비속'
      },
      { text: '병원 및 진료과 주최 각종 연수강좌 안내' },
      { text: '간담회 초청' },
      { text: '상호교류가 활발한 병·의원장 외래교수 위촉' },
      { text: '초진 환자 의뢰 시 협력병원 패스트 트랙 예약 서비스 제공' }
    ],
    target: {
      hospital: [{ text: '협력병원(병원급 이상) : 상호협력이 우수한 병원급 이상의 의료기관을 대상으로 매월 선정' }],
      clinic: [{ text: '협력의원 : 진료의뢰 및 회송을 통한 상호협력이 우수한 의원을 대상으로 매월 선정' }]
    },
    applicationMethod: [
      { text: '홈페이지 신청 : 온라인신청하기 에서 협력병의원 체결 신청서를 작성하여 저장' },
      { text: '팩스 신청 : 홈페이지에서 협력병 · 의원 체결 신청서를 다운로드 하여 작성 후 진료협력센터로 팩스 접수' }
    ],
    processSteps: [
      { stepNumber: '01', title: '신청서 접수', icon: 'DocumentIcon' },
      { stepNumber: '02', title: '원내심사', icon: 'ReviewIcon' },
      { stepNumber: '03', title: '병원장 최종 승인', icon: 'ApprovalIcon' },
      { stepNumber: '04', title: '협약체결', icon: 'HandshakeIcon' },
      { stepNumber: '05', title: '협력증서 전달', icon: 'CertificateIcon' }
    ],
    contact: {
      phone: '02-6464-8446',
      fax: '02-2626-1681'
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
  },
  aboutIntro: {
    introBox: {
      title: 'KRC(Korea University Guro Hospital Referral Center)',
      messages: [
        '고려대학교 구로병원 진료협력센터는 1·2차 의료기관에서 의뢰한 환자의 효율적인 진료를 위하여\n환자의뢰, 진료결과 회신, 회송을 통해 지역사회 의료기관과 균형적인 의료발전을 도모하고,\n의료전달 체계의 중심적 역할을 수행하여 지역주민 건강의 유지, 증진에 기여하고자 설립되었습니다.',
        '지역사회와의 상생을 기반으로 협력 병의원 원장님들과 긴밀하고 활발한 협력네트워크를 구축하여, 환자분께 편리하고 친절한 고려대학교 병원의 최적의 의료서비스를 받으실 수 있도록 운영하고 있습니다.'
      ]
    },
    mainTasks: [
      { text: '가능한 신속 정확한 진료가 이루어질 수 있도록 도와드리고 있습니다.' },
      {
        text: '개인정보공개 동의한 환자에 한하여, 의뢰한 환자의 진료결과, 진행사항에 대해 회신서를 제공하고 있습니다.'
      },
      {
        text: '급성기 치료 종료후 지속적 치료가 필요한 경우 환자 및 보호자 상담을 통해 1,2차 의료기관으로 회송하고 있습니다.'
      },
      { text: '상호협력이 우수한 병·의원을 대상으로 협력병·의원 협약 체결을 진행하고 있습니다.' }
    ],
    operationInfo: {
      cards: [
        {
          icon: 'OperationTimeIcon',
          title: '운영시간',
          rows: [{ label: '평일', value: '08:30 ~ 17:30' }]
        },
        {
          icon: 'OperationPhoneFaxIcon',
          title: '전용 전화 및 팩스',
          rows: [
            { label: 'Tel', value: '02-2626-1681' },
            { label: 'Fax', value: '02-2626-1691' }
          ]
        }
      ]
    },
    procedureFlow: {
      steps: [
        {
          chip: '진료의뢰',
          items: [{ text: '진료의뢰서 작성' }],
          stepIcon: 'FlowStep01Icon'
        },
        {
          chip: '진료예약',
          items: [{ text: '전화의뢰' }, { text: '전자의뢰(심평원중계포털, 진료정보교류시스템)' }],
          stepIcon: 'FlowStep02Icon'
        },
        {
          chip: '환자진료',
          items: [{ text: '신속, 정확한진료' }],
          stepIcon: 'FlowStep03Icon'
        },
        {
          chip: '진료결과 회신',
          items: [
            { text: '우편발송' },
            { text: 'E-mail 발송' },
            { text: '진료협력센터 홈페이지 확인(https://gurorefer.kumc.or.kr)', href: 'https://gurorefer.kumc.or.kr' }
          ],
          stepIcon: 'FlowStep04Icon'
        },
        {
          chip: '회송(되의뢰)',
          items: [
            { text: '급성기 치료 종료 후 의뢰주신 병원으로 되의뢰' },
            { text: '환자(보호자)와 충분한 상담 후 지속적 치료가 가능한 의료기관으로 회송' }
          ],
          stepIcon: 'FlowStep05Icon'
        }
      ]
    }
  },
  aboutGreeting: {
    slogan: '원장님의 진료 여정에 함께하는 든든한 동반자가 되겠습니다.',
    image: {
      src: '/images/about/greeting/director-guro.png',
      alt: '고려대학교 구로병원 진료협력센터장 윤영훈',
      width: 500,
      height: 600
    },
    message: [
      '안녕하십니까.\n고려대학교 구로병원 진료협력센터장 입니다.',
      '항상 지역의료 현장에서 환자 진료를 위해 헌신하시며, 본원에 많은 환자를 믿고 의뢰해 주시는 전국의 1·2차 의료기관 선생님들께 깊은 감사의 인사를 드립니다.',
      '본원은 상급종합병원으로서 중증·난이도 높은 환자 진료에 최선을 다함과 동시에, 지역의료기관과의 긴밀한 협력을 통해 환자에게 보다 신속하고 체계적인 의료 서비스를 제공하는 것을 중요한 책무로 여기고 있습니다.\n선생님들께서 보내주신 신뢰와 성원 덕분에, 진료의뢰와 회송을 중심으로 한 협력 진료 체계가 보다 안정적으로 운영될 수 있었습니다.',
      '앞으로 진료협력센터는 의뢰·회송 과정의 편의성과 신속성을 지속적으로 개선하고, 원활한 소통과 상호 존중을 바탕으로 한 진료 협력 관계가 더욱 활성화될 수 있도록 최선을 다하겠습니다.\n또한 협력병·의원 선생님들께 실질적으로 도움이 되는 진료 연계 체계를 구축하여 지역의료 발전에 기여하는 상급종합병원이 되도록 노력하겠습니다.',
      '앞으로도 변함없는 관심과 협력을 부탁드리며, 의뢰해 주시는 모든 환자분들의 진료에 책임감을 가지고 성실히 임할 것을 약속드립니다.\n감사합니다.'
    ],
    signature: {
      name: '윤 영 훈',
      title: '고려대학교 구로병원 진료협력센터장'
    }
  },
  aboutOrganization: {
    nodes: [
      {
        title: '진료협력센터장',
        children: [
          {
            title: '진료협력부센터장',
            children: [
              {
                title: '진료협력센터 팀장',
                phone: '02-2626-1681',
                children: [
                  {
                    title: '진료협력센터 부팀장',
                    phone: '02-2626-1681',
                    children: [
                      {
                        title: '진료의뢰',
                        phone: '02-2626-1681'
                      },
                      {
                        title: '입원회송',
                        phone: '02-2626-1681'
                      },
                      {
                        title: '외래회송',
                        phone: '02-2626-1681'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  aboutLocation: {
    address: {
      jibun: '구로동 80',
      road: '서울시 구로구 구로동로 148 (구로동)'
    },
    coordinates: {
      latitude: 37.492,
      longitude: 126.8847
    },
    mapLinks: {
      naver: 'https://map.naver.com/v5/search/서울시 구로구 구로동로 148',
      daum: 'https://map.kakao.com/?q=서울시 구로구 구로동로 148',
      google: 'https://maps.google.com/?q=서울시 구로구 구로동로 148'
    },
    car: [
      {
        label: '사당동 방면',
        isActive: false,
        routes: [
          {
            title: '사당동 방면',
            steps: [
              { text: '사당동 출발', icon: 'car' },
              { text: '남부순환도로\n구로 방향 이동', icon: 'road' },
              { text: '오류IC 진입', icon: 'road' },
              { text: '가리봉 방향 이동', icon: 'road' },
              { text: '도착', icon: 'map' }
            ]
          }
        ]
      },
      {
        label: '시내 방면',
        isActive: false,
        routes: [
          {
            title: '강북',
            steps: [
              { text: '강북' },
              { text: '영등포역 방향' },
              { text: '구로역 사거리에서 좌회전\n(지하차도 진입X)' },
              { text: '굴다리 지나\n삼거리에서 우측도로 1km 직진' },
              { text: '도착' }
            ]
          },
          {
            title: '내부순환대로 (성산대교)',
            steps: [
              { text: '내부순환대로 (성산대교)' },
              { text: '성산대교에서\n서부간선도로 진입' },
              { text: '오금교에서 구로역\n방면으로 좌회전' },
              { text: '굴다리 지나\n삼거리에서 우측도로 1km 직진' },
              { text: '도착' }
            ]
          },
          {
            title: '김포공항 (남부순환대로)',
            steps: [
              { text: '김포공항 (남부순환대로)' },
              { text: '오류 IC 진입' },
              { text: '구로벤처단지 IC 나와서 좌회전' },
              { text: '굴다리 지나\n병원사거리에서 우회전' },
              { text: '도착' }
            ]
          }
        ]
      },
      {
        label: '인천 방면',
        isActive: false,
        routes: [
          {
            title: '인천 방면',
            steps: [
              { text: '인천 출발', icon: 'car' },
              { text: '경인로 이용\n서울 방향 이동', icon: 'road' },
              { text: '구로전화국\n사거리 통과', icon: 'road' },
              { text: '고대구로병원\n사거리 진입', icon: 'road' },
              { text: '도착', icon: 'map' }
            ]
          }
        ]
      },
      {
        label: '안양 방면',
        isActive: false,
        routes: [
          {
            title: '안양 방면',
            steps: [
              { text: '안양 출발', icon: 'car' },
              { text: '경인로 이용\n서울 방향 이동', icon: 'road' },
              { text: '구로전화국\n사거리 통과', icon: 'road' },
              { text: '고대구로병원\n사거리 진입', icon: 'road' },
              { text: '도착', icon: 'map' }
            ]
          }
        ]
      },
      {
        label: '올림픽대로',
        isActive: false,
        routes: [
          {
            title: '올림픽대로',
            steps: [
              { text: '올림픽대로 이용', icon: 'car' },
              { text: '성산대교 진입', icon: 'road' },
              { text: '서부간선도로 진입', icon: 'road' },
              { text: '고대구로병원 사거리\n방면 이동', icon: 'road' },
              { text: '도착', icon: 'map' }
            ]
          }
        ]
      },
      {
        label: '경부고속도로',
        isActive: false,
        routes: [
          {
            title: '경부고속도로',
            steps: [
              { text: '경부고속도로 이용', icon: 'car' },
              { text: '양재IC →\n남부순환도로 진입', icon: 'road' },
              { text: '구로 방향 이동', icon: 'road' },
              { text: '오류IC 진입 후\n가리봉 방향 이동', icon: 'road' },
              { text: '도착', icon: 'map' }
            ]
          }
        ]
      },
      {
        label: '서해안고속도로',
        isActive: false,
        routes: [
          {
            title: '서해안고속도로',
            steps: [
              { text: '서해안고속도로 이용', icon: 'car' },
              { text: '금천IC 진출', icon: 'road' },
              { text: '서부간선도로 진입', icon: 'road' },
              { text: '고대구로병원 사거리\n방면 이동', icon: 'road' },
              { text: '도착', icon: 'map' }
            ]
          }
        ]
      },
      {
        label: '영동고속도로',
        isActive: false,
        routes: [
          {
            title: '영동고속도로',
            steps: [
              { text: '영동고속도로 이용', icon: 'car' },
              { text: '서해안고속도로 진입', icon: 'road' },
              { text: '금천IC 진출', icon: 'road' },
              { text: '서부간선도로 진입', icon: 'road' },
              { text: '도착', icon: 'map' }
            ]
          }
        ]
      },
      {
        label: '외곽순환고속도로',
        isActive: false,
        routes: [
          {
            title: '외곽순환고속도로',
            steps: [
              { text: '외곽순환고속도로 이용', icon: 'car' },
              { text: '서운JC에서\n경인고속도로 진입', icon: 'road' },
              { text: '서울 방향 이동', icon: 'road' },
              { text: '서부간선도로 진입', icon: 'road' },
              { text: '도착', icon: 'map' }
            ]
          }
        ]
      }
    ],
    shuttle: {
      routes: [
        { name: '병원', type: 'both' },
        { name: '구로역', type: 'alighting' },
        { name: '신도림역', type: 'both' },
        { name: '구로역', type: 'both' },
        { name: '병원', type: 'both' }
      ],
      schedules: [
        { time: '06:30 ~ 08:20', interval: '5~10분 간격', note: '신도림행 : 06:45~08:15 (15분간격)' },
        { time: '08:20 ~ 17:30', interval: '10분 간격', note: '점심시간 : 12:00~13:00 (20분간격)' },
        { time: '17:30 ~ 18:00', interval: '5분 간격', note: '신도림행 : 17:35 ~17:55 (10분간격)' },
        { time: '18:00 ~ 19:00', interval: '20분 간격', note: '구로역까지만 운행' }
      ],
      boardingLocations: [
        {
          name: 'B관(신관) 입구',
          image: '/images/shuttle/b-guide.jpg'
        },
        {
          name: '구로역',
          image: '/images/shuttle/guro-station.jpg',
          notices: [
            {
              type: 'notice',
              text: '1번 출구로 내려와 (또는 구로역 엘리베이터로 1층 이동) 큰 길까지 이동, 육교 아래부분',
              label: '승차'
            },
            { type: 'info', text: '승차 정류장 건너편', label: '하차' }
          ]
        },
        {
          name: '신도림역',
          image: '/images/shuttle/sindorim-station.jpg',
          description:
            '1번 출구에서 신도림2차 푸르지오 아파트 쪽으로 횡단보도 건넌 후 우회전 → 횡단보도 건너편 좌측 40m'
        }
      ],
      note: '※ 주말 및 공휴일은 운행하지 않습니다.'
    },
    subway: [
      {
        station: '신도림역',
        lines: '1, 2호선',
        busInfo: ['1번 출구 - 503,5714,6512.5615', '2번 출구 - 5619,6411'],
        destination: '고대구로병원 정문 하차'
      },
      {
        station: '구로역',
        lines: '1호선',
        busInfo: ['ALL'],
        destination: '고대구로병원 정문 하차'
      },
      {
        station: '대림역',
        lines: '2, 7호선',
        busInfo: ['마을버스 - 구로 10, 11'],
        destination: '고대구로병원 정문 하차'
      },
      {
        station: '남구로역',
        lines: '2, 7호선',
        busInfo: ['ALL', '구로시장 경우, 1개 정류장', '차이로 도보6-7분거리'],
        destination: '고대구로병원 정문 하차'
      }
    ],
    bus: [
      {
        name: '시내버스',
        directions: [
          {
            label: '',
            routes: [
              { number: '5615', type: 'green' },
              { number: '5619', type: 'green' },
              { number: '5626', type: 'green' },
              { number: '5630', type: 'green' },
              { number: '5712', type: 'green' },
              { number: '5714', type: 'green' },
              { number: '6512', type: 'green' },
              { number: '503', type: 'blue' }
            ]
          }
        ]
      },
      {
        name: '마을버스',
        directions: [
          {
            label: '',
            routes: [
              { number: '구로 10', type: 'green' },
              { number: '구로 11', type: 'green' }
            ]
          }
        ]
      }
    ],
    airport: [
      {
        number: '6003',
        route: [
          { text: '인천공항 – 김포공항 – 마곡역 - 목동역 - ' },
          { text: '구로역', highlight: true },
          { text: ' - ' },
          { text: '대림역(버스환승)', highlight: true },
          { text: ' - 강서구청 - 발산' }
        ],
        firstBus: '04:20',
        lastBus: '23:09',
        interval: '20 ~ 30분'
      },
      {
        number: '6004',
        route: [
          { text: '인천공항 – KTX 광명역 - 시흥사거리 - 디지털단지오거리 - ' },
          { text: '가산디지털단지(버스환승)', highlight: true },
          { text: ' - 롯데시티호텔 구로 - 금천우체국' }
        ],
        firstBus: '04:25',
        lastBus: '20:10',
        interval: '25 ~ 40분'
      }
    ]
  }
}

// 안산병원 페이지 콘텐츠
const ansanContent: HospitalPageContent = {
  referral: {
    intro: [
      '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,\n의뢰하신 환자 및 회송된 환자의 진료정보를 확인할 수 있는 시스템입니다.'
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
        description: '의뢰해주신 환자의 \n 진료정보 조회가 가능합니다.',
        href: '#'
      },
      {
        id: 'network',
        icon: 'NetworkIcon',
        title: '협력네트워크',
        description: '온라인으로 협력병의원\n체결신청이 가능합니다.',
        href: '/network'
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
      weekday: '08:00~18:00',
      saturday: '08:00~13:00'
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
        description: ['T. 031-412-5103', '평일 08:00~18:00', '토요일 08:00~13:00'],
        href: '#',
        mobileSpan: 2,
        layoutType: 'icon-title'
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
        text: '의료기관 방문을 통한 동의(전자 또는 서면)'
      }
    ],
    applicationSteps: [
      {
        text: '보건복지부 마이차트 회원가입 (http://mychart.kr)'
      },
      {
        text: '이용신청서 작성'
      },
      {
        text: '승인 (거점의료기관 승인 -> 한국보건의료정보원 최종 승인)'
      }
    ],
    contact: ['고려대학교 안산병원 진료협력센터 : 031-412-5103', '한국보건의료정보원(진료정보교류콜센터) : 1666-7598']
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
          src: '/images/referral/hira/hira-step1.png',
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
          src: '/images/referral/hira/hira-step2.png',
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
      '진료, 교육, 연구에 관한 사항을 상호 협력함으로써 국민의료환경 및 의료의 질을 향상시키고',
      '의료전달체계를 확립하여 의료계의 발전을  도모하고자 협력네트워크를 운영하고 있습니다.'
    ],
    introStyle: 'withIcon',
    breadcrumbs: [
      { label: '', href: '/', icon: 'HomeIcon' },
      { label: '진료의뢰', href: '/referral', icon: 'ChevronDownIcon', iconAfter: true },
      { label: 'network', href: '/network', icon: 'ChevronDownIcon', iconAfter: true },
      { label: '협력네트워크 소개 & 신청', icon: 'ChevronDownIcon', iconAfter: true }
    ],
    benefits: [
      { text: '협약서, 협력증서 제공' },
      { text: '병원 주차장 무료 이용' },
      {
        text: '종합검진 20% 감면(기본검진에 한함) 및 고대안산병원 장례식장 빈소사용료 30% 감면\n감면 대상 : 원장님 본인, 배우자 본인의 직계 존비속'
      },
      { text: '병원 및 진료과 주최 각종 연수강좌 안내' },
      { text: '간담회 초청' },
      { text: '상호교류가 활발한 병·의원장 외래교수 위촉' },
      { text: '초진 환자 의뢰 시 빠른 예약 서비스 제공' }
    ],
    target: {
      hospital: [{ text: '협력병원 : 상호협력(진료의뢰 및 회송)을 위한 병원급 이상의 의료기관' }],
      clinic: [{ text: '협력의원 : 상호협력(진료의뢰 및 회송)을 위한 의원' }]
    },
    applicationMethod: [
      { text: '홈페이지 신청 : 온라인신청하기 에서 협력병·의원 체결 신청서를 작성하여 저장' },
      { text: '팩스 신청 : 홈페이지에서 협력병·의원 체결 신청서를 다운로드 하여 작성 후 진료협력센터로 팩스 접수' }
    ],
    processSteps: [
      { stepNumber: '01', title: '신청서 접수', icon: 'DocumentIcon' },
      { stepNumber: '02', title: '원내심사', icon: 'ReviewIcon' },
      { stepNumber: '03', title: '병원장 최종 승인', icon: 'ApprovalIcon' },
      { stepNumber: '04', title: '협약체결', icon: 'HandshakeIcon' },
      { stepNumber: '05', title: '협력증서 전달', icon: 'CertificateIcon' }
    ],
    contact: {
      phone: '031-412-3211',
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
  },
  aboutIntro: {
    introBox: {
      title: 'KRC(Korea University Ansan Hospital Referral Center)',
      messages: [
        '고려대학교안산병원 진료협력센터(KRC)는 1·2차 의료기관에서 의뢰한 환자의 효율적인 진료를 위하여\n환자의뢰, 진료결과 회신, 회송을 통해 지역사회 의료기관과 균형적인 의료발전을 도모하고,\n의료전달 체계의 중심적 역할을 수행하여 지역주민 건강의 유지, 증진에 기여하고자 설립되었습니다.',
        '\u00A0지역사회와의 상생을 기반으로 협력 병의원 원장님들과 긴밀하고 활발한 협력네트워크를 구축하여,\n환자분께 편리하고 친절한 고려대학교 병원의 최적의 의료서비스를 받으실수 있도록 운영하고 있습니다.'
      ]
    },
    mainTasks: [
      { text: '가능한 신속 정확한 진료가 이루어질 수 있도록 도와드리고 있습니다.' },
      {
        text: '개인정보공개 동의한 환자에 한하여, 의뢰한 환자의 진료결과, 진행사항에 대해 회신서를 제공하고 있습니다.'
      },
      {
        text: '급성기 치료 종료 후 지속적 치료가 필요한 경우 환자 및 보호자 상담을 통해 1,2차 의료기관으로 회송하고 있습니다.'
      },
      { text: '상호협력이 우수한 병·의원을 대상으로 협력병·의원 협약 체결을 진행하고 있습니다.' }
    ],
    operationInfo: {
      cards: [
        {
          icon: 'OperationTimeIcon',
          title: '운영시간',
          rows: [{ label: '평일', value: '08:30 ~ 17:30' }]
        },
        {
          icon: 'OperationPhoneFaxIcon',
          title: '전용 전화 및 팩스',
          rows: [
            { label: 'Tel', value: '031-412-5103' },
            { label: 'Fax', value: '031-412-4266' }
          ],
          rowLayout: 'vertical'
        },
        {
          icon: 'EmergencyNightIcon',
          title: '응급 및 야간',
          subtitle: '(응급 교수 직통 핫라인)',
          rows: [{ label: 'Tel', value: '010-4768-5119' }]
        }
      ]
    },
    procedureFlow: {
      steps: [
        {
          chip: '진료의뢰',
          items: [{ text: '진료의뢰서 작성' }],
          stepIcon: 'FlowStep01Icon'
        },
        {
          chip: '진료예약',
          items: [{ text: '전화의뢰' }, { text: '전자의뢰(심평원중계포털, 진료정보교류시스템)' }],
          stepIcon: 'FlowStep02Icon'
        },
        {
          chip: '환자진료',
          items: [{ text: '신속, 정확한 진료' }],
          stepIcon: 'FlowStep03Icon'
        },
        {
          chip: '진료결과 회신',
          items: [
            { text: '우편발송' },
            { text: 'E-mail 발송' },
            {
              text: '인터넷 결과 조회 : KRC 홈페이지(https://ansanrefer.kumc.or.kr)',
              href: 'https://ansanrefer.kumc.or.kr'
            }
          ],
          stepIcon: 'FlowStep04Icon'
        },
        {
          chip: '회송(되의뢰)',
          items: [
            { text: '급성기 치료 종료 후 의뢰주신 병원으로 되의뢰' },
            { text: '환자(보호자)와 충분한 상담 후 지속적 치료가 가능한 의료기관으로 회송' }
          ],
          stepIcon: 'FlowStep05Icon'
        }
      ]
    }
  },
  aboutGreeting: {
    slogan: '원장님의 진료 여정에 함께하는 든든한 동반자가 되겠습니다.',
    sloganParts: [
      { text: '원장님의 진료 여정에 함께하는 ', color: 'black' },
      { text: '든든한 동반자', color: 'primary' },
      { text: ' 가 되겠습니다.', color: 'black' }
    ],
    image: {
      src: '/images/about/greeting/director-ansan.png',
      alt: '고려대학교안산병원 진료협력센터장 홍광대',
      width: 500,
      height: 600
    },
    message: [
      '안녕하십니까?\n고려대학교안산병원 진료협력센터장 홍광대입니다.',
      '홈페이지를 방문해 주셔서 감사드립니다.',
      '고대안산병원은 상급종합의료기관으로 보건의료의 중추적인 역할을 담당하고 있으며, 지역 병·의원과 긴밀한 진료협력을 위해 진료협력센터를 운영하고 있습니다.',
      '진료협력센터는 사회여건과 의료 환경의 어려운 변화 속에서 편리하고 효율적인 진료협력시스템을 구축하기 위해 지속적으로 노력하고 있습니다.',
      '진료협력센터 홈페이지를 통하여 진료의뢰와 결과조회의 편의성을 높이고 의뢰해 주신 환자와 관련하여 믿음을 드리고자 합니다.',
      '항상 선생님들의 의견에 귀 기울이며 신뢰를 바탕으로 상호 발전하는 진료협력센터가 되도록 모든 직원이 한마음 한 뜻으로 최선을 다하겠습니다.\n감사합니다.'
    ],
    signature: {
      name: '홍 광 대',
      title: '고려대학교 안산병원 진료협력센터장'
    }
  },
  aboutOrganization: {
    nodes: [
      {
        title: '진료협력센터장',
        children: [
          {
            title: '진료협력부센터장',
            children: [
              {
                title: '진료협력센터 팀장',
                phone: '031-412-5103',
                children: [
                  {
                    title: '진료협력센터 부팀장',
                    phone: '031-412-5103',
                    children: [
                      {
                        title: '진료의뢰',
                        phone: '031-412-5103'
                      },
                      {
                        title: '입원회송',
                        phone: '031-412-5103'
                      },
                      {
                        title: '외래회송',
                        phone: '031-412-5103'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  aboutLocation: {
    address: {
      jibun: '고잔동',
      road: '경기도 안산시 단원구 적금로 123 (고잔동)'
    },
    coordinates: {
      latitude: 37.3191,
      longitude: 126.8252
    },
    mapLinks: {
      naver: 'https://map.naver.com/v5/search/경기도 안산시 단원구 적금로 123',
      daum: 'https://map.kakao.com/?q=경기도 안산시 단원구 적금로 123',
      google: 'https://maps.google.com/?q=경기도 안산시 단원구 적금로 123'
    },
    // 진료협력센터 정보
    medicalCenter: {
      address: '경기도 안산시 단원구 적금로 123 지하1층',
      phone: '031-412-5103',
      floorMapImage: '/images/about/location/FloorMapAnsan.png'
    },
    // 층별 안내도 범례
    floorMapLegend: [
      { number: 1, name: '진료협력센터' },
      { number: 2, name: '원무과' },
      { number: 3, name: '진단검사의학과' },
      { number: 4, name: '영상의학과' },
      { number: 5, name: '핵의학과' },
      { number: 6, name: '재활의학과' },
      { number: 7, name: '신경과' },
      { number: 8, name: '정신건강의학과' },
      { number: 9, name: '피부과' },
      { number: 10, name: '비뇨의학과' },
      { number: 11, name: '산부인과' },
      { number: 12, name: '소아청소년과' },
      { number: 13, name: '정형외과' },
      { number: 14, name: '신경외과' },
      { number: 15, name: '흉부외과' },
      { number: 16, name: '외과' },
      { number: 17, name: '이비인후과' },
      { number: 18, name: '안과' },
      { number: 19, name: '치과' },
      { number: 20, name: '마취통증의학과' },
      { number: 21, name: '응급의학과' },
      { number: 22, name: '가정의학과' },
      { number: 23, name: '직업환경의학과' }
    ],
    // 지하철 정보 (간단한 구조)
    subway: [
      {
        station: '고잔역(고대안산병원) 1번출구 도보 10분',
        lines: '4호선, 수인분당선',
        destination: '고려대학교 안산병원'
      }
    ],
    // 버스 정보 (7개 정류장)
    bus: [
      {
        name: '고대병원 앞 [도보 1분]',
        directions: [
          {
            label: '',
            routes: [
              { number: '일반 98', type: 'green' },
              { number: '일반 99-1', type: 'green' },
              { number: '직좌 5609', type: 'red' }
            ]
          }
        ]
      },
      {
        name: '고대병원 앞 (건너편) [도보 2분]',
        directions: [
          {
            label: '',
            routes: [
              { number: '일반 98', type: 'green' },
              { number: '일반 99-1', type: 'green' },
              { number: '직좌 5609', type: 'red' }
            ]
          }
        ]
      },
      {
        name: '자유센터 [도보 5분]',
        directions: [
          {
            label: '',
            routes: [
              { number: '일반 9', type: 'green' },
              { number: '일반 9-1', type: 'green' },
              { number: '일반 11', type: 'green' },
              { number: '일반 22', type: 'green' },
              { number: '일반 23', type: 'green' },
              { number: '일반 30', type: 'green' },
              { number: '일반 30-2', type: 'green' },
              { number: '일반 52', type: 'green' },
              { number: '일반 62', type: 'green' },
              { number: '일반 99', type: 'green' },
              { number: '일반 99-1', type: 'green' },
              { number: '일반 101', type: 'green' },
              { number: '일반 123', type: 'green' },
              { number: '일반 125', type: 'green' },
              { number: '일반 350', type: 'green' },
              { number: '직좌 110', type: 'red' },
              { number: '직좌 300', type: 'red' },
              { number: '직좌 5609', type: 'red' },
              { number: '직좌 7070', type: 'red' }
            ]
          }
        ]
      },
      {
        name: '고잔 롯데캐슬골드파크 [도보 6분]',
        directions: [
          {
            label: '',
            routes: [
              { number: '일반 9', type: 'green' },
              { number: '일반 9-1', type: 'green' },
              { number: '일반 11', type: 'green' },
              { number: '일반 22', type: 'green' },
              { number: '일반 23', type: 'green' },
              { number: '일반 30', type: 'green' },
              { number: '일반 30-2', type: 'green' },
              { number: '일반 52', type: 'green' },
              { number: '일반 62', type: 'green' },
              { number: '일반 66', type: 'green' },
              { number: '일반 99', type: 'green' },
              { number: '일반 99-1', type: 'green' },
              { number: '일반 101', type: 'green' },
              { number: '일반 123', type: 'green' },
              { number: '일반 125', type: 'green' },
              { number: '일반 350', type: 'green' },
              { number: '직좌 110', type: 'red' },
              { number: '직좌 300', type: 'red' },
              { number: '직좌 5609', type: 'red' },
              { number: '직좌 7070', type: 'red' }
            ]
          }
        ]
      },
      {
        name: '고잔역 1번 출구 건너편 [도보 3분]',
        directions: [
          {
            label: '',
            routes: [
              { number: '일반 6', type: 'green' },
              { number: '일반 97', type: 'green' }
            ]
          }
        ]
      },
      {
        name: '고잔역 1번 출구 [도보 5분]',
        directions: [
          {
            label: '',
            routes: [
              { number: '일반 6', type: 'green' },
              { number: '일반 97', type: 'green' },
              { number: '일반 98', type: 'green' },
              { number: '일반 99-1', type: 'green' },
              { number: '일반 500', type: 'green' }
            ]
          }
        ]
      },
      {
        name: '고잔역 2번 출구 [도보 7분]',
        directions: [
          {
            label: '',
            routes: [
              { number: '일반 97', type: 'green' },
              { number: '일반 98', type: 'green' },
              { number: '일반 99-1', type: 'green' },
              { number: '일반 500', type: 'green' }
            ]
          }
        ]
      }
    ],
    // 공항버스 정보 (안산 전용 - 세로 테이블 구조)
    ansanAirport: [
      {
        title: '인천공항에서 오는 법',
        stopNumber: '7B',
        route:
          '인천공항 – 김포공항 – 원종동대로빌딩 – 소사역- 낙원예식장 – 대야동가스공사 – 월곶신도시입구 – 모아아파트 - 영남1단지 – 금강아파트 – 이마트 – 시흥관광호텔 – 안산역 - 안산터미널',
        firstBus: '안산행 06:10 - 공항행 05:00',
        lastBus: '안산행 22:10 - 공항행 19:00',
        interval: '25 ~ 30분',
        duration: '90분'
      },
      {
        title: '김포공항에서 오는 법',
        stopNumber: '국내선 7번, 국제선 1번',
        route: '김포공항 – 소사역 – 낙원예식장 – 영남APT - 계룡APT - 금강APT – 시흥관광호텔 - 안산역',
        firstBus: '안산행 06:40',
        lastBus: '안산행 22:40',
        interval: '20 ~ 30분',
        duration: '100분'
      }
    ]
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
