import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const RADIO_URL = 'https://ssg.streamingmurah.com:8406/stream.mp3';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: 'Radio Isy Karima',
        artist: 'Live Streaming',
        album: 'Radio Isy Karima',
        artwork: [
          { src: '/logo192.png', sizes: '192x192', type: 'image/png' },
          { src: '/logo512.png', sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {}
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current.pause();
        setIsPlaying(false);
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        audioRef.current.pause();
        setIsPlaying(false);
      });
    }
  }, [audioRef, setIsPlaying]);

  const handlePlayPause = async () => {
    if (!isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log('Audio play failed:', err);
      }
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
      <video
        className="bg-video"
        src="https://videos.pexels.com/video-files/5647336/5647336-uhd_2560_1440_25fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef}
        onEnded={() => { if (videoRef.current) videoRef.current.play(); }}
        onError={() => console.log('Video failed to load')}
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (v && v.duration - v.currentTime < 0.2) {
            v.currentTime = 0;
            v.play();
          }
        }}
        onPause={() => {
          const v = videoRef.current;
          if (v && v.currentTime < v.duration - 0.2) {
            v.play();
          }
        }}
      />
      <div className="bg-overlay" />
      <header className="spotify-header">
        <div className="hero-container">
          <img
            src="https://radioisykarima.com/wp-content/uploads/2023/11/Logo-Radio-IsyKarima-Putih-1536x497.png"
            alt="Radio Isy Karima: Sahabat Anda Belajar Al-Quran"
            className="hero-image"
          />
        </div>
      </header>
      <div className="main-spacer" />
      <main className="hero-blur hero-blur--lower">
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
          <audio ref={audioRef} src={RADIO_URL} preload="none" onError={() => console.log('Audio failed to load')} />
        </div>
      </main>
    </div>
  );
}

export default App;
