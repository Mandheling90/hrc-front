export interface HospitalFormData {
  hospitalName: string
  medicalInstitutionNumber: string
  postalCode: string
  address: string
  detailAddress: string
  phoneNumber: string
  faxNumber: string
  website: string
}

export interface DirectorFormData {
  directorName: string
  birthDate: string
  licenseNumber: string
  phone: string
  gender: string
  carNumber: string
  email: string
  school: string
  graduationYear: string
  trainingHospital: string
  department: string
  specialty: string
  smsConsent: string
  emailConsent: string
  replyConsent: string
}

export interface DepartmentOption {
  value: string
  label: string
}

export const DEPARTMENT_OPTIONS: DepartmentOption[] = [
  { value: '전체', label: '전체' },
  { value: '내과', label: '내과' },
  { value: '외과', label: '외과' },
  { value: '정형외과', label: '정형외과' },
  { value: '신경외과', label: '신경외과' },
  { value: '산부인과', label: '산부인과' },
  { value: '소아과', label: '소아과' },
  { value: '이비인후과', label: '이비인후과' },
  { value: '안과', label: '안과' },
  { value: '피부과', label: '피부과' },
  { value: '정신건강의학과', label: '정신건강의학과' },
  { value: '재활의학과', label: '재활의학과' },
  { value: '마취통증의학과', label: '마취통증의학과' },
  { value: '영상의학과', label: '영상의학과' },
  { value: '병리과', label: '병리과' },
  { value: '진단검사의학과', label: '진단검사의학과' },
  { value: '응급의학과', label: '응급의학과' }
]

/** 부서 옵션 (실무자 정보용) */
export const STAFF_DEPARTMENT_OPTIONS: DepartmentOption[] = [
  { value: '01', label: 'ICU' },
  { value: '02', label: '가정간호' },
  { value: '03', label: '간호부' },
  { value: '04', label: '건강의학센터' },
  { value: '05', label: '국제진료소' },
  { value: '06', label: '기획팀' },
  { value: '07', label: '당뇨교육실' },
  { value: '08', label: '물리치료실' },
  { value: '09', label: '비서실' },
  { value: '10', label: '사회사업실' },
  { value: '11', label: '약제부' },
  { value: '12', label: '예약실' },
  { value: '13', label: '원무팀' },
  { value: '14', label: '응급실' },
  { value: '15', label: '임상병리과' },
  { value: '16', label: '장례식장' },
  { value: '17', label: '재활치료실' },
  { value: '18', label: '진료협력센터' },
  { value: '19', label: '총무팀' },
  { value: '20', label: '투석실' },
  { value: '21', label: '혈액은행' },
  { value: '22', label: '호스피스' },
  { value: '23', label: '기타' },
  { value: '24', label: '수탁검사담당' },
  { value: '25', label: '행정팀' }
]

/** 진료과 옵션 (실무자 정보용) */
export const MEDICAL_DEPARTMENT_OPTIONS: DepartmentOption[] = [
  { value: 'AN', label: '마취통증의학과' },
  { value: 'AP', label: '병리과' },
  { value: 'BL', label: '진단검사의학과' },
  { value: 'DEN', label: '치과' },
  { value: 'DER', label: '피부과' },
  { value: 'DS', label: '구강외과' },
  { value: 'ENT', label: '이비인후과' },
  { value: 'ER', label: '응급의학과' },
  { value: 'ETC', label: '일반의' },
  { value: 'FM', label: '가정의학과' },
  { value: 'GS', label: '외과' },
  { value: 'HM', label: '건강관리과' },
  { value: 'IM', label: '내과' },
  { value: 'INM', label: '작업환경의학과' },
  { value: 'KM', label: '한방' },
  { value: 'NM', label: '핵의학과' },
  { value: 'NR', label: '신경과' },
  { value: 'NS', label: '신경외과' },
  { value: 'OBGY', label: '산부인과' },
  { value: 'OPH', label: '안과' },
  { value: 'OS', label: '정형외과' },
  { value: 'PED', label: '소아청소년과' },
  { value: 'PS', label: '성형외과' },
  { value: 'PSY', label: '정신건강의학과' },
  { value: 'RAD', label: '영상의학과' },
  { value: 'REH', label: '재활의학과' },
  { value: 'RT', label: '방사선종양학과' },
  { value: 'TB', label: '결핵학' },
  { value: 'TS', label: '흉부외과' },
  { value: 'URO', label: '비뇨기과' }
]

/** 출신학교 옵션 (School enum - LARGCD=ER01) */
export const SCHOOL_OPTIONS: DepartmentOption[] = [
  { value: '', label: '선택해주세요' },
  { value: '서울대학교', label: '서울대학교' },
  { value: '연세대학교(신촌)', label: '연세대학교(신촌)' },
  { value: '고려대학교', label: '고려대학교' },
  { value: '가톨릭대학교', label: '가톨릭대학교' },
  { value: '한양대학교', label: '한양대학교' },
  { value: '성균관대학교', label: '성균관대학교' },
  { value: '경희대학교', label: '경희대학교' },
  { value: '이화여자대학교', label: '이화여자대학교' },
  { value: '중앙대학교', label: '중앙대학교' },
  { value: '건국대학교', label: '건국대학교' },
  { value: '동국대학교', label: '동국대학교' },
  { value: '부산대학교', label: '부산대학교' },
  { value: '경북대학교', label: '경북대학교' },
  { value: '전남대학교', label: '전남대학교' },
  { value: '충북대학교', label: '충북대학교' },
  { value: '충남대학교', label: '충남대학교' },
  { value: '전북대학교', label: '전북대학교' },
  { value: '강원대학교', label: '강원대학교' },
  { value: '제주대학교', label: '제주대학교' },
  { value: '한림대학교', label: '한림대학교' },
  { value: '인하대학교', label: '인하대학교' },
  { value: '아주대학교', label: '아주대학교' },
  { value: '순천향대학교', label: '순천향대학교' },
  { value: '건양대학교', label: '건양대학교' },
  { value: '가천의과대학', label: '가천의과대학' },
  { value: '영남대학교', label: '영남대학교' },
  { value: '연세대학교(원주)', label: '연세대학교(원주)' },
  { value: '경상대학교', label: '경상대학교' },
  { value: '고신대학교', label: '고신대학교' },
  { value: '관동대학교', label: '관동대학교' },
  { value: '단국대학교', label: '단국대학교' },
  { value: '동아대학교', label: '동아대학교' },
  { value: '울산대학교', label: '울산대학교' },
  { value: '원광대학교', label: '원광대학교' },
  { value: '인제대학교', label: '인제대학교' },
  { value: '조선대학교', label: '조선대학교' },
  { value: '계명대학교', label: '계명대학교' },
  { value: '차의과대학교', label: '차의과대학교' },
  { value: '을지대학교', label: '을지대학교' },
  { value: '강릉원주대학교', label: '강릉원주대학교' },
  { value: '서남대학교', label: '서남대학교' },
  { value: '경원대학교 한의과대학', label: '경원대학교 한의과대학' },
  { value: '경희대학교 한의과대학', label: '경희대학교 한의과대학' },
  { value: '대구한의대학교', label: '대구한의대학교' },
  { value: '대전대학교 한의과대학', label: '대전대학교 한의과대학' },
  { value: '동국대학교 한의과대학', label: '동국대학교 한의과대학' },
  { value: '동신대학교 한의과대학', label: '동신대학교 한의과대학' },
  { value: '동의대학교 한의과대학', label: '동의대학교 한의과대학' },
  { value: '상지대학교 한의과대학', label: '상지대학교 한의과대학' },
  { value: '세명대학교 한의과대학', label: '세명대학교 한의과대학' },
  { value: '우석대학교 한의과대학', label: '우석대학교 한의과대학' },
  { value: '원광대학교 한의과대학', label: '원광대학교 한의과대학' },
  { value: '기타 (국외/신설)', label: '기타 (국외/신설)' }
]

export interface StaffFormData {
  staffName: string
  department: string
  position: string
  contactNumber: string
  mobilePhone: string
}

export type MedicalInstitutionType = '상급종합병원' | '종합병원' | '병원' | '전문병원' | '요양병원' | '한방병원'

export interface PersonnelFormData {
  totalEmployees: string
  specialists: string
  nurses: string
}
