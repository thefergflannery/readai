"use server"

import { z } from "zod"
import { extractArticleContent } from "@/lib/readability"
import { generateSummary } from "@/lib/openai"
import { kv } from "@vercel/kv"

const urlSchema = z.string().url()

export async function processArticle(url: string) {
  try {
    // Validate URL
    const validatedUrl = urlSchema.parse(url)

    // Check rate limit
    const ip = process.env.VERCEL_IP || "127.0.0.1"
    const key = `rate-limit:${ip}`
    const requests = await kv.incr(key)
    
    if (requests === 1) {
      await kv.expire(key, 60 * 60 * 24 * 30) // 30 days
    }

    const limit = parseInt(process.env.PUBLIC_FREE_LIMIT || "50")
    if (requests > limit) {
      throw new Error("Rate limit exceeded. Please upgrade to Pro for unlimited access.")
    }

    // Extract article content
    const { text, readingTime } = await extractArticleContent(validatedUrl)

    // Generate summary
    const summary = await generateSummary(text)

    return {
      readingTime,
      summary,
    }
  } catch (error) {
    console.error("Error processing article:", error)
    throw error
  }
} 