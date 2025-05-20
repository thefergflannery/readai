"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "How does Read-Ease work?",
    answer: "Simply paste any article URL into our tool. We'll analyze the content and generate a WCAG-AA compliant reading time badge and an AI-powered summary that captures the key points of the article."
  },
  {
    question: "Is it really free?",
    answer: "Yes! Our free tier allows you to process up to 50 articles per month. For users who need more, we offer a Pro plan starting at €6/month with unlimited processing and additional features."
  },
  {
    question: "What makes the reading time badge WCAG-AA compliant?",
    answer: "Our reading time badges are designed with accessibility in mind, featuring proper color contrast, clear text, and appropriate ARIA labels. They're also responsive and work well across all devices."
  },
  {
    question: "Can I customize the summary style?",
    answer: "Pro users can customize the summary length, tone, and format. Free users get our standard concise summaries that capture the essence of any article."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 