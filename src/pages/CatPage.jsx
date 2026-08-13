import React from "react";
import { useNavigate } from "react-router-dom";
import "./CatPage.css";

function CatPage() {
  const navigate = useNavigate();

  return (
    <main className="cat-page">

      <div className="cat-decor heart-one">♡</div>
      <div className="cat-decor heart-two">♥</div>
      <div className="cat-decor heart-three">♡</div>

      <section className="cat-card">

        <div className="cat-image-section">
          <div className="cat-glow"></div>

          <img
            src="/cat.png"
            alt="Cute cat holding roses"
            className="cat-image"
          />
        </div>

        <div className="cat-message">

          <span className="cat-label">
            A LITTLE SURPRISE
          </span>

          <h1>
            Hey you <span>♡</span>
          </h1>

          <div className="cat-line"></div>

          <p>
            I have something special
            <br />
            waiting for you...
          </p>

          <p className="cat-small-text">
            But first, here's a little
            <br />
            something to make you smile.
          </p>

          <div className="cat-note">
            With love,
            <br />
            <strong>just for you ♡</strong>
          </div>

          <button
            className="cat-continue"
            onClick={() => navigate("/memories")}
          >
            <span>♡</span>
            Continue to memories
            <strong>→</strong>
          </button>

        </div>

      </section>

    </main>
  );
}

export default CatPage;