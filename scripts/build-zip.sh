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
  WINDOWS-START.txt

echo "완료: $archive"
echo "참고: 이 ZIP은 .gitignore에 등록되어 Git/PR에는 추가되지 않습니다."
