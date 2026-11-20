// True if the text contains Urdu/Arabic script (used to switch to right-to-left)
export const isUrdu = (t = "") => /[\u0600-\u06FF]/.test(t);
