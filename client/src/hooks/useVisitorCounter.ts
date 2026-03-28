import { useEffect, useMemo, useState } from "react";
import { getMonthlyTraffic, registerVisit } from "../api/client";

const SESSION_KEY = "buildmart_visitor_session";
const VISIT_LOGGED_KEY = "buildmart_visit_logged_month";

function getCurrentMonthKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

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
  const [traffic, setTraffic] = useState({
    monthKey: getCurrentMonthKey(),
    uniqueCount: 0,
    totalVisits: 0,
  });

  const sessionId = useMemo(() => getOrCreateSessionId(), []);

  useEffect(() => {
    const syncTraffic = async () => {
      try {
        const currentMonth = getCurrentMonthKey();
        const loggedMonth = localStorage.getItem(VISIT_LOGGED_KEY);

        if (loggedMonth !== currentMonth) {
          const tracked = await registerVisit(sessionId);
          setTraffic(tracked);
          localStorage.setItem(VISIT_LOGGED_KEY, tracked.monthKey);
          return;
        }

        const monthly = await getMonthlyTraffic();
        setTraffic(monthly);
      } catch {
        setTraffic((prev) => prev);
      }
    };

    void syncTraffic();

    const refreshTimer = window.setInterval(syncTraffic, 60000);
    return () => window.clearInterval(refreshTimer);
  }, [sessionId]);

  return traffic;
}
