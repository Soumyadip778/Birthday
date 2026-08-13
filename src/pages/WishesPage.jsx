import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WishesPage.css";

function WishesPage() {
  const navigate = useNavigate();

  const wishes = [
    {
      title: "Wish One",
      message:
        "I wish you endless happiness and countless reasons to smile.",
    },
    {
      title: "Wish Two",
      message:
        "I wish that every dream you have slowly finds its way into reality.",
    },
    {
      title: "Wish Three",
      message:
        "I wish you beautiful moments that become memories you treasure forever.",
    },
    {
      title: "Wish Four",
      message:
        "I wish you strength for the difficult days and even more happiness on the good ones.",
    },
    {
      title: "Wish Five",
      message:
        "I wish that you always have people around you who genuinely care about you.",
    },
    {
      title: "Wish Six",
      message:
        "And most of all, I wish this new year of your life becomes your happiest one yet. ❤️",
    },
  ];

  const [revealed, setRevealed] = useState([]);

  const revealWish = (index) => {
    setRevealed((prev) =>
      prev.includes(index)
        ? prev
        : [...prev, index]
    );
  };

  return (
    <main className="wishes-page">

      <div className="wishes-container">

        <div className="wishes-label">
          A LITTLE SOMETHING FOR YOU
        </div>

        <h1>
          Six little wishes
        </h1>

        <p className="wishes-subtitle">
          Click each one and see what I wished for you ♡
        </p>


        <div className="wishes-grid">

          {wishes.map((wish, index) => {

            const isRevealed =
              revealed.includes(index);

            return (
              <button
                key={index}
                className={`wish-card ${
                  isRevealed
                    ? "revealed"
                    : ""
                }`}
                onClick={() =>
                  revealWish(index)
                }
              >

                {!isRevealed ? (
                  <div className="wish-front">

                    <div className="wish-number">
                      {index + 1}
                    </div>

                    <div className="wish-heart">
                      ♡
                    </div>

                    <h2>
                      {wish.title}
                    </h2>

                    <p>
                      Tap to reveal
                    </p>

                  </div>
                ) : (
                  <div className="wish-back">

                    <div className="wish-heart">
                      ♥
                    </div>

                    <p>
                      {wish.message}
                    </p>

                  </div>
                )}

              </button>
            );
          })}

        </div>


        {revealed.length === 6 && (
          <button
            className="wishes-continue"
            onClick={() =>
              navigate("/cake")
            }
          >
            One last thing
            <span>→</span>
          </button>
        )}

      </div>

    </main>
  );
}

export default WishesPage;