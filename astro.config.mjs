// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// 部署於使用者網站 repo(bookhubriver.github.io),根網址,不需 base。
export default defineConfig({
  site: "https://bookhubriver.github.io",
  integrations: [sitemap()],
  markdown: {
    // 淺色程式碼區塊,配合暖米白紙感視覺(規格書 5.1:不提供深色模式)
    shikiConfig: { theme: "github-light" },
  },
});
