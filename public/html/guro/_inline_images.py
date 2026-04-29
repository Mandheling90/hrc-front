"""
HTML 파일들에서 src="/images/..." 외부 이미지 참조를 base64 data URI로 인라인 변환.
실행: python _inline_images.py
"""
import os
import re
import base64
import mimetypes
from pathlib import Path

ANAM_DIR = Path(__file__).resolve().parent  # public/html/anam
PUBLIC = ANAM_DIR.parent.parent  # public
ROOT = PUBLIC.parent  # hrc-front

HTML_FILES = [
    "about-organization.html",
    "about-greeting.html",
    "about-intro.html",
    "network-hotline.html",
    "network.html",
    "referral-request-exchange.html",
    "referral-request-hira.html",
]

# 이미지 캐시: path -> data URI
cache = {}

def encode_image(rel_path: str) -> str:
    """rel_path는 / 로 시작 (예: /images/about/organization/organization_anam_desktop.png)"""
    if rel_path in cache:
        return cache[rel_path]
    abs_path = PUBLIC / rel_path.lstrip("/").replace("/", os.sep)
    if not abs_path.exists():
        print(f"  [WARN] 이미지 없음: {abs_path}")
        return rel_path  # fallback (원본 유지)
    mime, _ = mimetypes.guess_type(str(abs_path))
    if mime is None:
        mime = "image/png"
    with open(abs_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    data_uri = f"data:{mime};base64,{b64}"
    cache[rel_path] = data_uri
    return data_uri

# src="/images/..." 또는 src='/images/...' 매치
SRC_RE = re.compile(r"""src=(["'])(/images/[^"']+\.(?:png|jpe?g|gif|webp|svg))\1""", re.IGNORECASE)

def process(html_path: Path) -> None:
    text = html_path.read_text(encoding="utf-8")
    matches = SRC_RE.findall(text)
    unique = sorted(set(m[1] for m in matches))
    print(f"[{html_path.name}] {len(matches)}개 참조, {len(unique)}개 고유 이미지")
    if not matches:
        return
    def repl(m):
        quote = m.group(1)
        rel = m.group(2)
        data_uri = encode_image(rel)
        return f'src={quote}{data_uri}{quote}'
    new_text = SRC_RE.sub(repl, text)
    html_path.write_text(new_text, encoding="utf-8")
    print(f"  -> 변환 완료, 파일 크기: {html_path.stat().st_size:,} bytes")

if __name__ == "__main__":
    for name in HTML_FILES:
        path = ANAM_DIR / name
        if path.exists():
            process(path)
        else:
            print(f"[SKIP] {name} 없음")
    print("\n완료.")
