# 경로 정리 문서

## 📋 현재 작업 완료된 경로 (Header.tsx 기준)

### 홈 & 인증
- `/` - 홈 페이지 ✅
- `/login` - 로그인 ✅
- `/signup` - 회원가입 ✅
- `/find-user` - 아이디/비밀번호 찾기 ✅ (Header에 없음)

### 진료의뢰 메뉴
- `/referral` - 진료의뢰시스템 소개 ✅
- `/referral/request` - 진료협력센터 의뢰 ✅
- `/referral/request/exchange` - 진료정보교류 의뢰 ✅
- `/referral/request/hira` - 심평원중계시스템 의뢰 ✅
- `/referral/department` - 진료과 안내 ✅

### 협력네트워크 메뉴
- `/referral/network` - 협력네트워크 소개&신청 ✅
- `/referral/network/hospital-application` - 협력병원 신청 ✅
- `/referral/network/hospital-application/complete` - 협력병원 신청 완료 ✅ (Header에 없음)
- `/referral/network/clinic-application` - 협력의원 신청 ✅ (Header에 없음)
- `/referral/network/status` - 협력병의원 현황 ✅

### 기타
- `/style-guide` - 스타일 가이드 ✅ (Header에 없음)

---

## 🚧 작업 예정 경로 (disabled: true)

### 협력네트워크 메뉴
- `/network/hotline` - 교수직통 핫라인 ⏳
- `/network/e-consult` - e-Consult 신청 ⏳

### 공지/정보 메뉴
- `/notice/list` - 공지사항 ⏳
- `/notice/news` - 병원소식 ⏳
- `/notice/event` - 교육/행사 ⏳

### 진료협력센터 소개 메뉴
- `/about/intro` - 진료협력센터 소개 ⏳
- `/about/greeting` - 센터장 인사말 ⏳
- `/about/organization` - 조직도/연락처 ⏳
- `/about/location` - 오시는 길 ⏳

### 마이페이지 메뉴 (로그인 시 표시)
- `/mypage/info` - 회원정보 수정 ⏳
- `/mypage/hospital-info` - 협력병원 정보수정 ⏳
- `/mypage/patients` - 의뢰환자 조회 ⏳
- `/mypage/e-consult` - e-Consult 조회 ⏳

---

## 📊 통계

- **작업 완료**: 15개 경로
- **작업 예정**: 12개 경로
- **총 경로**: 27개 경로

---

## 📝 참고사항

1. **Header에 없는 실제 페이지**:
   - `/find-user` - 아이디/비밀번호 찾기
   - `/referral/network/clinic-application` - 협력의원 신청
   - `/referral/network/hospital-application/complete` - 협력병원 신청 완료
   - `/style-guide` - 스타일 가이드

2. **경로 불일치**:
   - Header의 `/network/hotline`, `/network/e-consult`는 `/referral/network/` 하위가 아닌 `/network/` 하위로 정의되어 있음
   - 실제 프로젝트 구조와 일치시키려면 경로 수정 필요

3. **마이페이지 메뉴**:
   - 현재 `isLoggedIn = false`로 설정되어 있어 마이페이지 메뉴는 표시되지 않음
   - 로그인 기능 구현 후 활성화 예정
