import { Link } from "react-router-dom";

interface FloatingActionsProps {
  monthlyVisitors: number;
  monthlyVisits: number;
}

export function FloatingActions({ monthlyVisitors, monthlyVisits }: FloatingActionsProps) {
  return (
    <>
      <div className="live-badge" aria-live="polite">
        <strong>👥 {monthlyVisitors} visitors this month</strong>
        <small>{monthlyVisits} total visits in current month</small>
      </div>
      <a
        className="whatsapp-float"
        href="https://wa.me/919000012345?text=Hi%20BuildMart%2C%20I%20want%20a%20quotation"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      <Link to="/inquiry" className="inquiry-float">
        Quick Inquiry
      </Link>
    </>
  );
}
