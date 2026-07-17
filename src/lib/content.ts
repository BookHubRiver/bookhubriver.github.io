import { getCollection, type CollectionEntry } from "astro:content";
import { url } from "../config";

export type Book = CollectionEntry<"books">;
export type News = CollectionEntry<"news">;
export type Post = CollectionEntry<"blog">;

// 類別順序即首頁類別入口與篩選列的顯示順序(規格書 3 章)
export const CATEGORIES = ["繪本", "童話", "少年小說", "新詩"] as const;

// 全部書籍:出版日倒序;同日出版依 order 由小到大(規格書 4.2)
export async function getBooks(): Promise<Book[]> {
  const books = await getCollection("books");
  return books.sort((a, b) => {
    const diff = b.data.publish_date.getTime() - a.data.publish_date.getTime();
    return diff !== 0 ? diff : a.data.order - b.data.order;
  });
}

// 首頁 hero:featured 候選中出版日最新的一本(規格書 4.1);無候選時退回最新一本
export function heroBook(books: Book[]): Book | undefined {
  return books.find((b) => b.data.featured) ?? books[0];
}

// 「新書」標記:上架 60 天內(規格書 4.2;於建置時判定,內容更新即重建)
export function isNew(book: Book): boolean {
  const days = (Date.now() - book.data.publish_date.getTime()) / 86400000;
  return days <= 60;
}

// 全部消息,依日期倒序
export async function getNews(): Promise<News[]> {
  const news = await getCollection("news");
  return news.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// 全部文章,依日期倒序
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog");
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function bookUrl(book: Book): string {
  return url(`/books/${book.id}/`);
}

// 網址格式 /blog/:year/:title/,與規格書 4.5 節一致
export function postUrl(post: Post): string {
  return url(`/blog/${post.data.date.getUTCFullYear()}/${post.id}/`);
}

// 消息連結:內部路徑加 base 前綴,外部網址原樣;留空回傳 undefined(純公告)
export function newsHref(link: string): string | undefined {
  if (link === "") return undefined;
  return link.startsWith("/") ? url(link) : link;
}

// 日期一律用 UTC 取值:YAML 的「2026-07-14」解析為 UTC 午夜,避免時區位移
export function formatDate(d: Date): string {
  return `${d.getUTCFullYear()} 年 ${d.getUTCMonth() + 1} 月 ${d.getUTCDate()} 日`;
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// 首頁 hero 的一句話介紹:取內容簡介的第一句
export function tagline(body: string | undefined): string {
  const text = plainText(body);
  const end = text.indexOf("。");
  return end === -1 ? text : text.slice(0, end + 1);
}

// 列表頁摘要:去除 Markdown 語法後截 90 字(規格書 4.5)
export function excerpt(body: string | undefined, max = 90): string {
  const text = plainText(body);
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

function plainText(body: string | undefined): string {
  return (body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/[*_`>~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
