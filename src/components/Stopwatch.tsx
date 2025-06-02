import React, { useEffect, useState, useRef } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { MdRestartAlt } from "react-icons/md";

interface StopwatchProps {
  estimatedTime: number;
  elapsedTime: number;
  isRunning: boolean;
  onTimeUpdate: (elapsedTime: number) => void;
  onToggleRunning: (isRunning: boolean) => void;
  onReset: () => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({
  estimatedTime,
  elapsedTime,
  isRunning,
  onTimeUpdate,
  onToggleRunning,
  onReset,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        onTimeUpdate(elapsedTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, elapsedTime, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (estimatedTime === 0) return 0;
    return Math.min((elapsedTime / estimatedTime) * 100, 100);
  };

  const isOvertime = elapsedTime > estimatedTime;

  return (
    <div className="stopwatch">
      <div className="time-display">
        <div className={`elapsed-time ${isOvertime ? 'overtime' : ''}`}>
          {formatTime(elapsedTime)}
        </div>
        <div className="estimated-time">
          / {formatTime(estimatedTime)}
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className={`progress-fill ${isOvertime ? 'overtime' : ''}`}
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
      
      <div className="stopwatch-controls">
        <button
          className="stopwatch-btn"
          onClick={() => onToggleRunning(!isRunning)}
          title={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
        </button>
        
        <button
          className="stopwatch-btn"
          onClick={onReset}
          title="Reset"
        >
          <MdRestartAlt />
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;