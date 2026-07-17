import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 書籍:一本書一個 .md 檔,欄位對應規格書 6.1 節;內容簡介寫在 Markdown 內文
const books = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/books" }),
  schema: z
    .object({
      title: z.string(),
      subtitle: z.string().optional().default(""),
      category: z.enum(["繪本", "童話", "少年小說", "新詩"]),
      publish_date: z.coerce.date(),
      cover: z.string(),
      apple_url: z.string().optional().default(""),
      google_url: z.string().optional().default(""),
      isbn: z.string().optional().default(""),
      age_range: z.string().optional().default(""),
      featured: z.boolean(),
      sample_images: z.array(z.string()).optional().default([]),
      excerpt: z.string().optional().default(""),
      praise: z
        .array(z.object({ text: z.string(), source: z.string() }))
        .optional()
        .default([]),
      order: z.number().optional().default(0),
    })
    .refine((d) => !["繪本", "童話"].includes(d.category) || d.age_range !== "", {
      message: "繪本與童話必須填寫 age_range(適讀年齡)",
    }),
});

// 消息:純資料,無內文;欄位對應規格書 6.2 節
const news = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    summary: z.string().max(60, "摘要以 60 字為限"),
    link: z.string().optional().default(""),
  }),
});

// 網誌文章:欄位對應規格書 6.3 節
const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string().optional().default(""),
  }),
});

export const collections = { books, news, blog };
