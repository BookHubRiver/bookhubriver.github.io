// 網站基本設定 —— 上線前請修改各欄位(對應規格書 6.4 節)
// (正式網址設定在 astro.config.mjs 的 site 欄位)
export const site = {
  title: "作家筆名",
  description:
    "電子書作家官網——繪本、童話、少年小說與新詩,作品於 Apple Books 與 Google Play 圖書上架。",
  lang: "zh-Hant",

  // 社群連結(顯示於頁尾;留空則不顯示)
  instagram: "", // 例:https://www.instagram.com/yourname
  facebook: "", // 例:https://www.facebook.com/yourname

  // 兩平台作者頁連結(如有;顯示於頁尾,留空則不顯示)
  appleAuthorUrl: "",
  googleAuthorUrl: "",

  // Email 拆開存放防爬蟲,由前端 JS 組合顯示
  emailUser: "your.name", // @ 前
  emailDomain: "example.com", // @ 後
};

// 部署在專案 repo 時自動加上 base 前綴
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base + path;
}
