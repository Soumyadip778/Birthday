import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CakeApp.css";

const CANDLES = ["left", "middle", "right"];

/* =========================
   CANDLE
========================= */

function Candle({ position, blownOut, onBlow }) {
  const handleBlow = (e) => {
    // Prevent the candle tap from starting
    // the cake swipe underneath it.
    e.stopPropagation();

    if (!blownOut) {
      onBlow();
    }
  };

  return (
    <div
      className={`candle candle-${position}`}
      onPointerDown={handleBlow}
      onClick={handleBlow}
      role="button"
      tabIndex={0}
      aria-label={`Blow out ${position} candle`}
    >
      {!blownOut ? (
        <div className="flame">
          <span className="flame-inner" />
        </div>
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


/* =========================
   CAKE PAGE
========================= */

function CakePage() {
  const navigate = useNavigate();

  const startYRef = useRef(null);
  const lastYRef = useRef(null);

  const [blownCandles, setBlownCandles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [cut, setCut] = useState(false);
  const [showSprinkles, setShowSprinkles] = useState(false);


  /* =========================
     CANDLE STATUS
  ========================= */

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
     START CAKE SWIPE
  ========================= */

  const handlePointerDown = (e) => {
    if (!allCandlesBlown || cut) {
      return;
    }

    startYRef.current = e.clientY;
    lastYRef.current = e.clientY;

    setDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };


  /* =========================
     SMOOTH CAKE SWIPE
     TOP → BOTTOM
  ========================= */

  const handlePointerMove = (e) => {
    if (
      !dragging ||
      cut ||
      startYRef.current === null
    ) {
      return;
    }

    const currentY = e.clientY;

    const distance =
      currentY - startYRef.current;

    lastYRef.current = currentY;

    /*
      One continuous downward swipe.
      The cake cuts after a short,
      natural downward movement.
    */
    if (distance >= 70) {
      setCut(true);
      setDragging(false);
      setShowSprinkles(true);

      startYRef.current = null;
      lastYRef.current = null;

      try {
        e.currentTarget.releasePointerCapture(
          e.pointerId
        );
      } catch {}
    }
  };


  /* =========================
     END SWIPE
  ========================= */

  const handlePointerUp = (e) => {
    setDragging(false);

    startYRef.current = null;
    lastYRef.current = null;

    try {
      if (
        e.currentTarget.hasPointerCapture(
          e.pointerId
        )
      ) {
        e.currentTarget.releasePointerCapture(
          e.pointerId
        );
      }
    } catch {}
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

        {/* =========================
            HEADER
        ========================= */}

        <p className="cake-eyebrow">
          A LITTLE BIRTHDAY MAGIC
        </p>

        <h1>
          {cut ? "Make a wish" : "Cut the cake"}
        </h1>

        <div className="cake-divider" />


        {/* =========================
            SPRINKLES
        ========================= */}

        {showSprinkles && (
          <div className="sprinkles">
            {sprinkles.map((item) => (
              <span
                key={item}
                style={{
                  left:
                    `${(item * 37) % 100}%`,

                  animationDelay:
                    `${(item % 10) * 0.06}s`,

                  animationDuration:
                    `${1.5 + (item % 5) * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}


        {/* =========================
            CAKE STAGE
        ========================= */}

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

          {/* =========================
              WHOLE CAKE
          ========================= */}

          {!cut && (
            <img
              src="/cake.webp"
              alt="Birthday cake"
              className="whole-cake"
              draggable="false"
            />
          )}


          {/* =========================
              SPLIT CAKE
          ========================= */}

          {cut && (
            <div className="split-cake">

              <div className="cake-half cake-half-left">
                <img
                  src="/cake.webp"
                  alt=""
                  draggable="false"
                />
              </div>

              <div className="cake-half cake-half-right">
                <img
                  src="/cake.webp"
                  alt=""
                  draggable="false"
                />
              </div>

            </div>
          )}


          {/* =========================
              CANDLES
          ========================= */}

          {!cut && (
            <div className="candles">

              <Candle
                position="left"
                blownOut={
                  blownCandles.includes("left")
                }
                onBlow={() =>
                  blowCandle("left")
                }
              />

              <Candle
                position="middle"
                blownOut={
                  blownCandles.includes("middle")
                }
                onBlow={() =>
                  blowCandle("middle")
                }
              />

              <Candle
                position="right"
                blownOut={
                  blownCandles.includes("right")
                }
                onBlow={() =>
                  blowCandle("right")
                }
              />

            </div>
          )}


          {/* =========================
              KNIFE
          ========================= */}

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


        {/* =========================
            INSTRUCTION
        ========================= */}

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


        {/* =========================
            AFTER CUT
        ========================= */}

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