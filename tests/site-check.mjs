import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const pages = ["index.html", "brand.html", "collection.html", "bespoke.html"];
const requiredLinks = pages;
const collectionImages = Array.from({ length: 8 }, (_, index) =>
  `깃허브${index + 1}.${index < 2 ? "png" : "jpg"}`,
);

for (const page of pages) {
  if (!existsSync(page)) throw new Error(`${page} 파일이 없습니다.`);
  const html = readFileSync(page, "utf8");
  for (const link of requiredLinks) {
    if (!html.includes(`href="${link}"`))
      throw new Error(`${page}에 ${link} 링크가 없습니다.`);
  }
  if (!html.includes('name="viewport"'))
    throw new Error(`${page}에 모바일 viewport 설정이 없습니다.`);
  if (!html.includes("assets/css/style.css"))
    throw new Error(`${page}에 공통 스타일이 연결되지 않았습니다.`);
  if (!html.includes("assets/css/artwork-data.css"))
    throw new Error(
      `${page}에 Base64 작품 이미지 스타일이 연결되지 않았습니다.`,
    );
  if (!html.includes("assets/js/main.js"))
    throw new Error(`${page}에 공통 스크립트가 연결되지 않았습니다.`);

  if (/https?:\/\//.test(html))
    throw new Error(`${page}에 인터넷 연결이 필요한 주소가 있습니다.`);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (
      target.startsWith("#") ||
      target.startsWith("mailto:") ||
      target.startsWith("tel:")
    )
      continue;
    const localPath = resolve(dirname(page), target.split("#")[0]);
    if (!existsSync(localPath))
      throw new Error(`${page}에서 참조하는 ${target} 파일이 없습니다.`);
  }
}

const collectionHtml = readFileSync("collection.html", "utf8");
for (const image of collectionImages) {
  if (!collectionHtml.includes(`src="${image}"`))
    throw new Error(`collection.html에서 ${image} 이미지를 사용하지 않습니다.`);
}

const zipScript = readFileSync("scripts/build-zip.sh", "utf8");
for (const image of [...collectionImages, "퍼플작품.jpg"]) {
  if (!zipScript.includes(image))
    throw new Error(`ZIP 생성 스크립트에 ${image} 파일이 없습니다.`);
}

const css = readFileSync("assets/css/style.css", "utf8");
if (/https?:\/\//.test(css))
  throw new Error("스타일시트에 인터넷 연결이 필요한 주소가 있습니다.");

const artworkCss = readFileSync("assets/css/artwork-data.css", "utf8");
const embeddedImages =
  artworkCss.match(/data:image\/png;base64,[A-Za-z0-9+/=]+/g) ?? [];
if (embeddedImages.length !== 2)
  throw new Error(
    `Base64 작품 이미지가 2개여야 하지만 ${embeddedImages.length}개입니다.`,
  );

for (const image of embeddedImages) {
  const encoded = image.slice("data:image/png;base64,".length);
  const decoded = Buffer.from(encoded, "base64");
  const pngSignature = "89504e470d0a1a0a";
  if (decoded.subarray(0, 8).toString("hex") !== pngSignature)
    throw new Error("Base64 작품 이미지가 올바른 PNG 데이터가 아닙니다.");
}

console.log(
  `검사 완료: ${pages.length}개 페이지가 인터넷 연결 없이 열리며 모든 링크·에셋이 정상입니다.`,
);
