import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faBackwardStep,
  faForwardStep,
  faPause,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds - minutes * 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
  const splitArray = timeString.split(":");
  const minutes = Number(splitArray[0]);
  const seconds = Number(splitArray[1]);

  return seconds + minutes * 60;
};

const Player = ({ duration, pastSong, nextSong, currentSongId, audio }) => {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const [volume, setVolume] = useState(1);
  const durationInSeconds = timeInSeconds(duration);

  const playPause = () => {
    isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioPlayer.current.volume = newVolume;

    e.target.style.setProperty("--_volume", `${newVolume * 100}%`);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying)
        setCurrentTime(formatTime(audioPlayer.current.currentTime));

      progressBar.current.style.setProperty(
        "--_progress",
        (audioPlayer.current.currentTime / durationInSeconds) * 100 + "%"
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="player">
      <div className="player__controllers">
        {pastSong === currentSongId ? (
          <button disabled className="player__icon player__icon--disabled">
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
        ) : (
          <Link to={`/song/${pastSong}`}>
            <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
          </Link>
        )}

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faPause : faCirclePlay}
          onClick={() => playPause()}
        />

        {nextSong === currentSongId ? (
          <button disabled className="player__icon player__icon--disabled">
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        ) : (
          <Link to={`/song/${nextSong}`}>
            <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
          </Link>
        )}
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>

        <div className="player__bar">
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>

        <p>{duration}</p>
      </div>

      <div className="player__volume">
        <FontAwesomeIcon
          icon={
            volume == 0
              ? faVolumeMute
              : volume < 0.5
              ? faVolumeLow
              : faVolumeHigh
          }
          className="player__volume-icon"
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="player__volume-slider"
        />
      </div>

      <audio ref={audioPlayer} src={audio}></audio>
    </div>
  );
};

export default Player;
