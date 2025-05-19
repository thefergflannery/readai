# Read-Ease

Turn any article into an accessible bite-size read. Get a WCAG-AA compliant reading time badge and AI-generated summary for any blog post or article.

## Features

- 🎯 WCAG-AA compliant reading time badge
- 🤖 AI-generated, screen-reader-friendly summaries
- 🎨 Beautiful, minimal UI inspired by a11yup
- 🔒 Rate limiting with Vercel KV
- 🚀 Built with Next.js 15 and TypeScript

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- OpenAI API
- Vercel KV
- Zod for validation

## Deployment Guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/read-ease.git
   cd read-ease
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   OPENAI_API_KEY=your_openai_api_key
   PUBLIC_FREE_LIMIT=50
   ```

4. **Deploy to Vercel**
   ```bash
   vercel
   ```

5. **Configure Vercel KV**
   - Go to your Vercel project settings
   - Navigate to Storage
   - Create a new KV database
   - Link it to your project

## Development

```bash
npm run dev
```

## Testing

```bash
npm run test
```

## License

MIT
