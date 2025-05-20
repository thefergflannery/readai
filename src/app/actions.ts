"use server"

import { z } from "zod"
import { extractArticleContent } from "@/lib/readability"
import { generateSummary } from "@/lib/openai"

const urlSchema = z.string().url()

export async function processArticle(url: string) {
  try {
    // Validate URL
    const validatedUrl = urlSchema.parse(url)

    // Extract article content
    const { text, readingTime } = await extractArticleContent(validatedUrl)

    if (!text) {
      throw new Error("Could not extract content from the article. Please check if the URL is accessible.")
    }

    // Generate summary
    const summary = await generateSummary(text)

    if (!summary) {
      throw new Error("Could not generate summary. Please try again.")
    }

    return {
      readingTime,
      summary,
    }
  } catch (error) {
    console.error("Error processing article:", error)
    if (error instanceof z.ZodError) {
      throw new Error("Please enter a valid URL")
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred. Please try again.")
  }
} 