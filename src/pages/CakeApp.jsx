import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CakeApp.css";

const CANDLES = ["left", "middle", "right"];

function Candle({ position, blownOut, onBlow }) {
  return (
    <div className={`candle candle-${position}`}>
      {!blownOut ? (
        <button
          type="button"
          className="flame"
          onPointerDown={(e) => {
            e.stopPropagation();
            onBlow();
          }}
          aria-label="Blow out candle"
        >
          <span className="flame-inner" />
        </button>
      ) : (
        <div className="smoke">
          <span />
          <span />
          <span />
        </div>
      )}

      <div className="candle-stick" />
    </div>
  );
}

function CakePage() {
  const navigate = useNavigate();

  const startYRef = useRef(null);

  const [blownCandles, setBlownCandles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [cut, setCut] = useState(false);
  const [showSprinkles, setShowSprinkles] = useState(false);

  const allCandlesBlown =
    blownCandles.length === CANDLES.length;

  /* =========================
     BLOW CANDLE
  ========================= */

  const blowCandle = (position) => {
    setBlownCandles((previous) => {
      if (previous.includes(position)) {
        return previous;
      }

      return [...previous, position];
    });
  };

  /* =========================
     START SWIPE
  ========================= */

  const handlePointerDown = (e) => {
    if (!allCandlesBlown || cut) return;

    startYRef.current = e.clientY;
    setDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  /* =========================
     SWIPE TOP → BOTTOM
  ========================= */

  const handlePointerMove = (e) => {
    if (
      !dragging ||
      cut ||
      startYRef.current === null
    ) {
      return;
    }

    const distance =
      e.clientY - startYRef.current;

    if (distance >= 100) {
      setCut(true);
      setDragging(false);
      setShowSprinkles(true);
      startYRef.current = null;

      try {
        e.currentTarget.releasePointerCapture(
          e.pointerId
        );
      } catch {}
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
    startYRef.current = null;
  };

  /* =========================
     SPRINKLES
  ========================= */

  const sprinkles = Array.from(
    { length: 55 },
    (_, index) => index
  );

  return (
    <main className="cake-page">

      <div className="cake-content">

        {/* HEADER */}

        <p className="cake-eyebrow">
          A LITTLE BIRTHDAY MAGIC
        </p>

        <h1>
          {cut ? "Make a wish" : "Cut the cake"}
        </h1>

        <div className="cake-divider" />


        {/* SPRINKLES */}

        {showSprinkles && (
          <div className="sprinkles">
            {sprinkles.map((item) => (
              <span
                key={item}
                style={{
                  left: `${(item * 37) % 100}%`,
                  animationDelay:
                    `${(item % 10) * 0.06}s`,
                  animationDuration:
                    `${1.5 + (item % 5) * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}


        {/* CAKE */}

        <div
          className={`
            cake-stage
            ${dragging ? "is-dragging" : ""}
            ${cut ? "is-cut" : ""}
          `}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >

          {/* WHOLE CAKE */}

          {!cut && (
            <img
              src="/cake.png"
              alt="Birthday cake"
              className="whole-cake"
              draggable="false"
            />
          )}


          {/* SPLIT CAKE */}

          {cut && (
            <div className="split-cake">

              <div className="cake-half cake-half-left">
                <img
                  src="/cake.png"
                  alt=""
                  draggable="false"
                />
              </div>

              <div className="cake-half cake-half-right">
                <img
                  src="/cake.png"
                  alt=""
                  draggable="false"
                />
              </div>

            </div>
          )}


          {/* CANDLES */}

          {!cut && (
            <div className="candles">

              <Candle
                position="left"
                blownOut={blownCandles.includes("left")}
                onBlow={() =>
                  blowCandle("left")
                }
              />

              <Candle
                position="middle"
                blownOut={blownCandles.includes("middle")}
                onBlow={() =>
                  blowCandle("middle")
                }
              />

              <Candle
                position="right"
                blownOut={blownCandles.includes("right")}
                onBlow={() =>
                  blowCandle("right")
                }
              />

            </div>
          )}


          {/* KNIFE */}

          {allCandlesBlown && !cut && (
            <div
              className={`
                knife
                ${dragging ? "knife-dragging" : ""}
              `}
            >
              🔪
            </div>
          )}

        </div>


        {/* INSTRUCTION */}

        {!allCandlesBlown && !cut && (
          <p className="cake-instruction">
            Tap each candle to blow it out 🌬️
          </p>
        )}

        {allCandlesBlown && !cut && (
          <p className="cake-instruction">
            🔪 Swipe from top to bottom
          </p>
        )}


        {/* AFTER CUT */}

        {cut && (
          <section className="after-cut">

            <div className="cake-slices">
              🍰 ✨ 🍰
            </div>

            <h2>
              A slice for you, a slice for me
            </h2>

            <p>
              Make a wish while you're at it —
              happy birthday!
            </p>

            <button
              type="button"
              className="continue-button"
              onClick={() => navigate("/note")}
            >
              Continue
              <span>→</span>
            </button>

          </section>
        )}

      </div>
    </main>
  );
}

export default CakePage;