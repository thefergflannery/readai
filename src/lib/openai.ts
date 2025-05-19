import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateSummary(text: string): Promise<string> {
  try {
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

    return response.choices[0]?.message?.content || "Could not generate summary"
  } catch (error) {
    console.error("Error generating summary:", error)
    throw error
  }
} 