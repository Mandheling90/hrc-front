"""안암 변환 HTML 파일들 일괄 검수 - 가이드 위반 사항 점검."""
from pathlib import Path
import re

ANAM = Path(__file__).resolve().parent
TARGETS = [
    "about-organization.html",
    "about-greeting.html",
    "about-intro.html",
    "network-hotline.html",
    "network.html",
    "referral-request-exchange.html",
    "referral-request-hira.html",
]

CHECKS = [
    # (label, regex pattern, expected: bool=must_have / 'absent'=must_not_have, applies_when)
    ("--font-family in :root", r"--font-family:\s*'Pretendard", True, "always"),
    (".info-box-* 잔여 (단순화 필요)", r"info-box-(inner|content|list|item|message)", "absent", "always"),
    ("border CSS var (var(--color-border) on border-color)", r"border-color:\s*var\(--color-border\)", "absent", "always"),
    ("border shorthand (border: ... ;)", r"^\s*border:\s*\d+px\s+solid", "absent", "always"),
    ("white-space: pre-line", r"white-space:\s*pre-line", "absent", "always"),
    ("@media prefers-color-scheme", r"@media\s*\(prefers-color-scheme", "absent", "always"),
    ("[data-theme='dark'] 다크모드 매핑", r"\[data-theme=['\"]dark['\"]\]", True, "always"),
    ("guide-box 사용 시 background-image base64", r"\.guide-box\s*\{[^}]*background-image:\s*url\('data:image", True, "if-guide-box"),
    ("외부 src=/images 잔여 (base64화 안됨)", r"src=['\"]/images/", "absent", "always"),
    ("section-title-row margin-bottom 반응형 (16px tablet/mobile)", r"\.section-title-row\s*\{\s*margin-bottom:\s*16px", True, "if-section-title-row"),
    ("procedure-item overflow-wrap (긴 텍스트 처리)", r"\.procedure-item\s*\{[^}]*overflow-wrap", True, "if-procedure-item"),
    ("flow-card 가 있을 때 procedure-item word-break", r"word-break:\s*break-word", True, "if-flow-card"),
]

def check_file(path: Path):
    text = path.read_text(encoding="utf-8")
    issues = []
    has_guide_box = ".guide-box" in text
    has_section_title_row = ".section-title-row" in text
    has_procedure_item = ".procedure-item " in text or ".procedure-item{" in text or ".procedure-item:" in text
    has_flow_card = ".flow-card" in text

    for label, pattern, expected, when in CHECKS:
        # applies?
        if when == "if-guide-box" and not has_guide_box: continue
        if when == "if-section-title-row" and not has_section_title_row: continue
        if when == "if-procedure-item" and not has_procedure_item: continue
        if when == "if-flow-card" and not has_flow_card: continue

        m = re.search(pattern, text, re.MULTILINE | re.DOTALL)
        if expected is True:
            if not m:
                issues.append(f"  [MISSING] {label}")
        elif expected == "absent":
            if m:
                # 첫 번째 매치 위치
                line_num = text[:m.start()].count("\n") + 1
                issues.append(f"  [VIOLATION] {label} (line {line_num})")
    return issues

print("=" * 60)
print("HTML 파일 검수 보고서")
print("=" * 60)
for name in TARGETS:
    path = ANAM / name
    if not path.exists():
        print(f"\n[{name}] 파일 없음")
        continue
    issues = check_file(path)
    print(f"\n[{name}] ({path.stat().st_size:,} bytes)")
    if not issues:
        print("  OK - 이슈 없음")
    else:
        for i in issues:
            print(i)
