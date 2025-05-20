"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/Badge"
import { CopyButton } from "@/components/CopyButton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FAQ } from "@/components/FAQ"
import { NavBar } from "@/components/NavBar"
import { processArticle } from "./actions"
import { Sparkles, Clock, Zap } from "lucide-react"

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
    <main className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-white">
      <NavBar />
      {/* Hero Section with Input and Image */}
      <div className="relative overflow-hidden px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
          {/* Left: Headline, subheadline, input */}
          <div className="flex-1 space-y-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Turn any article into an {" "}
              <span className="text-primary">accessible</span> bite-size read
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
              Paste the URL below—free for up to 50 articles/month. Get instant reading time badges and AI-powered summaries.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch max-w-xl">
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/blog-post"
                className="flex-1"
                aria-label="Article URL"
                required
              />
              <Button
                type="submit"
                className="bg-primary text-white min-w-[150px] hover:bg-accent focus:ring-primary"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            </form>
            {error && (
              <div className="p-3 bg-error/10 border border-error rounded-2xl text-error mt-2">
                {error}
              </div>
            )}
          </div>
          {/* Right: Hero Image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[320px] h-[260px] flex items-center justify-center">
              <Image
                src="/hero.svg"
                alt="Person reading and digital content icons"
                width={320}
                height={260}
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-12 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Reading Time</h3>
              <p className="text-gray-600">Get accurate reading time estimates for any article</p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">AI Summary</h3>
              <p className="text-gray-600">Smart summaries that capture the key points</p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">WCAG-AA Compliant</h3>
              <p className="text-gray-600">Accessible badges that work for everyone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Result Card */}
      <div className="px-4 py-12">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Result Card */}
          {result && (
            <Card className="p-6 space-y-6 animate-fade-in shadow-lg">
              <div className="flex items-center justify-between">
                <Badge readingTime={result.readingTime} />
                <CopyButton
                  text={`<span class=\"inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary text-white\" aria-label=\"${result.readingTime} minute read\">⏱ ${result.readingTime}-min read</span>`}
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

          {/* FAQ Section */}
          <div className="py-12">
            <FAQ />
          </div>

          {/* CTA Footer */}
          <div className="text-center space-y-4 py-12">
            <p className="text-gray-600">Need nightly summaries? Pro starts at €6/mo.</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
