# React → 정적 HTML 내보내기 가이드

React 페이지를 `public/html/`에 정적 HTML로 변환하여 GrapesJS CMS(`/content` 페이지)에 등록할 때 지켜야 할 규칙들.

---
## 0. 대상
안암, 구로, 안산 병원별
referral/request
referral/request/exchange
referral/request/hira

network
network/hotline

about/intro
about/greeting
about/organization

---
## 1. CSS 작성 규칙

### 1-1. border 속성에 CSS 변수(`var(...)`) 사용 금지

GrapesJS가 CSS를 파싱/저장할 때 `var()` 함수를 border-color 값으로 처리하지 못하고 누락시킨다. **모든 색상 변수**(`--color-border`, `--color-primary`, `--color-secondary` 등)에 동일하게 적용된다.

```css
/* X 잘못된 예 */
border-color: var(--color-border);
border-color: var(--color-primary);

/* O 올바른 예 — 라이트모드 hex + [data-theme='dark'] 오버라이드 */
border-color: #bbbbbb;
[data-theme='dark'] .my-card { border-color: #333333; }

border-color: #9f1836;
[data-theme='dark'] .button-primary { border-color: #c9304e; }
```

### 1-2. border는 shorthand 대신 longhand 사용

GrapesJS가 shorthand → longhand 변환 과정에서 속성이 누락될 수 있다.

```css
/* X 잘못된 예 */
border: 1px solid #dbbf93;

/* O 올바른 예 */
border-width: 1px;
border-style: solid;
border-color: #dbbf93;
```

### 1-3. `white-space: pre-line` 사용 금지

GrapesJS가 HTML 저장 시 태그 뒤에 줄바꿈+들여쓰기를 추가하는데, `pre-line`이 이를 표시하여 텍스트 상단에 빈 줄이 생긴다.

```css
/* X 잘못된 예 */
white-space: pre-line;

/* O 올바른 예 */
white-space: normal;
```

줄바꿈이 필요하면 HTML에서 `<br>` 태그를 사용할 것.

```html
<!-- X 잘못된 예 (\n 줄바꿈) -->
<p>진료정보교류와 심평원 중계포털을
이용한 전자의뢰가 가능합니다.</p>

<!-- O 올바른 예 (<br> 태그) -->
<p>진료정보교류와 심평원 중계포털을<br>이용한 전자의뢰가 가능합니다.</p>
```

### 1-4. `font-family`는 원본 컴포넌트의 선언을 그대로 따를 것

원본 React 컴포넌트에서 `font-family`를 명시적으로 선언한 요소만 HTML에서도 `font-family`를 지정한다. 나머지는 `body`의 `var(--font-family)` (Pretendard Variable + 폴백)를 상속받으므로 추가하지 않는다.

원본에서 `font-family`를 명시하는 컴포넌트 확인 방법:
```bash
grep -r "font-family" src/components/molecules/해당컴포넌트/
```

예시 (referral 페이지 기준):
- `.guide-box p` → `font-family: "Pretendard", sans-serif` **명시** (원본 InfoBox의 `.guideMessage`에 선언됨)
- `.page-title`, `.section-title`, `.card-title`, `.card-description` → `font-family` **미지정** (body 상속)

```css
/* X 잘못된 예 - 원본에 없는 font-family를 임의로 추가 */
.page-title {
  font-family: "Pretendard", sans-serif;
  font-size: 40px;
}

/* O 올바른 예 - 원본에 font-family가 없으면 생략 */
.page-title {
  font-size: 40px;
}
```

### 1-5. `:root`에 `--font-family` 변수 정의 필수

`body { font-family: var(--font-family); }` 를 사용하므로 `:root` 에 변수 정의가 반드시 있어야 한다. CMS 환경에서 호스트 페이지의 변수에 의존하지 말고 자체 정의할 것.

```css
/* O 올바른 예 */
:root {
  --color-primary: #9f1836;
  /* ...다른 변수들... */
  --font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
    'Noto Sans KR', 'Malgun Gothic', sans-serif;
}
```

### 1-6. 좁은 컨테이너 안 텍스트 오버플로우 처리

좁은 카드(예: 5열 ProcedureFlow `.flow-card`) 안에서 긴 URL이나 띄어쓰기 없는 텍스트가 컨테이너를 넘쳐 흐르는 현상이 발생한다. 루트의 `word-break: keep-all` 때문에 한국어는 어절 단위로만 나눠지고, URL은 끊기지 않기 때문이다.

```css
/* O 좁은 컨테이너 안 텍스트 요소에 추가 */
.procedure-item {
  white-space: normal;
  overflow-wrap: anywhere;       /* 어디서든 줄바꿈 허용 */
  word-break: break-word;        /* 단어 우선, 필요시 단어 내부 */
}
.procedure-item a {
  word-break: break-all;         /* URL 같은 연속 문자열은 강제 끊기 */
}
```

---

## 2. 다크모드 처리 규칙

### 2-1. `prefers-color-scheme` 미디어 쿼리 사용 금지

앱은 `[data-theme='dark']` 속성 기반으로 다크모드를 처리한다. OS 설정 감지(`prefers-color-scheme`)는 사용하지 않는다.

```css
/* X 잘못된 예 */
@media (prefers-color-scheme: dark) {
  .guide-box { background-color: #555; }
}

/* O 올바른 예 */
[data-theme='dark'] .guide-box {
  background-color: #555;
}
```

### 2-2. 다크모드 고정 색상값 매핑표

CSS 변수를 사용할 수 없는 속성(border 등)은 다크모드 색상을 별도 지정해야 한다.

| 용도 | 라이트모드 | 다크모드 |
|------|-----------|---------|
| `--color-border` | `#bbbbbb` | `#333333` |
| `--color-secondary-hover` | `#dbbf93` | `#4a3028` |
| guide-box 다크 배경 | - | `background-color: #555` + `background-blend-mode: multiply` |
| `--color-primary` | `#9f1836` | `#c9304e` |
| `--color-secondary` | `#c09c63` | `#c09c63` (변경 없음) |
| `--color-darken` | `#000000` | `#bdbdbd` |
| `--color-white` | `#ffffff` | `#1e1e1e` |
| `--color-text-secondary` | `#636363` | `#bdbdbd` |
| `--color-text-tertiary` | `#8c8c8c` | `#7b8393` |
| `--color-accent-bg` | `#FEF8F8` | `#2a1a1e` |
| `--color-surface` | `#f9f9f9` | `#111111` |

### 2-3. SVG 아이콘 색상은 CSS 변수 유지 가능

SVG 속성(`fill`, `stroke`)의 `var(--color-primary)`는 GrapesJS가 변환하지 않으므로 CSS 변수 사용 가능.

```html
<!-- O 이렇게 사용 가능 -->
<path fill="var(--color-primary)" d="..." />
```

### 2-4. 테마 토글 버튼 불포함

정적 HTML에는 다크모드 토글 버튼을 넣지 않는다. 다크모드 전환은 앱의 ThemeToggle 컴포넌트가 담당.

---

## 3. 이미지 처리

### 3-1. 모든 외부 이미지는 base64 인라인 처리

CMS 환경에서는 `/images/...` 외부 경로가 정상적으로 로드되지 않는다(다른 도메인/iframe/에디터 내부 미리보기 등). 따라서 **배경 이미지뿐 아니라 콘텐츠 이미지(조직도, 인사말 사진, 플로우차트, 스텝 이미지 등)도 모두 base64 데이터 URI로 인라인**해야 한다.

```css
/* 배경 이미지 */
background-image: url('data:image/png;base64,iVBORw0KGgo...');
```

```html
<!-- 콘텐츠 이미지 -->
<img src="data:image/png;base64,iVBORw0KGgo..." alt="조직도" />
```

### 3-2. 일괄 변환 스크립트

`public/html/anam/_inline_images.py` 스크립트로 일괄 처리 가능. `src="/images/..."` 형식의 외부 이미지 참조를 모두 base64로 변환한다.

```bash
cd public/html/anam
python _inline_images.py
```

다른 병원 폴더(구로/안산)에서도 동일 스크립트의 `HTML_FILES` 배열만 수정해 재사용한다.

### 3-3. 큰 이미지 주의

`hira-step1.png` 처럼 800KB 이상인 이미지는 base64 인코딩 시 ~1.1MB 가 되어 HTML 파일이 비대해진다. CMS 등록·편집은 가능하나 응답이 느려질 수 있으므로 가능하면 원본 이미지를 사전 압축하는 것이 좋다.

---

## 4. 컴포넌트 패턴

### 4-1. InfoBox(guide variant) → `.guide-box` 단순 패턴

원본 React InfoBox 컴포넌트의 다중 wrapper(`.guide`, `.guide-inner`, `.guide-content`, `.guide-list`, `.guide-item`, `.guide-message`) 구조를 그대로 옮기면 GrapesJS 에디터에서 편집이 어렵다. `referral.html` 의 단순 `.guide-box > p` 패턴을 따른다.

```html
<!-- O 단순 패턴 (referral.html 기준) -->
<div class="guide-box">
  <p>첫 번째 메시지<br>두 번째 줄.<br><br>두 번째 단락.</p>
</div>
```

```css
.guide-box {
  background-color: var(--color-secondary-bg);
  background-image: url('data:image/png;base64,...');  /* boxBgImg */
  background-size: cover; background-position: center; background-repeat: no-repeat;
  border-width: 1px; border-style: solid; border-color: #dbbf93;
  border-radius: 10px; padding: 40px 20px;
  display: flex; align-items: center; justify-content: center;
  transition: background-color 0.2s, border-color 0.2s;
}
[data-theme='dark'] .guide-box {
  background-color: #555; background-blend-mode: multiply; border-color: #4a3028;
}
.guide-box p {
  font-family: "Pretendard", sans-serif;
  font-size: 20px; font-weight: 400; color: var(--color-text-secondary);
  line-height: 1.5; letter-spacing: -0.8px; margin: 0;
  text-align: center; white-space: normal;
}

/* 태블릿(769~1429) / 모바일(≤768) 공통 */
@media (max-width: 1429px) {
  .guide-box { padding: 20px; }
  .guide-box p { font-size: 18px; line-height: 27px; letter-spacing: -0.72px; }
}
```

### 4-2. SectionTitle 반응형 margin-bottom

원본 `.header` 클래스는 데스크톱 8px → 태블릿/모바일 16px 로 변환된다.

```css
.section-title-row { margin-bottom: 8px; }
@media (max-width: 1429px) {
  .section-title-row { margin-bottom: 16px; }
}
```

---

## 5. 반응형 미디어 쿼리 캐스케이드 주의

원본 SCSS 의 `@include tablet` 은 `@media (max-width: 1429px)` 로 변환되어 태블릿 + 모바일 모두에 적용된다. HTML 변환 시 `@media (min-width: 769px) and (max-width: 1429px)` 처럼 태블릿만 분리하면 캐스케이드가 깨진다.

```scss
/* SCSS 원본 — 태블릿/모바일 모두 적용 */
.flow-chip {
  font-size: 24px;
  @include tablet {           /* ≤1429 */
    font-size: 20px;          /* 모바일도 자동 적용 */
    letter-spacing: -0.8px;
  }
  @include mobile { ... }     /* ≤768, font-size 미지정 → 20px 유지 */
}
```

```css
/* X 잘못된 변환 — 모바일에서 24px 로 되돌아감 */
.flow-chip { font-size: 24px; }
@media (min-width: 769px) and (max-width: 1429px) {
  .flow-chip { font-size: 20px; letter-spacing: -0.8px; }
}
@media (max-width: 768px) {
  .flow-chip { display: flex; gap: 8px; /* font-size 누락! */ }
}

/* O 올바른 변환 — 태블릿/모바일 양쪽에 명시 */
.flow-chip { font-size: 24px; }
@media (min-width: 769px) and (max-width: 1429px) {
  .flow-chip { font-size: 20px; letter-spacing: -0.8px; }
}
@media (max-width: 768px) {
  .flow-chip {
    display: flex; gap: 8px;
    font-size: 20px; letter-spacing: -0.8px;  /* 태블릿 값 명시 */
  }
}
```

---

## 6. 레이아웃 주의사항

### 6-1. `/content` 페이지와의 중첩 구조 주의

CMS 콘텐츠는 `/content` 페이지의 `<main>` 안에서 렌더링된다. CMS HTML이 자체적으로 `.wrap > .main > .container` 구조를 가지면 컨테이너 패딩이 이중 적용되어 좁아진다.

- `/content` 페이지의 `contentBody`는 `.container` 바깥에서 렌더링되도록 구조 변경 완료
- CMS 콘텐츠가 자체 `.container`를 가지므로 외부에서 추가 `.container`로 감싸지 않을 것

---

## 7. 참고: 변환 대상 색상값

`src/styles/variables.scss`와 `src/styles/globals.scss`에서 CSS 변수 정의 확인 가능.

### `:root` (라이트모드)

```css
:root {
  --color-primary: #9f1836;
  --color-secondary: #c09c63;
  --color-secondary-bg: #fdf9f4;
  --color-secondary-hover: #dbbf93;
  --color-white: #ffffff;
  --color-darken: #000000;
  --color-border: #bbbbbb;
  --color-text-secondary: #636363;
  --color-text-tertiary: #8c8c8c;
  --color-accent-bg: #FEF8F8;
  --color-surface: #f9f9f9;
  --font-family: 'Pretendard Variable', Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
    'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
}
```

### `[data-theme='dark']` (다크모드)

```css
[data-theme='dark'] {
  --color-primary: #c9304e;
  --color-secondary-bg: #2a1a1e;
  --color-secondary-hover: #4a3028;
  --color-white: #1e1e1e;
  --color-darken: #bdbdbd;
  --color-border: #333333;
  --color-text-secondary: #bdbdbd;
  --color-text-tertiary: #7b8393;
  --color-accent-bg: #2a1a1e;
  --color-surface: #111111;
}
```

---

## 8. 검수 체크리스트

새 HTML 변환 후 `public/html/<병원>/_audit.py` 로 자동 점검 가능. 수동 점검 시 다음 항목 확인:

- [ ] `:root` 에 `--font-family` 변수 정의됨
- [ ] `border-color: var(--...)` 가 모두 리터럴 hex 로 교체됨 (모든 색상 변수)
- [ ] `border: 1px solid ...` shorthand 가 longhand 로 분리됨
- [ ] `white-space: pre-line` 미사용
- [ ] `@media (prefers-color-scheme: dark)` 미사용 → `[data-theme='dark']` 사용
- [ ] hex border 색상마다 다크모드 오버라이드 존재
- [ ] InfoBox(guide) 가 `.guide-box > p` 단순 패턴이며 boxBgImg base64 포함
- [ ] 모든 `<img src>` 와 `background-image: url(...)` 이 `data:` 로 시작 (외부 `/images/` 참조 없음)
- [ ] `.section-title-row` 에 반응형 margin-bottom 16px 적용
- [ ] 좁은 카드 안 텍스트(`procedure-item` 등)에 `overflow-wrap: anywhere` 적용
- [ ] 태블릿/모바일 미디어 쿼리에 폰트 사이즈 캐스케이드가 누락되지 않음 (특히 flow-chip)
