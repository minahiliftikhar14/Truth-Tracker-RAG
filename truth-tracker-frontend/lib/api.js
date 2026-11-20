import { LANGUAGES } from "@/lib/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

/**
 * Backend contract (FastAPI):  POST {API_URL}/api/verify
 *   body:     { "claim": "...", "days": 7 }
 *   response: {
 *     "truth_authenticity": 85,              // number 0-100 ("85%" also accepted)
 *     "news_verdict": "Truth",               // "Truth" | "Fake" | "Misleading"
 *     "reasoning_explanation": "...",
 *     "detected_language": "english",        // "english" | "urdu" | "roman_urdu"
 *     "translated_claim": "...",             // optional
 *     "sources": [{ "title", "publisher", "url", "snippet", "similarity": 0.82 }]
 *   }
 */
export async function verifyClaim({ claim, days }) {
  if (USE_MOCK) return mockVerify({ claim });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(`${API_URL}/api/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ claim, days }),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(res.status === 429
        ? "Too many requests right now. Please wait a moment and try again."
        : "The server could not verify this claim. Please try again.");
    }
    return normalize(await res.json());
  } catch (err) {
    if (err.name === "AbortError") throw new Error("The check took too long. Please try again.");
    if (err instanceof TypeError) throw new Error("Could not reach the server. Check your connection and try again.");
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// Turns the backend JSON into the shape the UI uses (and protects the UI from bad data)
function normalize(raw, mock = false) {
  const score = Math.max(0, Math.min(100, parseFloat(String(raw.truth_authenticity).replace("%", "")) || 0));
  const v = String(raw.news_verdict || "").toLowerCase();
  const verdict = v === "truth" || v === "true" ? "Truth" : v === "fake" || v === "false" ? "Fake" : "Misleading";
  return {
    score,
    verdict,
    explanation: raw.reasoning_explanation || "",
    language: LANGUAGES[raw.detected_language] || null,
    translatedClaim: raw.translated_claim || null,
    sources: (raw.sources || [])
      .filter((s) => /^https?:\/\//i.test(s.url || "")) // only real web links
      .map((s) => ({
        title: s.title || "Untitled article",
        publisher: s.publisher || new URL(s.url).hostname.replace("www.", ""),
        url: s.url,
        snippet: s.snippet || "",
        similarity: Math.max(0, Math.min(1, Number(s.similarity) || 0)),
      })),
    mock,
  };
}

/* ---------------- Demo data (used while NEXT_PUBLIC_USE_MOCK=true) ---------------- */

let demoCounter = 0; // cycles Truth -> Misleading -> Fake so you can show all three
const DEMO = [
  {
    truth_authenticity: 87, news_verdict: "Truth",
    reasoning_explanation: "The claim matches the retrieved reports. Several independent sources describe the same event, and none of them contradict it.",
    sources: [
      { publisher: "Dawn", title: "Report related to your claim", url: "https://www.dawn.com", snippet: "Sample excerpt that supports the claim.", similarity: 0.91 },
      { publisher: "BBC News", title: "Coverage related to your claim", url: "https://www.bbc.com/news", snippet: "Sample excerpt that matches the claim.", similarity: 0.84 },
      { publisher: "Geo News", title: "Related news update", url: "https://www.geo.tv", snippet: "Sample excerpt that agrees with the claim.", similarity: 0.78 },
    ],
  },
  {
    truth_authenticity: 48, news_verdict: "Misleading",
    reasoning_explanation: "Parts of the claim are supported by the retrieved reports, but important context is missing or exaggerated, so the claim as written gives the wrong impression.",
    sources: [
      { publisher: "BBC News", title: "Report with added context", url: "https://www.bbc.com/news", snippet: "Sample excerpt that partly supports the claim.", similarity: 0.82 },
      { publisher: "Dawn", title: "Related coverage", url: "https://www.dawn.com", snippet: "Sample excerpt that adds missing details.", similarity: 0.74 },
      { publisher: "Geo News", title: "Follow-up report", url: "https://www.geo.tv", snippet: "Sample excerpt that corrects part of the claim.", similarity: 0.69 },
    ],
  },
  {
    truth_authenticity: 9, news_verdict: "Fake",
    reasoning_explanation: "The retrieved reports contradict the claim, and no reliable source was found that supports it.",
    sources: [
      { publisher: "Dawn", title: "Report that contradicts the claim", url: "https://www.dawn.com", snippet: "Sample excerpt that disagrees with the claim.", similarity: 0.88 },
      { publisher: "Geo News", title: "Related news update", url: "https://www.geo.tv", snippet: "Sample excerpt that does not support the claim.", similarity: 0.8 },
      { publisher: "BBC News", title: "Background coverage", url: "https://www.bbc.com/news", snippet: "Sample excerpt giving the correct details.", similarity: 0.71 },
    ],
  },
];

async function mockVerify({ claim }) {
  await new Promise((r) => setTimeout(r, 4200)); // pretend the pipeline takes a few seconds
  const raw = { ...DEMO[demoCounter++ % DEMO.length] };
  if (/[\u0600-\u06FF]/.test(claim)) raw.detected_language = "urdu";
  else if (/\b(hai|hain|kal|ke|ki|ka|nahi|aur|se|ko|tamam|band)\b/i.test(claim)) raw.detected_language = "roman_urdu";
  else raw.detected_language = "english";
  if (raw.detected_language !== "english") raw.translated_claim = "(The English translation of your claim will appear here once the backend is connected.)";
  return normalize(raw, true);
}
