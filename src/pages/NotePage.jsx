import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotePage.css";

function NotePage() {
  const navigate = useNavigate();

  return (
    <main className="note-page">

      <div className="note-content">

        {/* Heading */}

        <p className="note-eyebrow">
          FROM MY HEART
        </p>

        <h1>A note for you</h1>

        <div className="note-divider" />


        {/* Paper */}

        <article className="letter-paper">

          <div className="paper-content">

            <div className="letter-date">
              AUGUST 2026
            </div>

            <h2>
              My dearest,
            </h2>

            <p>
              If I could gift you one thing, it would be
              seeing yourself the way I see you.
            </p>

            <p>
              The way your smile changes an entire room.
              The way you somehow make ordinary moments
              feel unforgettable. The way people feel safe
              around you.
            </p>

            <p>
              This card isn't really for your birthday.
            </p>

            <p>
              It's just eleven tiny reminders that you are
              deeply loved.
            </p>

            <p>
              I hope this year surprises you, spoils you,
              and becomes your happiest chapter yet.
            </p>

            <div className="letter-signature">
              Forever yours,
              <br />
              <span>Someone who cares ❤️</span>
            </div>

          </div>

          {/* Flower */}

          <div className="paper-flower">
            🌸
          </div>

        </article>


        {/* Continue */}

        <button
          className="note-continue"
          onClick={() => navigate("/final")}
        >
          Continue →
        </button>

      </div>

    </main>
  );
}

export default NotePage;