import { useEffect, useState } from "react";
import { getMonthlyTraffic, registerVisit } from "../api/client";

function getCurrentMonthKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function useVisitorCounter() {
  const [traffic, setTraffic] = useState({
    monthKey: getCurrentMonthKey(),
    uniqueCount: 0,
    totalVisits: 0,
  });

  useEffect(() => {
    const sessionId = `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    const registerAndSync = async () => {
      try {
        const tracked = await registerVisit(sessionId);
        setTraffic(tracked);
      } catch {
        setTraffic((prev) => prev);
      }
    };

    const syncTraffic = async () => {
      try {
        const monthly = await getMonthlyTraffic();
        setTraffic(monthly);
      } catch {
        setTraffic((prev) => prev);
      }
    };

    void registerAndSync();

    const refreshTimer = window.setInterval(syncTraffic, 60000);
    return () => window.clearInterval(refreshTimer);
  }, []);

  return traffic;
}