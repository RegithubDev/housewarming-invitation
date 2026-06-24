import { useEffect, useState } from "react";
import { guests } from "./guests";

export default function App() {
  const [guest, setGuest] = useState({
    name: "Honored Guest",
    message: "Welcome to our Housewarming Ceremony"
  });

  const [countdown, setCountdown] = useState("");

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

      if (diff <= 0) {
        setCountdown("🎉 Ceremony Started");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
        (1000 * 60)
      );

      const seconds = Math.floor(
        (diff % (1000 * 60)) /
        1000
      );

      setCountdown(
        `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        textAlign: "center",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1>🏠 Housewarming Invitation</h1>

      <h2>Dear {guest.name}</h2>

      <p>{guest.message}</p>

      <hr />

      <h2>⏳ Countdown</h2>
      <h3>{countdown}</h3>

      <hr />

      <h2>📅 Date</h2>
      <p>03 July 2026</p>

      <h2>🕙 Time</h2>
      <p>10:30 AM</p>

      <h2>📍 Venue</h2>
      <p>Sri Lakshmi Nilayam</p>
      <p>Hyderabad</p>

      <br />

      <a
        href="https://www.google.com/maps/dir/?api=1&destination=17.3850,78.4867"
        target="_blank"
        rel="noreferrer"
      >
        📍 Navigate to Venue
      </a>

      <br />
      <br />

      <a
        href="https://wa.me/919441391620?text=We%20will%20attend%20the%20Housewarming%20Ceremony"
        target="_blank"
        rel="noreferrer"
      >
        💬 RSVP on WhatsApp
      </a>
    </div>
  );
}