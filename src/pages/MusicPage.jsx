import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MusicPage.css";

const songs = [
  {
    title: "Kahe Mose",
    artist: "A song for this moment",
    file: "/kahe-mose.mp3",
    cover: "/music1.webp",
    lyrics: [
      "Tu hi jo dekhe",
      "Dil kyon mera",
      "Bhar jaae re sajna"
    ]
  },
  {
    title: "Sun Saawariya",
    artist: "Another little memory",
    file: "/sun-sawariya.mp3",
    cover: "/music2.webp",
    lyrics: [
      "Sun saawariya, kahaan tu?",
      "Teri reet main samajh na paaun",
      "Ghoom-ghoom-ghoomta hi rahoon"
    ]
  },
  {
    title: "Tere Paas Main",
    artist: "For another moment",
    file: "/tere-pass-main.mp3",
    cover: "/music3.jpg",
    lyrics: [
      "Jaise Tu Hain Pass Mere",
      "Jaise Shaamon ke Sawere",
      "Tere Paas Main"
    ]
  },
  {
    title: "Sudhu Tomakei Bhalobese",
    artist: "One of your favaourites",
    file: "/Bhalobese.mp3",
    cover: "/music4.jpg",
    lyrics: [
      "শুধু তোমাকেই ভালোবেসে",
      "শুকনো নদীতে ডিঙি ভাসিয়েছি",
      "মোহনার কাছে এসে"
    ]
  },
  {
    title: "Dooron Dooron",
    artist: "A song for the heart",
    file: "/Dooron-Dooron.mp3",
    cover: "/music5.jpg",
    lyrics: [
      "Sochu ke milni te bolaanga ki",
      "Teri taan gallaan’ch…shaayari",
      "Mitti da banda main, tu taan pari..."
    ]
  }
];

function MusicPage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = songs[currentSong];

  /* =========================
     PLAY / PAUSE
  ========================= */

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  /* =========================
     CHANGE SONG
  ========================= */

  const changeSong = (index) => {
    if (index < 0 || index >= songs.length) return;

    setPlaying(false);
    setProgress(0);
    setDuration(0);
    setCurrentSong(index);
  };

  const previousSong = () => {
    const newIndex =
      currentSong === 0
        ? songs.length - 1
        : currentSong - 1;

    changeSong(newIndex);
  };

  const nextSong = () => {
    const newIndex =
      currentSong === songs.length - 1
        ? 0
        : currentSong + 1;

    changeSong(newIndex);
  };

  /* =========================
     LOAD NEW SONG
  ========================= */

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();
    setProgress(0);

    if (playing) {
      audioRef.current
        .play()
        .catch(() => setPlaying(false));
    }
  }, [currentSong]);

  /* =========================
     AUDIO PROGRESS
  ========================= */

  const updateProgress = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;

    if (!total || !Number.isFinite(total)) return;

    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration || 0);
  };

  const changeProgress = (e) => {
    if (!audioRef.current || !duration) return;

    const value = Number(e.target.value);

    audioRef.current.currentTime =
      (value / 100) * duration;

    setProgress(value);
  };

  /* =========================
     WHEN SONG ENDS
  ========================= */

 const handleEnded = () => {
  if (currentSong === songs.length - 1) {
    setPlaying(false);
    setProgress(100);
    return;
  }

  setProgress(0);
  setCurrentSong(currentSong + 1);
  setPlaying(true);
};

  /* =========================
     FORMAT TIME
  ========================= */

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);

    return `${minutes}:${remaining
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <main className="music-page">

      {/* =========================
          AUDIO
      ========================= */}

      <audio
        ref={audioRef}
        src={song.file}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />


      <div className="music-card">

        {/* =========================
            LEFT SIDE
        ========================= */}

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


        {/* =========================
            PLAYER
        ========================= */}

        <section className="music-player">

          {/* FLOATING LYRICS */}

          <div className="floating-lyrics">

            {song.lyrics.map((line, index) => (
              <span
                key={`${currentSong}-${index}`}
                className={`floating-lyric lyric-${index + 1}`}
              >
                {line}
              </span>
            ))}

          </div>


          {/* ALBUM */}

          <div className="album-wrapper">

            <div className="album-decoration decoration-one">
              ♡
            </div>

            <div className="album-decoration decoration-two">
              ✦
            </div>

            <div className="album-art">

              <img
                src={song.cover}
                alt={`${song.title} cover`}
              />

              <div className="album-overlay">
                {playing ? "♫" : "♪"}
              </div>

            </div>

          </div>


          {/* SONG INFO */}

          <div className="song-info">

            <h2>
              {song.title}
            </h2>

            <p>
              {song.artist}
            </p>

          </div>


          {/* PROGRESS */}

          <div className="progress-container">

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={changeProgress}
              className="music-progress"
              style={{
                "--progress": `${progress}%`
              }}
            />

            <div className="time-row">
              <span>
                {formatTime(
                  (progress / 100) * duration
                )}
              </span>

              <span>
                {formatTime(duration)}
              </span>
            </div>

          </div>


          {/* CONTROLS */}

          <div className="music-controls">

            <button
              className="control-button"
              onClick={previousSong}
              aria-label="Previous song"
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
              onClick={nextSong}
              aria-label="Next song"
            >
              ⏭
            </button>

          </div>


          {/* SONG INDICATOR */}

          <div className="song-indicator">

            {currentSong + 1}
            {" / "}
            {songs.length}

          </div>

        </section>

      </div>


      {/* =========================
          CONTINUE
      ========================= */}

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