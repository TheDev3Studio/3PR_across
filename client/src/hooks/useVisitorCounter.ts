import { useEffect, useMemo, useState } from "react";
import { getLiveVisitors, pingVisitor } from "../api/client";

const SESSION_KEY = "buildmart_visitor_session";
const LIVE_FALLBACK_MIN = 4;
const LIVE_FALLBACK_MAX = 17;

function getOrCreateSessionId() {
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }
  const newId = `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem(SESSION_KEY, newId);
  return newId;
}

export function useVisitorCounter() {
  const [liveCount, setLiveCount] = useState<number>(LIVE_FALLBACK_MIN);

  const sessionId = useMemo(() => getOrCreateSessionId(), []);

  useEffect(() => {
    let timer: number | undefined;
    let eventSource: EventSource | undefined;
    let heartbeat: number | undefined;

    const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

    const syncVisitor = async () => {
      try {
        await pingVisitor(sessionId);
        const serverCount = await getLiveVisitors();
        setLiveCount(Math.max(serverCount, LIVE_FALLBACK_MIN));
      } catch {
        const fallback =
          LIVE_FALLBACK_MIN + Math.floor(Math.random() * (LIVE_FALLBACK_MAX - LIVE_FALLBACK_MIN + 1));
        setLiveCount(fallback);
      }
    };

    void syncVisitor();

    try {
      eventSource = new EventSource(`${apiBase}/visitors/stream`);
      eventSource.onmessage = (event) => {
        const payload = JSON.parse(event.data) as { count?: number };
        if (typeof payload.count === "number") {
          setLiveCount(Math.max(payload.count, LIVE_FALLBACK_MIN));
        }
      };
      eventSource.onerror = () => {
        if (!timer) {
          timer = window.setInterval(syncVisitor, 9000);
        }
      };
    } catch {
      timer = window.setInterval(syncVisitor, 9000);
    }

    heartbeat = window.setInterval(syncVisitor, 12000);

    return () => {
      if (timer) {
        window.clearInterval(timer);
      }
      if (heartbeat) {
        window.clearInterval(heartbeat);
      }
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [sessionId]);

  return liveCount;
}
