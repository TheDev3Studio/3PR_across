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
      {/* ✅ ONLY THIS draggable */}
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

      {/* <a
        className="whatsapp-float"
        href="https://wa.me/919000012345"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a> */}
      <Link to="/inquiry" className="inquiry-float">
        Quick Inquiry
      </Link>
    </>
  );
}