# Truth Tracker - Front end

    npm install
    npm run dev        # http://localhost:3000

Demo mode is on by default (`NEXT_PUBLIC_USE_MOCK=true` in `.env.local`): each Verify click shows
Truth, then Misleading, then Fake, with sample sources.

## Connecting the FastAPI backend
1. In `.env.local` set `NEXT_PUBLIC_USE_MOCK=false` and `NEXT_PUBLIC_API_URL` to your backend URL.
2. Backend endpoint: `POST /api/verify` with `{ "claim": "...", "days": 7 }`.
3. It must return (also documented at the top of `lib/api.js`):

```json
{
  "truth_authenticity": 85,
  "news_verdict": "Truth",
  "reasoning_explanation": "...",
  "detected_language": "english",
  "translated_claim": "...",
  "sources": [{ "title": "", "publisher": "Dawn", "url": "https://...", "snippet": "", "similarity": 0.82 }]
}
```
`news_verdict` must be `Truth`, `Fake` or `Misleading`. Remember to allow this site in the backend's CORS settings.
