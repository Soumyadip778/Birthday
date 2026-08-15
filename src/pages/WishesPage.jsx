import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WishesPage.css";

function WishesPage() {
  const navigate = useNavigate();

  const wishes = [
    {
      title: "Wish One",
      message:
        "I hope you always have reasons to smile, even on the days when things don't go exactly the way you want. And I hope that whenever life gets a little difficult, you remember that you don't have to handle everything alone. You have people who care about you, and I'm really glad I get to be one of them. ❤️🫂",
    },
    {
      title: "Wish Two",
      message:
        "I hope you get everything you're working so hard for. I know I don't always say it, but I'm genuinely proud of you and I want to see you achieve the things you dream about. May you always have the courage to chase what makes you happy. 🌷❤️",
    },
    {
      title: "Wish Three",
      message:
        "I hope you never feel like you have to change yourself just to be accepted. Stay the same crazy, caring, beautiful person who somehow became such an important part of my life. The world needs more people who are genuinely themselves. 🥹🫶🏻",
    },
    {
      title: "Wish Four",
      message:
        "I hope no matter how much life changes, we never lose the friendship we've built. We've already laughed, fought, annoyed each other, shared countless silly conversations, and somehow survived all of it. 😂❤️ I hope there are still years of this craziness waiting for us.",
    },
    {
      title: "Wish Five",
      message:
        "I hope life takes you to places you've always wanted to see, gives you people who genuinely value you, and gives you countless stories to tell me later. And whenever something amazing happens, I hope I'm still one of the people you think of when you want to share it. 🥹✨",
    },
    {
      title: "Wish Six",
      message:
        "And finally, on your 19th birthday, I just wish that this year is kinder to you, happier for you, and full of things that make you genuinely excited about life. Keep smiling, keep being the idiot I know, and please never forget how much you mean to the people lucky enough to know you. Happy 19th, Chagli. 🎂❤️🫂",
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