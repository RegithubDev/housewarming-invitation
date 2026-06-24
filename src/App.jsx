import { useEffect, useState } from "react";

const guests = {
  A001: {
    name: "Ramesh Garu",
    message: "Your presence means a lot to us."
  },
  A002: {
    name: "Suresh Garu",
    message: "We look forward to celebrating with you."
  }
};

export default function App() {
  const [guest, setGuest] = useState({
    name: "Honored Guest",
    message: "Please join us."
  });

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id && guests[id]) {
      setGuest(guests[id]);
    }

    const targetDate = new Date("2026-07-03T10:30:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );
      const mins = Math.floor(
        (diff % (1000 * 60 * 60)) /
        (1000 * 60)
      );

      setTimeLeft(`${days} Days ${hours} Hours ${mins} Minutes`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h1>🏠 Housewarming Invitation</h1>

      <h2>{guest.name}</h2>

      <p>{guest.message}</p>

      <h3>{timeLeft}</h3>

      <h3>📅 July 3, 2026</h3>

      <h3>🕙 10:30 AM</h3>

      <h3>📍 Hyderabad</h3>

      <a
        href="https://www.google.com/maps/dir/?api=1&destination=17.3850,78.4867"
        target="_blank"
      >
        Navigate to Venue
      </a>

      <br /><br />

      <a
        href="https://wa.me/919441391620?text=We%20will%20attend"
        target="_blank"
      >
        RSVP on WhatsApp
      </a>
    </div>
  );
}