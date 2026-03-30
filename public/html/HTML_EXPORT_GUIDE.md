# React → 정적 HTML 내보내기 가이드

React 페이지를 `public/html/`에 정적 HTML로 변환하여 GrapesJS CMS(`/content` 페이지)에 등록할 때 지켜야 할 규칙들.

---

## 1. CSS 작성 규칙

### 1-1. border 속성에 CSS 변수(`var(...)`) 사용 금지

GrapesJS가 CSS를 파싱/저장할 때 `var()` 함수를 border-color 값으로 처리하지 못하고 누락시킨다.

```css
/* X 잘못된 예 */
border-color: var(--color-border);

/* O 올바른 예 */
border-color: #bbbbbb;
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

### 3-1. 외부 이미지 참조 없이 base64 인라인

배경 이미지(`boxBgImg.png` 등)는 외부 파일 참조 대신 `data:image/png;base64,...` 형태로 인라인.

```css
background-image: url('data:image/png;base64,iVBORw0KGgo...');
```

---

## 4. 레이아웃 주의사항

### 4-1. `/content` 페이지와의 중첩 구조 주의

CMS 콘텐츠는 `/content` 페이지의 `<main>` 안에서 렌더링된다. CMS HTML이 자체적으로 `.wrap > .main > .container` 구조를 가지면 컨테이너 패딩이 이중 적용되어 좁아진다.

- `/content` 페이지의 `contentBody`는 `.container` 바깥에서 렌더링되도록 구조 변경 완료
- CMS 콘텐츠가 자체 `.container`를 가지므로 외부에서 추가 `.container`로 감싸지 않을 것

---

## 5. 참고: 변환 대상 색상값

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
