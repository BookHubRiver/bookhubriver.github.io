// 網站基本設定 —— 上線前請修改各欄位(對應規格書 6.4 節)
// (正式網址設定在 astro.config.mjs 的 site 欄位)

// 工作室兩位作者的筆名;書籍 front matter 的 author 欄位必須是其中之一(合著可填多位)
export const AUTHORS = ["作者一", "作者二"] as const;

export const site = {
  title: "工作室名稱",
  authors: AUTHORS,
  description:
    "電子書工作室官網——繪本、童話、少年小說與新詩,作品於 Apple Books 與 Google Play 圖書上架。",
  lang: "zh-Hant",

  // 著作權宣告(規格書 4.8):頁尾顯示「© 起始年–當年 工作室名稱 版權所有」
  copyrightStartYear: 2026,

  // 社群連結(顯示於頁尾與聯絡頁;留空則不顯示)
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
