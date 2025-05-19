"use client"

import { useState } from "react"
import { Metadata } from "next"
import { Badge } from "@/components/Badge"
import { CopyButton } from "@/components/CopyButton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { processArticle } from "./actions"

export const metadata: Metadata = {
  title: "Read-Ease - Turn any article into an accessible bite-size read",
  description: "Paste any article URL to get a WCAG-AA compliant reading time badge and AI-generated summary.",
  openGraph: {
    title: "Read-Ease - Turn any article into an accessible bite-size read",
    description: "Paste any article URL to get a WCAG-AA compliant reading time badge and AI-generated summary.",
    type: "website",
  },
}

export default function Home() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ readingTime: number; summary: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await processArticle(url)
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Turn any article into an accessible bite-size read
          </h1>
          <p className="text-lg text-gray-600">
            Paste the URL below—free for up to 50 articles/month.
          </p>
        </div>

        {/* Input Card */}
        <Card className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-gray-700">
                Article URL
              </label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/blog-post"
                className="w-full"
                aria-label="Article URL"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#00c9a7] hover:bg-[#00b39a] text-white"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Summary"}
            </Button>
          </form>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600">
            {error}
          </div>
        )}

        {/* Result Card */}
        {result && (
          <Card className="p-6 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <Badge readingTime={result.readingTime} />
              <CopyButton
                text={`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-[#00c9a7] text-white" aria-label="${result.readingTime} minute read">⏱ ${result.readingTime}-min read</span>`}
                label="Copy badge HTML"
              />
            </div>
            <div className="space-y-4">
              <p role="doc-abstract" className="text-gray-700 leading-relaxed">
                {result.summary}
              </p>
              <CopyButton text={result.summary} label="Copy summary" />
            </div>
          </Card>
        )}

        {/* CTA Footer */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">Need nightly summaries? Pro starts at €6/mo.</p>
          <Button variant="outline" className="border-[#00c9a7] text-[#00c9a7] hover:bg-[#00c9a7] hover:text-white">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </main>
  )
}
