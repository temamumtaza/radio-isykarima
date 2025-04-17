import React, { useRef, useState } from 'react';
import './App.css';

const RADIO_URL = 'https://ssg.streamingmurah.com:8406/stream.mp3';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolume = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    audioRef.current.volume = vol;
    if (vol === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (isMuted || volume === 0) {
      audioRef.current.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        setVolume(0.5);
        audioRef.current.volume = 0.5;
      }
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="radio-bg">
      <header className="spotify-header">
        <h1 className="radio-title">Radio Isy Karima</h1>
      </header>
      <main className="hero-blur">
        <div className="spotify-player-card">
          <div className="spotify-label">Live Streaming</div>
          <div className="player-controls">
            <button className="play-btn" onClick={handlePlayPause} aria-label={isPlaying ? 'Stop' : 'Play'}>
              {isPlaying ? (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="7" width="6" height="18" rx="2" fill="white"/>
                  <rect x="19" y="7" width="6" height="18" rx="2" fill="white"/>
                </svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6V26L26 16L8 6Z" fill="white"/>
                </svg>
              )}
            </button>
            <div className="volume-row">
              <button className="mute-btn" onClick={handleMuteToggle} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted || volume === 0 ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8V12H6L10 16V4L6 8H3Z" fill="#b3b3b3"/>
                    <line x1="14" y1="6" x2="18" y2="14" stroke="#b3b3b3" strokeWidth="2"/>
                    <line x1="18" y1="6" x2="14" y2="14" stroke="#b3b3b3" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8V12H6L10 16V4L6 8H3Z" fill="#b3b3b3"/>
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                className="volume-slider"
                aria-label="Volume"
              />
            </div>
          </div>
          <audio ref={audioRef} src={RADIO_URL} preload="none" />
        </div>
      </main>
    </div>
  );
}

export default App;
