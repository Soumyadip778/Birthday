import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemoriesPage.css";

function MemoriesPage() {
  const navigate = useNavigate();

  const memories = [
    {
      src: "/memory1.jpeg",
      caption: "The beginning ❤️",
    },
    {
      src: "/memory2.jpeg",
      caption: "A moment worth keeping",
    },
    {
      src: "/memory3.jpeg",
      caption: "One of my favourites ✨",
    },
    {
      src: "/memory4.jpeg",
      caption: "Forever special 💕",
    },
    {
      src: "/memory5.jpeg",
      caption: "A little piece of happiness",
    },
    {
      src: "/memory6.jpeg",
      caption: "And many more to come ♡",
    },
  ];

  const [shown, setShown] = useState(0);

  const revealMemory = () => {
    if (shown < memories.length) {
      setShown((prev) => prev + 1);
    }
  };

  const allShown = shown === memories.length;

  return (
    <main className="memories-page">
      <div className="memories-shell">

        {/* LEFT INTRO */}

        <section className="memories-intro">

          <span className="memories-label">
            A LITTLE COLLECTION
          </span>

          <h1>
            the moments
            <br />
            <em>worth</em>
            <br />
            keeping.
          </h1>

          <p className="memories-description">
            A few little moments,
            <br />
            saved in one place.
          </p>

          <div className="birthday-note">
            Happy Birthday,
          </div>

          <div className="name-note">
            FOR YOU ♡
          </div>

          <button
            className="reveal-button"
            onClick={revealMemory}
            disabled={allShown}
          >
            <span className="camera-icon">♡</span>

            {allShown
              ? "all memories revealed"
              : "open a memory"}
          </button>

          <div className="memory-status">
            {shown} / {memories.length}
          </div>

        </section>


        {/* RIGHT MEMORY GRID */}

        <section className="memories-gallery">

          {memories.map((memory, index) => {

            const isVisible =
              index < shown;

            return (
              <article
                key={index}
                className={`memory-card ${
                  isVisible
                    ? "memory-visible"
                    : "memory-hidden"
                }`}
                style={{
                  "--rotation":
                    index % 3 === 0
                      ? "-2deg"
                      : index % 3 === 1
                      ? "1.5deg"
                      : "-1deg",
                }}
              >

                <div className="memory-image-wrapper">

                  {isVisible ? (
                    <img
                      src={memory.src}
                      alt={memory.caption}
                      className="memory-image"
                    />
                  ) : (
                    <div className="memory-placeholder">
                      <span>♡</span>
                    </div>
                  )}

                </div>

                <div className="memory-card-caption">
                  {isVisible
                    ? memory.caption
                    : "a memory waiting to be opened"}
                </div>

              </article>
            );
          })}

        </section>

      </div>


      {/* CONTINUE */}

      {allShown && (
        <button
          className="memories-continue"
          onClick={() => navigate("/music")}
        >
          continue to the next page
          <span>→</span>
        </button>
      )}

    </main>
  );
}

export default MemoriesPage;