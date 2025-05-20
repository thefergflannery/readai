import OpenAI from "openai"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables")
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateSummary(text: string): Promise<string> {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("No text provided for summarization")
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates concise, accessible summaries of articles. Focus on the main points and use clear, simple language.",
        },
        {
          role: "user",
          content: `Please summarize this article in about 120 words, making it screen-reader friendly:\n\n${text}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    })

    const summary = response.choices[0]?.message?.content
    if (!summary) {
      throw new Error("No summary generated")
    }

    return summary
  } catch (error) {
    console.error("Error generating summary:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to generate summary: ${error.message}`)
    }
    throw new Error("Failed to generate summary")
  }
} 