import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RomanticCard.css";

function RomanticCard() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState("");
  const [error, setError] = useState("");

  const CODE = "160807";
  const keys = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "", "0", "⌫"
  ];

  const handleKey = (key) => {
    setError("");

    if (key === "⌫") {
      setEntered((prev) => prev.slice(0, -1));
      return;
    }

    if (!key || entered.length >= CODE.length) return;

    const newValue = entered + key;
    setEntered(newValue);

    if (newValue.length === CODE.length) {
     if (newValue === CODE) {
  sessionStorage.setItem("unlocked", "true");

  setTimeout(() => {
    navigate("/cat");
  }, 300);
} else {
        setError("Oops! Wrong code, try again 💔");

        setTimeout(() => {
          setEntered("");
          setError("");
        }, 1500);
      }
    }
  };

  return (
    <div className="romantic-card-wrapper">
      <div className="romantic-card">

        {/* PHOTO */}

        <div className="photo-section">

          <div className="photo-frame">
            <img
              src="/Home_Screen.webp"
              alt="A special memory"
            />
          </div>

          <div className="photo-caption">
            <h2>Happy 19th Birthday!</h2>

            <p>
              Let's celebrate this special day with love, laughter, and cherished memories.
            </p>
          </div>

        </div>


        {/* DIVIDER */}

        <div className="card-divider" />


        {/* PASSCODE */}

        <div className="passcode-section">

          <div className="passcode-heading">
            <span>A LITTLE SURPRISE AWAITS</span>

            <h1>For You</h1>

            <p>🔑 Enter the secret code to open it , Hint : Your birthdate in dd/mm/yy </p>
          </div>


          {/* DOTS */}

          <div className="password-dots">
            {Array.from({ length: CODE.length }).map(
              (_, index) => (
                <span
                  key={index}
                  className={
                    index < entered.length
                      ? "password-dot filled"
                      : "password-dot"
                  }
                />
              )
            )}
          </div>


          {/* ERROR */}

          <div className="error-message">
            {error}
          </div>


          {/* KEYPAD */}

          <div className="keypad">

            {keys.map((key, index) => (
              <button
                key={index}
                className={
                  key === ""
                    ? "key empty-key"
                    : "key"
                }
                onClick={() => handleKey(key)}
                disabled={!key}
              >
                {key}
              </button>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default RomanticCard;