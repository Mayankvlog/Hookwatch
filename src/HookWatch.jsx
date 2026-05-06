import React, { useState, useEffect, useRef } from 'react';
import './HookWatch.css';

const HookWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCountdownMode, setIsCountdownMode] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownInput, setCountdownInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stats, setStats] = useState({ totalSessions: 0, totalTime: 0, bestLap: null });
  const [touchStart, setTouchStart] = useState(null);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (isCountdownMode) {
          setCountdownTime(prevTime => {
            const newTime = prevTime - 10;
            const totalTime = countdownInput * 60 * 1000;
            const progressPercent = ((totalTime - newTime) / totalTime) * 100;
            setProgress(progressPercent);
            
            if (newTime <= 10) {
              setIsRunning(false);
              playSound('complete');
              triggerConfetti();
              updateStats();
              return 0;
            }
            return newTime;
          });
        } else {
          setTime(prevTime => {
            const newTime = prevTime + 10;
            // Check for milestones
            if (newTime % 60000 === 0) { // Every minute
              triggerConfetti();
            }
            return newTime;
          });
        }
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isCountdownMode, countdownInput]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        isRunning ? handleStop() : handleStart();
      } else if (e.code === 'KeyR') {
        handleReset();
      } else if (e.code === 'KeyL') {
        handleLap();
      } else if (e.code === 'KeyT') {
        setIsDarkTheme(!isDarkTheme);
      } else if (e.code === 'KeyM') {
        setIsCountdownMode(!isCountdownMode);
      } else if (e.code === 'KeyS') {
        shareResults();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, isDarkTheme, isCountdownMode]);

  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const updateStats = () => {
    const currentTime = isCountdownMode ? countdownInput * 60 * 1000 : time;
    setStats(prev => ({
      totalSessions: prev.totalSessions + 1,
      totalTime: prev.totalTime + currentTime,
      bestLap: laps.length > 0 ? Math.min(...laps) : prev.bestLap
    }));
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    switch(type) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        break;
      case 'lap':
        oscillator.frequency.value = 1000;
        gainNode.gain.value = 0.15;
        break;
      case 'complete':
        oscillator.frequency.value = 1200;
        gainNode.gain.value = 0.2;
        break;
    }
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (isCountdownMode && countdownTime === 0) {
      const minutes = parseInt(countdownInput) || 0;
      setCountdownTime(minutes * 60 * 1000);
    }
    setIsRunning(true);
    playSound('click');
    triggerHapticFeedback();
  };

  const handleStop = () => {
    setIsRunning(false);
    playSound('click');
    triggerHapticFeedback();
    updateStats();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setCountdownTime(0);
    setProgress(0);
    playSound('click');
    triggerHapticFeedback();
  };

  const handleLap = () => {
    if (isRunning && (isCountdownMode ? countdownTime > 0 : time > 0)) {
      const currentTime = isCountdownMode ? countdownTime : time;
      setLaps([...laps, currentTime]);
      playSound('lap');
      triggerHapticFeedback();
    }
  };

  const handleClearLaps = () => {
    setLaps([]);
    playSound('click');
    triggerHapticFeedback();
  };

  const shareResults = () => {
    const text = `HookWatch Results:\n${isCountdownMode ? 'Countdown' : 'Stopwatch'}: ${formatTime(isCountdownMode ? countdownTime : time)}\nLaps: ${laps.length}\n${laps.map((lap, i) => `Lap ${i + 1}: ${formatTime(lap)}`).join('\n')}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'HookWatch Results',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 100) {
      if (diff > 0) {
        // Swipe left - lap
        handleLap();
      } else {
        // Swipe right - reset
        handleReset();
      }
    }
    setTouchStart(null);
  };

  const exportLaps = () => {
    const lapData = laps.map((lap, index) => `Lap ${index + 1}: ${formatTime(lap)}`).join('\n');
    const blob = new Blob([lapData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hookwatch-laps.txt';
    a.click();
  };

  return (
    <div 
      className={`hookwatch-container ${isDarkTheme ? 'dark-theme' : 'light-theme'} ${isRunning ? 'running' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][Math.floor(Math.random() * 5)]
            }} />
          ))}
        </div>
      )}
      
      <div className="hookwatch-header">
        <h1>HookWatch</h1>
        <p>{isCountdownMode ? 'Countdown Timer' : 'Precision Stopwatch'}</p>
        <div className="theme-controls">
          <button 
            className="theme-btn" 
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            title="Toggle Theme (T)"
          >
            {isDarkTheme ? '🌞' : '🌙'}
          </button>
          <button 
            className="mode-btn" 
            onClick={() => setIsCountdownMode(!isCountdownMode)}
            title="Switch Mode (M)"
          >
            {isCountdownMode ? '⏱️' : '⏰'}
          </button>
          <button 
            className="sound-btn" 
            onClick={() => setSoundEnabled(!soundEnabled)}
            title="Toggle Sound"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button 
            className="share-btn" 
            onClick={shareResults}
            title="Share Results (S)"
          >
            📤
          </button>
        </div>
      </div>

      {isCountdownMode && !isRunning && (
        <div className="countdown-input-section">
          <input
            type="number"
            placeholder="Enter minutes"
            value={countdownInput}
            onChange={(e) => setCountdownInput(e.target.value)}
            className="countdown-input"
            min="1"
            max="999"
          />
        </div>
      )}

      <div className="time-display">
        {isCountdownMode && (
          <div className="progress-ring">
            <svg className="progress-svg" width="200" height="200">
              <circle
                className="progress-background"
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <circle
                className="progress-bar"
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                transform="rotate(-90 100 100)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        <div className="time-value">
          {formatTime(isCountdownMode ? countdownTime : time)}
        </div>
        <div className="time-label">
          {isRunning ? 'Running' : 'Stopped'}
        </div>
      </div>

      <div className="controls">
        {!isRunning ? (
          <button 
            className="btn btn-start" 
            onClick={handleStart}
            disabled={!isCountdownMode && time > 0 && laps.length === 0}
            title="Start/Resume (Space)"
          >
            {isCountdownMode ? 'Start' : (time === 0 ? 'Start' : 'Resume')}
          </button>
        ) : (
          <button className="btn btn-stop" onClick={handleStop} title="Stop (Space)">
            Stop
          </button>
        )}
        
        <button className="btn btn-lap" onClick={handleLap} disabled={!isRunning} title="Lap (L) or Swipe Left">
          Lap
        </button>
        
        <button className="btn btn-reset" onClick={handleReset} title="Reset (R) or Swipe Right">
          Reset
        </button>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">{stats.totalSessions}</span>
            <span className="stat-label">Sessions</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{formatTime(stats.totalTime)}</span>
            <span className="stat-label">Total Time</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.bestLap ? formatTime(stats.bestLap) : '--:--'}</span>
            <span className="stat-label">Best Lap</span>
          </div>
        </div>
      </div>

      <div className="keyboard-shortcuts">
        <p>Space (Start/Stop) | R (Reset) | L (Lap) | T (Theme) | M (Mode) | S (Share) | Swipe Left/Right</p>
      </div>

      {laps.length > 0 && (
        <div className="laps-section">
          <div className="laps-header">
            <h3>Lap Times</h3>
            <div className="laps-actions">
              <button className="btn-export" onClick={exportLaps} title="Export Laps">
                📥 Export
              </button>
              <button className="btn-clear-laps" onClick={handleClearLaps}>
                Clear All
              </button>
            </div>
          </div>
          <div className="laps-list">
            {laps.map((lapTime, index) => {
              const prevLap = index > 0 ? laps[index - 1] : (isCountdownMode ? countdownInput * 60 * 1000 : 0);
              const diff = isCountdownMode ? prevLap - lapTime : lapTime - prevLap;
              return (
                <div key={index} className="lap-item">
                  <span className="lap-number">Lap {index + 1}</span>
                  <span className="lap-time">{formatTime(lapTime)}</span>
                  {index > 0 && (
                    <span className="lap-diff">+{formatTime(diff)}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HookWatch;
