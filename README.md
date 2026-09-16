# LAVERITA Website

라베리따의 브랜드 철학, 컬렉션, 여성정장 맞춤 제작 과정을 소개하는 정적 홈페이지입니다.

## Windows에서 가장 쉽게 확인하는 방법

1. GitHub 저장소에서 **Code → Download ZIP**을 눌러 전체 파일을 다운로드합니다.
2. 다운로드한 ZIP 파일을 마우스 오른쪽 버튼으로 누르고 **모두 압축 풀기**를 선택합니다.
3. 압축을 푼 폴더 안의 **`index.html`**을 더블클릭합니다.
4. 기본 웹 브라우저에서 메인 화면이 열리며 상단 메뉴로 다른 페이지를 볼 수 있습니다.

`assets` 폴더는 이동하거나 이름을 바꾸지 마세요. 작품 이미지는 `assets/css/artwork-data.css`에 Base64 텍스트로 보존되어 있으며 HTML, CSS, JavaScript가 모두 상대 경로로 연결되어 있어 인터넷이나 별도 프로그램 없이 동작합니다.

## 개발용 실행 방법

1. 터미널에서 이 폴더로 이동합니다.
2. `npm start`를 실행합니다.
3. 브라우저에서 `http://localhost:4173`을 엽니다.

서버 실행에도 별도의 설치 과정은 필요하지 않습니다. 실행을 끝내려면 터미널에서 `Ctrl+C`를 누릅니다.

## 페이지

- `index.html`: 메인
- `brand.html`: 브랜드 소개
- `collection.html`: 컬렉션
- `bespoke.html`: 맞춤 제작 안내

공식 작품 사진이나 문구가 추가되면 `assets/images`의 이미지와 각 HTML의 내용을 교체하여 확장할 수 있습니다.

## ZIP 다시 만들기

홈페이지를 수정한 뒤 `npm run build:zip`을 실행하면 Windows 검토용 `LAVERITA-Windows.zip`을 로컬에서 새로 만들 수 있습니다. 이 ZIP은 PR의 바이너리 제한을 피하기 위해 Git 변경 목록에는 포함하지 않습니다.
