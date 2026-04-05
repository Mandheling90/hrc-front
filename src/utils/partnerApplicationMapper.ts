import { InstitutionType } from '@/graphql/__generated__/types'
import type { HospitalCode, ApplyPartnerHospitalInput } from '@/graphql/__generated__/types'
import type {
  HospitalInfoStepData,
  DirectorInfoStepData,
  StaffInfoStepData,
  BedAndFacilityStepData,
  CareSystemStepData,
  MedicalDepartmentStepData,
  BasicTreatmentStepData,
  HospitalCharacteristicsStepData,
  ClinicStaffInfoStepData
} from '@/types/partner-application'

/** 8개 Step 데이터를 모아놓은 타입 */
export interface AllStepData {
  step1?: Partial<HospitalInfoStepData>
  step2?: Partial<DirectorInfoStepData>
  step3?: Partial<StaffInfoStepData>
  step4?: Partial<BedAndFacilityStepData>
  step5?: Partial<CareSystemStepData>
  step6?: Partial<MedicalDepartmentStepData>
  step7?: Partial<BasicTreatmentStepData>
  step8?: Partial<HospitalCharacteristicsStepData>
}

/** 빈 문자열 → undefined (빈 값 전송 방지) */
const emptyToUndef = (v?: string): string | undefined => (v && v.trim() ? v : undefined)

/** ISO datetime → YYYY-MM-DD (날짜 정규화) */
const toDateString = (v?: string): string | undefined => {
  if (!v || !v.trim()) return undefined
  return v.slice(0, 10)
}

/** 유/무 → boolean */
const toBool = (v?: string): boolean => v === '유'

/** 동의/비동의 → boolean */
const toConsent = (v?: string): boolean => v === '동의'

/** 성별 코드 (enum key: M/F 그대로 전달) */
const toGenderCode = (v?: string): string | undefined => emptyToUndef(v)

/** 문자열 → number | undefined */
const toInt = (v?: string): number | undefined => {
  if (!v) return undefined
  const n = parseInt(v, 10)
  return isNaN(n) ? undefined : n
}

/** 담당구분 코드 (B/A 그대로 전달) */
const toStaffDeptTypeCode = (v?: string): string | undefined => emptyToUndef(v)

/** 숫자 코드 → GraphQL InstitutionType enum 변환 */
const CODE_TO_INSTITUTION_TYPE: Record<string, InstitutionType> = {
  '10': InstitutionType.TertiaryHospital,
  '20': InstitutionType.GeneralHospital,
  '30': InstitutionType.Hospital,
  '31': InstitutionType.DentalHospital,
  '32': InstitutionType.MentalHospital,
  '40': InstitutionType.NursingHospital,
  '50': InstitutionType.Clinic,
  '51': InstitutionType.DentalClinic,
  '60': InstitutionType.PublicHealth,
  '70': InstitutionType.Institution,
  '80': InstitutionType.Unclassified,
  '90': InstitutionType.Oriental,
  '99': InstitutionType.OrientalHospital
}

/** GraphQL InstitutionType → 숫자 코드 역변환 */
const INSTITUTION_TYPE_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(CODE_TO_INSTITUTION_TYPE).map(([code, type]) => [type, code])
)

/** 숫자 코드 또는 GraphQL enum → InstitutionType 변환 */
const toInstitutionTypeCode = (v?: string): InstitutionType | undefined => {
  if (!v || !v.trim()) return undefined
  // 숫자 코드인 경우
  if (CODE_TO_INSTITUTION_TYPE[v]) return CODE_TO_INSTITUTION_TYPE[v]
  // 이미 GraphQL enum 값인 경우
  if (Object.values(InstitutionType).includes(v as InstitutionType)) return v as InstitutionType
  return undefined
}

/** departments 객체에서 checked된 진료과목 코드를 콤마 구분 문자열로 변환 */
const toDepartmentString = (
  departments?: Record<string, { checked: boolean; count: string }>
): string | undefined => {
  if (!departments) return undefined
  const codes = Object.entries(departments)
    .filter(([, v]) => v.checked)
    .map(([k]) => k)
  return codes.length > 0 ? codes.join(',') : undefined
}

/** InstitutionType → 병원종별코드 문자열 */
const toInstitutionCode = (type?: InstitutionType): string | undefined => {
  if (!type) return undefined
  return INSTITUTION_TYPE_TO_CODE[type] ?? undefined
}

/** 격리 중 간병: 영문 key → 한글 라벨 */
const ISOLATION_CARE_LABEL: Record<string, string> = {
  joint: '공동',
  individual: '개인',
  guardian: '보호자'
}

/** 격리 중 재활: 영문 key → 한글 라벨 */
const ISOLATION_REHAB_LABEL: Record<string, string> = {
  no: '불가',
  bedside: '침상',
  isolationWard: '격리병동'
}

/** 체크된 항목의 key를 한글 라벨로 변환 후 comma-join */
const toKoreanLabels = (
  obj: Record<string, boolean> | undefined,
  labelMap: Record<string, string>
): string | undefined => {
  if (!obj) return undefined
  const labels = Object.entries(obj)
    .filter(([, v]) => v)
    .map(([k]) => labelMap[k] ?? k)
  return labels.length > 0 ? labels.join(',') : undefined
}

/**
 * 8개 Step 데이터 → ApplyPartnerHospitalInput 변환
 */
export function mapStepsToApiInput(
  data: AllStepData,
  hospitalId: string,
  hospitalCode: HospitalCode
): ApplyPartnerHospitalInput {
  const { step1, step2, step3, step4, step5, step6, step7, step8 } = data

  return {
    hospitalId,
    hospitalCode,
    institutionType: toInstitutionTypeCode(step3?.medicalInstitutionType),
    institutionCode: toInstitutionCode(toInstitutionTypeCode(step3?.medicalInstitutionType)),

    // Step 1: 병원 정보
    hospitalName: emptyToUndef(step1?.hospitalName),
    hospitalPhisCode: emptyToUndef(step1?.medicalInstitutionNumber),
    hospitalZipCode: emptyToUndef(step1?.zipCode),
    hospitalAddress: emptyToUndef(step1?.address),
    hospitalAddressDetail: emptyToUndef(step1?.detailAddress),
    hospitalPhone: emptyToUndef(step1?.phoneNumber),
    hospitalFaxNumber: emptyToUndef(step1?.faxNumber),
    hospitalWebsite: emptyToUndef(step1?.website),

    // Step 2: 병원장 정보
    directorName: emptyToUndef(step2?.directorName),
    directorBirthDate: toDateString(step2?.birthDate),
    directorLicenseNo: emptyToUndef(step2?.licenseNumber),
    isDirector: step2?.isDirector ?? false,
    directorPhone: emptyToUndef(step2?.phone),
    directorGender: toGenderCode(step2?.gender),
    directorCarNo: emptyToUndef(step2?.carNumber),
    directorEmail: emptyToUndef(step2?.email),
    directorSchool: emptyToUndef(step2?.school),
    directorGraduationYear: emptyToUndef(step2?.graduationYear),
    directorTrainingHospital: emptyToUndef(step2?.trainingHospital),
    directorDepartment: emptyToUndef(step2?.department),
    directorSubSpecialty: emptyToUndef(step2?.specialty),
    directorSmsConsent: step2 ? toConsent(step2.smsConsent) : undefined,
    directorEmailConsent: step2 ? toConsent(step2.emailConsent) : undefined,
    directorReplyConsent: step2 ? toConsent(step2.replyConsent) : undefined,

    // Step 3: 실무자 정보
    staffName: emptyToUndef(step3?.staffName),
    staffDeptType: toStaffDeptTypeCode(step3?.deptType),
    staffDeptValue: emptyToUndef(step3?.department),
    staffPosition: emptyToUndef(step3?.position),
    staffTel: emptyToUndef(step3?.contactNumber),
    staffPhone: emptyToUndef(step3?.mobilePhone),
    staffEmail: emptyToUndef(step3?.staffEmail),
    totalStaffCount: toInt(step3?.totalEmployees),
    specialistCount: toInt(step3?.specialists),
    nurseCount: toInt(step3?.nurses),

    // Step 4: 병상 및 시설 운영 현황
    totalBedCount: toInt(step4?.totalBedCount),
    activeBedCount: toInt(step4?.operatingBeds),
    premiumRoomCount: step4?.premiumRoomChecked ? toInt(step4?.premiumRoomCount) : undefined,
    multiRoomCount: step4?.multiPersonRoomChecked ? toInt(step4?.multiPersonRoomCount) : undefined,
    isolationRoomCount: step4?.isolationRoomChecked ? toInt(step4?.isolationRoomCount) : undefined,
    hasIcu: step4?.icuChecked ?? false,
    icuCount: step4?.icuChecked ? toInt(step4?.icuCount) : undefined,
    hasEr: step4?.emergencyRoomChecked ?? false,
    erCount: step4?.emergencyRoomChecked ? toInt(step4?.emergencyRoomCount) : undefined,
    hasDialysisRoom: toBool(step4?.dialysisRoom),
    hasOperatingRoom: toBool(step4?.surgeryRoom),
    hasHospice: toBool(step4?.hospice),
    hasPsychGeneral: step4?.psychiatricWard?.general ?? false,
    hasPsychClosed: step4?.psychiatricWard?.closed ?? false,
    hasRehabPt: step4?.rehabilitationTherapy?.physical ?? false,
    hasRehabOt: step4?.rehabilitationTherapy?.occupational ?? false,
    hasRehabSt: step4?.rehabilitationTherapy?.speech ?? false,
    hasRehabSwallow: step4?.rehabilitationTherapy?.swallowing ?? false,
    hasRehabIsolation: step4?.rehabilitationTherapy?.isolation ?? false,
    hasPhysicalTherapy: false,

    // Step 5: 간병 시스템
    hasIntegratedNursing: toBool(step5?.integratedNursingCare),
    hasGuardianCare: toBool(step5?.guardianNursingCare),
    hasSharedCare: toBool(step5?.jointNursingCare),
    isolationSingleCount: toInt(step5?.singleRoom),
    isolationDoubleCount: toInt(step5?.doubleRoom),
    isolationTripleCount: toInt(step5?.tripleRoom),
    isolationTypes: step5?.isolationType
      ? {
          vre: step5.isolationType.vre,
          cre: step5.isolationType.cre,
          cpe: step5.isolationType.cpe,
          tb: step5.isolationType.tb,
          other: step5.isolationType.other,
          otherValue: step5.isolationTypeOther
        }
      : undefined,
    isolationCareType: toKoreanLabels(step5?.nursingDuringIsolation, ISOLATION_CARE_LABEL),
    isolationRehabType: toKoreanLabels(step5?.rehabilitationDuringIsolation, ISOLATION_REHAB_LABEL),

    // Step 6: 진료과 운영 현황 및 주요 보유 장비
    departmentSpecialists: step6?.departments,
    medicalDepartment: toDepartmentString(step6?.departments),
    majorEquipment: step6
      ? JSON.stringify({
          equipment: step6.equipment,
          otherEquipment: step6.otherEquipment?.filter(v => v.trim())
        })
      : undefined,

    // Step 7: 기본 처치 가능 항목
    availableTreatments: step7
      ? {
          management: step7.management,
          prescription: step7.prescription,
          dressing: step7.dressing,
          treatment: step7.treatment,
          otherItems: step7.otherItems?.filter(v => v.trim())
        }
      : undefined,

    // Step 8: 병원특성 및 기타사항
    remarks: emptyToUndef(step8?.hospitalCharacteristics),

    // 의원 전용 (병원 신청에서는 기본 false)
    clinicHasHemodialysis: false,
    clinicHasPeritoneal: false,
    clinicHasPhototherapy: false,
    clinicHasExcimerLaser: false
  }
}

/**
 * API 응답(PartnerHospitalModel) → AllStepData 변환 (임시저장 불러오기용)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapApiToStepData(api: any): AllStepData {
  return {
    step1: {
      hospitalName: api.hospital?.name ?? '',
      medicalInstitutionNumber: api.hospital?.phisCode ?? '',
      zipCode: api.hospital?.zipCode ?? '',
      address: api.hospital?.address ?? '',
      detailAddress: api.hospital?.addressDetail ?? '',
      phoneNumber: api.hospital?.phone ?? '',
      faxNumber: api.hospital?.faxNumber ?? '',
      website: api.hospital?.website ?? ''
    },
    step2: {
      directorName: api.directorName ?? '',
      birthDate: api.directorBirthDate?.slice(0, 10) ?? '',
      licenseNumber: api.directorLicenseNo ?? '',
      isDirector: api.isDirector ?? false,
      phone: api.directorPhone ?? '',
      gender: api.directorGender ?? '',
      carNumber: api.directorCarNo ?? '',
      email: api.directorEmail ?? '',
      school: api.directorSchool ?? '',
      graduationYear: api.directorGraduationYear ?? '',
      trainingHospital: api.directorTrainingHospital ?? '',
      department: api.directorDepartment ?? '',
      specialty: api.directorSubSpecialty ?? '',
      smsConsent: api.directorSmsConsent ? '동의' : '비동의',
      emailConsent: api.directorEmailConsent ? '동의' : '비동의',
      replyConsent: api.directorReplyConsent ? '동의' : '비동의'
    },
    step3: {
      staffName: api.staffName ?? '',
      deptType: api.staffDeptType ?? 'B',
      department: api.staffDeptValue ?? '',
      position: api.staffPosition ?? '',
      contactNumber: api.staffTel ?? '',
      mobilePhone: api.staffPhone ?? '',
      staffEmail: api.staffEmail ?? '',
      medicalInstitutionType: api.institutionType ? (INSTITUTION_TYPE_TO_CODE[api.institutionType] ?? api.institutionType) : '',
      totalEmployees: api.totalStaffCount?.toString() ?? '',
      specialists: api.specialistCount?.toString() ?? '',
      nurses: api.nurseCount?.toString() ?? ''
    },
    step4: {
      totalBedCount: api.totalBedCount?.toString() ?? '',
      operatingBeds: api.activeBedCount?.toString() ?? '',
      premiumRoomChecked: (api.premiumRoomCount ?? 0) > 0,
      premiumRoomCount: api.premiumRoomCount?.toString() ?? '',
      multiPersonRoomChecked: (api.multiRoomCount ?? 0) > 0,
      multiPersonRoomCount: api.multiRoomCount?.toString() ?? '',
      isolationRoomChecked: (api.isolationRoomCount ?? 0) > 0,
      isolationRoomCount: api.isolationRoomCount?.toString() ?? '',
      icuChecked: api.hasIcu ?? false,
      icuCount: api.icuCount?.toString() ?? '',
      emergencyRoomChecked: api.hasEr ?? false,
      emergencyRoomCount: api.erCount?.toString() ?? '',
      dialysisRoom: api.hasDialysisRoom ? '유' : '무',
      surgeryRoom: api.hasOperatingRoom ? '유' : '무',
      hospice: api.hasHospice ? '유' : '무',
      psychiatricWard: {
        general: api.hasPsychGeneral ?? false,
        closed: api.hasPsychClosed ?? false
      },
      rehabilitationTherapy: {
        physical: api.hasRehabPt ?? false,
        occupational: api.hasRehabOt ?? false,
        speech: api.hasRehabSt ?? false,
        swallowing: api.hasRehabSwallow ?? false,
        isolation: api.hasRehabIsolation ?? false
      }
    },
    step5: {
      integratedNursingCare: api.hasIntegratedNursing ? '유' : '무',
      guardianNursingCare: api.hasGuardianCare ? '유' : '무',
      jointNursingCare: api.hasSharedCare ? '유' : '무',
      isolationWardOperation:
        (api.isolationSingleCount ?? 0) > 0 ||
        (api.isolationDoubleCount ?? 0) > 0 ||
        (api.isolationTripleCount ?? 0) > 0
          ? '유'
          : '무',
      singleRoom: api.isolationSingleCount?.toString() ?? '',
      doubleRoom: api.isolationDoubleCount?.toString() ?? '',
      tripleRoom: api.isolationTripleCount?.toString() ?? '',
      isolationType: api.isolationTypes ?? { vre: false, cre: false, cpe: false, tb: false, other: false },
      isolationTypeOther: api.isolationTypes?.otherValue ?? '',
      nursingDuringIsolation: {
        joint: api.isolationCareType?.includes('공동') ?? false,
        individual: api.isolationCareType?.includes('개인') ?? false,
        guardian: api.isolationCareType?.includes('보호자') ?? false
      },
      rehabilitationDuringIsolation: {
        no: api.isolationRehabType?.includes('불가') ?? false,
        bedside: api.isolationRehabType?.includes('침상') ?? false,
        isolationWard: api.isolationRehabType?.includes('격리병동') ?? false
      }
    },
    step6: {
      departments: api.departmentSpecialists ?? undefined,
      equipment: api.majorEquipment
        ? (() => {
            try {
              return JSON.parse(api.majorEquipment).equipment
            } catch {
              return undefined
            }
          })()
        : undefined,
      otherEquipment: api.majorEquipment
        ? (() => {
            try {
              return JSON.parse(api.majorEquipment).otherEquipment ?? ['', '']
            } catch {
              return ['', '']
            }
          })()
        : ['', '']
    },
    step7: {
      management: api.availableTreatments?.management ?? undefined,
      prescription: api.availableTreatments?.prescription ?? undefined,
      dressing: api.availableTreatments?.dressing ?? undefined,
      treatment: api.availableTreatments?.treatment ?? undefined,
      otherItems: api.availableTreatments?.otherItems ?? ['', '']
    },
    step8: {
      hospitalCharacteristics: api.remarks ?? '',
      files: [],
      existingAttachments: (api.attachmentRows ?? []).map((a: any) => ({
        id: a.id,
        originalName: a.originalName,
        storedPath: a.storedPath,
        mimeType: a.mimeType,
        fileSize: a.fileSize
      }))
    }
  }
}

// ─── 협력의원 전용 매퍼 ───

/** 의원 4개 Step 데이터를 모아놓은 타입 */
export interface ClinicAllStepData {
  step1?: Partial<HospitalInfoStepData>
  step2?: Partial<DirectorInfoStepData>
  step3?: Partial<ClinicStaffInfoStepData>
  step4?: Partial<HospitalCharacteristicsStepData>
}

/**
 * 의원 4개 Step 데이터 → ApplyPartnerHospitalInput 변환
 */
export function mapClinicStepsToApiInput(
  data: ClinicAllStepData,
  hospitalId: string,
  hospitalCode: HospitalCode
): ApplyPartnerHospitalInput {
  const { step1, step2, step3, step4 } = data

  return {
    hospitalId,
    hospitalCode,
    institutionType: toInstitutionTypeCode(step3?.medicalInstitutionType),
    institutionCode: toInstitutionCode(toInstitutionTypeCode(step3?.medicalInstitutionType)),

    // Step 1: 병원 정보
    hospitalName: emptyToUndef(step1?.hospitalName),
    hospitalPhisCode: emptyToUndef(step1?.medicalInstitutionNumber),
    hospitalZipCode: emptyToUndef(step1?.zipCode),
    hospitalAddress: emptyToUndef(step1?.address),
    hospitalAddressDetail: emptyToUndef(step1?.detailAddress),
    hospitalPhone: emptyToUndef(step1?.phoneNumber),
    hospitalFaxNumber: emptyToUndef(step1?.faxNumber),
    hospitalWebsite: emptyToUndef(step1?.website),

    // Step 2: 병원장 정보
    directorName: emptyToUndef(step2?.directorName),
    directorBirthDate: toDateString(step2?.birthDate),
    directorLicenseNo: emptyToUndef(step2?.licenseNumber),
    isDirector: step2?.isDirector ?? false,
    directorPhone: emptyToUndef(step2?.phone),
    directorGender: toGenderCode(step2?.gender),
    directorCarNo: emptyToUndef(step2?.carNumber),
    directorEmail: emptyToUndef(step2?.email),
    directorSchool: emptyToUndef(step2?.school),
    directorGraduationYear: emptyToUndef(step2?.graduationYear),
    directorTrainingHospital: emptyToUndef(step2?.trainingHospital),
    directorDepartment: emptyToUndef(step2?.department),
    directorSubSpecialty: emptyToUndef(step2?.specialty),
    directorSmsConsent: step2 ? toConsent(step2.smsConsent) : undefined,
    directorEmailConsent: step2 ? toConsent(step2.emailConsent) : undefined,
    directorReplyConsent: step2 ? toConsent(step2.replyConsent) : undefined,

    // Step 3: 실무자 정보
    staffName: emptyToUndef(step3?.staffName),
    staffDeptType: toStaffDeptTypeCode(step3?.deptType),
    staffDeptValue: emptyToUndef(step3?.department),
    staffPosition: emptyToUndef(step3?.position),
    staffTel: emptyToUndef(step3?.contactNumber),
    staffPhone: emptyToUndef(step3?.mobilePhone),
    staffEmail: emptyToUndef(step3?.staffEmail),

    // Step 3: 병상/직원
    totalBedCount: toInt(step3?.totalBeds),
    activeBedCount: toInt(step3?.totalBeds),
    totalStaffCount: toInt(step3?.totalStaff),
    specialistCount: toInt(step3?.specialists),
    nurseCount: toInt(step3?.nurses),

    // Step 3: 장비 (의원은 텍스트 그대로)
    majorEquipment: emptyToUndef(step3?.mainEquipment),

    // Step 3: 세부정보
    hasPhysicalTherapy: toBool(step3?.physicalTherapyRoom),
    clinicHasHemodialysis: step3?.dialysis?.blood ?? false,
    clinicHasPeritoneal: step3?.dialysis?.peritoneal ?? false,
    clinicMedicationType: emptyToUndef(step3?.medication),
    clinicHasPhototherapy: step3?.dermatology?.phototherapy ?? false,
    clinicHasExcimerLaser: step3?.dermatology?.excimerLaser ?? false,

    // Step 3: 이비인후과 + 기타 → availableTreatments JSON
    availableTreatments: step3
      ? {
          otolaryngology: step3.otolaryngology,
          other: step3.other
        }
      : undefined,

    // 의원은 진료과 Step이 없으므로 병원장 진료과를 사용
    medicalDepartment: emptyToUndef(step2?.department),

    // Step 4: 병원특성 및 기타사항
    remarks: emptyToUndef(step4?.hospitalCharacteristics)
  }
}

/**
 * API 응답 → ClinicAllStepData 변환 (의원 임시저장 불러오기용)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapApiToClinicStepData(api: any): ClinicAllStepData {
  return {
    step1: {
      hospitalName: api.hospital?.name ?? '',
      medicalInstitutionNumber: api.hospital?.phisCode ?? '',
      zipCode: api.hospital?.zipCode ?? '',
      address: api.hospital?.address ?? '',
      detailAddress: api.hospital?.addressDetail ?? '',
      phoneNumber: api.hospital?.phone ?? '',
      faxNumber: api.hospital?.faxNumber ?? '',
      website: api.hospital?.website ?? ''
    },
    step2: {
      directorName: api.directorName ?? '',
      birthDate: api.directorBirthDate?.slice(0, 10) ?? '',
      licenseNumber: api.directorLicenseNo ?? '',
      isDirector: api.isDirector ?? false,
      phone: api.directorPhone ?? '',
      gender: api.directorGender ?? '',
      carNumber: api.directorCarNo ?? '',
      email: api.directorEmail ?? '',
      school: api.directorSchool ?? '',
      graduationYear: api.directorGraduationYear ?? '',
      trainingHospital: api.directorTrainingHospital ?? '',
      department: api.directorDepartment ?? '',
      specialty: api.directorSubSpecialty ?? '',
      smsConsent: api.directorSmsConsent ? '동의' : '비동의',
      emailConsent: api.directorEmailConsent ? '동의' : '비동의',
      replyConsent: api.directorReplyConsent ? '동의' : '비동의'
    },
    step3: {
      staffName: api.staffName ?? '',
      deptType: api.staffDeptType ?? 'B',
      department: api.staffDeptValue ?? '',
      position: api.staffPosition ?? '',
      contactNumber: api.staffTel ?? '',
      mobilePhone: api.staffPhone ?? '',
      staffEmail: api.staffEmail ?? '',
      medicalInstitutionType: api.institutionType ? (INSTITUTION_TYPE_TO_CODE[api.institutionType] ?? api.institutionType) : '50',
      totalBeds: api.totalBedCount?.toString() ?? '',
      totalStaff: api.totalStaffCount?.toString() ?? '',
      specialists: api.specialistCount?.toString() ?? '',
      nurses: api.nurseCount?.toString() ?? '',
      mainEquipment: api.majorEquipment ?? '',
      physicalTherapyRoom: api.hasPhysicalTherapy ? '유' : '무',
      dialysis: {
        blood: api.clinicHasHemodialysis ?? false,
        peritoneal: api.clinicHasPeritoneal ?? false
      },
      medication: api.clinicMedicationType ?? '',
      dermatology: {
        phototherapy: api.clinicHasPhototherapy ?? false,
        excimerLaser: api.clinicHasExcimerLaser ?? false
      },
      otolaryngology: api.availableTreatments?.otolaryngology ?? {
        earSurgeryDisinfection: false,
        betadineSoaking: false
      },
      other: api.availableTreatments?.other ?? {
        surgicalSiteDisinfection: false,
        stitchOut: false,
        chemoportNeedleOut: false
      }
    },
    step4: {
      hospitalCharacteristics: api.remarks ?? '',
      files: [],
      existingAttachments: (api.attachmentRows ?? []).map((a: any) => ({
        id: a.id,
        originalName: a.originalName,
        storedPath: a.storedPath,
        mimeType: a.mimeType,
        fileSize: a.fileSize
      }))
    }
  }
}
