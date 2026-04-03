import { Link } from "react-router-dom";
import Draggable from "react-draggable";
import { useRef } from "react";

interface FloatingActionsProps {
  monthlyVisitors: number;
  monthlyVisits: number;
}
export function FloatingActions({
  monthlyVisitors,
  // monthlyVisits,
}: FloatingActionsProps) {
  const nodeRef = useRef(null);

  return (
    <>
      {/* <a
        className="whatsapp-float"
        href="https://wa.me/919000012345?text=Hi%203pr%20across%2C%20I%20want%20a%20quotation"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a> */}
        <Draggable nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          style={{
            position: "fixed",
            top: "100px",
            right: "20px",
            zIndex: 9999,
            cursor: "grab",
          }}
        >
          <div className="live-badge">
            <strong>👥 {monthlyVisitors} visitors this month</strong>
            {/* <small>{monthlyVisits} total visits in current month</small> */}
          </div>
        </div>
      </Draggable>
      <Link to="/inquiry" className="inquiry-float">
        Quick Inquiry
      </Link>
    </>
  );
}
