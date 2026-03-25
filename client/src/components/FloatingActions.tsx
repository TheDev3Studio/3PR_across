import { Link } from "react-router-dom";

export function FloatingActions({ liveCount }: { liveCount: number }) {
  return (
    <>
      <div className="live-badge" aria-live="polite">
        <span>🟢 {liveCount} people viewing now</span>
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
