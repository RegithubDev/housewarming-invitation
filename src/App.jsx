import { useEffect, useState } from "react";
import { guests } from "./guests";
import "./App.css";

export default function App() {
  const [guest, setGuest] = useState({
    name: "Honored Guest",
    message: "Welcome to our Housewarming Ceremony",
  });
  const [countdown, setCountdown] = useState({ days: "00", hours: "00", mins: "00", secs: "00" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id && guests[id]) setGuest(guests[id]);

    const target = new Date("2026-07-03T10:30:00");
    const pad = (n) => String(n).padStart(2, "0");

    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) { setStarted(true); return; }
      setCountdown({
        days: pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        mins: pad(Math.floor((diff % 3600000) / 60000)),
        secs: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inv-wrap">
      <Stars />
      <Diyas />
      <RangoliCorner pos="top-left" />
      <RangoliCorner pos="bottom-right" />

      <div className="content">
        <span className="om-symbol">ॐ</span>
        <div className="subtitle-top">Sri Lakshmi Nilayam</div>

        <MandapArch />

        <h1 className="main-title">Housewarming Ceremony</h1>
        <div className="title-hindi">गृह प्रवेश पूजा</div>

        <div className="flowers">
          {["🌸","🏵️","🌺","🏵️","🌸"].map((f, i) => (
            <span key={i} className="flower" style={{ animationDelay: `${i * 0.5}s` }}>{f}</span>
          ))}
        </div>

        <Divider />

        <p className="dear-text">With divine blessings, we joyfully invite</p>
        <h2 className="guest-name">{guest.name}</h2>
        <p className="guest-message">{guest.message}</p>

        <Divider />

        <div className="card-3d">
          <div className="countdown-label">⌛ Ceremony begins in</div>
          {started ? (
            <div className="started-text">🎉 The Ceremony Has Begun! 🎊</div>
          ) : (
            <div className="countdown-grid">
              {[
                { val: countdown.days, label: "Days" },
                { val: countdown.hours, label: "Hours" },
                { val: countdown.mins, label: "Minutes" },
                { val: countdown.secs, label: "Seconds" },
              ].map(({ val, label }) => (
                <div key={label} className="countdown-unit">
                  <span className="count-num">{val}</span>
                  <span className="count-label">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="info-grid">
          <InfoCard icon="📅" label="Date" value={<>Friday<br />03 July 2026</>} />
          <InfoCard icon="🕙" label="Time" value={<>10:30 AM<br />Muhurat</>} />
        </div>

        <div className="venue-card">
          <span className="info-icon" style={{ fontSize: 28 }}>🏛️</span>
          <div className="info-card-label" style={{ marginBottom: 6 }}>Venue</div>
          <div className="venue-name">Sri Lakshmi Nilayam</div>
          <div className="venue-city">Hyderabad, Telangana</div>
          <div className="venue-quote">"A home blessed by Lakshmi Devi, filled with light and prosperity"</div>
        </div>

        <div className="btn-row">
          <a
            className="btn btn-primary"
            href="https://www.google.com/maps/dir/?api=1&destination=17.3850,78.4867"
            target="_blank"
            rel="noreferrer"
          >
            📍 Navigate to Venue
          </a>
          <a
            className="btn"
            href="https://wa.me/919441391620?text=We%20will%20attend%20the%20Housewarming%20Ceremony"
            target="_blank"
            rel="noreferrer"
          >
            💬 RSVP on WhatsApp
          </a>
        </div>

        <div className="bottom-blessing">🙏 Shubh Griha Pravesh · Jai Sri Lakshmi 🙏</div>
      </div>
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 0.5,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 3,
  }));
  return (
    <div className="stars">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            width: s.size, height: s.size,
            top: `${s.top}%`, left: `${s.left}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Diyas() {
  return (
    <div className="flame-container">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flame-wrap">
          <div className="flame" style={{ animationDelay: `${i * 0.3}s` }} />
          <div className="diya" />
        </div>
      ))}
    </div>
  );
}

function RangoliCorner({ pos }) {
  const style =
    pos === "top-left"
      ? { top: -40, left: -40 }
      : { bottom: -40, right: -40 };
  const offset = pos === "top-left" ? 0 : 22.5;
  return (
    <svg
      className="rangoli"
      style={{ ...style, width: 220, height: 220 }}
      viewBox="0 0 200 200"
    >
      <g transform="translate(100,100)">
        <circle r="90" fill="none" stroke="#f5c842" strokeWidth="0.5" strokeDasharray="4 6" />
        <circle r="70" fill="none" stroke="#c9963e" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle r="50" fill="none" stroke="#f5c842" strokeWidth="0.5" />
        {[0,1,2,3,4,5,6,7].map((j) => (
          <g key={j} transform={`rotate(${offset + j * 45})`}>
            <ellipse rx="6" ry="18" cy="-74" fill={j % 2 === 0 ? "#f5c842" : "#c9963e"} />
          </g>
        ))}
      </g>
    </svg>
  );
}

function MandapArch() {
  return (
    <svg className="mandap-arch" viewBox="0 0 400 90">
      <path d="M20,85 C20,30 100,10 200,8 C300,10 380,30 380,85" fill="none" stroke="#8b6234" strokeWidth="1.5" />
      <path d="M35,85 C35,38 105,18 200,16 C295,18 365,38 365,85" fill="none" stroke="#f5c842" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.6" />
      <circle cx="20" cy="85" r="5" fill="#c9963e" />
      <circle cx="380" cy="85" r="5" fill="#c9963e" />
      <circle cx="200" cy="8" r="7" fill="#f5c842" />
      <polygon points="0,-7 2.1,-2.8 7,-2.2 3.5,1.4 4.2,6.3 0,4.2 -4.2,6.3 -3.5,1.4 -7,-2.2 -2.1,-2.8" fill="#f5c842" transform="translate(200,8)" />
      {[[60,70],[120,55],[280,55],[340,70]].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="6" ry="10" fill={i % 2 === 0 ? "#c9963e" : "#f5c842"} opacity="0.8" />
      ))}
    </svg>
  );
}

function Divider() {
  return (
    <div className="gold-divider">
      <div className="gold-line" />
      <div className="gold-diamond" />
      <div className="gold-line" />
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="info-card">
      <span className="info-icon">{icon}</span>
      <div className="info-card-label">{label}</div>
      <div className="info-card-value">{value}</div>
    </div>
  );
}