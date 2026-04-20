import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

/** 메뉴 접근 권한 수준 (NONE: 접근불가, READ: 읽기전용, FULL: 모두허용) */
export enum AccessLevel {
  /** 모두허용 */
  Full = 'FULL',
  /** 접근불가 */
  None = 'NONE',
  /** 읽기전용 */
  Read = 'READ'
}

/** ADMAP 홈페이지 진료과 목록 항목 */
export type AdmapHomepageDepartmentListItem = {
  __typename?: 'AdmapHomepageDepartmentListItem';
  /** 진료과 약어코드 */
  departmentAbbreviationCode: Maybe<Scalars['String']['output']>;
  /** 진료과 코드 */
  departmentCode: Scalars['String']['output'];
  /** 진료과명 */
  departmentName: Scalars['String']['output'];
  /** 소속 병원 */
  hospitalCode: HospitalCode;
  /** 공개 홈페이지 진료과 코드(doctorApi/department.do 기준) */
  publicDepartmentCode: Maybe<Scalars['String']['output']>;
  /** 진료과 정렬값 */
  sortOrder: Maybe<Scalars['String']['output']>;
};

/** ADMAP 홈페이지 진료과 목록 응답 */
export type AdmapHomepageDepartmentListResponse = {
  __typename?: 'AdmapHomepageDepartmentListResponse';
  /** 진료과 목록 */
  items: Array<AdmapHomepageDepartmentListItem>;
  /** 총 항목 수 */
  totalCount: Scalars['Float']['output'];
};

/** ADMAP 의료진 목록 필터 */
export type AdmapMedicalStaffFilterInput = {
  /** 의료진 ID(empId 기반 doctorId, 선택) */
  doctorId?: InputMaybe<Scalars['String']['input']>;
  /** 의료진 이름 검색어 (선택) */
  doctorName?: InputMaybe<Scalars['String']['input']>;
  /** 진료과 코드 (선택) */
  mcdpCd?: InputMaybe<Scalars['String']['input']>;
};

/** ADMAP 의료진 목록 항목 */
export type AdmapMedicalStaffListItem = {
  __typename?: 'AdmapMedicalStaffListItem';
  /** 진료과 코드 */
  departmentCode: Scalars['String']['output'];
  /** 진료과명 */
  departmentName: Scalars['String']['output'];
  /** 의료진 ID */
  doctorId: Scalars['ID']['output'];
  /** 의료진 이름 */
  doctorName: Scalars['String']['output'];
  /** 의료진 번호 (drNo) */
  drNo: Maybe<Scalars['String']['output']>;
  /** 소속 병원 */
  hospitalCode: HospitalCode;
  /** 의료진 사진 URL */
  photoUrl: Maybe<Scalars['String']['output']>;
  /** 전문분야 */
  specialty: Maybe<Scalars['String']['output']>;
};

/** ADMAP 의료진 목록 응답 */
export type AdmapMedicalStaffListResponse = {
  __typename?: 'AdmapMedicalStaffListResponse';
  /** 의료진 목록 */
  items: Array<AdmapMedicalStaffListItem>;
  /** 총 항목 수 */
  totalCount: Scalars['Float']['output'];
};

/** ADMAP 주간 일정 항목 */
export type AdmapWeeklyScheduleListItem = {
  __typename?: 'AdmapWeeklyScheduleListItem';
  /** 예약가능여부 (Y/N) */
  apntPsblYn: Maybe<Scalars['String']['output']>;
  /** 진료과 코드 */
  departmentCode: Scalars['String']['output'];
  /** 진료과명 */
  departmentName: Scalars['String']['output'];
  /** 의료진 ID */
  doctorId: Scalars['ID']['output'];
  /** 의료진 이름 */
  doctorName: Scalars['String']['output'];
  /** 금요일 오전/오후 코드 */
  friAmpmCd: Maybe<Scalars['String']['output']>;
  /** 소속 병원 */
  hospitalCode: HospitalCode;
  /** 월요일 오전/오후 코드 */
  monAmpmCd: Maybe<Scalars['String']['output']>;
  /** 목요일 오전/오후 코드 */
  thuAmpmCd: Maybe<Scalars['String']['output']>;
  /** 화요일 오전/오후 코드 */
  tueAmpmCd: Maybe<Scalars['String']['output']>;
  /** 수요일 오전/오후 코드 */
  wedAmpmCd: Maybe<Scalars['String']['output']>;
};

/** ADMAP 주간 일정 목록 응답 */
export type AdmapWeeklyScheduleListResponse = {
  __typename?: 'AdmapWeeklyScheduleListResponse';
  /** 주간 일정 목록 */
  items: Array<AdmapWeeklyScheduleListItem>;
  /** 총 항목 수 */
  totalCount: Scalars['Float']['output'];
};

/** 관리자 계정 생성 입력 */
export type AdminCreateUserInput = {
  /** 이메일 (미입력 시 시스템 기본값 사용) */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 생성 대상 병원 코드 (통합관리자 필수) */
  hospitalCode?: InputMaybe<HospitalCode>;
  /** 허용 IP (설정 시 해당 IP에서만 로그인 가능) */
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  /** 비밀번호 */
  password: Scalars['String']['input'];
  /** 비밀번호 확인 */
  passwordConfirm: Scalars['String']['input'];
  /** 로그인 아이디 */
  userId: Scalars['String']['input'];
  /** 이름 */
  userName: Scalars['String']['input'];
};

/** 의료진 (관리자용) */
export type AdminDoctorModel = {
  __typename?: 'AdminDoctorModel';
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 진료과명 */
  departmentName: Maybe<Scalars['String']['output']>;
  /** 이메일 */
  email: Maybe<Scalars['String']['output']>;
  /** 소속 병원 */
  hospitalCode: Maybe<HospitalCode>;
  /** 의료진 ID */
  id: Scalars['ID']['output'];
  /** 활성 여부 */
  isActive: Scalars['Boolean']['output'];
  /** 면허번호 */
  licenseNo: Maybe<Scalars['String']['output']>;
  /** 이름 */
  name: Scalars['String']['output'];
  /** 연락처 */
  phone: Maybe<Scalars['String']['output']>;
  /** 사진 URL(미사용) */
  photoUrl: Maybe<Scalars['String']['output']>;
  /** 정렬순서 */
  sortOrder: Scalars['Int']['output'];
  /** 전문분야 */
  specialty: Maybe<Scalars['String']['output']>;
  /** 회원 상태 */
  status: UserStatus;
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
  /** 로그인 아이디 */
  userId: Scalars['String']['output'];
};

/** 관리자용 e-Consult 자문의 */
export type AdminEconsultConsultantModel = {
  __typename?: 'AdminEconsultConsultantModel';
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 진료과 코드 */
  departmentCode: Maybe<Scalars['String']['output']>;
  /** 진료과명 */
  departmentName: Maybe<Scalars['String']['output']>;
  /** 외부 의료진 식별자(empId 기반 doctorId) */
  doctorId: Maybe<Scalars['String']['output']>;
  /** 이메일 */
  email: Scalars['String']['output'];
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 자문의 레코드 ID */
  id: Scalars['ID']['output'];
  /** 활성 여부 */
  isActive: Scalars['Boolean']['output'];
  /** 이름 */
  name: Scalars['String']['output'];
  /** 연락처 */
  phone: Maybe<Scalars['String']['output']>;
  /** 사진 URL */
  photoUrl: Maybe<Scalars['String']['output']>;
  /** 전문분야/소개문구 */
  specialty: Maybe<Scalars['String']['output']>;
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 관리자 로그인 입력 */
export type AdminLoginInput = {
  /** 로그인 대상 병원 코드 */
  hospitalCode: HospitalCode;
  /** 비밀번호 */
  password: Scalars['String']['input'];
  /** 아이디 */
  userId: Scalars['String']['input'];
};

/** 관리자 회원 수정 입력 */
export type AdminUpdateUserInput = {
  /** 이메일 */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 허용 IP (설정 시 해당 IP에서만 로그인 가능, 빈 문자열로 해제) */
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  /** 새 비밀번호 (8자 이상, 영문+숫자+특수문자) */
  password?: InputMaybe<Scalars['String']['input']>;
  /** 전화번호 */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** 상태 */
  status?: InputMaybe<UserStatus>;
  /** 이름 */
  userName?: InputMaybe<Scalars['String']['input']>;
  /** 사용자 유형 */
  userType?: InputMaybe<UserType>;
};

/** 관리자 회원 필터 */
export type AdminUserFilterInput = {
  /** 검색어 (아이디/이름/이메일) */
  search?: InputMaybe<Scalars['String']['input']>;
  /** 사용자 상태 */
  status?: InputMaybe<UserStatus>;
  /** 사용자 유형 */
  userType?: InputMaybe<UserType>;
};

/** 협력병의원 신청 입력 */
export type ApplyPartnerHospitalInput = {
  /** 가동 병상 수 */
  activeBedCount?: InputMaybe<Scalars['Int']['input']>;
  /** 첨부파일 메타데이터(JSON 배열) */
  attachments?: InputMaybe<Scalars['JSON']['input']>;
  /** 기본 처치 가능 항목(JSON) */
  availableTreatments?: InputMaybe<Scalars['JSON']['input']>;
  /** 엑시머레이저 가능 여부 */
  clinicHasExcimerLaser?: InputMaybe<Scalars['Boolean']['input']>;
  /** 혈액투석 가능 여부 */
  clinicHasHemodialysis?: InputMaybe<Scalars['Boolean']['input']>;
  /** 복막투석 가능 여부 */
  clinicHasPeritoneal?: InputMaybe<Scalars['Boolean']['input']>;
  /** 광선치료 가능 여부 */
  clinicHasPhototherapy?: InputMaybe<Scalars['Boolean']['input']>;
  /** 투약 유형 */
  clinicMedicationType?: InputMaybe<Scalars['String']['input']>;
  /** 진료과별 전문의 현황(JSON) */
  departmentSpecialists?: InputMaybe<Scalars['JSON']['input']>;
  /** 원장 생년월일 */
  directorBirthDate?: InputMaybe<Scalars['String']['input']>;
  /** 원장 차량번호 */
  directorCarNo?: InputMaybe<Scalars['String']['input']>;
  /** 원장 진료과 */
  directorDepartment?: InputMaybe<Scalars['String']['input']>;
  /** 원장 이메일 */
  directorEmail?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 수신 동의 */
  directorEmailConsent?: InputMaybe<Scalars['Boolean']['input']>;
  /** 원장 성별 */
  directorGender?: InputMaybe<Scalars['String']['input']>;
  /** 원장 졸업년도 */
  directorGraduationYear?: InputMaybe<Scalars['String']['input']>;
  /** 의사면허번호 */
  directorLicenseNo?: InputMaybe<Scalars['String']['input']>;
  /** 원장 성명 */
  directorName?: InputMaybe<Scalars['String']['input']>;
  /** 원장 휴대전화 */
  directorPhone?: InputMaybe<Scalars['String']['input']>;
  /** 회신서 수신 동의 */
  directorReplyConsent?: InputMaybe<Scalars['Boolean']['input']>;
  /** 원장 출신학교 */
  directorSchool?: InputMaybe<Scalars['String']['input']>;
  /** SMS 수신 동의 */
  directorSmsConsent?: InputMaybe<Scalars['Boolean']['input']>;
  /** 원장 세부전공 */
  directorSubSpecialty?: InputMaybe<Scalars['String']['input']>;
  /** 원장 수련병원 */
  directorTrainingHospital?: InputMaybe<Scalars['String']['input']>;
  /** 응급실 수 */
  erCount?: InputMaybe<Scalars['Int']['input']>;
  /** 인공신장실 운영 여부 */
  hasDialysisRoom?: InputMaybe<Scalars['Boolean']['input']>;
  /** 응급실 운영 여부 */
  hasEr?: InputMaybe<Scalars['Boolean']['input']>;
  /** 보호자 간병 운영 여부 */
  hasGuardianCare?: InputMaybe<Scalars['Boolean']['input']>;
  /** 호스피스 운영 여부 */
  hasHospice?: InputMaybe<Scalars['Boolean']['input']>;
  /** 중환자실 운영 여부 */
  hasIcu?: InputMaybe<Scalars['Boolean']['input']>;
  /** 간호간병통합서비스 운영 여부 */
  hasIntegratedNursing?: InputMaybe<Scalars['Boolean']['input']>;
  /** 수술실 운영 여부 */
  hasOperatingRoom?: InputMaybe<Scalars['Boolean']['input']>;
  /** 물리치료 가능 여부 */
  hasPhysicalTherapy?: InputMaybe<Scalars['Boolean']['input']>;
  /** 정신과 폐쇄병동 운영 여부 */
  hasPsychClosed?: InputMaybe<Scalars['Boolean']['input']>;
  /** 정신과 일반병동 운영 여부 */
  hasPsychGeneral?: InputMaybe<Scalars['Boolean']['input']>;
  /** 재활 격리치료 운영 여부 */
  hasRehabIsolation?: InputMaybe<Scalars['Boolean']['input']>;
  /** 재활 작업치료 운영 여부 */
  hasRehabOt?: InputMaybe<Scalars['Boolean']['input']>;
  /** 재활 물리치료 운영 여부 */
  hasRehabPt?: InputMaybe<Scalars['Boolean']['input']>;
  /** 재활 언어치료 운영 여부 */
  hasRehabSt?: InputMaybe<Scalars['Boolean']['input']>;
  /** 재활 연하치료 운영 여부 */
  hasRehabSwallow?: InputMaybe<Scalars['Boolean']['input']>;
  /** 공동 간병 운영 여부 */
  hasSharedCare?: InputMaybe<Scalars['Boolean']['input']>;
  /** 병원 주소 */
  hospitalAddress?: InputMaybe<Scalars['String']['input']>;
  /** 병원 상세주소 */
  hospitalAddressDetail?: InputMaybe<Scalars['String']['input']>;
  /** 신청 대상 병원 코드 */
  hospitalCode: HospitalCode;
  /** 병원 팩스번호 */
  hospitalFaxNumber?: InputMaybe<Scalars['String']['input']>;
  /** 병원명 */
  hospitalName?: InputMaybe<Scalars['String']['input']>;
  /** 요양기관번호 */
  hospitalPhisCode?: InputMaybe<Scalars['String']['input']>;
  /** 병원 대표전화 */
  hospitalPhone?: InputMaybe<Scalars['String']['input']>;
  /** 병원 홈페이지 */
  hospitalWebsite?: InputMaybe<Scalars['String']['input']>;
  /** 병원 우편번호 */
  hospitalZipCode?: InputMaybe<Scalars['String']['input']>;
  /** 중환자실 수 */
  icuCount?: InputMaybe<Scalars['Int']['input']>;
  /** 의료기관 유형 */
  institutionType?: InputMaybe<InstitutionType>;
  /** 원장 여부 */
  isDirector?: InputMaybe<Scalars['Boolean']['input']>;
  /** 격리 중 간병 유형 */
  isolationCareType?: InputMaybe<Scalars['String']['input']>;
  /** 격리 2인실 수 */
  isolationDoubleCount?: InputMaybe<Scalars['Int']['input']>;
  /** 격리 중 재활 유형 */
  isolationRehabType?: InputMaybe<Scalars['String']['input']>;
  /** 격리병실 수 */
  isolationRoomCount?: InputMaybe<Scalars['Int']['input']>;
  /** 격리 1인실 수 */
  isolationSingleCount?: InputMaybe<Scalars['Int']['input']>;
  /** 격리 3인실 수 */
  isolationTripleCount?: InputMaybe<Scalars['Int']['input']>;
  /** 격리 유형(JSON) */
  isolationTypes?: InputMaybe<Scalars['JSON']['input']>;
  /** 격리병상 운영 여부 */
  isolationWardOperation?: InputMaybe<Scalars['Boolean']['input']>;
  /** 주요 보유 장비 */
  majorEquipment?: InputMaybe<Scalars['String']['input']>;
  /** 진료과목/표방과목 */
  medicalDepartment?: InputMaybe<Scalars['String']['input']>;
  /** 다인실 수 */
  multiRoomCount?: InputMaybe<Scalars['Int']['input']>;
  /** 간호사 수 */
  nurseCount?: InputMaybe<Scalars['Int']['input']>;
  /** 신청 유형 */
  partnerType: PartnerType;
  /** 상급병실 수 */
  premiumRoomCount?: InputMaybe<Scalars['Int']['input']>;
  /** 병원 특성/비고 */
  remarks?: InputMaybe<Scalars['String']['input']>;
  /** 전문의 수 */
  specialistCount?: InputMaybe<Scalars['Int']['input']>;
  /** 실무자 부서/진료과 유형 */
  staffDeptType?: InputMaybe<Scalars['String']['input']>;
  /** 실무자 부서/진료과 값 */
  staffDeptValue?: InputMaybe<Scalars['String']['input']>;
  /** 실무자 이메일 */
  staffEmail?: InputMaybe<Scalars['String']['input']>;
  /** 실무자 성명 */
  staffName?: InputMaybe<Scalars['String']['input']>;
  /** 실무자 휴대전화 */
  staffPhone?: InputMaybe<Scalars['String']['input']>;
  /** 실무자 직급 */
  staffPosition?: InputMaybe<Scalars['String']['input']>;
  /** 실무자 유선전화 */
  staffTel?: InputMaybe<Scalars['String']['input']>;
  /** 총 병상 수 */
  totalBedCount?: InputMaybe<Scalars['Int']['input']>;
  /** 총 직원 수 */
  totalStaffCount?: InputMaybe<Scalars['Int']['input']>;
};

/** 영상검사 요청 승인 입력 */
export type ApproveImagingRequestInput = {
  /** 영상검사 요청 ID */
  imagingRequestId: Scalars['ID']['input'];
  /** 승인 메모 (선택사항) */
  memo?: InputMaybe<Scalars['String']['input']>;
};

/** 첨부파일 연결 대상 유형 */
export enum AttachmentEntityType {
  Banner = 'BANNER',
  Board = 'BOARD',
  Econsult = 'ECONSULT',
  ImagingRequest = 'IMAGING_REQUEST',
  Popup = 'POPUP',
  Profile = 'PROFILE'
}

/** 첨부파일 */
export type AttachmentModel = {
  __typename?: 'AttachmentModel';
  /** 생성일시 */
  createdAt: Maybe<Scalars['DateTime']['output']>;
  /** 다운로드 URL */
  downloadUrl: Maybe<Scalars['String']['output']>;
  /** 파일 크기 (bytes) */
  fileSize: Scalars['Int']['output'];
  /** 첨부파일 ID */
  id: Scalars['ID']['output'];
  /** MIME 타입 */
  mimeType: Scalars['String']['output'];
  /** 원본 파일명 */
  originalName: Scalars['String']['output'];
  /** 저장 경로 */
  storedPath: Scalars['String']['output'];
};

/** 감사 로그 액션 */
export enum AuditAction {
  /** 승인 */
  Approve = 'APPROVE',
  /** 생성 */
  Create = 'CREATE',
  /** 삭제 */
  Delete = 'DELETE',
  /** 로그인 */
  Login = 'LOGIN',
  /** 로그아웃 */
  Logout = 'LOGOUT',
  /** 거부 */
  Reject = 'REJECT',
  /** 수정 */
  Update = 'UPDATE'
}

/** 감사 로그 필터 */
export type AuditLogFilterInput = {
  /** 액션 유형 */
  action?: InputMaybe<AuditAction>;
  /** 관리자명 */
  adminName?: InputMaybe<Scalars['String']['input']>;
  /** 관리자번호(로그인 ID) */
  adminNumber?: InputMaybe<Scalars['String']['input']>;
  /** 시작일 */
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  /** 종료일 */
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
  /** 로그명(target) 검색어 */
  logName?: InputMaybe<Scalars['String']['input']>;
  /** 사용자 ID */
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** 감사 로그 */
export type AuditLogModel = {
  __typename?: 'AuditLogModel';
  /** 액션 */
  action: AuditAction;
  /** 관리자명 */
  adminName: Maybe<Scalars['String']['output']>;
  /** 관리자번호(로그인 ID) */
  adminNumber: Maybe<Scalars['String']['output']>;
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 상세 내용 */
  detail: Maybe<Scalars['String']['output']>;
  /** 병원 코드 */
  hospitalCode: Maybe<HospitalCode>;
  /** 로그 ID */
  id: Scalars['ID']['output'];
  /** IP 주소 */
  ipAddress: Maybe<Scalars['String']['output']>;
  /** 권한그룹과 연결된 관리자 등록/수정 내역 */
  permissionMemberHistories: Maybe<Array<Maybe<PermissionAuditMemberHistoryModel>>>;
  /** 권한그룹과 연결된 메뉴 등록/수정 내역 */
  permissionMenuHistories: Maybe<Array<Maybe<PermissionAuditMenuHistoryModel>>>;
  /** 대상 */
  target: Scalars['String']['output'];
  /** 사용자 ID */
  userId: Maybe<Scalars['String']['output']>;
};

/** 인증 응답 */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  /** JWT 액세스 토큰 (15분 유효) */
  accessToken: Scalars['String']['output'];
  /** 비밀번호 변경 필요 여부 (마이그레이션 회원) */
  mustChangePw: Scalars['Boolean']['output'];
  /** JWT 리프레시 토큰 (7일 유효) */
  refreshToken: Scalars['String']['output'];
  /** 사용자 정보 */
  user: User;
};

/** 게시글 첨부파일 메타데이터 */
export type BoardAttachmentInput = {
  /** MIME 타입 */
  mimeType?: InputMaybe<Scalars['String']['input']>;
  /** 원본 파일명 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 파일 크기(bytes) */
  size?: InputMaybe<Scalars['Int']['input']>;
  /** 업로드 후 반환된 파일 URL */
  url: Scalars['String']['input'];
};

/** 게시판 게시글 */
export type BoardPost = {
  __typename?: 'BoardPost';
  /** 작성자 ID */
  authorId: Scalars['String']['output'];
  /** 게시판 아이디 */
  boardId: Scalars['String']['output'];
  /** 내용 */
  content: Scalars['String']['output'];
  /** 작성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 행사 종료일 (EVENT 유형) */
  endDate: Maybe<Scalars['DateTime']['output']>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 고유 ID */
  id: Scalars['ID']['output'];
  /** 삭제 여부 */
  isDeleted: Scalars['Boolean']['output'];
  /** 상단 고정 여부 */
  isPinned: Scalars['Boolean']['output'];
  /** 상위 게시글 ID (답글용) */
  parentId: Maybe<Scalars['String']['output']>;
  /** 행사 시작일 (EVENT 유형) */
  startDate: Maybe<Scalars['DateTime']['output']>;
  /** 썸네일 URL (EVENT 유형) */
  thumbnailUrl: Maybe<Scalars['String']['output']>;
  /** 제목 */
  title: Scalars['String']['output'];
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
  /** 조회수 */
  viewCount: Scalars['Int']['output'];
};

/** 게시판 설정 */
export type BoardSettingModel = {
  __typename?: 'BoardSettingModel';
  /** 첨부파일 사용 여부 */
  allowAttachments: Scalars['Boolean']['output'];
  /** 게시판 아이디(병원 내 고유) */
  boardId: Scalars['String']['output'];
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 게시판 설명(관리자 메모) */
  description: Maybe<Scalars['String']['output']>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 설정 ID */
  id: Scalars['ID']['output'];
  /** 게시판명 */
  name: Scalars['String']['output'];
  /** 게시판 템플릿 유형 */
  templateType: BoardTemplateType;
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 게시판 템플릿 유형 */
export enum BoardTemplateType {
  /** 기본형 */
  Basic = 'BASIC',
  /** 썸네일형 */
  Thumbnail = 'THUMBNAIL'
}

/** 게시판 유형 */
export enum BoardType {
  /** 상담 */
  Consult = 'CONSULT',
  /** 교육/행사 */
  Event = 'EVENT',
  /** 자유게시판 */
  Free = 'FREE',
  /** 뉴스 */
  News = 'NEWS',
  /** 공지사항 */
  Notice = 'NOTICE',
  /** 학술 */
  Study = 'STUDY'
}

export type CccUserModel = {
  __typename?: 'CccUserModel';
  abrvDprtCd: Maybe<Scalars['String']['output']>;
  bsplNm: Maybe<Scalars['String']['output']>;
  dprtCd: Scalars['String']['output'];
  dprtNm: Scalars['String']['output'];
  hsptCd: Scalars['String']['output'];
  hsptNm: Scalars['String']['output'];
  ocfmDetlNm: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  userLcnsNo: Maybe<Scalars['String']['output']>;
  userNm: Scalars['String']['output'];
};

/** 비밀번호 변경 입력 */
export type ChangePasswordInput = {
  /** 새 비밀번호 (8자 이상, 영문+숫자+특수문자) */
  newPassword: Scalars['String']['input'];
  /** 현재 비밀번호 */
  oldPassword: Scalars['String']['input'];
};

/** EHR 의사정보 존재여부 확인 입력 */
export type CheckDoctorExistsInput = {
  /** 의사구분 (DOCTOR=양방/1, ORIENTAL_DOCTOR=한방/2, DENTIST=치방/3) */
  doctorType?: InputMaybe<DoctorType>;
  /** 면허번호 */
  drlcNo: Scalars['String']['input'];
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 의사명 */
  userNm?: InputMaybe<Scalars['String']['input']>;
};

/** EHR 병원정보 존재여부 확인 입력 */
export type CheckHospitalExistsInput = {
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 요양기관번호 */
  rcisNo: Scalars['String']['input'];
};

/** 아이디 중복확인 결과 (우리 DB + EHR 동시 체크) */
export type CheckUserIdResult = {
  __typename?: 'CheckUserIdResult';
  /** 사용 가능 여부 (둘 다 통과해야 true) */
  available: Scalars['Boolean']['output'];
  /** 우리 DB에 동일 아이디 존재 여부 (true=이미 존재) */
  existsInDb: Scalars['Boolean']['output'];
  /** EHR에 동일 아이디 기가입 여부 (true=이미 존재) */
  existsInEhr: Scalars['Boolean']['output'];
};

/** 협력병원 상세정보 */
export type CollaboratingHospitalDetail = {
  __typename?: 'CollaboratingHospitalDetail';
  /** 주소 */
  address: Maybe<Scalars['String']['output']>;
  /** 상세주소 */
  addressDetail: Maybe<Scalars['String']['output']>;
  /** 요양기관번호 */
  careInstitutionNo: Maybe<Scalars['String']['output']>;
  /** 병원분류코드 (30:병원, 50:의원, 80:무분류) */
  classificationCode: Maybe<Scalars['String']['output']>;
  /** 협력계약일 */
  collaborationContractDate: Maybe<Scalars['String']['output']>;
  /** 협력구분코드 (N:초기, A:협력병원, B:협력의원) */
  collaborationDivisionCode: Maybe<Scalars['String']['output']>;
  /** 협력요청일 */
  collaborationRequestDate: Maybe<Scalars['String']['output']>;
  /** 담당자 이메일 */
  contactEmail: Maybe<Scalars['String']['output']>;
  /** 담당자명 */
  contactName: Maybe<Scalars['String']['output']>;
  /** 담당자 직급 */
  contactOccupation: Maybe<Scalars['String']['output']>;
  /** 담당자 전화번호 (휴대폰) */
  contactPhone: Maybe<Scalars['String']['output']>;
  /** 대표원장 생년월일 */
  directorBirthDate: Maybe<Scalars['String']['output']>;
  /** 대표원장 차량번호 */
  directorCarNo: Maybe<Scalars['String']['output']>;
  /** 대표원장 진료과 */
  directorDepartment: Maybe<Scalars['String']['output']>;
  /** 대표원장 이메일 */
  directorEmail: Maybe<Scalars['String']['output']>;
  /** 이메일 수신동의 (Y/N) */
  directorEmailConsent: Maybe<Scalars['String']['output']>;
  /** 대표원장 성별 */
  directorGender: Maybe<Scalars['String']['output']>;
  /** 대표원장 졸업년도 */
  directorGraduationYear: Maybe<Scalars['String']['output']>;
  /** 대표원장 면허번호 */
  directorLicenseNo: Maybe<Scalars['String']['output']>;
  /** 대표원장 휴대전화 */
  directorPhone: Maybe<Scalars['String']['output']>;
  /** 회신서 수신동의 (Y/N) */
  directorReplyConsent: Maybe<Scalars['String']['output']>;
  /** 대표원장 출신대학 */
  directorSchool: Maybe<Scalars['String']['output']>;
  /** SMS 수신동의 (Y/N) */
  directorSmsConsent: Maybe<Scalars['String']['output']>;
  /** 대표원장 세부전공 */
  directorSubSpecialty: Maybe<Scalars['String']['output']>;
  /** 대표원장 수련병원 */
  directorTrainingHospital: Maybe<Scalars['String']['output']>;
  /** 응급실 가용병상수 */
  emergencyBeds: Maybe<Scalars['String']['output']>;
  /** 총 직원수 */
  employeeCount: Maybe<Scalars['String']['output']>;
  /** 장비현황 */
  equipment: Maybe<Scalars['String']['output']>;
  /** 팩스번호 */
  fax: Maybe<Scalars['String']['output']>;
  /** 허가병상수 */
  licensedBeds: Maybe<Scalars['String']['output']>;
  /** 진료과목 */
  medicalSubjects: Maybe<Scalars['String']['output']>;
  /** 병원명 */
  name: Maybe<Scalars['String']['output']>;
  /** 간호사수 */
  nurseCount: Maybe<Scalars['String']['output']>;
  /** 운영병상수 */
  operatingBeds: Maybe<Scalars['String']['output']>;
  /** 전화번호 */
  phone: Maybe<Scalars['String']['output']>;
  /** 병원 특성 및 기타 사항 */
  remark: Maybe<Scalars['String']['output']>;
  /** 대표자명 (병원장) */
  representative: Maybe<Scalars['String']['output']>;
  /** 회송가능 진료과목 */
  returnableMedicalSubjects: Maybe<Scalars['String']['output']>;
  /** 의사수 */
  specialistCount: Maybe<Scalars['String']['output']>;
  /** 담당자 부서구분 (B:부서, A:진료과) */
  staffDeptType: Maybe<Scalars['String']['output']>;
  /** 담당자 부서 공통코드 */
  staffDeptValue: Maybe<Scalars['String']['output']>;
  /** 담당자 내선번호 */
  staffTel: Maybe<Scalars['String']['output']>;
  /** 홈페이지 */
  website: Maybe<Scalars['String']['output']>;
  /** 우편번호 */
  zipCode: Maybe<Scalars['String']['output']>;
};

/** NICE 본인인증 결과 조회 입력 */
export type CompleteVerificationInput = {
  /** 세션 식별자 (initiateVerification에서 받은 값) */
  sessionId: Scalars['String']['input'];
  /** NICE 콜백에서 받은 web_transaction_id */
  webTransactionId: Scalars['String']['input'];
};

export type ConsultantInfoModel = {
  __typename?: 'ConsultantInfoModel';
  departmentCode: Maybe<Scalars['String']['output']>;
  departmentName: Maybe<Scalars['String']['output']>;
  doctorId: Maybe<Scalars['String']['output']>;
  hospitalCode: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ConsultantLoginInput = {
  hospitalCode: Scalars['String']['input'];
  loginId: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ConsultantLoginResponse = {
  __typename?: 'ConsultantLoginResponse';
  accessToken: Scalars['String']['output'];
  cccUser: CccUserModel;
  consultant: ConsultantInfoModel;
};

/** 정적 콘텐츠 */
export type Content = {
  __typename?: 'Content';
  /** 본문 */
  body: Scalars['String']['output'];
  /** 콘텐츠 그룹 ID */
  contentGroupId: Maybe<Scalars['String']['output']>;
  /** 콘텐츠 그룹명 */
  contentGroupName: Maybe<Scalars['String']['output']>;
  /** 생성 일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 고유 ID */
  id: Scalars['ID']['output'];
  /** 제목 */
  title: Scalars['String']['output'];
  /** 수정 일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 콘텐츠 그룹 */
export type ContentGroupModel = {
  __typename?: 'ContentGroupModel';
  /** 연결된 콘텐츠 개수 */
  contentCount: Scalars['Int']['output'];
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 그룹 ID */
  id: Scalars['ID']['output'];
  /** 그룹명 */
  name: Scalars['String']['output'];
  /** 정렬순서 */
  sortOrder: Scalars['Int']['output'];
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 게시글 생성 입력 */
export type CreateBoardPostInput = {
  /** 첨부파일 목록 */
  attachments?: InputMaybe<Array<BoardAttachmentInput>>;
  /** 게시판 아이디 */
  boardId: Scalars['String']['input'];
  /** 내용 */
  content: Scalars['String']['input'];
  /** 행사 종료일 (EVENT 유형) */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 상단 고정 여부 */
  isPinned?: InputMaybe<Scalars['Boolean']['input']>;
  /** 행사 시작일 (EVENT 유형) */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** 썸네일 URL (EVENT 유형) */
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  /** 제목 */
  title: Scalars['String']['input'];
};

/** 게시판 설정 생성 입력 */
export type CreateBoardSettingInput = {
  /** 첨부파일 사용 여부 */
  allowAttachments?: InputMaybe<Scalars['Boolean']['input']>;
  /** 게시판 설명(관리자 메모, 200자 이내) */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 게시판명 */
  name: Scalars['String']['input'];
  /** 게시판 템플릿 유형 */
  templateType?: InputMaybe<BoardTemplateType>;
};

/** 콘텐츠 그룹 생성 입력 */
export type CreateContentGroupInput = {
  /** 그룹명 */
  name: Scalars['String']['input'];
  /** 정렬순서 */
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

/** 콘텐츠 생성 입력 */
export type CreateContentInput = {
  /** 본문 */
  body: Scalars['String']['input'];
  /** 콘텐츠 그룹 ID */
  contentGroupId?: InputMaybe<Scalars['String']['input']>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 제목 */
  title: Scalars['String']['input'];
};

/** 의료진 생성 입력 */
export type CreateDoctorInput = {
  /** 진료과 */
  department?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 소속 병원 */
  hospitalCode: HospitalCode;
  /** 면허번호 */
  licenseNo?: InputMaybe<Scalars['String']['input']>;
  /** 이름(미입력시 기존값 유지) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 연락처 */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** 전문분야 */
  specialty?: InputMaybe<Scalars['String']['input']>;
  /** 회원 상태(미입력시 ACTIVE) */
  status?: InputMaybe<UserStatus>;
  /** 기존 회원 로그인 아이디 */
  userId: Scalars['String']['input'];
};

/** eConsult 신청 입력 */
export type CreateEConsultInput = {
  /** 자문의 레코드 ID 또는 doctorId */
  consultantId: Scalars['String']['input'];
  /** 상담 내용 */
  content: Scalars['String']['input'];
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 상담 제목 */
  title: Scalars['String']['input'];
};

/** 영상검사 요청 신청 입력 */
export type CreateImagingRequestInput = {
  /** 검사일자 (YYYYMMDD 형식) */
  examDate: Scalars['String']['input'];
  /** 검사 구분 (기본값: RADIOLOGY) */
  examType?: InputMaybe<ImagingExamType>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 처방코드 (외부 EHR 기준) */
  orderCode: Scalars['String']['input'];
  /** PACS 접근번호 (선택사항) */
  pacsAccessNo?: InputMaybe<Scalars['String']['input']>;
  /** 환자번호 (외부 EHR 기준) */
  ptntNo: Scalars['String']['input'];
  /** 의뢰일련번호 (회신환자정보 조회용) */
  refrSno?: InputMaybe<Scalars['String']['input']>;
  /** 의뢰일자 (YYYYMMDD 형식) */
  refrYmd?: InputMaybe<Scalars['String']['input']>;
};

/** 메뉴 생성 입력 */
export type CreateMenuInput = {
  /** 외부 링크 URL */
  externalUrl?: InputMaybe<Scalars['String']['input']>;
  /** GNB 노출 여부 */
  gnbExposure?: InputMaybe<Scalars['Boolean']['input']>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 아이콘명 */
  iconName?: InputMaybe<Scalars['String']['input']>;
  /** 메뉴 타깃 유형 */
  menuTargetType?: InputMaybe<MenuTargetType>;
  /** 메뉴 유형 */
  menuType: MenuType;
  /** 메뉴명 */
  name: Scalars['String']['input'];
  /** 상위 메뉴 ID */
  parentId?: InputMaybe<Scalars['String']['input']>;
  /** 경로 */
  path?: InputMaybe<Scalars['String']['input']>;
  /** 정렬순서 */
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  /** 연결할 게시판 ID */
  targetBoardId?: InputMaybe<Scalars['String']['input']>;
  /** 연결할 게시판 유형 */
  targetBoardType?: InputMaybe<BoardType>;
  /** 연결할 콘텐츠 ID */
  targetContentId?: InputMaybe<Scalars['String']['input']>;
};

/** 메뉴 권한 그룹 생성 입력 */
export type CreateMenuPermissionGroupInput = {
  /** 그룹명 */
  name: Scalars['String']['input'];
};

/** 팝업/배너 생성 입력 */
export type CreatePopupInput = {
  /** 이미지 대체 텍스트 (alt) — 메인배너 전용 */
  altText?: InputMaybe<Scalars['String']['input']>;
  /** 상시노출 여부 */
  alwaysVisible?: InputMaybe<Scalars['Boolean']['input']>;
  /** 종료일 (상시노출이면 생략 가능) */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** PC 이미지 URL (다크모드) — 메인배너 전용 */
  imageDarkUrl?: InputMaybe<Scalars['String']['input']>;
  /** PC 이미지 URL (라이트모드) */
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  /** 활성 여부 */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** 연결 링크 URL */
  linkUrl?: InputMaybe<Scalars['String']['input']>;
  /** 메인 슬로건 (최대 30자) — 메인배너 전용 */
  mainSlogan?: InputMaybe<Scalars['String']['input']>;
  /** 미디어 타입 (IMAGE | VIDEO) — 메인배너 전용 */
  mediaType?: InputMaybe<Scalars['String']['input']>;
  /** 모바일 이미지 URL (다크모드) — 메인배너 전용 */
  mobileDarkImageUrl?: InputMaybe<Scalars['String']['input']>;
  /** 모바일 이미지 URL (라이트모드) — 메인배너 전용 */
  mobileImageUrl?: InputMaybe<Scalars['String']['input']>;
  /** 팝업 유형 (POPUP | MINI_BANNER | SLIDE_BANNER) */
  popupType: PopupType;
  /** 정렬순서 */
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  /** 시작일 (상시노출이면 생략 가능) */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** 서브 슬로건/부제 (최대 30자) — 메인배너 전용 */
  subSlogan?: InputMaybe<Scalars['String']['input']>;
  /** 새 창 열기 여부 */
  targetBlank?: InputMaybe<Scalars['Boolean']['input']>;
  /** 영상 URL — 메인배너 전용 */
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};

/** e-Consult 자문의 지정 입력 */
export type DesignateEconsultConsultantInput = {
  /** 외부 의료진 식별자(empId 기반 doctorId) */
  doctorId: Scalars['String']['input'];
  /** 의료진 번호(drNo) - 단건 조회 최적화용 */
  drNo?: InputMaybe<Scalars['String']['input']>;
  /** 자문의 이메일 */
  email: Scalars['String']['input'];
  /** 병원 코드 */
  hospitalCode: HospitalCode;
};

/** 의사 (자문의) */
export type DoctorModel = {
  __typename?: 'DoctorModel';
  /** 진료과 */
  department: Maybe<Scalars['String']['output']>;
  /** 외부 의료진 식별자(empId 기반 doctorId) */
  doctorId: Maybe<Scalars['String']['output']>;
  /** 의료진 번호 (drNo) */
  drNo: Maybe<Scalars['String']['output']>;
  /** 이메일 */
  email: Maybe<Scalars['String']['output']>;
  /** 소속 병원 */
  hospitalCode: Maybe<HospitalCode>;
  /** 고유 ID */
  id: Scalars['ID']['output'];
  /** 활성 여부 */
  isActive: Scalars['Boolean']['output'];
  /** 면허번호 */
  licenseNo: Maybe<Scalars['String']['output']>;
  /** 의사 이름 */
  name: Scalars['String']['output'];
  /** 전화번호 */
  phone: Maybe<Scalars['String']['output']>;
  /** 프로필 사진 URL */
  photoUrl: Maybe<Scalars['String']['output']>;
  /** 정렬 순서 */
  sortOrder: Scalars['Int']['output'];
  /** 전문분야 */
  specialty: Maybe<Scalars['String']['output']>;
};

/** 의사 세부 유형 (EHR 의사구분코드) */
export enum DoctorType {
  /** 치과의사/치방 */
  Dentist = 'DENTIST',
  /** 의사/양방 */
  Doctor = 'DOCTOR',
  /** 한의사/한방 */
  OrientalDoctor = 'ORIENTAL_DOCTOR'
}

export type DrugOrderDetailItem = {
  __typename?: 'DrugOrderDetailItem';
  /** 약품설명 (dtlsCtn) */
  description: Maybe<Scalars['String']['output']>;
  /** 약품코드 (mdprCd) */
  drugCode: Maybe<Scalars['String']['output']>;
  /** 약품명 (mdprNm) */
  drugName: Maybe<Scalars['String']['output']>;
  /** 약종코드 (mdprClsfDetlCd) */
  drugType: Maybe<Scalars['String']['output']>;
  /** 약종명 (detlCdNm) */
  drugTypeName: Maybe<Scalars['String']['output']>;
  /** 성분 (ingrNm) */
  ingredient: Maybe<Scalars['String']['output']>;
  /** 제조회사 (rstcCmpnNm) */
  manufacturer: Maybe<Scalars['String']['output']>;
  /** 한글 제품명 (kornPdctNm) */
  prodName: Maybe<Scalars['String']['output']>;
  /** 단위 (invnPcunCd) */
  unit: Maybe<Scalars['String']['output']>;
};

/** EHR 약품 상세 조회 입력 - 약품코드 */
export type DrugOrderDetailQueryInput = {
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 약품코드 (mdprCd = ordrCd) */
  ordrCd: Scalars['String']['input'];
};

export type DrugOrderDetailResponse = {
  __typename?: 'DrugOrderDetailResponse';
  item: Maybe<DrugOrderDetailItem>;
};

export type DrugOrderItem = {
  __typename?: 'DrugOrderItem';
  /** 1회투여횟수 (ntm) */
  count: Maybe<Scalars['String']['output']>;
  /** 일수 (daysCnt) */
  days: Maybe<Scalars['String']['output']>;
  /** 진료과 (kornDprtNm/mcdpNm) */
  departmentName: Maybe<Scalars['String']['output']>;
  /** 진료의 (mddrNm) */
  doctorName: Maybe<Scalars['String']['output']>;
  /** 용량 (dosqVl) */
  dosage: Maybe<Scalars['String']['output']>;
  /** 1회투여량 (admnQty) */
  dose: Maybe<Scalars['String']['output']>;
  /** 용량단위 (doseUnitNm) */
  doseUnit: Maybe<Scalars['String']['output']>;
  /** 투여횟수 (frqcVl) */
  frequency: Maybe<Scalars['String']['output']>;
  /** 자문의 여부 */
  isConsultant: Maybe<Scalars['Boolean']['output']>;
  /** 복용방법 (envlMemoCtn1/2) */
  methodHow: Maybe<Scalars['String']['output']>;
  /** 복용시간 (tkmdInftDrusCtn) */
  methodWhen: Maybe<Scalars['String']['output']>;
  /** 약품코드 (ordrCd) */
  orderCode: Maybe<Scalars['String']['output']>;
  /** 처방일자 YYYYMMDD (ordrYmd) */
  orderDate: Maybe<Scalars['String']['output']>;
  /** 약품명 (ordrNm) */
  orderName: Maybe<Scalars['String']['output']>;
  /** 1회용량 (totlVlm) */
  totalAmount: Maybe<Scalars['String']['output']>;
  /** 약종 (detlCdNm) */
  type: Maybe<Scalars['String']['output']>;
  /** 단위 (icunCd) */
  unit: Maybe<Scalars['String']['output']>;
  /** 용법 (usagCtn) */
  usage: Maybe<Scalars['String']['output']>;
  /** 사용일 (ddcn) */
  useDay: Maybe<Scalars['String']['output']>;
  /** 진료일 (mdcrDt) */
  visitDate: Maybe<Scalars['String']['output']>;
};

/** EHR 약처방 조회 입력 - 환자번호 기반 (진료일/진료과 선택) */
export type DrugOrderQueryInput = {
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 진료과 코드 - 선택 */
  mcdpCd?: InputMaybe<Scalars['String']['input']>;
  /** 진료일 (YYYYMMDD) - 선택 */
  mdcrDt?: InputMaybe<Scalars['String']['input']>;
  /** 환자번호 */
  ptntNo: Scalars['String']['input'];
};

export type DrugOrderResponse = {
  __typename?: 'DrugOrderResponse';
  items: Array<DrugOrderItem>;
  totalCount: Scalars['Float']['output'];
};

/** eConsult 필터 입력 */
export type EConsultFilterInput = {
  /** 자문의 진료과 (부분 일치) */
  consultantDepartment?: InputMaybe<Scalars['String']['input']>;
  /** 자문의 이름 (부분 일치) */
  consultantName?: InputMaybe<Scalars['String']['input']>;
  /** 병원 코드 필터 */
  hospitalCode?: InputMaybe<HospitalCode>;
  /** 신청자 이메일 (부분 일치) */
  requesterEmail?: InputMaybe<Scalars['String']['input']>;
  /** 의료기관명 (부분 일치) */
  requesterHospitalName?: InputMaybe<Scalars['String']['input']>;
  /** 신청자명 (부분 일치) */
  requesterName?: InputMaybe<Scalars['String']['input']>;
  /** 상담 상태 필터 (답변여부) */
  status?: InputMaybe<EConsultStatus>;
  /** e-Consult 제목 (부분 일치) */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** eConsult (온라인 진료상담) */
export type EConsultModel = {
  __typename?: 'EConsultModel';
  /** 답변일시 */
  answeredAt: Maybe<Scalars['DateTime']['output']>;
  /** 자문의 */
  consultant: Maybe<DoctorModel>;
  /** 자문의 레코드 ID */
  consultantId: Scalars['String']['output'];
  /** 상담 내용 */
  content: Scalars['String']['output'];
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 유효기간 만료일시 */
  expiresAt: Scalars['DateTime']['output'];
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 고유 ID */
  id: Scalars['ID']['output'];
  /** 답변 */
  reply: Maybe<EConsultReplyModel>;
  /** 신청자 */
  requester: Maybe<User>;
  /** 신청자 ID */
  requesterId: Scalars['String']['output'];
  /** 상담 상태 */
  status: EConsultStatus;
  /** 상담 제목 */
  title: Scalars['String']['output'];
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** eConsult 답변 */
export type EConsultReplyModel = {
  __typename?: 'EConsultReplyModel';
  /** 답변 내용 */
  content: Scalars['String']['output'];
  /** 답변일시 */
  createdAt: Scalars['DateTime']['output'];
  /** eConsult ID */
  econsultId: Scalars['String']['output'];
  /** 고유 ID */
  id: Scalars['ID']['output'];
  /** 답변자 */
  repliedBy: Maybe<User>;
  /** 답변자 ID */
  repliedById: Scalars['String']['output'];
};

/** eConsult 상태 */
export enum EConsultStatus {
  /** 답변 완료 */
  Answered = 'ANSWERED',
  /** 유효기간 만료 */
  Expired = 'EXPIRED',
  /** 답변 대기 */
  Pending = 'PENDING'
}

/** EHR 존재여부 확인 결과 */
export type EhrCheckResult = {
  __typename?: 'EhrCheckResult';
  /** 존재 여부 */
  exists: Scalars['Boolean']['output'];
  /** EHR 원본 응답 (JSON 문자열) */
  rawResponse: Maybe<Scalars['String']['output']>;
};

/** EHR에서 조회된 의사 데이터 — rawResponse 파싱 결과 */
export type EhrDoctorData = {
  __typename?: 'EhrDoctorData';
  /** 생년월일 (YYYYMMDD 형식) */
  birthDate: Maybe<Scalars['String']['output']>;
  /** 진료과코드 */
  departmentCode: Maybe<Scalars['String']['output']>;
  /** 성별코드 (M/F) */
  gender: Maybe<Scalars['String']['output']>;
  /** 졸업년도 */
  graduationYear: Maybe<Scalars['String']['output']>;
  /** 면허번호 */
  licenseNo: Maybe<Scalars['String']['output']>;
  /** 수련병원명 */
  trainingHospital: Maybe<Scalars['String']['output']>;
  /** 출신대학코드 */
  universityCode: Maybe<Scalars['String']['output']>;
  /** 의사명 */
  userName: Scalars['String']['output'];
};

/** EHR 존재여부 확인 결과 (약처방/검사결과 등) */
export type EhrExistsResult = {
  __typename?: 'EhrExistsResult';
  /** 존재 여부 */
  exists: Scalars['Boolean']['output'];
};

/** EHR 등록 결과 */
export type EhrRegisterResult = {
  __typename?: 'EhrRegisterResult';
  /** 결과 메시지 */
  message: Maybe<Scalars['String']['output']>;
  /** EHR 원본 응답 (JSON 문자열) */
  rawResponse: Maybe<Scalars['String']['output']>;
  /** 등록 성공 여부 */
  success: Scalars['Boolean']['output'];
};

export type EmailTestResult = {
  __typename?: 'EmailTestResult';
  errorMessage: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

/** Enum 정보 */
export type EnumInfo = {
  __typename?: 'EnumInfo';
  /** Enum 설명 */
  description: Scalars['String']['output'];
  /** Enum 이름 (예: HospitalCode, UserType) */
  name: Scalars['String']['output'];
  /** Enum 값 목록 */
  values: Array<EnumValue>;
};

/** Enum 개별 값 */
export type EnumValue = {
  __typename?: 'EnumValue';
  /** 값 (예: ANAM, PENDING) */
  key: Scalars['String']['output'];
  /** 한글 설명 (예: 안암병원, 승인대기) */
  label: Scalars['String']['output'];
};

/** 검사결과 항목 */
export type ExamResultItem = {
  __typename?: 'ExamResultItem';
  /** 진료과명 */
  departmentName: Maybe<Scalars['String']['output']>;
  /** 진료의명 */
  doctorName: Maybe<Scalars['String']['output']>;
  /** 검사코드 */
  examCode: Maybe<Scalars['String']['output']>;
  /** 검사일자 */
  examDate: Maybe<Scalars['String']['output']>;
  /** 검사실코드 */
  examRoomCode: Maybe<Scalars['String']['output']>;
  /** 검사실명 */
  examRoomName: Maybe<Scalars['String']['output']>;
  /** 자문의 여부 */
  isConsultant: Maybe<Scalars['Boolean']['output']>;
  /** 정상범위 하한값 */
  normalLowerLimit: Maybe<Scalars['String']['output']>;
  /** 정상범위 상한값 */
  normalUpperLimit: Maybe<Scalars['String']['output']>;
  /** 처방명 */
  orderName: Maybe<Scalars['String']['output']>;
  /** 결과내용 */
  resultContent: Maybe<Scalars['String']['output']>;
  /** 결과포맷코드 */
  resultFormatCode: Maybe<Scalars['String']['output']>;
  /** 결과 비고 */
  resultRemark: Maybe<Scalars['String']['output']>;
  /** 결과단위 */
  resultUnit: Maybe<Scalars['String']['output']>;
};

/** 검사결과 조회 결과 */
export type ExamResultResponse = {
  __typename?: 'ExamResultResponse';
  /** 검사결과 목록 */
  items: Array<ExamResultItem>;
  /** 총 건수 */
  totalCount: Scalars['Float']['output'];
};

/** SLIP(처방전) 항목 */
export type ExamSlipItem = {
  __typename?: 'ExamSlipItem';
  /** 진료과코드 */
  departmentCode: Maybe<Scalars['String']['output']>;
  /** 진료과명 */
  departmentName: Maybe<Scalars['String']['output']>;
  /** 진료의 ID */
  doctorId: Maybe<Scalars['String']['output']>;
  /** 진료의명 */
  doctorName: Maybe<Scalars['String']['output']>;
  /** 시행일자 */
  enforceDate: Maybe<Scalars['String']['output']>;
  /** 시행일시 */
  enforceDatetime: Maybe<Scalars['String']['output']>;
  /** 검사코드 */
  examCode: Maybe<Scalars['String']['output']>;
  /** 자문의 여부 */
  isConsultant: Maybe<Scalars['Boolean']['output']>;
  /** 처방명 */
  orderName: Maybe<Scalars['String']['output']>;
  /** SLIP 코드 */
  slipCode: Maybe<Scalars['String']['output']>;
  /** SLIP 명 */
  slipName: Maybe<Scalars['String']['output']>;
  /** 진료일자 */
  treatmentDate: Maybe<Scalars['String']['output']>;
};

/** EHR 검사 SLIP 조회 입력 - 환자번호 + slipCd + 진료과 */
export type ExamSlipQueryInput = {
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 진료과 코드 */
  mcdpCd?: InputMaybe<Scalars['String']['input']>;
  /** 환자번호 */
  ptntNo: Scalars['String']['input'];
  /** SLIP 코드 */
  slipCd: Scalars['String']['input'];
};

/** SLIP 조회 결과 */
export type ExamSlipResponse = {
  __typename?: 'ExamSlipResponse';
  /** SLIP 목록 */
  items: Array<ExamSlipItem>;
  /** 총 건수 */
  totalCount: Scalars['Float']['output'];
};

/** 본인인증 기반 아이디 찾기 입력 */
export type FindUserIdByVerificationInput = {
  /** 본인인증 확인 토큰 (completeVerification에서 발급) */
  verificationToken: Scalars['String']['input'];
};

/** 아이디 찾기 입력 */
export type FindUserIdInput = {
  /** 이메일 */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 휴대폰 번호 */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  userName: Scalars['String']['input'];
};

/** 아이디 찾기 결과 */
export type FindUserIdPayload = {
  __typename?: 'FindUserIdPayload';
  /** 마스킹된 아이디 (예: te***d) */
  maskedUserId: Scalars['String']['output'];
};

/** 성별 */
export enum Gender {
  /** 여성 */
  F = 'F',
  /** 남성 */
  M = 'M'
}

/** EHR 협력병원 상세정보 조회 입력 - 요양기관번호로 조회 */
export type GetCollaboratingHospitalInfoInput = {
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 요양기관번호 */
  rcisNo?: InputMaybe<Scalars['String']['input']>;
};

/** 병원 게시글 */
export type HospitalArticle = {
  __typename?: 'HospitalArticle';
  /** 게시글 번호 */
  articleNo: Scalars['Int']['output'];
  /** 카테고리 */
  category: Maybe<Scalars['String']['output']>;
  /** 작성일 (ISO 8601) */
  createdDt: Scalars['String']['output'];
  /** 병원명 (예: 고대안암병원) */
  hospitalName: Scalars['String']['output'];
  /** 링크 URL (YouTube 등) */
  linkUrl: Maybe<Scalars['String']['output']>;
  /** 썸네일 이미지 URL */
  thumbnailUrl: Maybe<Scalars['String']['output']>;
  /** 제목 */
  title: Scalars['String']['output'];
  /** 작성자 */
  writer: Scalars['String']['output'];
};

/** 병원 게시글 목록 응답 */
export type HospitalArticleList = {
  __typename?: 'HospitalArticleList';
  /** 게시글 목록 */
  articles: Array<HospitalArticle>;
  /** 총 게시글 수 */
  totalCount: Scalars['Int']['output'];
};

/** 병원 코드 */
export enum HospitalCode {
  /** 전체 병원 (슈퍼관리자 전용) */
  All = 'ALL',
  /** 안암병원 */
  Anam = 'ANAM',
  /** 안산병원 */
  Ansan = 'ANSAN',
  /** 구로병원 */
  Guro = 'GURO'
}

/** 협력병의원 검색/등록 결과 */
export type HospitalModel = {
  __typename?: 'HospitalModel';
  /** 주소 */
  address: Maybe<Scalars['String']['output']>;
  /** 상세주소 */
  addressDetail: Maybe<Scalars['String']['output']>;
  /** 병원분류코드 (H=병원, M=의원) */
  classificationCode: Maybe<Scalars['String']['output']>;
  /** 등록일시 */
  createdAt: Maybe<Scalars['DateTime']['output']>;
  /** 팩스번호 */
  faxNumber: Maybe<Scalars['String']['output']>;
  /** 소속 병원 코드 (안암/구로/안산) */
  hospitalCode: Maybe<HospitalCode>;
  /** 검색 결과 식별자 */
  id: Maybe<Scalars['ID']['output']>;
  /** 병원명 */
  name: Scalars['String']['output'];
  /** 기관 유형 코드 (A=병원, B=의원) */
  partnerType: Maybe<Scalars['String']['output']>;
  /** 요양기관번호 (PHIS 코드) */
  phisCode: Maybe<Scalars['String']['output']>;
  /** 대표전화 */
  phone: Maybe<Scalars['String']['output']>;
  /** 대표자명 */
  representative: Maybe<Scalars['String']['output']>;
  /** 진료과목 */
  specialties: Maybe<Scalars['String']['output']>;
  /** 수정일시 */
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  /** 홈페이지 */
  website: Maybe<Scalars['String']['output']>;
  /** 우편번호 */
  zipCode: Maybe<Scalars['String']['output']>;
};

/** 병원 검색 결과 */
export type HospitalSearchResult = {
  __typename?: 'HospitalSearchResult';
  /** 병원 목록 */
  hospitals: Array<HospitalModel>;
  /** 총 검색 결과 수 */
  totalCount: Scalars['Int']['output'];
};

/** 검사 구분 */
export enum ImagingExamType {
  /** 내시경검사 */
  Endoscopy = 'ENDOSCOPY',
  /** 기타검사 */
  Other = 'OTHER',
  /** 영상검사 */
  Radiology = 'RADIOLOGY'
}

/** 영상검사 첨부 업로드 메타데이터 */
export type ImagingRequestAttachmentInput = {
  /** MIME 타입 */
  mimeType?: InputMaybe<Scalars['String']['input']>;
  /** 원본 파일명 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 파일 크기(bytes) */
  size?: InputMaybe<Scalars['Int']['input']>;
  /** 업로드 후 반환된 파일 URL */
  url: Scalars['String']['input'];
};

/** 영상검사 요청 사용자 표시 상태 */
export enum ImagingRequestDisplayState {
  /** 기간 만료 */
  Expired = 'EXPIRED',
  /** 이미지 준비 중 */
  PendingImage = 'PENDING_IMAGE',
  /** 반려됨 */
  Rejected = 'REJECTED',
  /** 신청 가능 */
  Requestable = 'REQUESTABLE',
  /** 보기 가능 */
  Viewable = 'VIEWABLE'
}

/** 영상검사 요청 필터 */
export type ImagingRequestFilterInput = {
  /** 종료 날짜 (YYYYMMDD) */
  endDate?: InputMaybe<Scalars['String']['input']>;
  /** 검사명 검색 */
  examName?: InputMaybe<Scalars['String']['input']>;
  /** 검사 구분 필터 */
  examType?: InputMaybe<ImagingExamType>;
  /** 환자명 검색 */
  patientName?: InputMaybe<Scalars['String']['input']>;
  /** 환자번호 검색 */
  ptntNo?: InputMaybe<Scalars['String']['input']>;
  /** 시작 날짜 (YYYYMMDD) */
  startDate?: InputMaybe<Scalars['String']['input']>;
  /** 상태 필터 */
  status?: InputMaybe<ImagingRequestStatus>;
};

/** 영상검사 요청 목록 조회 입력 */
export type ImagingRequestListInput = {
  /** 필터 조건 */
  filter?: InputMaybe<ImagingRequestFilterInput>;
  /** 페이지당 항목 수 */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** 페이지 번호 (1부터 시작) */
  page?: InputMaybe<Scalars['Float']['input']>;
};

/** 영상검사 요청 */
export type ImagingRequestModel = {
  __typename?: 'ImagingRequestModel';
  /** 승인 일시 */
  approvedAt: Maybe<Scalars['DateTime']['output']>;
  /** 첨부 이미지 목록 */
  attachments: Maybe<Array<AttachmentModel>>;
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 사용자 표시 상태 (파생) */
  displayState: ImagingRequestDisplayState;
  /** 검사일자 (YYYYMMDD 형식) */
  examDate: Scalars['String']['output'];
  /** EHR 특수검사결과 조인 결과 */
  examInfo: Maybe<SpecialExamResultItem>;
  /** 검사 구분 (영상검사, 내시경검사, 기타검사) */
  examType: ImagingExamType;
  /** 만료 일시 (신청일 기준 3개월) */
  expiresAt: Scalars['DateTime']['output'];
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 고유 ID */
  id: Scalars['ID']['output'];
  /** 처방코드 (외부 EHR 기준) */
  orderCode: Scalars['String']['output'];
  /** PACS 접근번호 (우선 조인 키) */
  pacsAccessNo: Maybe<Scalars['String']['output']>;
  /** 환자번호 (외부 EHR 기준) */
  ptntNo: Scalars['String']['output'];
  /** EHR 회신환자정보 조인 결과 */
  referralReply: Maybe<ReferralReplyItem>;
  /** 의뢰일련번호 */
  refrSno: Maybe<Scalars['String']['output']>;
  /** 의뢰일자 (YYYYMMDD 형식) */
  refrYmd: Maybe<Scalars['String']['output']>;
  /** 반려 일시 */
  rejectedAt: Maybe<Scalars['DateTime']['output']>;
  /** 신청 일시 */
  requestedAt: Scalars['DateTime']['output'];
  /** 내부 워크플로 상태 */
  status: ImagingRequestStatus;
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 영상검사 요청 내부 워크플로 상태 */
export enum ImagingRequestStatus {
  /** 승인됨 */
  Approved = 'APPROVED',
  /** 만료됨 */
  Expired = 'EXPIRED',
  /** 반려됨 */
  Rejected = 'REJECTED',
  /** 신청됨 */
  Requested = 'REQUESTED'
}

/** NICE 본인인증 요청 입력 */
export type InitiateVerificationInput = {
  /** 인증 완료 후 돌아올 URL (프론트엔드 콜백 페이지) */
  returnUrl: Scalars['String']['input'];
};

/** NICE 본인인증 요청 결과 */
export type InitiateVerificationOutput = {
  __typename?: 'InitiateVerificationOutput';
  /** NICE 인증 팝업 URL (window.open으로 열기) */
  authUrl: Scalars['String']['output'];
  /** 세션 식별자 (completeVerification 시 사용) */
  sessionId: Scalars['String']['output'];
};

/** 의료기관 유형 (EHR hsptClsfCd 코드 기반) */
export enum InstitutionType {
  /** 의원 (코드: 50) */
  Clinic = 'CLINIC',
  /** 치과의원 (코드: 51) */
  DentalClinic = 'DENTAL_CLINIC',
  /** 치과병원 (코드: 31) */
  DentalHospital = 'DENTAL_HOSPITAL',
  /** 종합병원 (코드: 20) */
  GeneralHospital = 'GENERAL_HOSPITAL',
  /** 병원 (코드: 30) */
  Hospital = 'HOSPITAL',
  /** 기관 (코드: 70) */
  Institution = 'INSTITUTION',
  /** 정신병원 (코드: 32) */
  MentalHospital = 'MENTAL_HOSPITAL',
  /** 요양병원 (코드: 40) */
  NursingHospital = 'NURSING_HOSPITAL',
  /** 한방/한의원 (코드: 90) */
  Oriental = 'ORIENTAL',
  /** 한방병원 (코드: 99) */
  OrientalHospital = 'ORIENTAL_HOSPITAL',
  /** 보건소/보건기관 (코드: 60) */
  PublicHealth = 'PUBLIC_HEALTH',
  /** 상급종합병원 (코드: 10) */
  TertiaryHospital = 'TERTIARY_HOSPITAL',
  /** 미분류 (코드: 80) */
  Unclassified = 'UNCLASSIFIED'
}

/** 레거시 회원 확인 결과 — 우리 DB + EHR 동시 확인 */
export type LegacyUserCheckResult = {
  __typename?: 'LegacyUserCheckResult';
  /** EHR에서 조회된 의사 기본 데이터 */
  ehrDoctorData: Maybe<EhrDoctorData>;
  /** 우리 DB에 동일 아이디 존재 여부 (true=이미 가입됨) */
  existsInDb: Scalars['Boolean']['output'];
  /** EHR 레거시 시스템에 존재 여부 (true=마이그레이션 대상) */
  existsInLegacy: Scalars['Boolean']['output'];
  /** EHR에서 발견된 소속 병원 코드 (안암/구로/안산) */
  hospitalCode: Maybe<HospitalCode>;
};

/** 로그인 입력 */
export type LoginInput = {
  /** 비밀번호 */
  password: Scalars['String']['input'];
  /** 아이디 */
  userId: Scalars['String']['input'];
};

/** EHR 기반 내 프로필 정보 */
export type MeEhrProfile = {
  __typename?: 'MeEhrProfile';
  /** 생년월일 */
  birthDate: Maybe<Scalars['DateTime']['output']>;
  /** 요양기관번호 */
  careInstitutionNo: Maybe<Scalars['String']['output']>;
  /** 진료과 코드 */
  department: Maybe<Scalars['String']['output']>;
  /** 의사 세부유형 */
  doctorType: Maybe<Scalars['String']['output']>;
  /** 이메일 동의여부 */
  emailConsent: Scalars['Boolean']['output'];
  /** 성별코드 (M/F) */
  gender: Maybe<Scalars['String']['output']>;
  /** 졸업연도 */
  graduationYear: Maybe<Scalars['String']['output']>;
  /** 병원주소 */
  hospAddress: Maybe<Scalars['String']['output']>;
  /** 병원 상세주소 */
  hospAddressDetail: Maybe<Scalars['String']['output']>;
  /** 병원코드 */
  hospCode: Maybe<Scalars['String']['output']>;
  /** 소속 병원명 */
  hospName: Maybe<Scalars['String']['output']>;
  /** 대표전화 */
  hospPhone: Maybe<Scalars['String']['output']>;
  /** 병원 홈페이지 주소 */
  hospWebsite: Maybe<Scalars['String']['output']>;
  /** 병원 우편번호 */
  hospZipCode: Maybe<Scalars['String']['output']>;
  /** 원장여부 */
  isDirector: Scalars['Boolean']['output'];
  /** 의사면허번호 */
  licenseNo: Maybe<Scalars['String']['output']>;
  /** 회신서 수신 동의 여부 */
  replyConsent: Scalars['Boolean']['output'];
  /** 대표자명 */
  representative: Maybe<Scalars['String']['output']>;
  /** 출신학교 코드 */
  school: Maybe<Scalars['String']['output']>;
  /** SMS 동의여부 */
  smsConsent: Scalars['Boolean']['output'];
  /** 세부전공 */
  specialty: Maybe<Scalars['String']['output']>;
  /** 수련병원명 */
  trainingHospital: Maybe<Scalars['String']['output']>;
};

/** EHR 기반 내 정보 */
export type MeEhrUser = {
  __typename?: 'MeEhrUser';
  /** 이메일 */
  email: Maybe<Scalars['String']['output']>;
  /** 전화번호 */
  phone: Maybe<Scalars['String']['output']>;
  /** EHR 프로필 정보 */
  profile: Maybe<MeEhrProfile>;
  /** 이름 */
  userName: Maybe<Scalars['String']['output']>;
};

/** 메뉴 */
export type MenuModel = {
  __typename?: 'MenuModel';
  /** 현재 사용자의 접근 권한 (null이면 FULL) */
  accessLevel: Maybe<AccessLevel>;
  /** 하위 메뉴 목록 */
  children: Maybe<Array<MenuModel>>;
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 외부 링크 URL */
  externalUrl: Maybe<Scalars['String']['output']>;
  /** 상위메뉴 클릭 시 이동할 첫 하위메뉴 경로 */
  firstChildPath: Maybe<Scalars['String']['output']>;
  /** GNB 노출 여부 */
  gnbExposure: Scalars['Boolean']['output'];
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 아이콘명 */
  iconName: Maybe<Scalars['String']['output']>;
  /** 메뉴 ID */
  id: Scalars['ID']['output'];
  /** 활성 여부 */
  isActive: Scalars['Boolean']['output'];
  /** 메뉴 타깃 유형 */
  menuTargetType: Maybe<MenuTargetType>;
  /** 메뉴 유형 */
  menuType: MenuType;
  /** 메뉴명 */
  name: Scalars['String']['output'];
  /** 상위 메뉴 ID */
  parentId: Maybe<Scalars['String']['output']>;
  /** 경로 */
  path: Maybe<Scalars['String']['output']>;
  /** 정렬순서 */
  sortOrder: Scalars['Int']['output'];
  /** 연결된 게시판 ID */
  targetBoardId: Maybe<Scalars['String']['output']>;
  /** 연결된 게시판 유형 */
  targetBoardType: Maybe<BoardType>;
  /** 연결된 콘텐츠 ID */
  targetContentId: Maybe<Scalars['String']['output']>;
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 메뉴 정렬 항목 */
export type MenuOrderItem = {
  /** 메뉴 ID */
  id: Scalars['String']['input'];
  /** 정렬순서 */
  sortOrder: Scalars['Int']['input'];
};

/** 메뉴 권한 항목 */
export type MenuPermissionEntryModel = {
  __typename?: 'MenuPermissionEntryModel';
  /** 접근 권한 수준 */
  accessLevel: AccessLevel;
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 권한 그룹 ID */
  groupId: Scalars['String']['output'];
  /** 메뉴 권한 항목 ID */
  id: Scalars['ID']['output'];
  /** 메뉴 ID */
  menuId: Scalars['String']['output'];
  /** 메뉴명 */
  menuName: Maybe<Scalars['String']['output']>;
  /** 상위 메뉴 ID */
  menuParentId: Maybe<Scalars['String']['output']>;
  /** 메뉴 정렬 순서 */
  menuSortOrder: Maybe<Scalars['Int']['output']>;
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 메뉴 권한 그룹 */
export type MenuPermissionGroupModel = {
  __typename?: 'MenuPermissionGroupModel';
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 권한 항목 목록 */
  entries: Maybe<Array<MenuPermissionEntryModel>>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 메뉴 권한 그룹 ID */
  id: Scalars['ID']['output'];
  /** 그룹명 */
  name: Scalars['String']['output'];
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 메뉴 타깃 유형 */
export enum MenuTargetType {
  /** 게시판 연결 */
  Board = 'BOARD',
  /** 콘텐츠 연결 */
  Content = 'CONTENT',
  /** 링크 */
  Link = 'LINK',
  /** 상위메뉴 */
  Parent = 'PARENT'
}

/** 메뉴 유형 */
export enum MenuType {
  /** 관리자 메뉴 */
  Admin = 'ADMIN',
  /** 사용자 메뉴 */
  User = 'USER'
}

/** 메시지 응답 */
export type MessageResponse = {
  __typename?: 'MessageResponse';
  /** 응답 메시지 */
  message: Scalars['String']['output'];
  /** 성공 여부 */
  success: Scalars['Boolean']['output'];
};

/** 레거시 회원 마이그레이션 입력 */
export type MigrateLegacyInput = {
  /** NICE 본인인증 토큰 ID (본인인증 완료 후 전달) */
  niceTokenId: Scalars['String']['input'];
  /** 새 비밀번호 (영문+숫자+특수문자 조합 8~12자리) */
  password: Scalars['String']['input'];
  /** 새 비밀번호 확인 */
  passwordConfirm: Scalars['String']['input'];
  /** 레거시 시스템 아이디 (EHR에 등록된 아이디) */
  userId: Scalars['String']['input'];
  /** NICE 콜백에서 받은 web_transaction_id */
  webTransactionId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 관리자 계정 생성 */
  adminCreateUser: User;
  /** 관리자 계정 삭제 (비활성화) */
  adminDeleteUser: Scalars['Boolean']['output'];
  /** 관리자 로그인 - 관리자 계정에만 Access Token(15분)과 Refresh Token(7일) 발급 */
  adminLogin: AuthPayload;
  /** 관리자 비밀번호 초기화 (임시 비밀번호 SMS 발송) */
  adminResetPassword: MessageResponse;
  /** 관리자 회원 정보 수정 */
  adminUpdateUser: User;
  /** 회원 계정 탈퇴 처리 (실제 삭제) */
  adminWithdrawMember: Scalars['Boolean']['output'];
  /** 협력병의원 신청 - 병의원 정보를 입력하여 협력 신청 */
  applyPartnerHospital: PartnerHospitalModel;
  /** 관리자 영상검사 요청 승인 */
  approveImagingRequest: ImagingRequestModel;
  /** 협력병의원 신청 승인 */
  approvePartnerApplication: PartnerHospitalModel;
  /** 협력병의원 수정요청 승인 */
  approvePartnerUpdateRequest: PartnerUpdateRequestModel;
  /** 회원 승인 - 승인대기 상태를 정상으로 변경 */
  approveUser: User;
  /** 관리자에게 권한그룹 할당/해제 */
  assignPermissionGroup: Scalars['Boolean']['output'];
  /** eConsult 취소 - 대기 상태의 본인 상담만 취소 가능 */
  cancelEConsult: Scalars['Boolean']['output'];
  /** 비밀번호 변경 - 현재 비밀번호 확인 후 새 비밀번호로 변경 */
  changePassword: MessageResponse;
  /** NICE 본인인증 완료 - 콜백에서 받은 web_transaction_id로 결과 조회 후 복호화 결과 반환 */
  completeVerification: VerificationResultOutput;
  /** 자문의 CCC 로그인 - CCC 인증 후 자문의 전용 JWT 발급 */
  consultantLogin: ConsultantLoginResponse;
  /** 자문의 eConsult 답변 등록 - 자문의 로그인 필요 */
  consultantReplyEConsult: EConsultReplyModel;
  /** 게시글 생성 - 관리자 전용 */
  createBoardPost: BoardPost;
  /** 게시판 설정 생성 */
  createBoardSetting: BoardSettingModel;
  /** 콘텐츠 생성 */
  createContent: Content;
  /** 콘텐츠 그룹 생성 */
  createContentGroup: ContentGroupModel;
  /** 의료진 생성 */
  createDoctor: AdminDoctorModel;
  /** eConsult 신청 - 온라인 상담 요청 (유효기간 7일) */
  createEConsult: EConsultModel;
  /** 메뉴 생성 */
  createMenu: MenuModel;
  /** 권한그룹 생성 */
  createMenuPermissionGroup: MenuPermissionGroupModel;
  /** 팝업/배너 생성 */
  createPopup: PopupModel;
  /** e-Consult 자문의 비활성화 */
  deactivateEconsultConsultant: Scalars['Boolean']['output'];
  /** 게시글 삭제 - 관리자 전용 (소프트 삭제) */
  deleteBoardPost: Scalars['Boolean']['output'];
  /** 게시판 설정 삭제 */
  deleteBoardSetting: Scalars['Boolean']['output'];
  /** 콘텐츠 삭제 */
  deleteContent: Scalars['Boolean']['output'];
  /** 콘텐츠 그룹 삭제 */
  deleteContentGroup: Scalars['Boolean']['output'];
  /** 의료진 삭제 (비활성화) */
  deleteDoctor: Scalars['Boolean']['output'];
  /** 파일 삭제 (Object Storage + DB) */
  deleteFile: Scalars['Boolean']['output'];
  /** 메뉴 삭제 - 하위 메뉴도 함께 삭제 */
  deleteMenu: Scalars['Boolean']['output'];
  /** 권한그룹 삭제 */
  deleteMenuPermissionGroup: Scalars['Boolean']['output'];
  /** 팝업/배너 삭제 */
  deletePopup: Scalars['Boolean']['output'];
  /** ADMAP 의료진을 e-Consult 자문의로 지정 */
  designateEconsultConsultant: AdminEconsultConsultantModel;
  /** EHR 의사정보 등록 (신규) - 협력센터에 의사정보 신규 등록 */
  ehrRegisterDoctor: EhrRegisterResult;
  /** EHR 의사정보 등록 (의뢰처용) - 의뢰처 경로를 통한 의사정보 등록 */
  ehrRegisterDoctorReferSite: EhrRegisterResult;
  /** EHR 병원정보 등록 - 협력센터에 병원정보 신규 등록 */
  ehrRegisterHospital: EhrRegisterResult;
  /** EHR 병원정보 등록 (의뢰처용) - 의뢰처 경로를 통한 병원정보 등록 */
  ehrRegisterHospitalReferSite: EhrRegisterResult;
  /** EHR 병원정보 수정 - 등록된 병원정보 업데이트 */
  ehrUpdateHospitalInfo: EhrRegisterResult;
  /** EHR 회원상태코드 변경 - 회원 상태 업데이트 (1:일반/2:휴면/3:삭제/4:미가입) */
  ehrUpdateMemberStatus: EhrRegisterResult;
  /** 아이디 찾기 - 이름+이메일 또는 이름+휴대폰으로 마스킹된 아이디 반환 */
  findUserId: FindUserIdPayload;
  /** 아이디 찾기 (본인인증) - NICE 본인인증 후 CI/이름/휴대폰으로 마스킹된 아이디 반환 */
  findUserIdByVerification: FindUserIdPayload;
  /** NICE 본인인증 시작 - 인증 팝업 URL과 세션 ID 반환 */
  initiateVerification: InitiateVerificationOutput;
  /** 로그인 - Access Token(15분)과 Refresh Token(7일) 발급 */
  login: AuthPayload;
  /** 로그아웃 - Refresh Token 삭제 */
  logout: Scalars['Boolean']['output'];
  /** 레거시 회원 마이그레이션 — NICE 본인인증 + EHR 매칭 후 계정 생성 (비인증) */
  migrateLegacyUser: AuthPayload;
  /** 토큰 갱신 - Refresh Token으로 새 Access Token 발급 */
  refreshToken: AuthPayload;
  /** 병원 간이 등록 - 의사 가입 시 병원검색에서 없을 때 신규 등록 (비인증) */
  registerHospital: HospitalModel;
  /** 관리자 영상검사 요청 반려 */
  rejectImagingRequest: ImagingRequestModel;
  /** 협력병의원 신청 반려 */
  rejectPartnerApplication: PartnerHospitalModel;
  /** 협력병의원 수정요청 반려 */
  rejectPartnerUpdateRequest: PartnerUpdateRequestModel;
  /** 회원 거부 - 승인대기 상태를 거부로 변경 */
  rejectUser: User;
  /** 메뉴 정렬 변경 - 일괄 정렬순서 업데이트 */
  reorderMenus: Scalars['Boolean']['output'];
  /** 팝업/배너 순서 변경 — orderedIds 배열의 인덱스 순서대로 sortOrder 재할당 */
  reorderPopups: Scalars['Boolean']['output'];
  /** 관리자 영상검사 첨부 이미지 교체 */
  replaceImagingRequestAttachments: ImagingRequestModel;
  /** 사용자 영상검사 요청 생성 */
  requestImagingExam: ImagingRequestModel;
  /** 비밀번호 재설정 요청 - 이메일로 재설정 링크 발송 */
  requestPasswordReset: MessageResponse;
  /** 비밀번호 재설정 - 토큰 검증 후 새 비밀번호 설정 */
  resetPassword: MessageResponse;
  /** 비밀번호 재설정 (본인인증) - NICE 본인인증 후 새 비밀번호 설정 */
  resetPasswordByVerification: MessageResponse;
  /** 이메일 발송 테스트 (인증 불필요) */
  sendTestEmail: EmailTestResult;
  /** SMS 발송 테스트 (인증 불필요) */
  sendTestSms: SmsTestResult;
  /** 메뉴별 권한 설정 */
  setMenuPermission: Scalars['Boolean']['output'];
  /** 권한그룹에 관리자 일괄 배정 (기존 배정 교체) */
  setPermissionGroupMembers: Scalars['Boolean']['output'];
  /** 회원가입 - 일반회원은 즉시 활성화, 병원/의사는 승인대기 상태로 생성 */
  signup: AuthPayload;
  /** 게시글 수정 - 관리자 전용 */
  updateBoardPost: BoardPost;
  /** 게시판 설정 수정 */
  updateBoardSetting: BoardSettingModel;
  /** 콘텐츠 수정 */
  updateContent: Content;
  /** 콘텐츠 그룹 수정 */
  updateContentGroup: ContentGroupModel;
  /** 의료진 수정 */
  updateDoctor: AdminDoctorModel;
  /** 의사 프로필 수정 - 면허번호, 전문분야, 진료과 변경 (의사 전용) */
  updateDoctorProfile: User;
  /** e-Consult 자문의 이메일 수정 */
  updateEconsultConsultantEmail: AdminEconsultConsultantModel;
  /** 메뉴 수정 */
  updateMenu: MenuModel;
  /** 권한그룹 수정 */
  updateMenuPermissionGroup: MenuPermissionGroupModel;
  /** 협력병의원 수정요청 생성 */
  updatePartnerApplication: PartnerHospitalModel;
  /** 팝업/배너 수정 */
  updatePopup: PopupModel;
  /** 프로필 수정 - 이름, 이메일, 전화번호 변경 */
  updateProfile: User;
  /** 회원 탈퇴 - 비밀번호 확인 후 EHR 상태 변경 및 로컬 계정 삭제 */
  withdrawMember: MessageResponse;
};


export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput;
};


export type MutationAdminDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationAdminLoginArgs = {
  input: AdminLoginInput;
};


export type MutationAdminResetPasswordArgs = {
  id: Scalars['String']['input'];
};


export type MutationAdminUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: AdminUpdateUserInput;
};


export type MutationAdminWithdrawMemberArgs = {
  id: Scalars['String']['input'];
};


export type MutationApplyPartnerHospitalArgs = {
  input: ApplyPartnerHospitalInput;
};


export type MutationApproveImagingRequestArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  input: ApproveImagingRequestInput;
};


export type MutationApprovePartnerApplicationArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type MutationApprovePartnerUpdateRequestArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type MutationApproveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationAssignPermissionGroupArgs = {
  groupId?: InputMaybe<Scalars['String']['input']>;
  hospitalCode?: InputMaybe<HospitalCode>;
  userId: Scalars['String']['input'];
};


export type MutationCancelEConsultArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCompleteVerificationArgs = {
  input: CompleteVerificationInput;
};


export type MutationConsultantLoginArgs = {
  input: ConsultantLoginInput;
};


export type MutationConsultantReplyEConsultArgs = {
  id: Scalars['String']['input'];
  input: ReplyEConsultInput;
};


export type MutationCreateBoardPostArgs = {
  input: CreateBoardPostInput;
};


export type MutationCreateBoardSettingArgs = {
  input: CreateBoardSettingInput;
};


export type MutationCreateContentArgs = {
  input: CreateContentInput;
};


export type MutationCreateContentGroupArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  input: CreateContentGroupInput;
};


export type MutationCreateDoctorArgs = {
  input: CreateDoctorInput;
};


export type MutationCreateEConsultArgs = {
  input: CreateEConsultInput;
};


export type MutationCreateMenuArgs = {
  input: CreateMenuInput;
};


export type MutationCreateMenuPermissionGroupArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  input: CreateMenuPermissionGroupInput;
};


export type MutationCreatePopupArgs = {
  input: CreatePopupInput;
};


export type MutationDeactivateEconsultConsultantArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteBoardPostArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteBoardSettingArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteContentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteContentGroupArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDoctorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFileArgs = {
  attachmentId: Scalars['ID']['input'];
};


export type MutationDeleteMenuArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMenuPermissionGroupArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type MutationDeletePopupArgs = {
  id: Scalars['String']['input'];
};


export type MutationDesignateEconsultConsultantArgs = {
  input: DesignateEconsultConsultantInput;
};


export type MutationEhrRegisterDoctorArgs = {
  input: RegisterDoctorEhrInput;
};


export type MutationEhrRegisterDoctorReferSiteArgs = {
  input: RegisterDoctorEhrInput;
};


export type MutationEhrRegisterHospitalArgs = {
  input: RegisterHospitalEhrInput;
};


export type MutationEhrRegisterHospitalReferSiteArgs = {
  input: RegisterHospitalEhrInput;
};


export type MutationEhrUpdateHospitalInfoArgs = {
  input: UpdateHospitalEhrInput;
};


export type MutationEhrUpdateMemberStatusArgs = {
  input: UpdateMemberStatusInput;
};


export type MutationFindUserIdArgs = {
  input: FindUserIdInput;
};


export type MutationFindUserIdByVerificationArgs = {
  input: FindUserIdByVerificationInput;
};


export type MutationInitiateVerificationArgs = {
  input: InitiateVerificationInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMigrateLegacyUserArgs = {
  input: MigrateLegacyInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRegisterHospitalArgs = {
  input: RegisterHospitalInput;
};


export type MutationRejectImagingRequestArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  input: RejectImagingRequestInput;
};


export type MutationRejectPartnerApplicationArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRejectPartnerUpdateRequestArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type MutationRejectUserArgs = {
  id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationReorderMenusArgs = {
  input: ReorderMenusInput;
};


export type MutationReorderPopupsArgs = {
  input: ReorderPopupsInput;
};


export type MutationReplaceImagingRequestAttachmentsArgs = {
  attachments: Array<ImagingRequestAttachmentInput>;
  hospitalCode?: InputMaybe<HospitalCode>;
  imagingRequestId: Scalars['String']['input'];
};


export type MutationRequestImagingExamArgs = {
  input: CreateImagingRequestInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationResetPasswordByVerificationArgs = {
  input: ResetPasswordByVerificationInput;
};


export type MutationSendTestEmailArgs = {
  body: Scalars['String']['input'];
  hospitalCode?: InputMaybe<HospitalCode>;
  subject: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type MutationSendTestSmsArgs = {
  hospitalCode: HospitalCode;
  message: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationSetMenuPermissionArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  input: SetMenuPermissionInput;
};


export type MutationSetPermissionGroupMembersArgs = {
  groupId: Scalars['String']['input'];
  hospitalCode?: InputMaybe<HospitalCode>;
  userIds: Array<Scalars['String']['input']>;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateBoardPostArgs = {
  id: Scalars['String']['input'];
  input: UpdateBoardPostInput;
};


export type MutationUpdateBoardSettingArgs = {
  id: Scalars['String']['input'];
  input: UpdateBoardSettingInput;
};


export type MutationUpdateContentArgs = {
  id: Scalars['String']['input'];
  input: UpdateContentInput;
};


export type MutationUpdateContentGroupArgs = {
  id: Scalars['String']['input'];
  input: UpdateContentGroupInput;
};


export type MutationUpdateDoctorArgs = {
  id: Scalars['String']['input'];
  input: UpdateDoctorInput;
};


export type MutationUpdateDoctorProfileArgs = {
  input: UpdateDoctorProfileInput;
};


export type MutationUpdateEconsultConsultantEmailArgs = {
  id: Scalars['String']['input'];
  input: UpdateEconsultConsultantEmailInput;
};


export type MutationUpdateMenuArgs = {
  id: Scalars['String']['input'];
  input: UpdateMenuInput;
};


export type MutationUpdateMenuPermissionGroupArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
  input: UpdateMenuPermissionGroupInput;
};


export type MutationUpdatePartnerApplicationArgs = {
  input: UpdatePartnerApplicationInput;
};


export type MutationUpdatePopupArgs = {
  id: Scalars['String']['input'];
  input: UpdatePopupInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationWithdrawMemberArgs = {
  input: WithdrawMemberInput;
};

/** 의료진 페이지네이션 응답 */
export type PaginatedAdminDoctorResponse = {
  __typename?: 'PaginatedAdminDoctorResponse';
  /** 다음 페이지 커서 */
  cursor: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 항목 목록 */
  items: Array<AdminDoctorModel>;
  /** 전체 항목 수 */
  totalCount: Scalars['Int']['output'];
};

/** 관리자 협력병의원 신청 페이지네이션 응답 */
export type PaginatedAdminPartnerApplicationResponse = {
  __typename?: 'PaginatedAdminPartnerApplicationResponse';
  /** 다음 페이지 커서 */
  cursor: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 항목 목록 */
  items: Array<PartnerHospitalModel>;
  /** 전체 항목 수 */
  totalCount: Scalars['Int']['output'];
};

/** 관리자용 사용자 목록 응답 */
export type PaginatedAdminUserResponse = {
  __typename?: 'PaginatedAdminUserResponse';
  /** 다음 페이지 커서 */
  cursor: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 항목 목록 */
  items: Array<User>;
  /** 전체 항목 수 */
  totalCount: Scalars['Int']['output'];
};

/** 감사 로그 페이지네이션 응답 */
export type PaginatedAuditLogResponse = {
  __typename?: 'PaginatedAuditLogResponse';
  /** 다음 페이지 커서 */
  cursor: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 항목 목록 */
  items: Array<AuditLogModel>;
  /** 전체 항목 수 */
  totalCount: Scalars['Int']['output'];
};

/** 게시글 페이지네이션 응답 */
export type PaginatedBoardPostResponse = {
  __typename?: 'PaginatedBoardPostResponse';
  /** 다음 페이지 커서 */
  cursor: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 항목 목록 */
  items: Array<BoardPost>;
  /** 전체 항목 수 */
  totalCount: Scalars['Int']['output'];
};

/** eConsult 페이지네이션 응답 */
export type PaginatedEConsultResponse = {
  __typename?: 'PaginatedEConsultResponse';
  /** 다음 페이지 커서 */
  cursor: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 항목 목록 */
  items: Array<EConsultModel>;
  /** 전체 항목 수 */
  totalCount: Scalars['Int']['output'];
};

/** 영상검사 요청 페이지네이션 응답 */
export type PaginatedImagingRequestResponse = {
  __typename?: 'PaginatedImagingRequestResponse';
  /** 다음 페이지 커서 */
  cursor: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 항목 목록 */
  items: Array<ImagingRequestModel>;
  /** 전체 항목 수 */
  totalCount: Scalars['Int']['output'];
};

/** 협력병의원 페이지네이션 응답 */
export type PaginatedPartnerHospitalResponse = {
  __typename?: 'PaginatedPartnerHospitalResponse';
  /** 다음 페이지 커서 */
  cursor: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 항목 목록 */
  items: Array<PartnerHospitalModel>;
  /** 전체 항목 수 */
  totalCount: Scalars['Int']['output'];
};

/** 관리자용 팝업/배너 목록 응답 */
export type PaginatedPopupResponse = {
  __typename?: 'PaginatedPopupResponse';
  /** 다음 페이지 커서 */
  cursor: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 항목 목록 */
  items: Array<PopupModel>;
  /** 전체 항목 수 */
  totalCount: Scalars['Int']['output'];
};

/** 페이지네이션 입력 */
export type PaginationInput = {
  /** 커서 기반 페이지네이션용 커서 값 */
  cursor?: InputMaybe<Scalars['String']['input']>;
  /** 페이지당 항목 수 */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** 페이지 번호 (1부터 시작) */
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** 협력병의원 신청 */
export type PartnerHospitalModel = {
  __typename?: 'PartnerHospitalModel';
  /** 가동 병상 수 */
  activeBedCount: Maybe<Scalars['Int']['output']>;
  /** 신청자 ID */
  applicantId: Scalars['String']['output'];
  /** 승인일시 */
  approvedAt: Maybe<Scalars['DateTime']['output']>;
  /** 첨부파일 목록 */
  attachmentRows: Maybe<Array<AttachmentModel>>;
  /** 첨부파일 메타데이터 */
  attachments: Maybe<Scalars['JSON']['output']>;
  /** 기본 처치 가능 항목(JSON) */
  availableTreatments: Maybe<Scalars['JSON']['output']>;
  /** 요양기관번호 */
  careInstitutionNo: Maybe<Scalars['String']['output']>;
  /** 협력 상태 코드 (현재 병원 EHR 기준) */
  clbrDvsnCd1: Maybe<Scalars['String']['output']>;
  /** 엑시머레이저 가능 여부 */
  clinicHasExcimerLaser: Maybe<Scalars['Boolean']['output']>;
  /** 혈액투석 가능 여부 */
  clinicHasHemodialysis: Maybe<Scalars['Boolean']['output']>;
  /** 복막투석 가능 여부 */
  clinicHasPeritoneal: Maybe<Scalars['Boolean']['output']>;
  /** 광선치료 가능 여부 */
  clinicHasPhototherapy: Maybe<Scalars['Boolean']['output']>;
  /** 투약 유형 */
  clinicMedicationType: Maybe<Scalars['String']['output']>;
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 진료과별 전문의 현황(JSON) */
  departmentSpecialists: Maybe<Scalars['JSON']['output']>;
  /** 병원장 생년월일 */
  directorBirthDate: Maybe<Scalars['String']['output']>;
  /** 병원장 차량번호 */
  directorCarNo: Maybe<Scalars['String']['output']>;
  /** 병원장 진료과 */
  directorDepartment: Maybe<Scalars['String']['output']>;
  /** 병원장 이메일 */
  directorEmail: Maybe<Scalars['String']['output']>;
  /** 이메일 수신 동의 */
  directorEmailConsent: Maybe<Scalars['Boolean']['output']>;
  /** 병원장 성별 */
  directorGender: Maybe<Scalars['String']['output']>;
  /** 병원장 졸업년도 */
  directorGraduationYear: Maybe<Scalars['String']['output']>;
  /** 의사면허번호 */
  directorLicenseNo: Maybe<Scalars['String']['output']>;
  /** 병원장 성명 */
  directorName: Maybe<Scalars['String']['output']>;
  /** 병원장 휴대전화 */
  directorPhone: Maybe<Scalars['String']['output']>;
  /** 회신서 수신 동의 */
  directorReplyConsent: Maybe<Scalars['Boolean']['output']>;
  /** 병원장 출신학교 */
  directorSchool: Maybe<Scalars['String']['output']>;
  /** SMS 수신 동의 */
  directorSmsConsent: Maybe<Scalars['Boolean']['output']>;
  /** 병원장 세부전공 */
  directorSubSpecialty: Maybe<Scalars['String']['output']>;
  /** 병원장 수련병원 */
  directorTrainingHospital: Maybe<Scalars['String']['output']>;
  /** 응급실 수 */
  erCount: Maybe<Scalars['Int']['output']>;
  /** 인공신장실 유무 */
  hasDialysisRoom: Maybe<Scalars['Boolean']['output']>;
  /** 응급실 유무 */
  hasEr: Maybe<Scalars['Boolean']['output']>;
  /** 보호자 간병 유무 */
  hasGuardianCare: Maybe<Scalars['Boolean']['output']>;
  /** 호스피스 유무 */
  hasHospice: Maybe<Scalars['Boolean']['output']>;
  /** 중환자실 유무 */
  hasIcu: Maybe<Scalars['Boolean']['output']>;
  /** 간호간병통합서비스 유무 */
  hasIntegratedNursing: Maybe<Scalars['Boolean']['output']>;
  /** 수술실 유무 */
  hasOperatingRoom: Maybe<Scalars['Boolean']['output']>;
  /** 물리치료실 유무 */
  hasPhysicalTherapy: Maybe<Scalars['Boolean']['output']>;
  /** 정신과 병동 폐쇄 */
  hasPsychClosed: Maybe<Scalars['Boolean']['output']>;
  /** 정신과 병동 일반 */
  hasPsychGeneral: Maybe<Scalars['Boolean']['output']>;
  /** 재활치료실 격리 */
  hasRehabIsolation: Maybe<Scalars['Boolean']['output']>;
  /** 재활치료실 작업 */
  hasRehabOt: Maybe<Scalars['Boolean']['output']>;
  /** 재활치료실 물리 */
  hasRehabPt: Maybe<Scalars['Boolean']['output']>;
  /** 재활치료실 언어 */
  hasRehabSt: Maybe<Scalars['Boolean']['output']>;
  /** 재활치료실 연하 */
  hasRehabSwallow: Maybe<Scalars['Boolean']['output']>;
  /** 공동 간병 유무 */
  hasSharedCare: Maybe<Scalars['Boolean']['output']>;
  /** 병원 주소 snapshot */
  hospitalAddress: Maybe<Scalars['String']['output']>;
  /** 병원 상세주소 snapshot */
  hospitalAddressDetail: Maybe<Scalars['String']['output']>;
  /** 신청 대상 병원 코드 */
  hospitalCode: HospitalCode;
  /** 병원 팩스번호 snapshot */
  hospitalFaxNumber: Maybe<Scalars['String']['output']>;
  /** 병원명 snapshot */
  hospitalName: Maybe<Scalars['String']['output']>;
  /** 병원 대표전화 snapshot */
  hospitalPhone: Maybe<Scalars['String']['output']>;
  /** 병원 대표자명 snapshot */
  hospitalRepresentative: Maybe<Scalars['String']['output']>;
  /** 병원 전문분야 snapshot */
  hospitalSpecialties: Maybe<Scalars['String']['output']>;
  /** 병원 홈페이지 snapshot */
  hospitalWebsite: Maybe<Scalars['String']['output']>;
  /** 병원 우편번호 snapshot */
  hospitalZipCode: Maybe<Scalars['String']['output']>;
  /** 중환자실 수 */
  icuCount: Maybe<Scalars['Int']['output']>;
  /** 신청 ID */
  id: Scalars['ID']['output'];
  /** 의료기관 유형 */
  institutionType: Maybe<InstitutionType>;
  /** 원장 여부 */
  isDirector: Maybe<Scalars['Boolean']['output']>;
  /** 격리 중 간병 유형 */
  isolationCareType: Maybe<Scalars['String']['output']>;
  /** 격리 2인실 수 */
  isolationDoubleCount: Maybe<Scalars['Int']['output']>;
  /** 격리 중 재활 유형 */
  isolationRehabType: Maybe<Scalars['String']['output']>;
  /** 격리병실 수 */
  isolationRoomCount: Maybe<Scalars['Int']['output']>;
  /** 격리 1인실 수 */
  isolationSingleCount: Maybe<Scalars['Int']['output']>;
  /** 격리 3인실 수 */
  isolationTripleCount: Maybe<Scalars['Int']['output']>;
  /** 격리 유형(JSON) */
  isolationTypes: Maybe<Scalars['JSON']['output']>;
  /** 격리병상 운영 여부 */
  isolationWardOperation: Maybe<Scalars['Boolean']['output']>;
  /** 주요 보유 장비 */
  majorEquipment: Maybe<Scalars['String']['output']>;
  /** 다인실 수 */
  multiRoomCount: Maybe<Scalars['Int']['output']>;
  /** 간호사 수 */
  nurseCount: Maybe<Scalars['Int']['output']>;
  /** 협력기관 유형 snapshot */
  partnerType: Maybe<PartnerType>;
  /** 상급병실 수 */
  premiumRoomCount: Maybe<Scalars['Int']['output']>;
  /** 반려 사유 */
  rejectReason: Maybe<Scalars['String']['output']>;
  /** 병원 특성 및 기타사항 */
  remarks: Maybe<Scalars['String']['output']>;
  /** 심사일시 */
  reviewedAt: Maybe<Scalars['DateTime']['output']>;
  /** 심사자 ID */
  reviewedById: Maybe<Scalars['String']['output']>;
  /** 전문의 수 */
  specialistCount: Maybe<Scalars['Int']['output']>;
  /** 실무자 부서/진료과 유형 */
  staffDeptType: Maybe<Scalars['String']['output']>;
  /** 실무자 부서/진료과 값 */
  staffDeptValue: Maybe<Scalars['String']['output']>;
  /** 실무자 이메일 */
  staffEmail: Maybe<Scalars['String']['output']>;
  /** 실무자 성명 */
  staffName: Maybe<Scalars['String']['output']>;
  /** 실무자 휴대전화 */
  staffPhone: Maybe<Scalars['String']['output']>;
  /** 실무자 직급 */
  staffPosition: Maybe<Scalars['String']['output']>;
  /** 실무자 연락처(유선) */
  staffTel: Maybe<Scalars['String']['output']>;
  /** 상태 */
  status: PartnerStatus;
  /** 해지일시 */
  terminatedAt: Maybe<Scalars['DateTime']['output']>;
  /** 총 병상 수 */
  totalBedCount: Maybe<Scalars['Int']['output']>;
  /** 총 직원 수 */
  totalStaffCount: Maybe<Scalars['Int']['output']>;
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 협력병의원 신청 상태 */
export enum PartnerStatus {
  /** 승인 */
  Approved = 'APPROVED',
  /** 임시저장 */
  Draft = 'DRAFT',
  /** 신청대기 */
  Pending = 'PENDING',
  /** 반려 */
  Rejected = 'REJECTED',
  /** 해지 */
  Terminated = 'TERMINATED'
}

/** 협력병의원 유형 */
export enum PartnerType {
  /** 협력병원 */
  A = 'A',
  /** 협력의원 */
  B = 'B'
}

/** 협력병의원 수정요청 */
export type PartnerUpdateRequestModel = {
  __typename?: 'PartnerUpdateRequestModel';
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 원장 성명 */
  directorName: Maybe<Scalars['String']['output']>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 병원명 */
  hospitalName: Maybe<Scalars['String']['output']>;
  /** 병원 대표전화 */
  hospitalPhone: Maybe<Scalars['String']['output']>;
  /** 수정요청 ID */
  id: Scalars['ID']['output'];
  /** 협력병의원 신청 ID */
  partnerApplicationId: Scalars['String']['output'];
  /** 요청 신청 데이터(JSON) */
  requestedApplicationData: Maybe<Scalars['JSON']['output']>;
  /** 요청 병원 데이터(JSON) */
  requestedHospitalData: Maybe<Scalars['JSON']['output']>;
  /** 검토일시 */
  reviewedAt: Maybe<Scalars['DateTime']['output']>;
  /** 검토자 ID */
  reviewedById: Maybe<Scalars['String']['output']>;
  /** 수정요청 상태 */
  status: PartnerUpdateRequestStatus;
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 협력병의원 수정요청 상태 */
export enum PartnerUpdateRequestStatus {
  /** 승인 */
  Approved = 'APPROVED',
  /** 승인대기 */
  Pending = 'PENDING',
  /** 반려 */
  Rejected = 'REJECTED'
}

/** EHR 환자 날짜별 조회 입력 - 환자번호 + 날짜 기반 */
export type PatientDateQueryInput = {
  /** 진료일/검사일 (YYYYMMDD) */
  date: Scalars['String']['input'];
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 환자번호 */
  ptntNo: Scalars['String']['input'];
  /** SLIP 코드 */
  slipCd?: InputMaybe<Scalars['String']['input']>;
};

/** 환자 기본정보 */
export type PatientInfo = {
  __typename?: 'PatientInfo';
  /** 주소 */
  address: Maybe<Scalars['String']['output']>;
  /** 나이 */
  age: Maybe<Scalars['String']['output']>;
  /** 생년월일 */
  birthDate: Maybe<Scalars['String']['output']>;
  /** 성별코드 (M/F) */
  genderCode: Maybe<Scalars['String']['output']>;
  /** 성별명 */
  genderName: Maybe<Scalars['String']['output']>;
  /** 환자명 */
  patientName: Maybe<Scalars['String']['output']>;
  /** 환자번호 */
  patientNo: Maybe<Scalars['String']['output']>;
  /** 전화번호 */
  phone: Maybe<Scalars['String']['output']>;
  /** 우편번호 */
  zipCode: Maybe<Scalars['String']['output']>;
};

/** EHR 환자 조회 입력 - 환자번호 기반 */
export type PatientQueryInput = {
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 환자번호 */
  ptntNo: Scalars['String']['input'];
};

/** 권한 변경 이력 - 연결 관리자 상세 */
export type PermissionAuditMemberHistoryModel = {
  __typename?: 'PermissionAuditMemberHistoryModel';
  /** 처리 관리자명 */
  adminName: Maybe<Scalars['String']['output']>;
  /** 처리 관리자번호 */
  adminNumber: Maybe<Scalars['String']['output']>;
  /** 변경일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 로그 ID */
  logId: Scalars['String']['output'];
  /** 대상 관리자 목록 */
  memberLabels: Array<Scalars['String']['output']>;
  /** 로그명 */
  target: Scalars['String']['output'];
};

/** 권한 변경 이력 - 연결 메뉴 상세 */
export type PermissionAuditMenuHistoryModel = {
  __typename?: 'PermissionAuditMenuHistoryModel';
  /** 변경 권한값 */
  accessLevel: Maybe<Scalars['String']['output']>;
  /** 처리 관리자명 */
  adminName: Maybe<Scalars['String']['output']>;
  /** 처리 관리자번호 */
  adminNumber: Maybe<Scalars['String']['output']>;
  /** 변경일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 로그 ID */
  logId: Scalars['String']['output'];
  /** 메뉴 ID */
  menuId: Maybe<Scalars['String']['output']>;
  /** 메뉴명 */
  menuName: Maybe<Scalars['String']['output']>;
  /** 로그명 */
  target: Scalars['String']['output'];
};

/** 팝업/배너 */
export type PopupModel = {
  __typename?: 'PopupModel';
  /** 이미지 대체 텍스트 (alt) — 메인배너 전용 */
  altText: Maybe<Scalars['String']['output']>;
  /** 상시노출 여부 (true이면 startDate/endDate 무시) */
  alwaysVisible: Scalars['Boolean']['output'];
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 종료일 (상시노출이면 null) */
  endDate: Maybe<Scalars['DateTime']['output']>;
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 팝업 ID */
  id: Scalars['ID']['output'];
  /** PC 이미지 URL (다크모드) — 메인배너 전용 */
  imageDarkUrl: Maybe<Scalars['String']['output']>;
  /** PC 이미지 URL (라이트모드) */
  imageUrl: Maybe<Scalars['String']['output']>;
  /** 활성 여부 */
  isActive: Scalars['Boolean']['output'];
  /** 연결 링크 URL */
  linkUrl: Maybe<Scalars['String']['output']>;
  /** 메인 슬로건 (최대 30자) — 메인배너 전용 */
  mainSlogan: Maybe<Scalars['String']['output']>;
  /** 미디어 타입 (IMAGE | VIDEO) — 메인배너 전용 */
  mediaType: Maybe<Scalars['String']['output']>;
  /** 모바일 이미지 URL (다크모드) — 메인배너 전용 */
  mobileDarkImageUrl: Maybe<Scalars['String']['output']>;
  /** 모바일 이미지 URL (라이트모드) — 메인배너 전용 */
  mobileImageUrl: Maybe<Scalars['String']['output']>;
  /** 팝업 유형 (POPUP | MINI_BANNER | SLIDE_BANNER) */
  popupType: PopupType;
  /** 정렬 순서 (비활성화 시 null) */
  sortOrder: Maybe<Scalars['Int']['output']>;
  /** 시작일 (상시노출이면 null) */
  startDate: Maybe<Scalars['DateTime']['output']>;
  /** 서브 슬로건/부제 (최대 30자) — 메인배너 전용 */
  subSlogan: Maybe<Scalars['String']['output']>;
  /** 새 창 열기 여부 (true: 새 창, false: 현재 창) */
  targetBlank: Scalars['Boolean']['output'];
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
  /** 영상 URL — 메인배너 mediaType=VIDEO일 때 사용 */
  videoUrl: Maybe<Scalars['String']['output']>;
};

/** 팝업/배너 유형 */
export enum PopupType {
  /** 미니배너 */
  MiniBanner = 'MINI_BANNER',
  /** 팝업 */
  Popup = 'POPUP',
  /** 슬라이드 배너 */
  SlideBanner = 'SLIDE_BANNER'
}

export type Query = {
  __typename?: 'Query';
  /** 활성 팝업 목록 조회 (현재 노출 기간 내) - URL 병원 경로(/anam|/guro|/ansan) 필요 */
  activePopups: Array<PopupModel>;
  /** 감사 로그 상세 조회 - 소속 병원 로그만 조회 */
  adminAuditLogById: AuditLogModel;
  /** 감사 로그 목록 조회 - 소속 병원 로그만 조회 */
  adminAuditLogs: PaginatedAuditLogResponse;
  /** 게시판 설정 목록 조회 - 소속 병원만 조회 */
  adminBoardSettings: Array<BoardSettingModel>;
  /** 관리자 콘텐츠 그룹 목록 조회 */
  adminContentGroups: Array<ContentGroupModel>;
  /** 관리자 콘텐츠 목록 조회 - 소속 병원 콘텐츠만 조회 */
  adminContents: Array<Content>;
  /** 관리자 의료진 목록 조회 - 소속 병원의 의료진만 조회 */
  adminDoctors: PaginatedAdminDoctorResponse;
  /** 관리자 전체 e-Consult 목록 조회 - 모든 신청 항목 (필터/페이지네이션 지원) */
  adminEConsults: PaginatedEConsultResponse;
  /** 관리자 e-Consult 자문의 목록 조회 */
  adminEconsultConsultants: Array<AdminEconsultConsultantModel>;
  /** 메뉴 트리 조회 - 유형별 상위/하위 메뉴 계층 구조 */
  adminMenus: Array<MenuModel>;
  /** 관리자 협력병의원 신청 상세 조회 */
  adminPartnerApplicationById: PartnerHospitalModel;
  /** 관리자 협력병의원 신청 목록 조회 */
  adminPartnerApplications: PaginatedAdminPartnerApplicationResponse;
  /** 관리자 협력병의원 수정요청 상세 조회 */
  adminPartnerUpdateRequestById: PartnerUpdateRequestModel;
  /** 관리자 협력병의원 수정요청 목록 조회 */
  adminPartnerUpdateRequests: Array<PartnerUpdateRequestModel>;
  /** 권한 그룹 변경 이력 조회 */
  adminPermissionAuditLogs: PaginatedAuditLogResponse;
  /** 관리자 팝업/배너 목록 조회 - 소속 병원만 조회 */
  adminPopups: PaginatedPopupResponse;
  /** 회원가입 승인/반려 검토용 회원 상세 조회 */
  adminUserApprovalById: User;
  /** 관리자 회원 상세 조회 */
  adminUserById: User;
  /** 관리자 회원 목록 조회 - 관리자 소속 병원의 회원만 조회 */
  adminUsers: PaginatedAdminUserResponse;
  /** 특정 엔티티에 연결된 첨부파일 목록 조회 */
  attachments: Array<AttachmentModel>;
  /** 게시글 상세 조회 - 조회수 자동 증가 */
  boardPostById: BoardPost;
  /** 게시글 목록 조회 - 게시판 유형별 페이지네이션, 병원별 노출 필터, 검색 지원 */
  boardPosts: PaginatedBoardPostResponse;
  /** 레거시 회원 확인 — 우리 DB + EHR 3개 병원 동시 조회 (비인증) */
  checkLegacyUser: LegacyUserCheckResult;
  /** 아이디 중복확인 - 우리 DB + EHR 3개 병원 동시 체크 (비인증) */
  checkUserIdAvailable: CheckUserIdResult;
  /** 본인인증 중복확인 - NICE 본인인증 토큰으로 CI/DI 중복 체크 (비인증) */
  checkVerificationDuplicate: VerificationDuplicateResult;
  /** 자문의 배정 eConsult 목록 조회 - 자문의 로그인 필요 */
  consultantAssignedEConsults: PaginatedEConsultResponse;
  /** 자문의 목록 조회 - 병원/진료과/전문분야/이름 검색 지원 */
  consultantDoctors: Array<DoctorModel>;
  /** 자문의 eConsult 상세 조회 - 자문의 로그인 필요 */
  consultantEConsultById: EConsultModel;
  /** 콘텐츠 상세 조회 - 콘텐츠 ID와 병원 코드(x-hospital-code 헤더)로 조회 */
  contentById: Maybe<Content>;
  /** 콘텐츠 목록 조회 - 병원 코드(x-hospital-code 헤더)로 병원별 필터 */
  contents: Array<Content>;
  /** eConsult 상세 조회 - 신청자 또는 관리자만 조회 가능 */
  eConsultById: EConsultModel;
  /** EHR 의사정보 존재여부 확인 - 면허번호로 EHR 내 의사 등록 여부 조회 (비인증 - 가입 전 검증용) */
  ehrCheckDoctorExists: EhrCheckResult;
  /** EHR 의사 가입 임시정보 조회 - 웹사용자 ID로 기존 가입 여부 확인 (비인증 - 가입 전 검증용) */
  ehrCheckDoctorTempInfo: EhrCheckResult;
  /** EHR 약처방 유무 체크 - 진료일 기준 약처방 존재여부 확인 */
  ehrCheckDrugOrderExists: EhrExistsResult;
  /** EHR 검사 유무 체크 - 진료일 기준 검사결과 존재여부 확인 */
  ehrCheckExamResultExists: EhrExistsResult;
  /** EHR 병원정보 존재여부 확인 - 요양기관번호로 EHR 내 병원 등록 여부 조회 (비인증 - 가입 전 검증용) */
  ehrCheckHospitalExists: EhrCheckResult;
  /** EHR 협력병의원 신청 임시정보 조회 - 요양기관번호로 기존 신청 여부 확인 (비인증 - 가입 전 검증용) */
  ehrCheckHospitalTempInfo: EhrCheckResult;
  /** EHR 협력병원 상세정보 조회 - 요양기관번호로 협력병원 상세 조회 */
  ehrGetCollaboratingHospitalInfo: CollaboratingHospitalDetail;
  /** 협력병원 검색 - EHR 기반 병원 검색 결과만 반환한다. */
  ehrGetCollaboratingHospitals: HospitalSearchResult;
  /** 약품 상세 조회 - 약품코드로 상세정보 조회 */
  ehrGetDrugOrderDetail: DrugOrderDetailResponse;
  /** 약처방 목록 조회 - 의뢰환자의 약처방 내역 */
  ehrGetDrugOrders: DrugOrderResponse;
  /** EHR 검사일자별 검사결과 조회 - 특정 검사일의 검사결과 목록 */
  ehrGetExamResultsByDate: ExamResultResponse;
  /** EHR 검사일자별 SLIP 조회 - 특정 검사일의 처방전 목록 */
  ehrGetExamSlipsByDate: ExamSlipResponse;
  /** EHR 환자정보 조회 - 환자 기본정보 반환 */
  ehrGetPatientInfo: PatientInfo;
  /** 의뢰환자 목록 조회 - 로그인 사용자의 면허번호 기반 EHR 조회 */
  ehrGetReferralPatients: ReferralPatientResponse;
  /** 진료회신서 조회 - 의뢰 식별자 기반 단건 조회 */
  ehrGetReferralReply: ReferralReplyResponse;
  /** EHR 특수검사결과 조회 - 영상/병리/내시경/핵의학 검사결과 (slipCd: L08=병리, R=영상, E=내시경, N=핵의학) */
  ehrGetSpecialExamResults: SpecialExamResultResponse;
  /** EHR 수진이력 조회 - 환자의 진료 내역 목록 */
  ehrGetVisitHistory: VisitHistoryResponse;
  /** 특정 Enum 조회 - 이름으로 Enum 값 목록 반환 (비인증) */
  enumByName: Maybe<EnumInfo>;
  /** 전체 Enum 목록 조회 - 시스템에 정의된 모든 Enum과 값 반환 (비인증) */
  enums: Array<EnumInfo>;
  /** 특정 권한그룹의 메뉴 권한 목록 */
  groupMenuPermissions: Array<MenuPermissionEntryModel>;
  /** 서버 상태 확인 - 정상이면 "ok" 반환 */
  health: Scalars['String']['output'];
  /** 강좌안내 조회 - KUMC 병원별 강좌/교육 게시글 프록시 (구로/안산만 지원, 안암은 빈 목록 반환) */
  hospitalLectures: HospitalArticleList;
  /** 병원뉴스 조회 - KUMC 병원별 뉴스 게시글 프록시 */
  hospitalNews: HospitalArticleList;
  /** 병원 SNS 조회 - KUMC 병원별 SNS/영상 게시글 프록시 */
  hospitalSns: HospitalArticleList;
  /** 관리자 영상검사 요청 상세 조회 */
  imagingRequestDetail: Maybe<ImagingRequestModel>;
  /** 영상검사 요청 오버레이 조회 - 외부 검사행 기준 내부 요청 상태 조회 */
  imagingRequestOverlay: Maybe<ImagingRequestModel>;
  /** 관리자 영상검사 요청 목록 조회 */
  imagingRequestsForAdmin: PaginatedImagingRequestResponse;
  /** 내 정보 조회 - 현재 로그인한 사용자 정보 반환 */
  me: MeEhrUser;
  /** ADMAP 홈페이지 진료과 목록 조회 - 병원 코드(x-hospital-code 헤더)로 조회 */
  medicalStaffDepartmentList: AdmapHomepageDepartmentListResponse;
  /** ADMAP 의료진 목록 조회 - 병원 코드(x-hospital-code 헤더)로 조회 */
  medicalStaffList: AdmapMedicalStaffListResponse;
  /** ADMAP 주간 일정 조회 - 병원 코드(x-hospital-code 헤더)로 조회 */
  medicalStaffWeeklySchedule: AdmapWeeklyScheduleListResponse;
  /** 권한그룹 목록 조회 */
  menuPermissionGroups: Array<MenuPermissionGroupModel>;
  /** 메뉴 트리 조회 - 병원별/유형별 활성 메뉴 계층 구조 (인증 불필요) */
  menus: Array<MenuModel>;
  /** 미니배너 목록 조회 - URL 병원 경로(/anam|/guro|/ansan) 필요 */
  miniBanners: Array<PopupModel>;
  /** 배정된 eConsult 목록 조회 - 관리자 전용 */
  myAssignedEConsults: PaginatedEConsultResponse;
  /** 내 eConsult 목록 조회 - 신청한 상담 목록 (필터/페이지네이션 지원) */
  myEConsults: PaginatedEConsultResponse;
  /** 내 메뉴 권한 목록 조회 */
  myMenuPermissions: Array<MenuPermissionEntryModel>;
  /** 내 협력병의원 신청 조회 (hospitalCode 기준, 단일) - 없으면 null */
  myPartnerApplication: Maybe<PartnerHospitalModel>;
  /** 내 협력병의원 신청 목록 조회 (현재 병원 컨텍스트 기준) */
  myPartnerApplications: PaginatedPartnerHospitalResponse;
  /** 내 협력병의원 수정요청 조회 */
  myPartnerUpdateRequest: Maybe<PartnerUpdateRequestModel>;
  /** 내 프로필 조회 - 현재 로그인한 사용자의 상세 프로필 반환 */
  myProfile: User;
  /** 협력병의원 신청 상세 조회 (ID 기준) */
  partnerApplicationById: PartnerHospitalModel;
  /** 권한그룹에 배정된 관리자 목록 조회 */
  permissionGroupMembers: Array<User>;
  /** 상단 고정 게시글 목록 조회 */
  pinnedPosts: Array<BoardPost>;
  /** 파일 다운로드용 Presigned URL 발급 (1시간 유효) */
  presignedDownloadUrl: Scalars['String']['output'];
  /** 슬라이드 배너 목록 조회 - URL 병원 경로(/anam|/guro|/ansan) 필요 */
  slideBanners: Array<PopupModel>;
  /** 사용자 상세 조회 - 관리자 전용, ID로 사용자 정보 조회 */
  userById: User;
};


export type QueryAdminAuditLogByIdArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type QueryAdminAuditLogsArgs = {
  filter?: InputMaybe<AuditLogFilterInput>;
  hospitalCode?: InputMaybe<HospitalCode>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryAdminBoardSettingsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
};


export type QueryAdminContentGroupsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
};


export type QueryAdminContentsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
};


export type QueryAdminDoctorsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryAdminEConsultsArgs = {
  filter?: InputMaybe<EConsultFilterInput>;
  hospitalCode?: InputMaybe<HospitalCode>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryAdminEconsultConsultantsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
};


export type QueryAdminMenusArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  menuType: MenuType;
};


export type QueryAdminPartnerApplicationByIdArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type QueryAdminPartnerApplicationsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  pagination?: InputMaybe<PaginationInput>;
  partnerType?: InputMaybe<PartnerType>;
  status?: InputMaybe<PartnerStatus>;
};


export type QueryAdminPartnerUpdateRequestByIdArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type QueryAdminPartnerUpdateRequestsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  status?: InputMaybe<PartnerUpdateRequestStatus>;
};


export type QueryAdminPermissionAuditLogsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryAdminPopupsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  pagination?: InputMaybe<PaginationInput>;
  popupType?: InputMaybe<PopupType>;
};


export type QueryAdminUserApprovalByIdArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type QueryAdminUserByIdArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type QueryAdminUsersArgs = {
  filter?: InputMaybe<AdminUserFilterInput>;
  hospitalCode?: InputMaybe<HospitalCode>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryAttachmentsArgs = {
  entityId: Scalars['ID']['input'];
  entityType: AttachmentEntityType;
};


export type QueryBoardPostByIdArgs = {
  boardId: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type QueryBoardPostsArgs = {
  boardId: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCheckLegacyUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryCheckUserIdAvailableArgs = {
  userId: Scalars['String']['input'];
};


export type QueryCheckVerificationDuplicateArgs = {
  verificationToken: Scalars['String']['input'];
};


export type QueryConsultantAssignedEConsultsArgs = {
  filter?: InputMaybe<EConsultFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryConsultantDoctorsArgs = {
  departmentCode?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  specialty?: InputMaybe<Scalars['String']['input']>;
};


export type QueryConsultantEConsultByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryContentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEConsultByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEhrCheckDoctorExistsArgs = {
  input: CheckDoctorExistsInput;
};


export type QueryEhrCheckDoctorTempInfoArgs = {
  hospitalCode: HospitalCode;
  wwwUserId: Scalars['String']['input'];
};


export type QueryEhrCheckDrugOrderExistsArgs = {
  input: PatientDateQueryInput;
};


export type QueryEhrCheckExamResultExistsArgs = {
  input: PatientDateQueryInput;
};


export type QueryEhrCheckHospitalExistsArgs = {
  input: CheckHospitalExistsInput;
};


export type QueryEhrCheckHospitalTempInfoArgs = {
  hospitalCode: HospitalCode;
  rcisNo: Scalars['String']['input'];
};


export type QueryEhrGetCollaboratingHospitalInfoArgs = {
  input: GetCollaboratingHospitalInfoInput;
};


export type QueryEhrGetCollaboratingHospitalsArgs = {
  input: SearchCollaboratingHospitalsInput;
};


export type QueryEhrGetDrugOrderDetailArgs = {
  input: DrugOrderDetailQueryInput;
};


export type QueryEhrGetDrugOrdersArgs = {
  input: DrugOrderQueryInput;
};


export type QueryEhrGetExamResultsByDateArgs = {
  input: PatientDateQueryInput;
};


export type QueryEhrGetExamSlipsByDateArgs = {
  input: ExamSlipQueryInput;
};


export type QueryEhrGetPatientInfoArgs = {
  input: PatientQueryInput;
};


export type QueryEhrGetReferralPatientsArgs = {
  input: ReferralPatientQueryInput;
};


export type QueryEhrGetReferralReplyArgs = {
  input: ReferralReplyQueryInput;
};


export type QueryEhrGetSpecialExamResultsArgs = {
  input: ExamSlipQueryInput;
};


export type QueryEhrGetVisitHistoryArgs = {
  input: VisitHistoryQueryInput;
};


export type QueryEnumByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGroupMenuPermissionsArgs = {
  groupId: Scalars['String']['input'];
};


export type QueryHospitalLecturesArgs = {
  pageRow?: InputMaybe<Scalars['Int']['input']>;
  startIndex?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHospitalNewsArgs = {
  pageRow?: InputMaybe<Scalars['Int']['input']>;
  startIndex?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHospitalSnsArgs = {
  pageRow?: InputMaybe<Scalars['Int']['input']>;
  startIndex?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryImagingRequestDetailArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  id: Scalars['String']['input'];
};


export type QueryImagingRequestOverlayArgs = {
  examDate: Scalars['String']['input'];
  orderCode: Scalars['String']['input'];
  pacsAccessNo?: InputMaybe<Scalars['String']['input']>;
  ptntNo: Scalars['String']['input'];
};


export type QueryImagingRequestsForAdminArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
  input?: InputMaybe<ImagingRequestListInput>;
};


export type QueryMedicalStaffListArgs = {
  filter?: InputMaybe<AdmapMedicalStaffFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryMedicalStaffWeeklyScheduleArgs = {
  mcdpCd: Scalars['String']['input'];
  mdcrYmd: Scalars['String']['input'];
};


export type QueryMenuPermissionGroupsArgs = {
  hospitalCode?: InputMaybe<HospitalCode>;
};


export type QueryMenusArgs = {
  menuType: MenuType;
};


export type QueryMyAssignedEConsultsArgs = {
  consultantDoctorId: Scalars['String']['input'];
  filter?: InputMaybe<EConsultFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryMyEConsultsArgs = {
  filter?: InputMaybe<EConsultFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryMyPartnerApplicationArgs = {
  hospitalCode: HospitalCode;
};


export type QueryMyPartnerApplicationsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryMyPartnerUpdateRequestArgs = {
  partnerApplicationId: Scalars['String']['input'];
};


export type QueryPartnerApplicationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPermissionGroupMembersArgs = {
  groupId: Scalars['String']['input'];
  hospitalCode?: InputMaybe<HospitalCode>;
};


export type QueryPinnedPostsArgs = {
  boardId: Scalars['String']['input'];
};


export type QueryPresignedDownloadUrlArgs = {
  attachmentId: Scalars['ID']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String']['input'];
};

export type ReferralPatientItem = {
  __typename?: 'ReferralPatientItem';
  age: Maybe<Scalars['String']['output']>;
  careInstitutionNo: Maybe<Scalars['String']['output']>;
  departmentCode: Maybe<Scalars['String']['output']>;
  departmentName: Maybe<Scalars['String']['output']>;
  doctorId: Maybe<Scalars['String']['output']>;
  doctorName: Maybe<Scalars['String']['output']>;
  drugOrderExists: Maybe<Scalars['String']['output']>;
  genderCode: Maybe<Scalars['String']['output']>;
  hospitalName: Maybe<Scalars['String']['output']>;
  infoConsentYn: Maybe<Scalars['String']['output']>;
  /** 자문의 여부 */
  isConsultant: Maybe<Scalars['Boolean']['output']>;
  patientName: Maybe<Scalars['String']['output']>;
  patientNo: Maybe<Scalars['String']['output']>;
  referralDate: Maybe<Scalars['String']['output']>;
  referralDepartmentCode: Maybe<Scalars['String']['output']>;
  referralDepartmentName: Maybe<Scalars['String']['output']>;
  referralDoctorName: Maybe<Scalars['String']['output']>;
  /** 의뢰일련번호 (회신서 조회 시 필요) */
  referralSeqNo: Maybe<Scalars['String']['output']>;
  /** 의뢰상태코드 (R: 의뢰, Y: 완료) */
  referralStatusCode: Maybe<Scalars['String']['output']>;
  replyDate: Maybe<Scalars['String']['output']>;
  visitDate: Maybe<Scalars['String']['output']>;
};

/** EHR 의뢰환자 조회 입력 - 병원코드 + 환자명(선택) */
export type ReferralPatientQueryInput = {
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 환자명 필터(선택) */
  ptntNm?: InputMaybe<Scalars['String']['input']>;
};

export type ReferralPatientResponse = {
  __typename?: 'ReferralPatientResponse';
  items: Array<ReferralPatientItem>;
  totalCount: Scalars['Float']['output'];
};

/** 진료회신서 상세 정보 */
export type ReferralReplyItem = {
  __typename?: 'ReferralReplyItem';
  /** 나이 */
  age: Maybe<Scalars['String']['output']>;
  /** 주민번호 뒷자리 */
  backResidentNo: Maybe<Scalars['String']['output']>;
  /** 진료과명 */
  departmentName: Maybe<Scalars['String']['output']>;
  /** 진단코드 */
  diagnosisCode: Maybe<Scalars['String']['output']>;
  /** 진단명 (상병명) */
  diagnosisName: Maybe<Scalars['String']['output']>;
  /** 진료의명 */
  doctorName: Maybe<Scalars['String']['output']>;
  /** 주민번호 앞자리 */
  frontResidentNo: Maybe<Scalars['String']['output']>;
  /** 성별코드 */
  genderCode: Maybe<Scalars['String']['output']>;
  /** 진료소견 및 경과 요약 */
  opinion: Maybe<Scalars['String']['output']>;
  /** 환자명 */
  patientName: Maybe<Scalars['String']['output']>;
  /** 전화번호 */
  phoneNo: Maybe<Scalars['String']['output']>;
  /** 의뢰일자 */
  referralDate: Maybe<Scalars['String']['output']>;
  /** 회신일자 */
  replyDate: Maybe<Scalars['String']['output']>;
  /** 진료기간 */
  treatmentPeriod: Maybe<Scalars['String']['output']>;
  /** 통원구분코드 */
  visitTypeCode: Maybe<Scalars['String']['output']>;
};

/** EHR 회신서 조회 입력 - 의뢰 식별자 기반 */
export type ReferralReplyQueryInput = {
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 환자번호 */
  ptno: Scalars['String']['input'];
  /** 의뢰일련번호 */
  refrSno: Scalars['String']['input'];
  /** 의뢰일자 (YYYYMMDD) */
  refrYmd: Scalars['String']['input'];
};

/** 진료회신서 응답 — 단건 */
export type ReferralReplyResponse = {
  __typename?: 'ReferralReplyResponse';
  item: Maybe<ReferralReplyItem>;
};

/** EHR 의사정보 등록 입력 */
export type RegisterDoctorEhrInput = {
  /** 진료과 */
  department?: InputMaybe<Scalars['String']['input']>;
  /** 면허번호 */
  drlcNo?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 등록 대상 병원 */
  hospitalCode: HospitalCode;
  /** 전문분야 */
  specialty?: InputMaybe<Scalars['String']['input']>;
  /** 전화번호 */
  telNo?: InputMaybe<Scalars['String']['input']>;
  /** 의사명 */
  userNm: Scalars['String']['input'];
  /** 웹 사용자 ID */
  wwwUserId: Scalars['String']['input'];
};

/** EHR 병원정보 등록 입력 (DVO 전체 필드) */
export type RegisterHospitalEhrInput = {
  /** 상세주소 */
  adrsDetlNm?: InputMaybe<Scalars['String']['input']>;
  /** 주소 */
  adrsNm?: InputMaybe<Scalars['String']['input']>;
  /** 우편번호 */
  adrsZpcd?: InputMaybe<Scalars['String']['input']>;
  /** 담당구분코드 */
  asgnClsfCd?: InputMaybe<Scalars['String']['input']>;
  /** 담당자명 */
  asgnNm?: InputMaybe<Scalars['String']['input']>;
  /** 담당직종 */
  asgnOcrsNm?: InputMaybe<Scalars['String']['input']>;
  /** 생년월일 (YYYYMMDD) */
  btdt?: InputMaybe<Scalars['String']['input']>;
  /** 대표자 연락처 */
  ceoCnpnVl?: InputMaybe<Scalars['String']['input']>;
  /** 문자수신동의 (Y/N) */
  chmeRecvAgrmYn?: InputMaybe<Scalars['String']['input']>;
  /** 협력구분코드1 */
  clbrDvsnCd1?: InputMaybe<Scalars['String']['input']>;
  /** 협력구분코드2 */
  clbrDvsnCd2?: InputMaybe<Scalars['String']['input']>;
  /** 협력구분코드3 */
  clbrDvsnCd3?: InputMaybe<Scalars['String']['input']>;
  /** 담당자 전화 */
  cnpnDscrCtn?: InputMaybe<Scalars['String']['input']>;
  /** 허가병상수 */
  crptSckbCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 면허번호 */
  drlcNo?: InputMaybe<Scalars['String']['input']>;
  /** 세부전공 */
  dtlsMajrCtn?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 */
  emadNm?: InputMaybe<Scalars['String']['input']>;
  /** 이메일회신동의 (Y/N) */
  emailRplyAgrmYn?: InputMaybe<Scalars['String']['input']>;
  /** 장비현황 */
  eqpmCtn?: InputMaybe<Scalars['String']['input']>;
  /** 팩스번호 */
  fxno?: InputMaybe<Scalars['String']['input']>;
  /** 성별 (M/F) */
  gendCd?: InputMaybe<Scalars['String']['input']>;
  /** 졸업년도 */
  grdtYy?: InputMaybe<Scalars['String']['input']>;
  /** 등록자ID */
  gvUserId?: InputMaybe<Scalars['String']['input']>;
  /** 등록자IP */
  gvUserIp?: InputMaybe<Scalars['String']['input']>;
  /** 의료인수 */
  hlofMnemCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 홈페이지 주소 */
  hmpgAdrsNm?: InputMaybe<Scalars['String']['input']>;
  /** 등록 대상 병원 */
  hospitalCode: HospitalCode;
  /** 병원분류코드 (10/20/30/50) */
  hsptClsfCd?: InputMaybe<Scalars['String']['input']>;
  /** 병원명 */
  hsptNm: Scalars['String']['input'];
  /** 비고 */
  hsptRmrkCtn?: InputMaybe<Scalars['String']['input']>;
  /** 진료과코드 */
  mcdpCd?: InputMaybe<Scalars['String']['input']>;
  /** 담당자 휴대폰 */
  mngnCnpnVl?: InputMaybe<Scalars['String']['input']>;
  /** 출신대학코드 */
  origMddpUnvrCd?: InputMaybe<Scalars['String']['input']>;
  /** 요양기관번호 */
  rcisNo: Scalars['String']['input'];
  /** 의뢰기관 의사수 */
  refrInstDrCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 의뢰기관 간호사수 */
  refrInstNursCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 회신요청 (Y/N) */
  rplyRqstYn?: InputMaybe<Scalars['String']['input']>;
  /** 병상수 */
  runSckbCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 전문진료과코드 */
  spcDprtMcdpCd?: InputMaybe<Scalars['String']['input']>;
  /** 전화번호 */
  tlno?: InputMaybe<Scalars['String']['input']>;
  /** 수련병원 */
  tragHsptNm?: InputMaybe<Scalars['String']['input']>;
  /** 대표자명 */
  userNm?: InputMaybe<Scalars['String']['input']>;
  /** 차량번호 */
  vhclNo?: InputMaybe<Scalars['String']['input']>;
};

/** 병원 신규등록 입력 - 의사 가입 시 병원검색에서 없을 때 간이 등록 (화면설계서 기준) */
export type RegisterHospitalInput = {
  /** 병원주소 */
  address: Scalars['String']['input'];
  /** 상세주소 */
  addressDetail?: InputMaybe<Scalars['String']['input']>;
  /** 요양기관번호 */
  careInstitutionNo: Scalars['String']['input'];
  directorBirthDate?: InputMaybe<Scalars['String']['input']>;
  directorDepartment?: InputMaybe<Scalars['String']['input']>;
  directorEmail?: InputMaybe<Scalars['String']['input']>;
  directorGender?: InputMaybe<Scalars['String']['input']>;
  directorGraduationYear?: InputMaybe<Scalars['String']['input']>;
  directorLicenseNo?: InputMaybe<Scalars['String']['input']>;
  directorName?: InputMaybe<Scalars['String']['input']>;
  directorPhone?: InputMaybe<Scalars['String']['input']>;
  directorSchool?: InputMaybe<Scalars['String']['input']>;
  directorSubSpecialty?: InputMaybe<Scalars['String']['input']>;
  directorTrainingHospital?: InputMaybe<Scalars['String']['input']>;
  emailConsent?: InputMaybe<Scalars['Boolean']['input']>;
  fax?: InputMaybe<Scalars['String']['input']>;
  /** 등록 대상 병원 (안암/구로/안산 - 프론트엔드 컨텍스트에서 전달) */
  hospitalCode: HospitalCode;
  /** 병원명 */
  hospitalName: Scalars['String']['input'];
  institutionType?: InputMaybe<Scalars['String']['input']>;
  nurseCount?: InputMaybe<Scalars['Int']['input']>;
  /** 대표전화 (-없이 입력) */
  phone: Scalars['String']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  replyConsent?: InputMaybe<Scalars['Boolean']['input']>;
  /** 대표자명 */
  representative: Scalars['String']['input'];
  smsConsent?: InputMaybe<Scalars['Boolean']['input']>;
  specialistCount?: InputMaybe<Scalars['Int']['input']>;
  staffDeptType?: InputMaybe<Scalars['String']['input']>;
  staffDeptValue?: InputMaybe<Scalars['String']['input']>;
  staffName?: InputMaybe<Scalars['String']['input']>;
  staffPhone?: InputMaybe<Scalars['String']['input']>;
  staffPosition?: InputMaybe<Scalars['String']['input']>;
  staffTel?: InputMaybe<Scalars['String']['input']>;
  totalBedCount?: InputMaybe<Scalars['Int']['input']>;
  totalStaffCount?: InputMaybe<Scalars['Int']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  /** 우편번호 */
  zipCode: Scalars['String']['input'];
};

/** 영상검사 요청 반려 입력 */
export type RejectImagingRequestInput = {
  /** 영상검사 요청 ID */
  imagingRequestId: Scalars['ID']['input'];
  /** 반려 사유 */
  reason: Scalars['String']['input'];
};

/** 메뉴 정렬 입력 */
export type ReorderMenusInput = {
  /** 정렬 항목 목록 */
  items: Array<MenuOrderItem>;
};

/** 팝업/배너 순서 변경 입력 */
export type ReorderPopupsInput = {
  /** 병원 코드 */
  hospitalCode: HospitalCode;
  /** 새 순서대로 나열한 팝업 ID 배열 (앞에 올수록 sortOrder 낮음) */
  orderedIds: Array<Scalars['String']['input']>;
  /** 팝업 유형 (POPUP | MINI_BANNER | SLIDE_BANNER) */
  popupType: PopupType;
};

/** eConsult 답변 입력 */
export type ReplyEConsultInput = {
  /** 답변 내용 */
  content: Scalars['String']['input'];
};

/** 비밀번호 재설정 요청 입력 */
export type RequestPasswordResetInput = {
  /** 이메일 */
  email: Scalars['String']['input'];
  /** 아이디 */
  userId: Scalars['String']['input'];
};

/** 본인인증 기반 임시비밀번호 발급 입력 */
export type ResetPasswordByVerificationInput = {
  /** 비밀번호를 재설정할 아이디 */
  userId: Scalars['String']['input'];
  /** 본인인증 확인 토큰 (completeVerification에서 발급) */
  verificationToken: Scalars['String']['input'];
};

/** 비밀번호 재설정 실행 입력 */
export type ResetPasswordInput = {
  /** 새 비밀번호 (8자 이상, 영문+숫자+특수문자) */
  newPassword: Scalars['String']['input'];
  /** 비밀번호 재설정 토큰 */
  token: Scalars['String']['input'];
};

/** EHR 협력병원 리스트 조회 입력 - 병원명/주소/분류코드로 검색 (최소 1개 필터 필수) */
export type SearchCollaboratingHospitalsInput = {
  /** 주소명 (부분 검색 가능) */
  adrsNm?: InputMaybe<Scalars['String']['input']>;
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 병원분류코드 */
  hsptClsfCd?: InputMaybe<Scalars['String']['input']>;
  /** 병원명 (부분 검색 가능) */
  hsptNm?: InputMaybe<Scalars['String']['input']>;
  /** 조회 시작 offset. 미전달 시 기존과 동일하게 전체 조회 동작을 유지한다 */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** 페이지당 조회 건수. 미전달 시 기존과 동일하게 전체 조회 동작을 유지한다 */
  pageCnt?: InputMaybe<Scalars['Int']['input']>;
};

/** 메뉴 권한 설정 입력 */
export type SetMenuPermissionInput = {
  /** 접근 권한 수준 */
  accessLevel: AccessLevel;
  /** 권한 그룹 ID */
  groupId: Scalars['String']['input'];
  /** 메뉴 ID */
  menuId: Scalars['String']['input'];
};

/** 회원가입 입력 - 의사 회원 전용 (화면설계서 기준) */
export type SignupInput = {
  /** 생년월일 (YYYY-MM-DD 형식) */
  birthDate: Scalars['String']['input'];
  /** 요양기관번호 */
  careInstitutionNo: Scalars['String']['input'];
  /** NICE 본인인증 연계정보확인값 (CI) - 본인인증 완료 후 전달 */
  ci?: InputMaybe<Scalars['String']['input']>;
  /** 진료과 */
  department: Scalars['String']['input'];
  /** NICE 본인인증 중복가입확인값 (DI) - 본인인증 완료 후 전달 */
  di?: InputMaybe<Scalars['String']['input']>;
  /** 회원구분 (의사, 치과의사, 한의사) */
  doctorType: DoctorType;
  /** 이메일 */
  email: Scalars['String']['input'];
  /** E-mail 동의여부 */
  emailConsent: Scalars['Boolean']['input'];
  /** 졸업년도 */
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  /** 병원 주소 (우편번호 검색으로 자동입력) */
  hospAddress: Scalars['String']['input'];
  /** 병원 상세주소 (선택) */
  hospAddressDetail?: InputMaybe<Scalars['String']['input']>;
  /** 병원명 (병원검색으로 입력) */
  hospName: Scalars['String']['input'];
  /** 대표전화 (-없이 입력) */
  hospPhone: Scalars['String']['input'];
  /** 병원 홈페이지 주소 (선택) */
  hospWebsite?: InputMaybe<Scalars['String']['input']>;
  /** 병원 우편번호 */
  hospZipCode: Scalars['String']['input'];
  /** 소속 병원 코드 (안암/구로/안산) */
  hospitalCode: HospitalCode;
  /** 원장여부 */
  isDirector: Scalars['Boolean']['input'];
  /** 의사면허번호 (-없이 입력) */
  licenseNo: Scalars['String']['input'];
  /** 비밀번호 (영문+숫자+특수문자 조합 8~12자리) */
  password: Scalars['String']['input'];
  /** 비밀번호 확인 */
  passwordConfirm: Scalars['String']['input'];
  /** 휴대전화 (본인인증에서 자동입력) */
  phone: Scalars['String']['input'];
  /** 회신서 수신 동의 여부 */
  replyConsent: Scalars['Boolean']['input'];
  /** 출신학교 */
  school: Scalars['String']['input'];
  /** SMS 동의여부 */
  smsConsent: Scalars['Boolean']['input'];
  /** 세부전공 (선택) */
  specialty?: InputMaybe<Scalars['String']['input']>;
  /** 수련병원명 */
  trainingHospital?: InputMaybe<Scalars['String']['input']>;
  /** 회원 ID (4자 이상, 중복확인 필요) */
  userId: Scalars['String']['input'];
  /** 의사명 (본인인증에서 자동입력) */
  userName: Scalars['String']['input'];
  /** NICE 본인인증 토큰 (completeVerification 응답, 10분 유효) */
  verificationToken: Scalars['String']['input'];
};

export type SmsTestResult = {
  __typename?: 'SmsTestResult';
  errorMessage: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

/** 특수검사(영상/병리/내시경/핵의학) 결과 항목 */
export type SpecialExamResultItem = {
  __typename?: 'SpecialExamResultItem';
  /** 진료과명 */
  departmentName: Maybe<Scalars['String']['output']>;
  /** 진료의명 */
  doctorName: Maybe<Scalars['String']['output']>;
  /** 검사일자 */
  examDate: Maybe<Scalars['String']['output']>;
  /** 육안소견 */
  grossResult: Maybe<Scalars['String']['output']>;
  /** 자문의 여부 */
  isConsultant: Maybe<Scalars['Boolean']['output']>;
  /** 처방코드 */
  orderCode: Maybe<Scalars['String']['output']>;
  /** 처방일자 */
  orderDate: Maybe<Scalars['String']['output']>;
  /** 처방명 */
  orderName: Maybe<Scalars['String']['output']>;
  /** PACS 접근번호 */
  pacsAccessNo: Maybe<Scalars['String']['output']>;
  /** 판독의 ID 1 */
  readerId1: Maybe<Scalars['String']['output']>;
  /** 판독의 ID 2 */
  readerId2: Maybe<Scalars['String']['output']>;
  /** 판독의 ID 3 */
  readerId3: Maybe<Scalars['String']['output']>;
  /** 판독결과 */
  resultContent: Maybe<Scalars['String']['output']>;
  /** 정렬순서 */
  sortOrder: Maybe<Scalars['String']['output']>;
  /** 검체코드 */
  specimenCode: Maybe<Scalars['String']['output']>;
  /** 검체번호 */
  specimenNo: Maybe<Scalars['String']['output']>;
};

/** 특수검사결과 조회 결과 */
export type SpecialExamResultResponse = {
  __typename?: 'SpecialExamResultResponse';
  /** 특수검사결과 목록 */
  items: Array<SpecialExamResultItem>;
  /** 총 건수 */
  totalCount: Scalars['Float']['output'];
};

/** 게시글 수정 입력 */
export type UpdateBoardPostInput = {
  /** 첨부파일 목록 */
  attachments?: InputMaybe<Array<BoardAttachmentInput>>;
  /** 게시판 아이디 */
  boardId?: InputMaybe<Scalars['String']['input']>;
  /** 내용 */
  content?: InputMaybe<Scalars['String']['input']>;
  /** 행사 종료일 (EVENT 유형) */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** 병원 코드 */
  hospitalCode?: InputMaybe<HospitalCode>;
  /** 상단 고정 여부 */
  isPinned?: InputMaybe<Scalars['Boolean']['input']>;
  /** 행사 시작일 (EVENT 유형) */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** 썸네일 URL (EVENT 유형) */
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** 게시판 설정 수정 입력 */
export type UpdateBoardSettingInput = {
  /** 첨부파일 사용 여부 */
  allowAttachments?: InputMaybe<Scalars['Boolean']['input']>;
  /** 게시판 설명(관리자 메모, 200자 이내) */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 게시판명 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 게시판 템플릿 유형 */
  templateType?: InputMaybe<BoardTemplateType>;
};

/** 콘텐츠 그룹 수정 입력 */
export type UpdateContentGroupInput = {
  /** 그룹명 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 정렬순서 */
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

/** 콘텐츠 수정 입력 */
export type UpdateContentInput = {
  /** 본문 */
  body?: InputMaybe<Scalars['String']['input']>;
  /** 콘텐츠 그룹 ID (null 전달 시 해제) */
  contentGroupId?: InputMaybe<Scalars['String']['input']>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** 의료진 수정 입력 */
export type UpdateDoctorInput = {
  /** 진료과 */
  department?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 소속 병원 */
  hospitalCode?: InputMaybe<HospitalCode>;
  /** 면허번호 */
  licenseNo?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 연락처 */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** 전문분야 */
  specialty?: InputMaybe<Scalars['String']['input']>;
  /** 회원 상태 */
  status?: InputMaybe<UserStatus>;
};

/** 의사 프로필 수정 입력 */
export type UpdateDoctorProfileInput = {
  /** 요양기관번호 */
  careInstitutionNo?: InputMaybe<Scalars['String']['input']>;
  /** 진료과 */
  department?: InputMaybe<Scalars['String']['input']>;
  /** 의사 구분 코드 (1=의사, 2=한의사, 3=치과의사) */
  doctorType?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 수신 동의 여부 */
  emailConsent?: InputMaybe<Scalars['Boolean']['input']>;
  /** 졸업년도 */
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  /** 병원 주소 */
  hospAddress?: InputMaybe<Scalars['String']['input']>;
  /** 병원 상세주소 */
  hospAddressDetail?: InputMaybe<Scalars['String']['input']>;
  /** 병원명 */
  hospName?: InputMaybe<Scalars['String']['input']>;
  /** 병원 대표전화 */
  hospPhone?: InputMaybe<Scalars['String']['input']>;
  /** 병원 홈페이지 */
  hospWebsite?: InputMaybe<Scalars['String']['input']>;
  /** 병원 우편번호 */
  hospZipCode?: InputMaybe<Scalars['String']['input']>;
  /** 원장 여부 */
  isDirector?: InputMaybe<Scalars['Boolean']['input']>;
  /** 의사면허번호 */
  licenseNo?: InputMaybe<Scalars['String']['input']>;
  /** 새 비밀번호 (8자 이상, 영문+숫자+특수문자) */
  newPassword?: InputMaybe<Scalars['String']['input']>;
  /** 현재 비밀번호 (비밀번호 변경 시 필수) */
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  /** 전화번호 */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** 회신 수신 동의 여부 */
  replyConsent?: InputMaybe<Scalars['Boolean']['input']>;
  /** 출신 학교 */
  school?: InputMaybe<Scalars['String']['input']>;
  /** SMS 수신 동의 여부 */
  smsConsent?: InputMaybe<Scalars['Boolean']['input']>;
  /** 전문분야 */
  specialty?: InputMaybe<Scalars['String']['input']>;
  /** 수련병원명 */
  trainingHospital?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  userName?: InputMaybe<Scalars['String']['input']>;
};

/** e-Consult 자문의 이메일 수정 입력 */
export type UpdateEconsultConsultantEmailInput = {
  /** 변경할 이메일 */
  email: Scalars['String']['input'];
};

/** EHR 병원정보 수정 입력 (DVO 전체 필드) */
export type UpdateHospitalEhrInput = {
  /** 상세주소 */
  adrsDetlNm?: InputMaybe<Scalars['String']['input']>;
  /** 주소 */
  adrsNm?: InputMaybe<Scalars['String']['input']>;
  /** 우편번호 */
  adrsZpcd?: InputMaybe<Scalars['String']['input']>;
  /** 담당구분코드 */
  asgnClsfCd?: InputMaybe<Scalars['String']['input']>;
  /** 담당자명 */
  asgnNm?: InputMaybe<Scalars['String']['input']>;
  /** 담당직종 */
  asgnOcrsNm?: InputMaybe<Scalars['String']['input']>;
  /** 생년월일 (YYYYMMDD) */
  btdt?: InputMaybe<Scalars['String']['input']>;
  /** 대표자 연락처 */
  ceoCnpnVl?: InputMaybe<Scalars['String']['input']>;
  /** 문자수신동의 (Y/N) */
  chmeRecvAgrmYn?: InputMaybe<Scalars['String']['input']>;
  /** 협력구분코드1 */
  clbrDvsnCd1?: InputMaybe<Scalars['String']['input']>;
  /** 협력구분코드2 */
  clbrDvsnCd2?: InputMaybe<Scalars['String']['input']>;
  /** 협력구분코드3 */
  clbrDvsnCd3?: InputMaybe<Scalars['String']['input']>;
  /** 담당자 전화 */
  cnpnDscrCtn?: InputMaybe<Scalars['String']['input']>;
  /** 허가병상수 */
  crptSckbCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 면허번호 */
  drlcNo?: InputMaybe<Scalars['String']['input']>;
  /** 세부전공 */
  dtlsMajrCtn?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 */
  emadNm?: InputMaybe<Scalars['String']['input']>;
  /** 이메일회신동의 (Y/N) */
  emailRplyAgrmYn?: InputMaybe<Scalars['String']['input']>;
  /** 장비현황 */
  eqpmCtn?: InputMaybe<Scalars['String']['input']>;
  /** 팩스번호 */
  fxno?: InputMaybe<Scalars['String']['input']>;
  /** 성별 (M/F) */
  gendCd?: InputMaybe<Scalars['String']['input']>;
  /** 졸업년도 */
  grdtYy?: InputMaybe<Scalars['String']['input']>;
  /** 등록자ID */
  gvUserId?: InputMaybe<Scalars['String']['input']>;
  /** 등록자IP */
  gvUserIp?: InputMaybe<Scalars['String']['input']>;
  /** 의료인수 */
  hlofMnemCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 홈페이지 주소 */
  hmpgAdrsNm?: InputMaybe<Scalars['String']['input']>;
  /** 대상 병원 */
  hospitalCode: HospitalCode;
  /** 병원분류코드 (10/20/30/50) */
  hsptClsfCd?: InputMaybe<Scalars['String']['input']>;
  /** 병원명 */
  hsptNm?: InputMaybe<Scalars['String']['input']>;
  /** 비고 */
  hsptRmrkCtn?: InputMaybe<Scalars['String']['input']>;
  /** 진료과코드 */
  mcdpCd?: InputMaybe<Scalars['String']['input']>;
  /** 담당자 휴대폰 */
  mngnCnpnVl?: InputMaybe<Scalars['String']['input']>;
  /** 출신대학코드 */
  origMddpUnvrCd?: InputMaybe<Scalars['String']['input']>;
  /** 요양기관번호 */
  rcisNo: Scalars['String']['input'];
  /** 의뢰기관 의사수 */
  refrInstDrCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 의뢰기관 간호사수 */
  refrInstNursCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 회신요청 (Y/N) */
  rplyRqstYn?: InputMaybe<Scalars['String']['input']>;
  /** 병상수 */
  runSckbCnt?: InputMaybe<Scalars['Int']['input']>;
  /** 전문진료과코드 */
  spcDprtMcdpCd?: InputMaybe<Scalars['String']['input']>;
  /** 전화번호 */
  tlno?: InputMaybe<Scalars['String']['input']>;
  /** 수련병원 */
  tragHsptNm?: InputMaybe<Scalars['String']['input']>;
  /** 대표자명 */
  userNm?: InputMaybe<Scalars['String']['input']>;
  /** 차량번호 */
  vhclNo?: InputMaybe<Scalars['String']['input']>;
};

/** EHR 회원상태코드 변경 입력 */
export type UpdateMemberStatusInput = {
  /** 대상 병원 */
  hospitalCode: HospitalCode;
  /** 회원상태코드 (1:일반, 2:휴면, 3:삭제, 4:미가입) */
  wwwMmbrSttsCd: Scalars['String']['input'];
  /** 웹 사용자 ID */
  wwwUserId: Scalars['String']['input'];
};

/** 메뉴 수정 입력 */
export type UpdateMenuInput = {
  /** 외부 링크 URL */
  externalUrl?: InputMaybe<Scalars['String']['input']>;
  /** GNB 노출 여부 */
  gnbExposure?: InputMaybe<Scalars['Boolean']['input']>;
  /** 병원 코드 */
  hospitalCode?: InputMaybe<HospitalCode>;
  /** 아이콘명 */
  iconName?: InputMaybe<Scalars['String']['input']>;
  /** 활성 여부 */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** 메뉴 타깃 유형 */
  menuTargetType?: InputMaybe<MenuTargetType>;
  /** 메뉴명 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 상위 메뉴 ID */
  parentId?: InputMaybe<Scalars['String']['input']>;
  /** 경로 */
  path?: InputMaybe<Scalars['String']['input']>;
  /** 정렬순서 */
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  /** 연결할 게시판 ID */
  targetBoardId?: InputMaybe<Scalars['String']['input']>;
  /** 연결할 게시판 유형 */
  targetBoardType?: InputMaybe<BoardType>;
  /** 연결할 콘텐츠 ID */
  targetContentId?: InputMaybe<Scalars['String']['input']>;
};

/** 메뉴 권한 그룹 수정 입력 */
export type UpdateMenuPermissionGroupInput = {
  /** 그룹명 */
  name: Scalars['String']['input'];
};

/** 협력병의원 수정요청 입력 */
export type UpdatePartnerApplicationInput = {
  /** 첨부파일 메타데이터(JSON 배열) */
  attachments?: InputMaybe<Scalars['JSON']['input']>;
  /** 병원장 차량번호 */
  directorCarNo?: InputMaybe<Scalars['String']['input']>;
  /** 병원 팩스번호 */
  hospitalFaxNumber?: InputMaybe<Scalars['String']['input']>;
  /** 수정 대상 신청 ID */
  id: Scalars['ID']['input'];
  /** 의료기관 유형 */
  institutionType?: InputMaybe<InstitutionType>;
  /** 주요 보유 장비(협력의원 전용) */
  majorEquipment?: InputMaybe<Scalars['String']['input']>;
  /** 간호사 수 */
  nurseCount?: InputMaybe<Scalars['Int']['input']>;
  /** 병원 특성 및 기타사항 */
  remarks?: InputMaybe<Scalars['String']['input']>;
  /** 전문의 수 */
  specialistCount?: InputMaybe<Scalars['Int']['input']>;
  /** 총 병상 수(협력의원 전용) */
  totalBedCount?: InputMaybe<Scalars['Int']['input']>;
  /** 총 직원 수 */
  totalStaffCount?: InputMaybe<Scalars['Int']['input']>;
};

/** 팝업/배너 수정 입력 */
export type UpdatePopupInput = {
  /** 이미지 대체 텍스트 (alt) — 메인배너 전용 */
  altText?: InputMaybe<Scalars['String']['input']>;
  /** 상시노출 여부 */
  alwaysVisible?: InputMaybe<Scalars['Boolean']['input']>;
  /** 종료일 (상시노출이면 null) */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** PC 이미지 URL (다크모드) — 메인배너 전용 */
  imageDarkUrl?: InputMaybe<Scalars['String']['input']>;
  /** PC 이미지 URL (라이트모드) */
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  /** 활성 여부 (false로 변경 시 sortOrder 자동 초기화) */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** 연결 링크 URL */
  linkUrl?: InputMaybe<Scalars['String']['input']>;
  /** 메인 슬로건 (최대 30자) — 메인배너 전용 */
  mainSlogan?: InputMaybe<Scalars['String']['input']>;
  /** 미디어 타입 (IMAGE | VIDEO) — 메인배너 전용 */
  mediaType?: InputMaybe<Scalars['String']['input']>;
  /** 모바일 이미지 URL (다크모드) — 메인배너 전용 */
  mobileDarkImageUrl?: InputMaybe<Scalars['String']['input']>;
  /** 모바일 이미지 URL (라이트모드) — 메인배너 전용 */
  mobileImageUrl?: InputMaybe<Scalars['String']['input']>;
  /** 정렬순서 */
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  /** 시작일 (상시노출이면 null) */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** 서브 슬로건/부제 (최대 30자) — 메인배너 전용 */
  subSlogan?: InputMaybe<Scalars['String']['input']>;
  /** 새 창 열기 여부 */
  targetBlank?: InputMaybe<Scalars['Boolean']['input']>;
  /** 영상 URL — 메인배너 전용 */
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};

/** 프로필 수정 입력 */
export type UpdateProfileInput = {
  /** 이메일 */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 전화번호 */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  userName?: InputMaybe<Scalars['String']['input']>;
};

/** 사용자 */
export type User = {
  __typename?: 'User';
  /** 허용 IP (설정 시 해당 IP에서만 로그인 가능) */
  allowedIp: Maybe<Scalars['String']['output']>;
  /** 생성일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 이메일 */
  email: Scalars['String']['output'];
  /** 소속 병원 */
  hospitalCode: Maybe<HospitalCode>;
  /** 고유 ID */
  id: Scalars['ID']['output'];
  /** 마지막 로그인 일시 */
  lastLoginAt: Maybe<Scalars['DateTime']['output']>;
  /** 마지막 로그인 IP */
  lastLoginIp: Maybe<Scalars['String']['output']>;
  /** 비밀번호 변경 필요 여부 */
  mustChangePw: Scalars['Boolean']['output'];
  /** 전화번호 */
  phone: Maybe<Scalars['String']['output']>;
  /** 프로필 정보 */
  profile: Maybe<UserProfile>;
  /** 가입 반려 사유 */
  rejectReason: Maybe<Scalars['String']['output']>;
  /** 계정 상태 */
  status: UserStatus;
  /** 수정일시 */
  updatedAt: Scalars['DateTime']['output'];
  /** 로그인 아이디 */
  userId: Scalars['String']['output'];
  /** 이름 */
  userName: Scalars['String']['output'];
  /** 회원 유형 */
  userType: UserType;
  /** 회원 탈퇴 일시 */
  withdrawnAt: Maybe<Scalars['DateTime']['output']>;
};

/** 사용자 프로필 (추가 정보) */
export type UserProfile = {
  __typename?: 'UserProfile';
  /** 생년월일 */
  birthDate: Maybe<Scalars['DateTime']['output']>;
  /** 요양기관번호 */
  careInstitutionNo: Maybe<Scalars['String']['output']>;
  /** 진료과 */
  department: Maybe<Scalars['String']['output']>;
  /** 의사 세부유형 (1=의사/양방, 2=한의사/한방, 3=치과의사/치방) */
  doctorType: Maybe<DoctorType>;
  /** E-mail 동의여부 */
  emailConsent: Scalars['Boolean']['output'];
  /** 성별 */
  gender: Maybe<Gender>;
  /** 졸업년도 */
  graduationYear: Maybe<Scalars['String']['output']>;
  /** 병원주소 */
  hospAddress: Maybe<Scalars['String']['output']>;
  /** 병원 상세주소 */
  hospAddressDetail: Maybe<Scalars['String']['output']>;
  /** 병원코드 (레거시) */
  hospCode: Maybe<Scalars['String']['output']>;
  /** 병원명 */
  hospName: Maybe<Scalars['String']['output']>;
  /** 대표전화 */
  hospPhone: Maybe<Scalars['String']['output']>;
  /** 병원 홈페이지 주소 */
  hospWebsite: Maybe<Scalars['String']['output']>;
  /** 병원 우편번호 */
  hospZipCode: Maybe<Scalars['String']['output']>;
  /** 원장여부 */
  isDirector: Scalars['Boolean']['output'];
  /** 의사면허번호 */
  licenseNo: Maybe<Scalars['String']['output']>;
  /** 회신서 수신 동의 여부 */
  replyConsent: Scalars['Boolean']['output'];
  /** 대표자명 (레거시) */
  representative: Maybe<Scalars['String']['output']>;
  /** 출신학교 */
  school: Maybe<Scalars['String']['output']>;
  /** SMS 동의여부 */
  smsConsent: Scalars['Boolean']['output'];
  /** 전문분야 (세부전공) */
  specialty: Maybe<Scalars['String']['output']>;
  /** 수련병원명 */
  trainingHospital: Maybe<Scalars['String']['output']>;
};

/** 사용자 상태 */
export enum UserStatus {
  /** 정상 */
  Active = 'ACTIVE',
  /** 승인대기 */
  Pending = 'PENDING',
  /** 거부 */
  Rejected = 'REJECTED',
  /** 탈퇴 */
  Withdrawn = 'WITHDRAWN'
}

/** 사용자 유형 */
export enum UserType {
  /** 관리자 */
  Admin = 'ADMIN',
  /** 의사 */
  Doctor = 'DOCTOR'
}

/** 본인인증 중복확인 결과 */
export type VerificationDuplicateResult = {
  __typename?: 'VerificationDuplicateResult';
  /** 중복 여부 (true = 이미 가입됨) */
  isDuplicate: Scalars['Boolean']['output'];
  /** 중복 사유 메시지 */
  message: Maybe<Scalars['String']['output']>;
};

/** NICE 본인인증 결과 */
export type VerificationResultOutput = {
  __typename?: 'VerificationResultOutput';
  /** 연령대 코드 (NICE 원본값) */
  ageCode: Maybe<Scalars['String']['output']>;
  /** 인증수단 (M:휴대폰, I:아이핀) - NICE REST API에서는 제공하지 않음 */
  authMethod: Maybe<Scalars['String']['output']>;
  /** 생년월일 (YYYYMMDD) */
  birthDate: Scalars['String']['output'];
  /** 연계정보확인값 (CI) - DB 저장용 */
  ci: Scalars['String']['output'];
  /** CI2 값 (NICE 원본값) */
  ci2: Maybe<Scalars['String']['output']>;
  /** 중복가입확인값 (DI) - DB 저장용 */
  di: Scalars['String']['output'];
  /** 성별 (M/F) */
  gender: Scalars['String']['output'];
  /** 통신사 코드 (NICE 원본값) */
  mobileCo: Maybe<Scalars['String']['output']>;
  /** 인증된 이름 */
  name: Scalars['String']['output'];
  /** 내/외국인 구분 (0:내국인, 1:외국인) */
  nationalInfo: Maybe<Scalars['String']['output']>;
  /** 휴대전화번호 (휴대폰인증 시) */
  phone: Maybe<Scalars['String']['output']>;
  /** NICE 복호화 원본 전체 payload (디버깅용) */
  rawNiceData: Maybe<Scalars['JSON']['output']>;
  /** 본인인증 확인 토큰 - 아이디/비밀번호 찾기 시 사용 (10분 유효) */
  verificationToken: Maybe<Scalars['String']['output']>;
  /** 가상번호 (NICE 원본값) */
  vnumber: Maybe<Scalars['String']['output']>;
};

/** 수진이력(진료내역) 항목 */
export type VisitHistoryItem = {
  __typename?: 'VisitHistoryItem';
  /** 입원일자 */
  admissionDate: Maybe<Scalars['String']['output']>;
  /** 진료과명 */
  departmentName: Maybe<Scalars['String']['output']>;
  /** 진단명 */
  diagnosisName: Maybe<Scalars['String']['output']>;
  /** 담당의 ID */
  doctorId: Maybe<Scalars['String']['output']>;
  /** 담당의명 */
  doctorName: Maybe<Scalars['String']['output']>;
  /** 자문의 여부 */
  isConsultant: Maybe<Scalars['Boolean']['output']>;
  /** 병실번호 */
  roomNo: Maybe<Scalars['String']['output']>;
  /** 진료일자 */
  visitDate: Maybe<Scalars['String']['output']>;
  /** 진료일시 */
  visitDatetime: Maybe<Scalars['String']['output']>;
  /** 진료구분코드 */
  visitTypeCode: Maybe<Scalars['String']['output']>;
  /** 진료구분명 (외래/입원 등) */
  visitTypeName: Maybe<Scalars['String']['output']>;
  /** 병동코드 */
  wardCode: Maybe<Scalars['String']['output']>;
  /** 병동명 */
  wardName: Maybe<Scalars['String']['output']>;
};

/** EHR 수진이력 조회 입력 - 환자번호 + 날짜범위 */
export type VisitHistoryQueryInput = {
  /** 조회 시작일 (YYYYMMDD) */
  fromDt?: InputMaybe<Scalars['String']['input']>;
  /** 조회 대상 병원 */
  hospitalCode: HospitalCode;
  /** 진료과코드 */
  mcdpCd?: InputMaybe<Scalars['String']['input']>;
  /** 환자번호 */
  ptntNo: Scalars['String']['input'];
  /** 조회 종료일 (YYYYMMDD) */
  toDt?: InputMaybe<Scalars['String']['input']>;
};

/** 수진이력 조회 결과 */
export type VisitHistoryResponse = {
  __typename?: 'VisitHistoryResponse';
  /** 수진이력 목록 */
  items: Array<VisitHistoryItem>;
  /** 총 건수 */
  totalCount: Scalars['Float']['output'];
};

/** 회원 탈퇴 입력 */
export type WithdrawMemberInput = {
  /** 비밀번호 확인 */
  password: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, mustChangePw: boolean, user: { __typename?: 'User', id: string, userId: string, email: string, userName: string, userType: UserType, hospitalCode: HospitalCode | null, phone: string | null, status: UserStatus, mustChangePw: boolean, profile: { __typename?: 'UserProfile', birthDate: any | null, department: string | null, gender: Gender | null, doctorType: DoctorType | null, isDirector: boolean, hospAddress: string | null, hospAddressDetail: string | null, hospCode: string | null, hospName: string | null, hospPhone: string | null, hospWebsite: string | null, hospZipCode: string | null, careInstitutionNo: string | null, licenseNo: string | null, representative: string | null, school: string | null, smsConsent: boolean, emailConsent: boolean, replyConsent: boolean, specialty: string | null } | null } } };

export type SendTestEmailMutationVariables = Exact<{
  to: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  body: Scalars['String']['input'];
  hospitalCode?: InputMaybe<HospitalCode>;
}>;


export type SendTestEmailMutation = { __typename?: 'Mutation', sendTestEmail: { __typename?: 'EmailTestResult', success: boolean, status: string, errorMessage: string | null } };

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, mustChangePw: boolean, user: { __typename?: 'User', id: string, userId: string, email: string, userName: string, userType: UserType, hospitalCode: HospitalCode | null, phone: string | null, status: UserStatus, mustChangePw: boolean } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateDoctorProfileMutationVariables = Exact<{
  input: UpdateDoctorProfileInput;
}>;


export type UpdateDoctorProfileMutation = { __typename?: 'Mutation', updateDoctorProfile: { __typename?: 'User', id: string, userId: string, userName: string, email: string, phone: string | null, userType: UserType, status: UserStatus, hospitalCode: HospitalCode | null, profile: { __typename?: 'UserProfile', birthDate: any | null, gender: Gender | null, doctorType: DoctorType | null, licenseNo: string | null, isDirector: boolean, school: string | null, specialty: string | null, department: string | null, graduationYear: string | null, trainingHospital: string | null, smsConsent: boolean, emailConsent: boolean, replyConsent: boolean, hospName: string | null, careInstitutionNo: string | null, hospZipCode: string | null, hospAddress: string | null, hospAddressDetail: string | null, hospPhone: string | null, hospWebsite: string | null } | null } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'MessageResponse', success: boolean, message: string } };

export type WithdrawMemberMutationVariables = Exact<{
  input: WithdrawMemberInput;
}>;


export type WithdrawMemberMutation = { __typename?: 'Mutation', withdrawMember: { __typename?: 'MessageResponse', success: boolean, message: string } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, mustChangePw: boolean, user: { __typename?: 'User', id: string, userId: string, email: string, userName: string, userType: UserType, hospitalCode: HospitalCode | null, phone: string | null, status: UserStatus, mustChangePw: boolean, profile: { __typename?: 'UserProfile', birthDate: any | null, department: string | null, gender: Gender | null, doctorType: DoctorType | null, isDirector: boolean, hospAddress: string | null, hospAddressDetail: string | null, hospCode: string | null, hospName: string | null, hospPhone: string | null, hospWebsite: string | null, hospZipCode: string | null, careInstitutionNo: string | null, licenseNo: string | null, representative: string | null, school: string | null, smsConsent: boolean, emailConsent: boolean, replyConsent: boolean, specialty: string | null } | null } } };

export type CheckUserIdAvailableQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type CheckUserIdAvailableQuery = { __typename?: 'Query', checkUserIdAvailable: { __typename?: 'CheckUserIdResult', available: boolean, existsInDb: boolean, existsInEhr: boolean } };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile: { __typename?: 'User', id: string, userId: string, userName: string, email: string, phone: string | null, userType: UserType, status: UserStatus, hospitalCode: HospitalCode | null, profile: { __typename?: 'UserProfile', birthDate: any | null, gender: Gender | null, doctorType: DoctorType | null, licenseNo: string | null, isDirector: boolean, school: string | null, specialty: string | null, department: string | null, graduationYear: string | null, trainingHospital: string | null, smsConsent: boolean, emailConsent: boolean, replyConsent: boolean, hospName: string | null, careInstitutionNo: string | null, hospZipCode: string | null, hospAddress: string | null, hospAddressDetail: string | null, hospPhone: string | null, hospWebsite: string | null } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeEhrUser', email: string | null, userName: string | null, phone: string | null, profile: { __typename?: 'MeEhrProfile', birthDate: any | null, department: string | null, gender: string | null, hospName: string | null, careInstitutionNo: string | null, licenseNo: string | null, school: string | null, specialty: string | null, graduationYear: string | null, trainingHospital: string | null } | null } };

export type EnumsQueryVariables = Exact<{ [key: string]: never; }>;


export type EnumsQuery = { __typename?: 'Query', enums: Array<{ __typename?: 'EnumInfo', name: string, description: string, values: Array<{ __typename?: 'EnumValue', key: string, label: string }> }> };

export type EnumByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type EnumByNameQuery = { __typename?: 'Query', enumByName: { __typename?: 'EnumInfo', name: string, description: string, values: Array<{ __typename?: 'EnumValue', key: string, label: string }> } | null };

export type RequestImagingExamMutationVariables = Exact<{
  input: CreateImagingRequestInput;
}>;


export type RequestImagingExamMutation = { __typename?: 'Mutation', requestImagingExam: { __typename?: 'ImagingRequestModel', id: string, status: ImagingRequestStatus, displayState: ImagingRequestDisplayState, requestedAt: any, expiresAt: any, attachments: Array<{ __typename?: 'AttachmentModel', id: string, originalName: string, mimeType: string, fileSize: number, storedPath: string, createdAt: any | null }> | null } };

export type RegisterHospitalMutationVariables = Exact<{
  input: RegisterHospitalInput;
}>;


export type RegisterHospitalMutation = { __typename?: 'Mutation', registerHospital: { __typename?: 'HospitalModel', id: string | null, name: string, representative: string | null, phisCode: string | null, address: string | null, addressDetail: string | null, phone: string | null, zipCode: string | null, website: string | null, classificationCode: string | null } };

export type EhrGetReferralPatientsQueryVariables = Exact<{
  input: ReferralPatientQueryInput;
}>;


export type EhrGetReferralPatientsQuery = { __typename?: 'Query', ehrGetReferralPatients: { __typename?: 'ReferralPatientResponse', totalCount: number, items: Array<{ __typename?: 'ReferralPatientItem', patientNo: string | null, patientName: string | null, genderCode: string | null, age: string | null, visitDate: string | null, departmentCode: string | null, departmentName: string | null, doctorId: string | null, doctorName: string | null, referralDepartmentCode: string | null, referralDepartmentName: string | null, referralDoctorName: string | null, drugOrderExists: string | null, infoConsentYn: string | null, replyDate: string | null, referralDate: string | null, careInstitutionNo: string | null, hospitalName: string | null, referralSeqNo: string | null, referralStatusCode: string | null, isConsultant: boolean | null }> } };

export type EhrGetReferralReplyQueryVariables = Exact<{
  input: ReferralReplyQueryInput;
}>;


export type EhrGetReferralReplyQuery = { __typename?: 'Query', ehrGetReferralReply: { __typename?: 'ReferralReplyResponse', item: { __typename?: 'ReferralReplyItem', referralDate: string | null, departmentName: string | null, doctorName: string | null, patientName: string | null, genderCode: string | null, age: string | null, frontResidentNo: string | null, backResidentNo: string | null, diagnosisCode: string | null, diagnosisName: string | null, treatmentPeriod: string | null, visitTypeCode: string | null, opinion: string | null, replyDate: string | null, phoneNo: string | null } | null } };

export type EhrGetVisitHistoryQueryVariables = Exact<{
  input: VisitHistoryQueryInput;
}>;


export type EhrGetVisitHistoryQuery = { __typename?: 'Query', ehrGetVisitHistory: { __typename?: 'VisitHistoryResponse', totalCount: number, items: Array<{ __typename?: 'VisitHistoryItem', visitDate: string | null, visitDatetime: string | null, departmentName: string | null, doctorId: string | null, doctorName: string | null, visitTypeCode: string | null, visitTypeName: string | null, admissionDate: string | null, wardCode: string | null, wardName: string | null, roomNo: string | null, diagnosisName: string | null }> } };

export type EhrGetExamResultsByDateQueryVariables = Exact<{
  input: PatientDateQueryInput;
}>;


export type EhrGetExamResultsByDateQuery = { __typename?: 'Query', ehrGetExamResultsByDate: { __typename?: 'ExamResultResponse', totalCount: number, items: Array<{ __typename?: 'ExamResultItem', departmentName: string | null, doctorName: string | null, examCode: string | null, examDate: string | null, examRoomCode: string | null, examRoomName: string | null, normalLowerLimit: string | null, normalUpperLimit: string | null, orderName: string | null, resultContent: string | null, resultFormatCode: string | null, resultRemark: string | null, resultUnit: string | null }> } };

export type EhrGetExamSlipsByDateQueryVariables = Exact<{
  input: ExamSlipQueryInput;
}>;


export type EhrGetExamSlipsByDateQuery = { __typename?: 'Query', ehrGetExamSlipsByDate: { __typename?: 'ExamSlipResponse', totalCount: number, items: Array<{ __typename?: 'ExamSlipItem', departmentCode: string | null, departmentName: string | null, doctorId: string | null, doctorName: string | null, enforceDate: string | null, enforceDatetime: string | null, examCode: string | null, orderName: string | null, slipCode: string | null, slipName: string | null, treatmentDate: string | null }> } };

export type EhrGetSpecialExamResultsQueryVariables = Exact<{
  input: ExamSlipQueryInput;
}>;


export type EhrGetSpecialExamResultsQuery = { __typename?: 'Query', ehrGetSpecialExamResults: { __typename?: 'SpecialExamResultResponse', totalCount: number, items: Array<{ __typename?: 'SpecialExamResultItem', departmentName: string | null, doctorName: string | null, examDate: string | null, grossResult: string | null, orderCode: string | null, orderDate: string | null, orderName: string | null, pacsAccessNo: string | null, readerId1: string | null, readerId2: string | null, readerId3: string | null, resultContent: string | null, sortOrder: string | null, specimenCode: string | null, specimenNo: string | null }> } };

export type EhrGetDrugOrdersQueryVariables = Exact<{
  input: DrugOrderQueryInput;
}>;


export type EhrGetDrugOrdersQuery = { __typename?: 'Query', ehrGetDrugOrders: { __typename?: 'DrugOrderResponse', totalCount: number, items: Array<{ __typename?: 'DrugOrderItem', orderCode: string | null, orderName: string | null, orderDate: string | null, dose: string | null, totalAmount: string | null, unit: string | null, count: string | null, useDay: string | null, type: string | null, methodWhen: string | null, methodHow: string | null, departmentName: string | null, doctorName: string | null, dosage: string | null, doseUnit: string | null, frequency: string | null, days: string | null, usage: string | null, visitDate: string | null }> } };

export type EhrGetDrugOrderDetailQueryVariables = Exact<{
  input: DrugOrderDetailQueryInput;
}>;


export type EhrGetDrugOrderDetailQuery = { __typename?: 'Query', ehrGetDrugOrderDetail: { __typename?: 'DrugOrderDetailResponse', item: { __typename?: 'DrugOrderDetailItem', drugCode: string | null, drugName: string | null, prodName: string | null, ingredient: string | null, drugType: string | null, drugTypeName: string | null, unit: string | null, manufacturer: string | null, description: string | null } | null } };

export type ImagingRequestOverlayQueryVariables = Exact<{
  ptntNo: Scalars['String']['input'];
  examDate: Scalars['String']['input'];
  orderCode: Scalars['String']['input'];
  pacsAccessNo?: InputMaybe<Scalars['String']['input']>;
}>;


export type ImagingRequestOverlayQuery = { __typename?: 'Query', imagingRequestOverlay: { __typename?: 'ImagingRequestModel', id: string, displayState: ImagingRequestDisplayState, status: ImagingRequestStatus, requestedAt: any, expiresAt: any, attachments: Array<{ __typename?: 'AttachmentModel', id: string, originalName: string, mimeType: string, fileSize: number, storedPath: string, createdAt: any | null }> | null } | null };

export type MedicalStaffListQueryVariables = Exact<{
  filter?: InputMaybe<AdmapMedicalStaffFilterInput>;
}>;


export type MedicalStaffListQuery = { __typename?: 'Query', medicalStaffList: { __typename?: 'AdmapMedicalStaffListResponse', totalCount: number, items: Array<{ __typename?: 'AdmapMedicalStaffListItem', doctorId: string, doctorName: string, photoUrl: string | null, departmentCode: string, departmentName: string, hospitalCode: HospitalCode, specialty: string | null, drNo: string | null }> } };

export type EhrGetCollaboratingHospitalsQueryVariables = Exact<{
  input: SearchCollaboratingHospitalsInput;
}>;


export type EhrGetCollaboratingHospitalsQuery = { __typename?: 'Query', ehrGetCollaboratingHospitals: { __typename?: 'HospitalSearchResult', totalCount: number, hospitals: Array<{ __typename?: 'HospitalModel', id: string | null, name: string, address: string | null, addressDetail: string | null, phisCode: string | null, classificationCode: string | null, phone: string | null, faxNumber: string | null, representative: string | null, website: string | null, zipCode: string | null }> } };

export type EhrGetCollaboratingHospitalInfoQueryVariables = Exact<{
  input: GetCollaboratingHospitalInfoInput;
}>;


export type EhrGetCollaboratingHospitalInfoQuery = { __typename?: 'Query', ehrGetCollaboratingHospitalInfo: { __typename?: 'CollaboratingHospitalDetail', name: string | null, careInstitutionNo: string | null, address: string | null, addressDetail: string | null, zipCode: string | null, phone: string | null, fax: string | null, website: string | null, representative: string | null, classificationCode: string | null, collaborationDivisionCode: string | null } };

export type HospitalSnsQueryVariables = Exact<{
  pageRow?: InputMaybe<Scalars['Int']['input']>;
  startIndex?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HospitalSnsQuery = { __typename?: 'Query', hospitalSns: { __typename?: 'HospitalArticleList', totalCount: number, articles: Array<{ __typename?: 'HospitalArticle', articleNo: number, title: string, linkUrl: string | null, thumbnailUrl: string | null, category: string | null, createdDt: string, hospitalName: string, writer: string }> } };

export type HospitalNewsQueryVariables = Exact<{
  pageRow?: InputMaybe<Scalars['Int']['input']>;
  startIndex?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HospitalNewsQuery = { __typename?: 'Query', hospitalNews: { __typename?: 'HospitalArticleList', totalCount: number, articles: Array<{ __typename?: 'HospitalArticle', articleNo: number, title: string, linkUrl: string | null, thumbnailUrl: string | null, category: string | null, createdDt: string, hospitalName: string, writer: string }> } };

export type HospitalLecturesQueryVariables = Exact<{
  pageRow?: InputMaybe<Scalars['Int']['input']>;
  startIndex?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HospitalLecturesQuery = { __typename?: 'Query', hospitalLectures: { __typename?: 'HospitalArticleList', totalCount: number, articles: Array<{ __typename?: 'HospitalArticle', articleNo: number, title: string, linkUrl: string | null, thumbnailUrl: string | null, category: string | null, createdDt: string, hospitalName: string, writer: string }> } };

export type MenusQueryVariables = Exact<{
  menuType: MenuType;
}>;


export type MenusQuery = { __typename?: 'Query', menus: Array<{ __typename?: 'MenuModel', id: string, name: string, path: string | null, sortOrder: number, menuTargetType: MenuTargetType | null, targetBoardType: BoardType | null, targetBoardId: string | null, targetContentId: string | null, externalUrl: string | null, gnbExposure: boolean, iconName: string | null, firstChildPath: string | null, children: Array<{ __typename?: 'MenuModel', id: string, name: string, path: string | null, sortOrder: number, menuTargetType: MenuTargetType | null, targetBoardType: BoardType | null, targetBoardId: string | null, targetContentId: string | null, externalUrl: string | null, gnbExposure: boolean, iconName: string | null }> | null }> };

export type BoardPostsQueryVariables = Exact<{
  boardId: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type BoardPostsQuery = { __typename?: 'Query', boardPosts: { __typename?: 'PaginatedBoardPostResponse', totalCount: number, items: Array<{ __typename?: 'BoardPost', id: string, title: string, content: string, createdAt: any, thumbnailUrl: string | null, isPinned: boolean, viewCount: number }> }, pinnedPosts: Array<{ __typename?: 'BoardPost', id: string, title: string, content: string, createdAt: any, thumbnailUrl: string | null, isPinned: boolean, viewCount: number }> };

export type BoardPostByIdQueryVariables = Exact<{
  boardId: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type BoardPostByIdQuery = { __typename?: 'Query', boardPostById: { __typename?: 'BoardPost', id: string, title: string, content: string, createdAt: any, thumbnailUrl: string | null, isPinned: boolean, viewCount: number } };

export type AttachmentsQueryVariables = Exact<{
  entityId: Scalars['ID']['input'];
  entityType: AttachmentEntityType;
}>;


export type AttachmentsQuery = { __typename?: 'Query', attachments: Array<{ __typename?: 'AttachmentModel', id: string, originalName: string, storedPath: string, mimeType: string, fileSize: number, createdAt: any | null }> };

export type PresignedDownloadUrlQueryVariables = Exact<{
  attachmentId: Scalars['ID']['input'];
}>;


export type PresignedDownloadUrlQuery = { __typename?: 'Query', presignedDownloadUrl: string };

export type ContentByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ContentByIdQuery = { __typename?: 'Query', contentById: { __typename?: 'Content', id: string, title: string, body: string, hospitalCode: HospitalCode, contentGroupName: string | null, updatedAt: any } | null };

export type ApplyPartnerHospitalMutationVariables = Exact<{
  input: ApplyPartnerHospitalInput;
}>;


export type ApplyPartnerHospitalMutation = { __typename?: 'Mutation', applyPartnerHospital: { __typename?: 'PartnerHospitalModel', id: string, applicantId: string, hospitalCode: HospitalCode, careInstitutionNo: string | null, partnerType: PartnerType | null, hospitalName: string | null, hospitalAddress: string | null, hospitalAddressDetail: string | null, hospitalPhone: string | null, hospitalRepresentative: string | null, hospitalZipCode: string | null, hospitalFaxNumber: string | null, hospitalWebsite: string | null, institutionType: InstitutionType | null, status: PartnerStatus, createdAt: any, updatedAt: any } };

export type UpdatePartnerApplicationMutationVariables = Exact<{
  input: UpdatePartnerApplicationInput;
}>;


export type UpdatePartnerApplicationMutation = { __typename?: 'Mutation', updatePartnerApplication: { __typename?: 'PartnerHospitalModel', id: string, status: PartnerStatus, hospitalCode: HospitalCode, careInstitutionNo: string | null, partnerType: PartnerType | null, hospitalName: string | null, hospitalAddress: string | null, hospitalAddressDetail: string | null, hospitalPhone: string | null, hospitalRepresentative: string | null, hospitalZipCode: string | null, hospitalFaxNumber: string | null, hospitalWebsite: string | null, institutionType: InstitutionType | null, directorName: string | null, directorPhone: string | null, directorEmail: string | null, staffName: string | null, staffPhone: string | null, staffEmail: string | null, remarks: string | null, createdAt: any, updatedAt: any } };

export type PartnerHospitalFieldsFragment = { __typename?: 'PartnerHospitalModel', id: string, applicantId: string, hospitalCode: HospitalCode, careInstitutionNo: string | null, partnerType: PartnerType | null, hospitalName: string | null, hospitalAddress: string | null, hospitalAddressDetail: string | null, hospitalPhone: string | null, hospitalRepresentative: string | null, hospitalSpecialties: string | null, hospitalZipCode: string | null, hospitalFaxNumber: string | null, hospitalWebsite: string | null, institutionType: InstitutionType | null, status: PartnerStatus, isDirector: boolean | null, directorName: string | null, directorBirthDate: string | null, directorGender: string | null, directorLicenseNo: string | null, directorSchool: string | null, directorGraduationYear: string | null, directorTrainingHospital: string | null, directorDepartment: string | null, directorSubSpecialty: string | null, directorCarNo: string | null, directorPhone: string | null, directorEmail: string | null, directorSmsConsent: boolean | null, directorEmailConsent: boolean | null, directorReplyConsent: boolean | null, staffName: string | null, staffPosition: string | null, staffDeptType: string | null, staffDeptValue: string | null, staffPhone: string | null, staffTel: string | null, staffEmail: string | null, totalBedCount: number | null, activeBedCount: number | null, icuCount: number | null, premiumRoomCount: number | null, multiRoomCount: number | null, erCount: number | null, totalStaffCount: number | null, specialistCount: number | null, nurseCount: number | null, hasIcu: boolean | null, hasEr: boolean | null, hasOperatingRoom: boolean | null, hasPhysicalTherapy: boolean | null, hasDialysisRoom: boolean | null, hasHospice: boolean | null, hasPsychGeneral: boolean | null, hasPsychClosed: boolean | null, hasIntegratedNursing: boolean | null, hasGuardianCare: boolean | null, hasSharedCare: boolean | null, isolationRoomCount: number | null, isolationSingleCount: number | null, isolationDoubleCount: number | null, isolationTripleCount: number | null, isolationTypes: any | null, isolationCareType: string | null, isolationRehabType: string | null, isolationWardOperation: boolean | null, hasRehabPt: boolean | null, hasRehabOt: boolean | null, hasRehabSt: boolean | null, hasRehabSwallow: boolean | null, hasRehabIsolation: boolean | null, departmentSpecialists: any | null, availableTreatments: any | null, clinicMedicationType: string | null, clinicHasHemodialysis: boolean | null, clinicHasPeritoneal: boolean | null, clinicHasPhototherapy: boolean | null, clinicHasExcimerLaser: boolean | null, majorEquipment: string | null, remarks: string | null, attachments: any | null, rejectReason: string | null, approvedAt: any | null, createdAt: any, updatedAt: any, attachmentRows: Array<{ __typename?: 'AttachmentModel', id: string, originalName: string, storedPath: string, mimeType: string, fileSize: number, createdAt: any | null }> | null };

export type MyPartnerApplicationQueryVariables = Exact<{
  hospitalCode: HospitalCode;
}>;


export type MyPartnerApplicationQuery = { __typename?: 'Query', myPartnerApplication: { __typename?: 'PartnerHospitalModel', id: string, applicantId: string, hospitalCode: HospitalCode, careInstitutionNo: string | null, partnerType: PartnerType | null, hospitalName: string | null, hospitalAddress: string | null, hospitalAddressDetail: string | null, hospitalPhone: string | null, hospitalRepresentative: string | null, hospitalSpecialties: string | null, hospitalZipCode: string | null, hospitalFaxNumber: string | null, hospitalWebsite: string | null, institutionType: InstitutionType | null, status: PartnerStatus, isDirector: boolean | null, directorName: string | null, directorBirthDate: string | null, directorGender: string | null, directorLicenseNo: string | null, directorSchool: string | null, directorGraduationYear: string | null, directorTrainingHospital: string | null, directorDepartment: string | null, directorSubSpecialty: string | null, directorCarNo: string | null, directorPhone: string | null, directorEmail: string | null, directorSmsConsent: boolean | null, directorEmailConsent: boolean | null, directorReplyConsent: boolean | null, staffName: string | null, staffPosition: string | null, staffDeptType: string | null, staffDeptValue: string | null, staffPhone: string | null, staffTel: string | null, staffEmail: string | null, totalBedCount: number | null, activeBedCount: number | null, icuCount: number | null, premiumRoomCount: number | null, multiRoomCount: number | null, erCount: number | null, totalStaffCount: number | null, specialistCount: number | null, nurseCount: number | null, hasIcu: boolean | null, hasEr: boolean | null, hasOperatingRoom: boolean | null, hasPhysicalTherapy: boolean | null, hasDialysisRoom: boolean | null, hasHospice: boolean | null, hasPsychGeneral: boolean | null, hasPsychClosed: boolean | null, hasIntegratedNursing: boolean | null, hasGuardianCare: boolean | null, hasSharedCare: boolean | null, isolationRoomCount: number | null, isolationSingleCount: number | null, isolationDoubleCount: number | null, isolationTripleCount: number | null, isolationTypes: any | null, isolationCareType: string | null, isolationRehabType: string | null, isolationWardOperation: boolean | null, hasRehabPt: boolean | null, hasRehabOt: boolean | null, hasRehabSt: boolean | null, hasRehabSwallow: boolean | null, hasRehabIsolation: boolean | null, departmentSpecialists: any | null, availableTreatments: any | null, clinicMedicationType: string | null, clinicHasHemodialysis: boolean | null, clinicHasPeritoneal: boolean | null, clinicHasPhototherapy: boolean | null, clinicHasExcimerLaser: boolean | null, majorEquipment: string | null, remarks: string | null, attachments: any | null, rejectReason: string | null, approvedAt: any | null, createdAt: any, updatedAt: any, attachmentRows: Array<{ __typename?: 'AttachmentModel', id: string, originalName: string, storedPath: string, mimeType: string, fileSize: number, createdAt: any | null }> | null } | null };

export type MyPartnerApplicationsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type MyPartnerApplicationsQuery = { __typename?: 'Query', myPartnerApplications: { __typename?: 'PaginatedPartnerHospitalResponse', totalCount: number, hasNextPage: boolean, cursor: string | null, items: Array<{ __typename?: 'PartnerHospitalModel', id: string, applicantId: string, hospitalCode: HospitalCode, careInstitutionNo: string | null, partnerType: PartnerType | null, hospitalName: string | null, hospitalAddress: string | null, hospitalAddressDetail: string | null, hospitalPhone: string | null, hospitalRepresentative: string | null, hospitalSpecialties: string | null, hospitalZipCode: string | null, hospitalFaxNumber: string | null, hospitalWebsite: string | null, institutionType: InstitutionType | null, status: PartnerStatus, isDirector: boolean | null, directorName: string | null, directorBirthDate: string | null, directorGender: string | null, directorLicenseNo: string | null, directorSchool: string | null, directorGraduationYear: string | null, directorTrainingHospital: string | null, directorDepartment: string | null, directorSubSpecialty: string | null, directorCarNo: string | null, directorPhone: string | null, directorEmail: string | null, directorSmsConsent: boolean | null, directorEmailConsent: boolean | null, directorReplyConsent: boolean | null, staffName: string | null, staffPosition: string | null, staffDeptType: string | null, staffDeptValue: string | null, staffPhone: string | null, staffTel: string | null, staffEmail: string | null, totalBedCount: number | null, activeBedCount: number | null, icuCount: number | null, premiumRoomCount: number | null, multiRoomCount: number | null, erCount: number | null, totalStaffCount: number | null, specialistCount: number | null, nurseCount: number | null, hasIcu: boolean | null, hasEr: boolean | null, hasOperatingRoom: boolean | null, hasPhysicalTherapy: boolean | null, hasDialysisRoom: boolean | null, hasHospice: boolean | null, hasPsychGeneral: boolean | null, hasPsychClosed: boolean | null, hasIntegratedNursing: boolean | null, hasGuardianCare: boolean | null, hasSharedCare: boolean | null, isolationRoomCount: number | null, isolationSingleCount: number | null, isolationDoubleCount: number | null, isolationTripleCount: number | null, isolationTypes: any | null, isolationCareType: string | null, isolationRehabType: string | null, isolationWardOperation: boolean | null, hasRehabPt: boolean | null, hasRehabOt: boolean | null, hasRehabSt: boolean | null, hasRehabSwallow: boolean | null, hasRehabIsolation: boolean | null, departmentSpecialists: any | null, availableTreatments: any | null, clinicMedicationType: string | null, clinicHasHemodialysis: boolean | null, clinicHasPeritoneal: boolean | null, clinicHasPhototherapy: boolean | null, clinicHasExcimerLaser: boolean | null, majorEquipment: string | null, remarks: string | null, attachments: any | null, rejectReason: string | null, approvedAt: any | null, createdAt: any, updatedAt: any, attachmentRows: Array<{ __typename?: 'AttachmentModel', id: string, originalName: string, storedPath: string, mimeType: string, fileSize: number, createdAt: any | null }> | null }> } };

export type PartnerApplicationByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PartnerApplicationByIdQuery = { __typename?: 'Query', partnerApplicationById: { __typename?: 'PartnerHospitalModel', reviewedAt: any | null, reviewedById: string | null, terminatedAt: any | null, id: string, applicantId: string, hospitalCode: HospitalCode, careInstitutionNo: string | null, partnerType: PartnerType | null, hospitalName: string | null, hospitalAddress: string | null, hospitalAddressDetail: string | null, hospitalPhone: string | null, hospitalRepresentative: string | null, hospitalSpecialties: string | null, hospitalZipCode: string | null, hospitalFaxNumber: string | null, hospitalWebsite: string | null, institutionType: InstitutionType | null, status: PartnerStatus, isDirector: boolean | null, directorName: string | null, directorBirthDate: string | null, directorGender: string | null, directorLicenseNo: string | null, directorSchool: string | null, directorGraduationYear: string | null, directorTrainingHospital: string | null, directorDepartment: string | null, directorSubSpecialty: string | null, directorCarNo: string | null, directorPhone: string | null, directorEmail: string | null, directorSmsConsent: boolean | null, directorEmailConsent: boolean | null, directorReplyConsent: boolean | null, staffName: string | null, staffPosition: string | null, staffDeptType: string | null, staffDeptValue: string | null, staffPhone: string | null, staffTel: string | null, staffEmail: string | null, totalBedCount: number | null, activeBedCount: number | null, icuCount: number | null, premiumRoomCount: number | null, multiRoomCount: number | null, erCount: number | null, totalStaffCount: number | null, specialistCount: number | null, nurseCount: number | null, hasIcu: boolean | null, hasEr: boolean | null, hasOperatingRoom: boolean | null, hasPhysicalTherapy: boolean | null, hasDialysisRoom: boolean | null, hasHospice: boolean | null, hasPsychGeneral: boolean | null, hasPsychClosed: boolean | null, hasIntegratedNursing: boolean | null, hasGuardianCare: boolean | null, hasSharedCare: boolean | null, isolationRoomCount: number | null, isolationSingleCount: number | null, isolationDoubleCount: number | null, isolationTripleCount: number | null, isolationTypes: any | null, isolationCareType: string | null, isolationRehabType: string | null, isolationWardOperation: boolean | null, hasRehabPt: boolean | null, hasRehabOt: boolean | null, hasRehabSt: boolean | null, hasRehabSwallow: boolean | null, hasRehabIsolation: boolean | null, departmentSpecialists: any | null, availableTreatments: any | null, clinicMedicationType: string | null, clinicHasHemodialysis: boolean | null, clinicHasPeritoneal: boolean | null, clinicHasPhototherapy: boolean | null, clinicHasExcimerLaser: boolean | null, majorEquipment: string | null, remarks: string | null, attachments: any | null, rejectReason: string | null, approvedAt: any | null, createdAt: any, updatedAt: any, attachmentRows: Array<{ __typename?: 'AttachmentModel', id: string, originalName: string, storedPath: string, mimeType: string, fileSize: number, createdAt: any | null }> | null } };

export type SlideBannersQueryVariables = Exact<{ [key: string]: never; }>;


export type SlideBannersQuery = { __typename?: 'Query', slideBanners: Array<{ __typename?: 'PopupModel', id: string, hospitalCode: HospitalCode, popupType: PopupType, isActive: boolean, alwaysVisible: boolean, targetBlank: boolean, imageUrl: string | null, imageDarkUrl: string | null, mobileImageUrl: string | null, mobileDarkImageUrl: string | null, linkUrl: string | null, altText: string | null, mainSlogan: string | null, subSlogan: string | null, mediaType: string | null, videoUrl: string | null, sortOrder: number | null }> };

export type MiniBannersQueryVariables = Exact<{ [key: string]: never; }>;


export type MiniBannersQuery = { __typename?: 'Query', miniBanners: Array<{ __typename?: 'PopupModel', id: string, hospitalCode: HospitalCode, popupType: PopupType, isActive: boolean, targetBlank: boolean, imageUrl: string | null, mobileImageUrl: string | null, linkUrl: string | null, altText: string | null, sortOrder: number | null }> };

export type ActivePopupsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivePopupsQuery = { __typename?: 'Query', activePopups: Array<{ __typename?: 'PopupModel', id: string, hospitalCode: HospitalCode, popupType: PopupType, isActive: boolean, alwaysVisible: boolean, targetBlank: boolean, imageUrl: string | null, imageDarkUrl: string | null, mobileImageUrl: string | null, mobileDarkImageUrl: string | null, linkUrl: string | null, altText: string | null, mainSlogan: string | null, subSlogan: string | null, mediaType: string | null, videoUrl: string | null, sortOrder: number | null }> };

export type InitiateVerificationMutationVariables = Exact<{
  input: InitiateVerificationInput;
}>;


export type InitiateVerificationMutation = { __typename?: 'Mutation', initiateVerification: { __typename?: 'InitiateVerificationOutput', authUrl: string, sessionId: string } };

export type CompleteVerificationMutationVariables = Exact<{
  input: CompleteVerificationInput;
}>;


export type CompleteVerificationMutation = { __typename?: 'Mutation', completeVerification: { __typename?: 'VerificationResultOutput', authMethod: string | null, birthDate: string, ci: string, di: string, gender: string, name: string, nationalInfo: string | null, phone: string | null, verificationToken: string | null } };

export type FindUserIdByVerificationMutationVariables = Exact<{
  input: FindUserIdByVerificationInput;
}>;


export type FindUserIdByVerificationMutation = { __typename?: 'Mutation', findUserIdByVerification: { __typename?: 'FindUserIdPayload', maskedUserId: string } };

export type ResetPasswordByVerificationMutationVariables = Exact<{
  input: ResetPasswordByVerificationInput;
}>;


export type ResetPasswordByVerificationMutation = { __typename?: 'Mutation', resetPasswordByVerification: { __typename?: 'MessageResponse', message: string, success: boolean } };

export type CheckVerificationDuplicateQueryVariables = Exact<{
  verificationToken: Scalars['String']['input'];
}>;


export type CheckVerificationDuplicateQuery = { __typename?: 'Query', checkVerificationDuplicate: { __typename?: 'VerificationDuplicateResult', isDuplicate: boolean, message: string | null } };

export const PartnerHospitalFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PartnerHospitalFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PartnerHospitalModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"applicantId"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"partnerType"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalRepresentative"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalSpecialties"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalFaxNumber"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"institutionType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isDirector"}},{"kind":"Field","name":{"kind":"Name","value":"directorName"}},{"kind":"Field","name":{"kind":"Name","value":"directorBirthDate"}},{"kind":"Field","name":{"kind":"Name","value":"directorGender"}},{"kind":"Field","name":{"kind":"Name","value":"directorLicenseNo"}},{"kind":"Field","name":{"kind":"Name","value":"directorSchool"}},{"kind":"Field","name":{"kind":"Name","value":"directorGraduationYear"}},{"kind":"Field","name":{"kind":"Name","value":"directorTrainingHospital"}},{"kind":"Field","name":{"kind":"Name","value":"directorDepartment"}},{"kind":"Field","name":{"kind":"Name","value":"directorSubSpecialty"}},{"kind":"Field","name":{"kind":"Name","value":"directorCarNo"}},{"kind":"Field","name":{"kind":"Name","value":"directorPhone"}},{"kind":"Field","name":{"kind":"Name","value":"directorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"directorSmsConsent"}},{"kind":"Field","name":{"kind":"Name","value":"directorEmailConsent"}},{"kind":"Field","name":{"kind":"Name","value":"directorReplyConsent"}},{"kind":"Field","name":{"kind":"Name","value":"staffName"}},{"kind":"Field","name":{"kind":"Name","value":"staffPosition"}},{"kind":"Field","name":{"kind":"Name","value":"staffDeptType"}},{"kind":"Field","name":{"kind":"Name","value":"staffDeptValue"}},{"kind":"Field","name":{"kind":"Name","value":"staffPhone"}},{"kind":"Field","name":{"kind":"Name","value":"staffTel"}},{"kind":"Field","name":{"kind":"Name","value":"staffEmail"}},{"kind":"Field","name":{"kind":"Name","value":"totalBedCount"}},{"kind":"Field","name":{"kind":"Name","value":"activeBedCount"}},{"kind":"Field","name":{"kind":"Name","value":"icuCount"}},{"kind":"Field","name":{"kind":"Name","value":"premiumRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"multiRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"erCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalStaffCount"}},{"kind":"Field","name":{"kind":"Name","value":"specialistCount"}},{"kind":"Field","name":{"kind":"Name","value":"nurseCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasIcu"}},{"kind":"Field","name":{"kind":"Name","value":"hasEr"}},{"kind":"Field","name":{"kind":"Name","value":"hasOperatingRoom"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalTherapy"}},{"kind":"Field","name":{"kind":"Name","value":"hasDialysisRoom"}},{"kind":"Field","name":{"kind":"Name","value":"hasHospice"}},{"kind":"Field","name":{"kind":"Name","value":"hasPsychGeneral"}},{"kind":"Field","name":{"kind":"Name","value":"hasPsychClosed"}},{"kind":"Field","name":{"kind":"Name","value":"hasIntegratedNursing"}},{"kind":"Field","name":{"kind":"Name","value":"hasGuardianCare"}},{"kind":"Field","name":{"kind":"Name","value":"hasSharedCare"}},{"kind":"Field","name":{"kind":"Name","value":"isolationRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationSingleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationDoubleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationTripleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationTypes"}},{"kind":"Field","name":{"kind":"Name","value":"isolationCareType"}},{"kind":"Field","name":{"kind":"Name","value":"isolationRehabType"}},{"kind":"Field","name":{"kind":"Name","value":"isolationWardOperation"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabPt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabOt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabSt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabSwallow"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabIsolation"}},{"kind":"Field","name":{"kind":"Name","value":"departmentSpecialists"}},{"kind":"Field","name":{"kind":"Name","value":"availableTreatments"}},{"kind":"Field","name":{"kind":"Name","value":"clinicMedicationType"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasHemodialysis"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasPeritoneal"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasPhototherapy"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasExcimerLaser"}},{"kind":"Field","name":{"kind":"Name","value":"majorEquipment"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentRows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"storedPath"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rejectReason"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PartnerHospitalFieldsFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"mustChangePw"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mustChangePw"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"doctorType"}},{"kind":"Field","name":{"kind":"Name","value":"isDirector"}},{"kind":"Field","name":{"kind":"Name","value":"hospAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospName"}},{"kind":"Field","name":{"kind":"Name","value":"hospPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"hospZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"licenseNo"}},{"kind":"Field","name":{"kind":"Name","value":"representative"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"smsConsent"}},{"kind":"Field","name":{"kind":"Name","value":"emailConsent"}},{"kind":"Field","name":{"kind":"Name","value":"replyConsent"}},{"kind":"Field","name":{"kind":"Name","value":"specialty"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SendTestEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendTestEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hospitalCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"HospitalCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendTestEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"hospitalCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hospitalCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<SendTestEmailMutation, SendTestEmailMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"mustChangePw"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mustChangePw"}}]}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const UpdateDoctorProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDoctorProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDoctorProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDoctorProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"doctorType"}},{"kind":"Field","name":{"kind":"Name","value":"licenseNo"}},{"kind":"Field","name":{"kind":"Name","value":"isDirector"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"specialty"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"graduationYear"}},{"kind":"Field","name":{"kind":"Name","value":"trainingHospital"}},{"kind":"Field","name":{"kind":"Name","value":"smsConsent"}},{"kind":"Field","name":{"kind":"Name","value":"emailConsent"}},{"kind":"Field","name":{"kind":"Name","value":"replyConsent"}},{"kind":"Field","name":{"kind":"Name","value":"hospName"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"hospZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospWebsite"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateDoctorProfileMutation, UpdateDoctorProfileMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const WithdrawMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WithdrawMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WithdrawMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<WithdrawMemberMutation, WithdrawMemberMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"mustChangePw"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mustChangePw"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"doctorType"}},{"kind":"Field","name":{"kind":"Name","value":"isDirector"}},{"kind":"Field","name":{"kind":"Name","value":"hospAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospName"}},{"kind":"Field","name":{"kind":"Name","value":"hospPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"hospZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"licenseNo"}},{"kind":"Field","name":{"kind":"Name","value":"representative"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"smsConsent"}},{"kind":"Field","name":{"kind":"Name","value":"emailConsent"}},{"kind":"Field","name":{"kind":"Name","value":"replyConsent"}},{"kind":"Field","name":{"kind":"Name","value":"specialty"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CheckUserIdAvailableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckUserIdAvailable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkUserIdAvailable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"existsInDb"}},{"kind":"Field","name":{"kind":"Name","value":"existsInEhr"}}]}}]}}]} as unknown as DocumentNode<CheckUserIdAvailableQuery, CheckUserIdAvailableQueryVariables>;
export const MyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"doctorType"}},{"kind":"Field","name":{"kind":"Name","value":"licenseNo"}},{"kind":"Field","name":{"kind":"Name","value":"isDirector"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"specialty"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"graduationYear"}},{"kind":"Field","name":{"kind":"Name","value":"trainingHospital"}},{"kind":"Field","name":{"kind":"Name","value":"smsConsent"}},{"kind":"Field","name":{"kind":"Name","value":"emailConsent"}},{"kind":"Field","name":{"kind":"Name","value":"replyConsent"}},{"kind":"Field","name":{"kind":"Name","value":"hospName"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"hospZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospWebsite"}}]}}]}}]}}]} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"hospName"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"licenseNo"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"specialty"}},{"kind":"Field","name":{"kind":"Name","value":"graduationYear"}},{"kind":"Field","name":{"kind":"Name","value":"trainingHospital"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const EnumsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Enums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]} as unknown as DocumentNode<EnumsQuery, EnumsQueryVariables>;
export const EnumByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EnumByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enumByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]} as unknown as DocumentNode<EnumByNameQuery, EnumByNameQueryVariables>;
export const RequestImagingExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestImagingExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateImagingRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestImagingExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"displayState"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}},{"kind":"Field","name":{"kind":"Name","value":"storedPath"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<RequestImagingExamMutation, RequestImagingExamMutationVariables>;
export const RegisterHospitalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterHospital"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterHospitalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerHospital"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"representative"}},{"kind":"Field","name":{"kind":"Name","value":"phisCode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"classificationCode"}}]}}]}}]} as unknown as DocumentNode<RegisterHospitalMutation, RegisterHospitalMutationVariables>;
export const EhrGetReferralPatientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetReferralPatients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReferralPatientQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetReferralPatients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"patientNo"}},{"kind":"Field","name":{"kind":"Name","value":"patientName"}},{"kind":"Field","name":{"kind":"Name","value":"genderCode"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"departmentName"}},{"kind":"Field","name":{"kind":"Name","value":"doctorId"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"referralDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"referralDepartmentName"}},{"kind":"Field","name":{"kind":"Name","value":"referralDoctorName"}},{"kind":"Field","name":{"kind":"Name","value":"drugOrderExists"}},{"kind":"Field","name":{"kind":"Name","value":"infoConsentYn"}},{"kind":"Field","name":{"kind":"Name","value":"replyDate"}},{"kind":"Field","name":{"kind":"Name","value":"referralDate"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"referralSeqNo"}},{"kind":"Field","name":{"kind":"Name","value":"referralStatusCode"}},{"kind":"Field","name":{"kind":"Name","value":"isConsultant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<EhrGetReferralPatientsQuery, EhrGetReferralPatientsQueryVariables>;
export const EhrGetReferralReplyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetReferralReply"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReferralReplyQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetReferralReply"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referralDate"}},{"kind":"Field","name":{"kind":"Name","value":"departmentName"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"patientName"}},{"kind":"Field","name":{"kind":"Name","value":"genderCode"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"frontResidentNo"}},{"kind":"Field","name":{"kind":"Name","value":"backResidentNo"}},{"kind":"Field","name":{"kind":"Name","value":"diagnosisCode"}},{"kind":"Field","name":{"kind":"Name","value":"diagnosisName"}},{"kind":"Field","name":{"kind":"Name","value":"treatmentPeriod"}},{"kind":"Field","name":{"kind":"Name","value":"visitTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"opinion"}},{"kind":"Field","name":{"kind":"Name","value":"replyDate"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNo"}}]}}]}}]}}]} as unknown as DocumentNode<EhrGetReferralReplyQuery, EhrGetReferralReplyQueryVariables>;
export const EhrGetVisitHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetVisitHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VisitHistoryQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetVisitHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"visitDatetime"}},{"kind":"Field","name":{"kind":"Name","value":"departmentName"}},{"kind":"Field","name":{"kind":"Name","value":"doctorId"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"visitTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"visitTypeName"}},{"kind":"Field","name":{"kind":"Name","value":"admissionDate"}},{"kind":"Field","name":{"kind":"Name","value":"wardCode"}},{"kind":"Field","name":{"kind":"Name","value":"wardName"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"diagnosisName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<EhrGetVisitHistoryQuery, EhrGetVisitHistoryQueryVariables>;
export const EhrGetExamResultsByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetExamResultsByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PatientDateQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetExamResultsByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"departmentName"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"examCode"}},{"kind":"Field","name":{"kind":"Name","value":"examDate"}},{"kind":"Field","name":{"kind":"Name","value":"examRoomCode"}},{"kind":"Field","name":{"kind":"Name","value":"examRoomName"}},{"kind":"Field","name":{"kind":"Name","value":"normalLowerLimit"}},{"kind":"Field","name":{"kind":"Name","value":"normalUpperLimit"}},{"kind":"Field","name":{"kind":"Name","value":"orderName"}},{"kind":"Field","name":{"kind":"Name","value":"resultContent"}},{"kind":"Field","name":{"kind":"Name","value":"resultFormatCode"}},{"kind":"Field","name":{"kind":"Name","value":"resultRemark"}},{"kind":"Field","name":{"kind":"Name","value":"resultUnit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<EhrGetExamResultsByDateQuery, EhrGetExamResultsByDateQueryVariables>;
export const EhrGetExamSlipsByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetExamSlipsByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExamSlipQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetExamSlipsByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"departmentName"}},{"kind":"Field","name":{"kind":"Name","value":"doctorId"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"enforceDate"}},{"kind":"Field","name":{"kind":"Name","value":"enforceDatetime"}},{"kind":"Field","name":{"kind":"Name","value":"examCode"}},{"kind":"Field","name":{"kind":"Name","value":"orderName"}},{"kind":"Field","name":{"kind":"Name","value":"slipCode"}},{"kind":"Field","name":{"kind":"Name","value":"slipName"}},{"kind":"Field","name":{"kind":"Name","value":"treatmentDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<EhrGetExamSlipsByDateQuery, EhrGetExamSlipsByDateQueryVariables>;
export const EhrGetSpecialExamResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetSpecialExamResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExamSlipQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetSpecialExamResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"departmentName"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"examDate"}},{"kind":"Field","name":{"kind":"Name","value":"grossResult"}},{"kind":"Field","name":{"kind":"Name","value":"orderCode"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}},{"kind":"Field","name":{"kind":"Name","value":"orderName"}},{"kind":"Field","name":{"kind":"Name","value":"pacsAccessNo"}},{"kind":"Field","name":{"kind":"Name","value":"readerId1"}},{"kind":"Field","name":{"kind":"Name","value":"readerId2"}},{"kind":"Field","name":{"kind":"Name","value":"readerId3"}},{"kind":"Field","name":{"kind":"Name","value":"resultContent"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"specimenCode"}},{"kind":"Field","name":{"kind":"Name","value":"specimenNo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<EhrGetSpecialExamResultsQuery, EhrGetSpecialExamResultsQueryVariables>;
export const EhrGetDrugOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetDrugOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DrugOrderQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetDrugOrders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderCode"}},{"kind":"Field","name":{"kind":"Name","value":"orderName"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}},{"kind":"Field","name":{"kind":"Name","value":"dose"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"useDay"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"methodWhen"}},{"kind":"Field","name":{"kind":"Name","value":"methodHow"}},{"kind":"Field","name":{"kind":"Name","value":"departmentName"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"dosage"}},{"kind":"Field","name":{"kind":"Name","value":"doseUnit"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"usage"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<EhrGetDrugOrdersQuery, EhrGetDrugOrdersQueryVariables>;
export const EhrGetDrugOrderDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetDrugOrderDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DrugOrderDetailQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetDrugOrderDetail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"drugCode"}},{"kind":"Field","name":{"kind":"Name","value":"drugName"}},{"kind":"Field","name":{"kind":"Name","value":"prodName"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"}},{"kind":"Field","name":{"kind":"Name","value":"drugType"}},{"kind":"Field","name":{"kind":"Name","value":"drugTypeName"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<EhrGetDrugOrderDetailQuery, EhrGetDrugOrderDetailQueryVariables>;
export const ImagingRequestOverlayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ImagingRequestOverlay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ptntNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"examDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pacsAccessNo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imagingRequestOverlay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ptntNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ptntNo"}}},{"kind":"Argument","name":{"kind":"Name","value":"examDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"examDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"pacsAccessNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pacsAccessNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayState"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}},{"kind":"Field","name":{"kind":"Name","value":"storedPath"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<ImagingRequestOverlayQuery, ImagingRequestOverlayQueryVariables>;
export const MedicalStaffListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MedicalStaffList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdmapMedicalStaffFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medicalStaffList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doctorId"}},{"kind":"Field","name":{"kind":"Name","value":"doctorName"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"departmentName"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"specialty"}},{"kind":"Field","name":{"kind":"Name","value":"drNo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<MedicalStaffListQuery, MedicalStaffListQueryVariables>;
export const EhrGetCollaboratingHospitalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetCollaboratingHospitals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchCollaboratingHospitalsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetCollaboratingHospitals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hospitals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"phisCode"}},{"kind":"Field","name":{"kind":"Name","value":"classificationCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"faxNumber"}},{"kind":"Field","name":{"kind":"Name","value":"representative"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}}]}}]}}]} as unknown as DocumentNode<EhrGetCollaboratingHospitalsQuery, EhrGetCollaboratingHospitalsQueryVariables>;
export const EhrGetCollaboratingHospitalInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EhrGetCollaboratingHospitalInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCollaboratingHospitalInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ehrGetCollaboratingHospitalInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"fax"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"representative"}},{"kind":"Field","name":{"kind":"Name","value":"classificationCode"}},{"kind":"Field","name":{"kind":"Name","value":"collaborationDivisionCode"}}]}}]}}]} as unknown as DocumentNode<EhrGetCollaboratingHospitalInfoQuery, EhrGetCollaboratingHospitalInfoQueryVariables>;
export const HospitalSnsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HospitalSns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageRow"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startIndex"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hospitalSns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageRow"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageRow"}}},{"kind":"Argument","name":{"kind":"Name","value":"startIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startIndex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articleNo"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"linkUrl"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdDt"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}}]}}]}}]}}]} as unknown as DocumentNode<HospitalSnsQuery, HospitalSnsQueryVariables>;
export const HospitalNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HospitalNews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageRow"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startIndex"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hospitalNews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageRow"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageRow"}}},{"kind":"Argument","name":{"kind":"Name","value":"startIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startIndex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articleNo"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"linkUrl"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdDt"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}}]}}]}}]}}]} as unknown as DocumentNode<HospitalNewsQuery, HospitalNewsQueryVariables>;
export const HospitalLecturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HospitalLectures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageRow"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startIndex"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hospitalLectures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageRow"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageRow"}}},{"kind":"Argument","name":{"kind":"Name","value":"startIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startIndex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articleNo"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"linkUrl"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdDt"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}}]}}]}}]}}]} as unknown as DocumentNode<HospitalLecturesQuery, HospitalLecturesQueryVariables>;
export const MenusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Menus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"menuType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MenuType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"menus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"menuType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"menuType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"menuTargetType"}},{"kind":"Field","name":{"kind":"Name","value":"targetBoardType"}},{"kind":"Field","name":{"kind":"Name","value":"targetBoardId"}},{"kind":"Field","name":{"kind":"Name","value":"targetContentId"}},{"kind":"Field","name":{"kind":"Name","value":"externalUrl"}},{"kind":"Field","name":{"kind":"Name","value":"gnbExposure"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"firstChildPath"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"menuTargetType"}},{"kind":"Field","name":{"kind":"Name","value":"targetBoardType"}},{"kind":"Field","name":{"kind":"Name","value":"targetBoardId"}},{"kind":"Field","name":{"kind":"Name","value":"targetContentId"}},{"kind":"Field","name":{"kind":"Name","value":"externalUrl"}},{"kind":"Field","name":{"kind":"Name","value":"gnbExposure"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}}]}}]}}]}}]} as unknown as DocumentNode<MenusQuery, MenusQueryVariables>;
export const BoardPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BoardPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pinnedPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]} as unknown as DocumentNode<BoardPostsQuery, BoardPostsQueryVariables>;
export const BoardPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BoardPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardPostById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]} as unknown as DocumentNode<BoardPostByIdQuery, BoardPostByIdQueryVariables>;
export const AttachmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Attachments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AttachmentEntityType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"entityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}}},{"kind":"Argument","name":{"kind":"Name","value":"entityType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"storedPath"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AttachmentsQuery, AttachmentsQueryVariables>;
export const PresignedDownloadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PresignedDownloadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attachmentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedDownloadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attachmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attachmentId"}}}]}]}}]} as unknown as DocumentNode<PresignedDownloadUrlQuery, PresignedDownloadUrlQueryVariables>;
export const ContentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"contentGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ContentByIdQuery, ContentByIdQueryVariables>;
export const ApplyPartnerHospitalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyPartnerHospital"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApplyPartnerHospitalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyPartnerHospital"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"applicantId"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"partnerType"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalRepresentative"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalFaxNumber"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"institutionType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ApplyPartnerHospitalMutation, ApplyPartnerHospitalMutationVariables>;
export const UpdatePartnerApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePartnerApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePartnerApplicationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePartnerApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"partnerType"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalRepresentative"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalFaxNumber"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"institutionType"}},{"kind":"Field","name":{"kind":"Name","value":"directorName"}},{"kind":"Field","name":{"kind":"Name","value":"directorPhone"}},{"kind":"Field","name":{"kind":"Name","value":"directorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"staffName"}},{"kind":"Field","name":{"kind":"Name","value":"staffPhone"}},{"kind":"Field","name":{"kind":"Name","value":"staffEmail"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdatePartnerApplicationMutation, UpdatePartnerApplicationMutationVariables>;
export const MyPartnerApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyPartnerApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hospitalCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HospitalCode"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myPartnerApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hospitalCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hospitalCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PartnerHospitalFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PartnerHospitalFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PartnerHospitalModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"applicantId"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"partnerType"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalRepresentative"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalSpecialties"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalFaxNumber"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"institutionType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isDirector"}},{"kind":"Field","name":{"kind":"Name","value":"directorName"}},{"kind":"Field","name":{"kind":"Name","value":"directorBirthDate"}},{"kind":"Field","name":{"kind":"Name","value":"directorGender"}},{"kind":"Field","name":{"kind":"Name","value":"directorLicenseNo"}},{"kind":"Field","name":{"kind":"Name","value":"directorSchool"}},{"kind":"Field","name":{"kind":"Name","value":"directorGraduationYear"}},{"kind":"Field","name":{"kind":"Name","value":"directorTrainingHospital"}},{"kind":"Field","name":{"kind":"Name","value":"directorDepartment"}},{"kind":"Field","name":{"kind":"Name","value":"directorSubSpecialty"}},{"kind":"Field","name":{"kind":"Name","value":"directorCarNo"}},{"kind":"Field","name":{"kind":"Name","value":"directorPhone"}},{"kind":"Field","name":{"kind":"Name","value":"directorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"directorSmsConsent"}},{"kind":"Field","name":{"kind":"Name","value":"directorEmailConsent"}},{"kind":"Field","name":{"kind":"Name","value":"directorReplyConsent"}},{"kind":"Field","name":{"kind":"Name","value":"staffName"}},{"kind":"Field","name":{"kind":"Name","value":"staffPosition"}},{"kind":"Field","name":{"kind":"Name","value":"staffDeptType"}},{"kind":"Field","name":{"kind":"Name","value":"staffDeptValue"}},{"kind":"Field","name":{"kind":"Name","value":"staffPhone"}},{"kind":"Field","name":{"kind":"Name","value":"staffTel"}},{"kind":"Field","name":{"kind":"Name","value":"staffEmail"}},{"kind":"Field","name":{"kind":"Name","value":"totalBedCount"}},{"kind":"Field","name":{"kind":"Name","value":"activeBedCount"}},{"kind":"Field","name":{"kind":"Name","value":"icuCount"}},{"kind":"Field","name":{"kind":"Name","value":"premiumRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"multiRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"erCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalStaffCount"}},{"kind":"Field","name":{"kind":"Name","value":"specialistCount"}},{"kind":"Field","name":{"kind":"Name","value":"nurseCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasIcu"}},{"kind":"Field","name":{"kind":"Name","value":"hasEr"}},{"kind":"Field","name":{"kind":"Name","value":"hasOperatingRoom"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalTherapy"}},{"kind":"Field","name":{"kind":"Name","value":"hasDialysisRoom"}},{"kind":"Field","name":{"kind":"Name","value":"hasHospice"}},{"kind":"Field","name":{"kind":"Name","value":"hasPsychGeneral"}},{"kind":"Field","name":{"kind":"Name","value":"hasPsychClosed"}},{"kind":"Field","name":{"kind":"Name","value":"hasIntegratedNursing"}},{"kind":"Field","name":{"kind":"Name","value":"hasGuardianCare"}},{"kind":"Field","name":{"kind":"Name","value":"hasSharedCare"}},{"kind":"Field","name":{"kind":"Name","value":"isolationRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationSingleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationDoubleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationTripleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationTypes"}},{"kind":"Field","name":{"kind":"Name","value":"isolationCareType"}},{"kind":"Field","name":{"kind":"Name","value":"isolationRehabType"}},{"kind":"Field","name":{"kind":"Name","value":"isolationWardOperation"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabPt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabOt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabSt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabSwallow"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabIsolation"}},{"kind":"Field","name":{"kind":"Name","value":"departmentSpecialists"}},{"kind":"Field","name":{"kind":"Name","value":"availableTreatments"}},{"kind":"Field","name":{"kind":"Name","value":"clinicMedicationType"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasHemodialysis"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasPeritoneal"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasPhototherapy"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasExcimerLaser"}},{"kind":"Field","name":{"kind":"Name","value":"majorEquipment"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentRows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"storedPath"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rejectReason"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MyPartnerApplicationQuery, MyPartnerApplicationQueryVariables>;
export const MyPartnerApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyPartnerApplications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myPartnerApplications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PartnerHospitalFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PartnerHospitalFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PartnerHospitalModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"applicantId"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"partnerType"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalRepresentative"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalSpecialties"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalFaxNumber"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"institutionType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isDirector"}},{"kind":"Field","name":{"kind":"Name","value":"directorName"}},{"kind":"Field","name":{"kind":"Name","value":"directorBirthDate"}},{"kind":"Field","name":{"kind":"Name","value":"directorGender"}},{"kind":"Field","name":{"kind":"Name","value":"directorLicenseNo"}},{"kind":"Field","name":{"kind":"Name","value":"directorSchool"}},{"kind":"Field","name":{"kind":"Name","value":"directorGraduationYear"}},{"kind":"Field","name":{"kind":"Name","value":"directorTrainingHospital"}},{"kind":"Field","name":{"kind":"Name","value":"directorDepartment"}},{"kind":"Field","name":{"kind":"Name","value":"directorSubSpecialty"}},{"kind":"Field","name":{"kind":"Name","value":"directorCarNo"}},{"kind":"Field","name":{"kind":"Name","value":"directorPhone"}},{"kind":"Field","name":{"kind":"Name","value":"directorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"directorSmsConsent"}},{"kind":"Field","name":{"kind":"Name","value":"directorEmailConsent"}},{"kind":"Field","name":{"kind":"Name","value":"directorReplyConsent"}},{"kind":"Field","name":{"kind":"Name","value":"staffName"}},{"kind":"Field","name":{"kind":"Name","value":"staffPosition"}},{"kind":"Field","name":{"kind":"Name","value":"staffDeptType"}},{"kind":"Field","name":{"kind":"Name","value":"staffDeptValue"}},{"kind":"Field","name":{"kind":"Name","value":"staffPhone"}},{"kind":"Field","name":{"kind":"Name","value":"staffTel"}},{"kind":"Field","name":{"kind":"Name","value":"staffEmail"}},{"kind":"Field","name":{"kind":"Name","value":"totalBedCount"}},{"kind":"Field","name":{"kind":"Name","value":"activeBedCount"}},{"kind":"Field","name":{"kind":"Name","value":"icuCount"}},{"kind":"Field","name":{"kind":"Name","value":"premiumRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"multiRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"erCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalStaffCount"}},{"kind":"Field","name":{"kind":"Name","value":"specialistCount"}},{"kind":"Field","name":{"kind":"Name","value":"nurseCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasIcu"}},{"kind":"Field","name":{"kind":"Name","value":"hasEr"}},{"kind":"Field","name":{"kind":"Name","value":"hasOperatingRoom"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalTherapy"}},{"kind":"Field","name":{"kind":"Name","value":"hasDialysisRoom"}},{"kind":"Field","name":{"kind":"Name","value":"hasHospice"}},{"kind":"Field","name":{"kind":"Name","value":"hasPsychGeneral"}},{"kind":"Field","name":{"kind":"Name","value":"hasPsychClosed"}},{"kind":"Field","name":{"kind":"Name","value":"hasIntegratedNursing"}},{"kind":"Field","name":{"kind":"Name","value":"hasGuardianCare"}},{"kind":"Field","name":{"kind":"Name","value":"hasSharedCare"}},{"kind":"Field","name":{"kind":"Name","value":"isolationRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationSingleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationDoubleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationTripleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationTypes"}},{"kind":"Field","name":{"kind":"Name","value":"isolationCareType"}},{"kind":"Field","name":{"kind":"Name","value":"isolationRehabType"}},{"kind":"Field","name":{"kind":"Name","value":"isolationWardOperation"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabPt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabOt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabSt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabSwallow"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabIsolation"}},{"kind":"Field","name":{"kind":"Name","value":"departmentSpecialists"}},{"kind":"Field","name":{"kind":"Name","value":"availableTreatments"}},{"kind":"Field","name":{"kind":"Name","value":"clinicMedicationType"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasHemodialysis"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasPeritoneal"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasPhototherapy"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasExcimerLaser"}},{"kind":"Field","name":{"kind":"Name","value":"majorEquipment"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentRows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"storedPath"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rejectReason"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MyPartnerApplicationsQuery, MyPartnerApplicationsQueryVariables>;
export const PartnerApplicationByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PartnerApplicationById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partnerApplicationById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PartnerHospitalFields"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedById"}},{"kind":"Field","name":{"kind":"Name","value":"terminatedAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PartnerHospitalFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PartnerHospitalModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"applicantId"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"careInstitutionNo"}},{"kind":"Field","name":{"kind":"Name","value":"partnerType"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalName"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalAddressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalPhone"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalRepresentative"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalSpecialties"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalZipCode"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalFaxNumber"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"institutionType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isDirector"}},{"kind":"Field","name":{"kind":"Name","value":"directorName"}},{"kind":"Field","name":{"kind":"Name","value":"directorBirthDate"}},{"kind":"Field","name":{"kind":"Name","value":"directorGender"}},{"kind":"Field","name":{"kind":"Name","value":"directorLicenseNo"}},{"kind":"Field","name":{"kind":"Name","value":"directorSchool"}},{"kind":"Field","name":{"kind":"Name","value":"directorGraduationYear"}},{"kind":"Field","name":{"kind":"Name","value":"directorTrainingHospital"}},{"kind":"Field","name":{"kind":"Name","value":"directorDepartment"}},{"kind":"Field","name":{"kind":"Name","value":"directorSubSpecialty"}},{"kind":"Field","name":{"kind":"Name","value":"directorCarNo"}},{"kind":"Field","name":{"kind":"Name","value":"directorPhone"}},{"kind":"Field","name":{"kind":"Name","value":"directorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"directorSmsConsent"}},{"kind":"Field","name":{"kind":"Name","value":"directorEmailConsent"}},{"kind":"Field","name":{"kind":"Name","value":"directorReplyConsent"}},{"kind":"Field","name":{"kind":"Name","value":"staffName"}},{"kind":"Field","name":{"kind":"Name","value":"staffPosition"}},{"kind":"Field","name":{"kind":"Name","value":"staffDeptType"}},{"kind":"Field","name":{"kind":"Name","value":"staffDeptValue"}},{"kind":"Field","name":{"kind":"Name","value":"staffPhone"}},{"kind":"Field","name":{"kind":"Name","value":"staffTel"}},{"kind":"Field","name":{"kind":"Name","value":"staffEmail"}},{"kind":"Field","name":{"kind":"Name","value":"totalBedCount"}},{"kind":"Field","name":{"kind":"Name","value":"activeBedCount"}},{"kind":"Field","name":{"kind":"Name","value":"icuCount"}},{"kind":"Field","name":{"kind":"Name","value":"premiumRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"multiRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"erCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalStaffCount"}},{"kind":"Field","name":{"kind":"Name","value":"specialistCount"}},{"kind":"Field","name":{"kind":"Name","value":"nurseCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasIcu"}},{"kind":"Field","name":{"kind":"Name","value":"hasEr"}},{"kind":"Field","name":{"kind":"Name","value":"hasOperatingRoom"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalTherapy"}},{"kind":"Field","name":{"kind":"Name","value":"hasDialysisRoom"}},{"kind":"Field","name":{"kind":"Name","value":"hasHospice"}},{"kind":"Field","name":{"kind":"Name","value":"hasPsychGeneral"}},{"kind":"Field","name":{"kind":"Name","value":"hasPsychClosed"}},{"kind":"Field","name":{"kind":"Name","value":"hasIntegratedNursing"}},{"kind":"Field","name":{"kind":"Name","value":"hasGuardianCare"}},{"kind":"Field","name":{"kind":"Name","value":"hasSharedCare"}},{"kind":"Field","name":{"kind":"Name","value":"isolationRoomCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationSingleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationDoubleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationTripleCount"}},{"kind":"Field","name":{"kind":"Name","value":"isolationTypes"}},{"kind":"Field","name":{"kind":"Name","value":"isolationCareType"}},{"kind":"Field","name":{"kind":"Name","value":"isolationRehabType"}},{"kind":"Field","name":{"kind":"Name","value":"isolationWardOperation"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabPt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabOt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabSt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabSwallow"}},{"kind":"Field","name":{"kind":"Name","value":"hasRehabIsolation"}},{"kind":"Field","name":{"kind":"Name","value":"departmentSpecialists"}},{"kind":"Field","name":{"kind":"Name","value":"availableTreatments"}},{"kind":"Field","name":{"kind":"Name","value":"clinicMedicationType"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasHemodialysis"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasPeritoneal"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasPhototherapy"}},{"kind":"Field","name":{"kind":"Name","value":"clinicHasExcimerLaser"}},{"kind":"Field","name":{"kind":"Name","value":"majorEquipment"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentRows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"storedPath"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rejectReason"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PartnerApplicationByIdQuery, PartnerApplicationByIdQueryVariables>;
export const SlideBannersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SlideBanners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slideBanners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"popupType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"alwaysVisible"}},{"kind":"Field","name":{"kind":"Name","value":"targetBlank"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mobileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mobileDarkImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkUrl"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"mainSlogan"}},{"kind":"Field","name":{"kind":"Name","value":"subSlogan"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"videoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]}}]} as unknown as DocumentNode<SlideBannersQuery, SlideBannersQueryVariables>;
export const MiniBannersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MiniBanners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"miniBanners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"popupType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"targetBlank"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mobileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkUrl"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]}}]} as unknown as DocumentNode<MiniBannersQuery, MiniBannersQueryVariables>;
export const ActivePopupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActivePopups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activePopups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalCode"}},{"kind":"Field","name":{"kind":"Name","value":"popupType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"alwaysVisible"}},{"kind":"Field","name":{"kind":"Name","value":"targetBlank"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageDarkUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mobileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mobileDarkImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkUrl"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"mainSlogan"}},{"kind":"Field","name":{"kind":"Name","value":"subSlogan"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"videoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]}}]} as unknown as DocumentNode<ActivePopupsQuery, ActivePopupsQueryVariables>;
export const InitiateVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InitiateVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InitiateVerificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initiateVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}}]}}]}}]} as unknown as DocumentNode<InitiateVerificationMutation, InitiateVerificationMutationVariables>;
export const CompleteVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompleteVerificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authMethod"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"ci"}},{"kind":"Field","name":{"kind":"Name","value":"di"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nationalInfo"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"verificationToken"}}]}}]}}]} as unknown as DocumentNode<CompleteVerificationMutation, CompleteVerificationMutationVariables>;
export const FindUserIdByVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FindUserIdByVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindUserIdByVerificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserIdByVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maskedUserId"}}]}}]}}]} as unknown as DocumentNode<FindUserIdByVerificationMutation, FindUserIdByVerificationMutationVariables>;
export const ResetPasswordByVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPasswordByVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordByVerificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPasswordByVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordByVerificationMutation, ResetPasswordByVerificationMutationVariables>;
export const CheckVerificationDuplicateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckVerificationDuplicate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verificationToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkVerificationDuplicate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"verificationToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verificationToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDuplicate"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CheckVerificationDuplicateQuery, CheckVerificationDuplicateQueryVariables>;