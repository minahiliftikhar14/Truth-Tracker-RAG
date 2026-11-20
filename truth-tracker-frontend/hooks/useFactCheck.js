"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { verifyClaim } from "@/lib/api";
import { PIPELINE_STAGES } from "@/lib/constants";

const IDLE = { status: "idle", result: null, error: null, claim: "", days: 7, stage: 0 };

// status: "idle" | "loading" | "success" | "error"
export function useFactCheck() {
  const [state, setState] = useState(IDLE);
  const runId = useRef(0);
  const timer = useRef(null);

  const run = useCallback(async ({ claim, days }) => {
    const id = ++runId.current;
    clearInterval(timer.current);
    setState({ ...IDLE, status: "loading", claim, days });

    // Move the progress list forward while we wait for the backend
    timer.current = setInterval(() => {
      setState((s) => (s.status === "loading" && s.stage < PIPELINE_STAGES.length - 1 ? { ...s, stage: s.stage + 1 } : s));
    }, 900);

    try {
      const result = await verifyClaim({ claim, days });
      if (id !== runId.current) return; // user closed the panel meanwhile
      clearInterval(timer.current);
      setState((s) => ({ ...s, status: "success", result }));
    } catch (err) {
      if (id !== runId.current) return;
      clearInterval(timer.current);
      setState((s) => ({ ...s, status: "error", error: err.message || "Something went wrong." }));
    }
  }, []);

  const reset = useCallback(() => {
    runId.current++;
    clearInterval(timer.current);
    setState(IDLE);
  }, []);

  useEffect(() => () => clearInterval(timer.current), []);

  return { ...state, run, reset };
}
