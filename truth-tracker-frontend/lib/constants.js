// The three verdicts defined in the proposal (Section 1.1 / Figure 1)
export const VERDICTS = {
  Truth:      { color: "#1F7A4D", tint: "#E4F2EA", note: "Supported by the evidence found" },
  Fake:       { color: "#B3261E", tint: "#FBE7E5", note: "Contradicted by the evidence found" },
  Misleading: { color: "#A66A00", tint: "#FBF0D9", note: "Partly true, or missing context" },
};

export const LANGUAGES = { english: "English", urdu: "Urdu", roman_urdu: "Roman Urdu" };

// The 5 pipeline stages from the proposal, in plain words (shown while waiting)
export const PIPELINE_STAGES = [
  "Cleaning and translating your claim",
  "Searching live news sources",
  "Matching meaning with the evidence",
  "Reasoning over the evidence",
  "Preparing your result",
];
