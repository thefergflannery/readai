interface BadgeProps {
  readingTime: number
}

export function Badge({ readingTime }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-[#00c9a7] text-white"
      aria-label={`${readingTime} minute read`}
    >
      ⏱ {readingTime}-min read
    </span>
  )
} 