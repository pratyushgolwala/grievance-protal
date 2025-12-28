import React, { useState, useRef, useEffect } from 'react';
import styles from './MusicToggle.module.css';

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/background-music.mp3');
    audioRef.current.loop = true;
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button onClick={toggleMusic} className={styles.musicButton}>
      {isPlaying ? '🎵' : '🔇'}
    </button>
  );
};

export default MusicToggle;
