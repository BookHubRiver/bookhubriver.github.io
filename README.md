# 電子書作家網站(Astro 版)

以 [Astro](https://astro.build) 實作的電子書作家官網,對應《電子書網站設計規格書》v0.1。
作品展示+導購(Apple Books / Google Play 圖書),無金流、會員、購物車。
技術細節見《技術實作文件-電子書網站-Astro版.md》(位於上層資料夾)。

正式網址:**https://bookhubriver.github.io/**(repo:`BookHubRiver/bookhubriver.github.io`)

## 上線前必改

1. `src/config.ts`:作家筆名、網站描述、Email(拆成帳號/網域兩欄)、社群與兩平台作者頁連結。
2. 刪除範例書籍/消息/文章與示意圖,換上真實內容(範例內文都標有「範例」字樣)。
3. 《山貓的燈籠》的 `apple_url` / `google_url` 為佔位網址,務必換成真實商店連結或清空。
4. 購書按鈕目前為文字佔位樣式:請至兩平台官方品牌頁下載「在 Apple Books 上取得」「Google Play 立即下載」官方徽章,依官方規範替換(不可自繪仿製)。

## 部署(GitHub Pages)

1. 建立 GitHub repo,push 本專案到 `main` 分支(含 `.github/workflows/deploy.yml`)。
2. repo → Settings → Pages → Source 選 **GitHub Actions**。
3. 之後每次 push,Actions 會自動建置並部署,約 1–2 分鐘生效。

## 內容維護(全部可在 GitHub 網頁介面完成)

| 作業 | 操作 |
|------|------|
| 上架新書 | 上傳封面(+ 試閱圖)至 `public/assets/img/books/` → 在 `src/content/books/` 複製一個 `.md` 檔改資料;首頁 hero、新書標記、類別入口、出版年表全部自動連動 |
| 補上購書連結 | 編輯該書 `.md`,回填 `apple_url` / `google_url`,按鈕自動出現 |
| 發布消息 | 上傳圖片至 `public/assets/img/news/` → 在 `src/content/news/` 新增一個 `.md` 檔(只有 front matter,無內文);`link` 可指向書籍頁、網誌文章或外部網址,留空則為純公告 |
| 發表網誌 | 在 `src/content/blog/` 新增一個 `.md` 檔(檔名=網址代稱,`date` 欄位=日期) |
| 改關於 / 聯絡 | 編輯 `src/pages/about.astro` / `contact.astro` / `src/config.ts` |

書籍欄位對應規格書 6.1 節;`category` 只能是 `繪本`/`童話`/`少年小說`/`新詩`,繪本與童話必填 `age_range`,漏填時建置會直接報錯提醒。

## 圖片規格(規格書 6.5)

正式圖檔請依:書封長邊 1200px(WebP,< 200KB)、繪本試閱跨頁長邊 1600px(刻意低於電子書成品解析度)、消息/網誌圖長邊 1200px;輸出前轉 sRGB。原始高解析圖與 EPUB 原始檔不放入 repo。

## 本機預覽(選用,需 Node.js 18+)

```bash
npm install
npm run dev       # 開發伺服器 http://localhost:4321
npm run build     # 產出靜態網站至 dist/
npm run preview   # 預覽 dist/ 建置結果
```

> 專案放在 iCloud 資料夾時,建議先執行
> `mkdir node_modules.nosync && ln -s node_modules.nosync node_modules`
> 再 `npm install`,避免 iCloud 同步數萬個相依檔案。
