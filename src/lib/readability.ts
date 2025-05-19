import { Readability } from "@mozilla/readability"
import { JSDOM } from "jsdom"

export interface ArticleContent {
  text: string
  readingTime: number
}

export async function extractArticleContent(url: string): Promise<ArticleContent> {
  try {
    const response = await fetch(url)
    const html = await response.text()
    const doc = new JSDOM(html)
    const reader = new Readability(doc.window.document)
    const article = reader.parse()

    if (!article) {
      throw new Error("Could not parse article content")
    }

    const text = article.textContent || ""
    const wordCount = text.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200) // Assuming 200 words per minute

    return {
      text,
      readingTime,
    }
  } catch (error) {
    console.error("Error extracting article content:", error)
    throw error
  }
} 