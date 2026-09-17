#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

archive="LAVERITA-Windows.zip"
rm -f "$archive"
zip -q -r "$archive" \
  index.html \
  brand.html \
  collection.html \
  bespoke.html \
  assets \
  깃허브1.png \
  깃허브2.png \
  깃허브3.jpg \
  깃허브4.jpg \
  깃허브5.jpg \
  깃허브6.jpg \
  깃허브7.jpg \
  깃허브8.jpg \
  퍼플작품.jpg \
  WINDOWS-START.txt

echo "완료: $archive"
echo "참고: 이 ZIP은 .gitignore에 등록되어 Git/PR에는 추가되지 않습니다."
