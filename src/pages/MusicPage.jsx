import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MusicPage.css";

function MusicPage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  const updateProgress = () => {
    if (!audioRef.current) return;

    const value =
      (audioRef.current.currentTime /
        audioRef.current.duration) *
      100;

    setProgress(value || 0);
  };

  const changeProgress = (e) => {
    if (!audioRef.current) return;

    const value = Number(e.target.value);

    audioRef.current.currentTime =
      (value / 100) * audioRef.current.duration;

    setProgress(value);
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
  };

  return (
    <main className="music-page">

      <audio
        ref={audioRef}
        src="/song.mp3"
        onTimeUpdate={updateProgress}
        onEnded={handleEnded}
      />

      <div className="music-card">

        {/* LEFT SIDE */}

        <section className="music-text">

          <div className="music-label">
            A SONG FOR YOU
          </div>

          <h1>
            Press play
            <br />
            <em>and listen.</em>
          </h1>

          <p className="music-intro">
            Some feelings are easier to say
            <br />
            with a song. ♡
          </p>

          <div className="music-note">
            ♪
          </div>

          <p className="music-message">
            Maybe this song can say
            <br />
            what words sometimes can't.
          </p>

        </section>


        {/* RIGHT SIDE */}

        <section className="music-player">

          <div className="album-wrapper">

            <div className="album-decoration decoration-one">
              ♡
            </div>

            <div className="album-decoration decoration-two">
              ✦
            </div>

            <div className="album-art">

              <img
                src="/music-photo.jpg"
                alt="Music cover"
              />

              <div className="album-overlay">
                ♫
              </div>

            </div>

          </div>


          <div className="song-info">

            <h2>
              A song for this moment
            </h2>

            <p>
              Just close your eyes and listen...
            </p>

          </div>


          <div className="progress-container">

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={changeProgress}
              className="music-progress"
              style={{
                "--progress": `${progress}%`,
              }}
            />

          </div>


          <div className="music-controls">

            <button
              className="control-button"
              aria-label="Previous"
            >
              ⏮
            </button>

            <button
              className="play-button"
              onClick={togglePlay}
              aria-label={
                playing ? "Pause" : "Play"
              }
            >
              {playing ? "Ⅱ" : "▶"}
            </button>

            <button
              className="control-button"
              aria-label="Next"
            >
              ⏭
            </button>

          </div>

        </section>

      </div>


      {/* CONTINUE */}

      <button
        className="music-continue"
        onClick={() => navigate("/wishes")}
      >
        Continue
        <span>→</span>
      </button>

    </main>
  );
}

export default MusicPage;