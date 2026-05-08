import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import './HookWatch.css';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './components/Logo';

const ZentroTime = () => {
  const { t } = useTranslation();
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
  const [shareableResults, setShareableResults] = useState('');
  const [viralScore, setViralScore] = useState(0);
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Update viral score and shareable results for dynamic SEO
    const newViralScore = calculateViralScore();
    setViralScore(newViralScore);
    
    const newShareableResults = generateShareableContent();
    setShareableResults(newShareableResults);
    
    // Update page title dynamically for SEO
    updateDynamicSEO();
  }, [time, isRunning, laps, stats, isCountdownMode]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (isCountdownMode) {
          setCountdownTime(prevTime => {
            const newTime = prevTime - 10;
            const totalTime = countdownInput * 60 * 1000;
            const progressPercent = totalTime > 0 ? ((totalTime - newTime) / totalTime) * 100 : 0;
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

  const calculateViralScore = () => {
    let score = 0;
    score += stats.totalSessions * 10;
    score += Math.floor(stats.totalTime / 1000) * 2;
    score += laps.length * 25;
    score += isRunning ? 50 : 0;
    score += time > 60000 ? 100 : 0; // Bonus for sessions over 1 minute
    score += isCountdownMode ? 30 : 20;
    return score;
  };

  const generateShareableContent = () => {
    const currentTime = formatTime(isCountdownMode ? countdownTime : time);
    const achievements = [];
    
    if (stats.totalSessions > 100) achievements.push('Timer Master');
    if (stats.totalTime > 3600000) achievements.push('Time Champion');
    if (laps.length > 50) achievements.push('Lap Legend');
    if (time > 3600000) achievements.push('Endurance Expert');
    
    return {
      title: `ZentroTime ${isCountdownMode ? 'Countdown' : 'Stopwatch'} Results`,
      description: `Just completed a ${currentTime} session with ${laps.length} laps! ${achievements.length > 0 ? 'Achievements: ' + achievements.join(', ') : ''} Join 10M+ users timing with ZentroTime!`,
      url: window.location.href,
      hashtags: '#ZentroTime #Timer #Stopwatch #Productivity #FreeTimer',
      achievements: achievements
    };
  };

  const updateDynamicSEO = () => {
    const currentTime = formatTime(isCountdownMode ? countdownTime : time);
    const newTitle = isRunning 
      ? `Live Timer: ${currentTime} | Free Online Stopwatch | ZentroTime`
      : `Free Online Stopwatch Timer | Precision Time Tracker | ZentroTime`;
    
    if (document.title !== newTitle) {
      document.title = newTitle;
    }
  };

  const shareToSocial = (platform) => {
    const content = generateShareableContent();
    const encodedUrl = encodeURIComponent(content.url);
    const encodedText = encodeURIComponent(content.description);
    const encodedTitle = encodeURIComponent(content.title);
    
    let shareUrl = '';
    
    switch(platform) {
      case 'meta':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'x':
        shareUrl = `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodeURIComponent(content.hashtags.replace('#', ''))}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodeURIComponent(content.hashtags.replace('#', ''))}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${content.title}\n${content.description}\n${content.url}`);
        alert('Link copied to clipboard! Share your timing achievements!');
        return;
      default:
        return;
    }
    
    // Open share window
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    
    // Track social sharing for analytics
    if (window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'timing_results',
        viral_score: viralScore
      });
    }
  };

  const shareResults = () => {
    const content = generateShareableContent();
    const text = `${content.title}\n${content.description}\n\nTry it free: ${content.url}\n${content.hashtags}`;
    
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: content.description,
        url: content.url
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard! Share your timing achievements!');
    }
    
    // Track viral sharing for analytics
    if (window.gtag) {
      window.gtag('event', 'share', {
        method: 'web_share',
        content_type: 'timing_results',
        viral_score: viralScore
      });
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
    a.download = 'zentrotime-laps.txt';
    a.click();
  };

  return (
    <>
      <Helmet>
        {/* Dynamic SEO Meta Tags Based on User Activity */}
        <title>
          {isRunning 
            ? `Live Timer: ${formatTime(isCountdownMode ? countdownTime : time)} | Free Online Stopwatch | ZentroTime`
            : `Free Online Stopwatch Timer | Precision Time Tracker | ZentroTime`}
        </title>
        <meta name="description" content={
          isRunning 
            ? `Currently timing: ${formatTime(isCountdownMode ? countdownTime : time)} with ${laps.length} laps. Join 10M+ users using ZentroTime free online stopwatch. Perfect for sports, study, work, cooking!`
            : `World's most popular free online stopwatch timer. Track time with millisecond precision. Used by 10M+ athletes, students, professionals. No download required. Start timing instantly!`
        } />
        <meta name="keywords" content={
          isRunning 
            ? `live stopwatch, active timer, current timing session, ${isCountdownMode ? 'countdown timer' : 'stopwatch timer'}, real-time tracking, online timer now, free active timer, live chronograph, current session timer, stop watch, time calculator, date calculator, calculator time calculator, calculator and date, time and calculator, time calculator calculator, date to date calculator, time from time calculator, time time calculator, map of time zones, time zone time zone map, time differences map, time zone and map, day light saving time, hour calculator, calendar 2026, utc time, time zone, world clock, time zone time zone, time zones with time, world world clock`
            : "stopwatch, timer, online stopwatch, free timer, chronograph, lap timer, countdown, sports timer, workout timer, study timer, productivity timer, time tracker, digital stopwatch, learning timer, education timer, teaching timer, classroom timer, lecture timer, seminar timer, workshop timer, conference timer, meeting timer, presentation timer, speech timer, debate timer, discussion timer, brainstorming timer, creative timer, innovation timer, design timer, art timer, writing timer, reading timer, research timer, stop watch, time calculator, date calculator, calculator time calculator, calculator and date, time and calculator, time calculator calculator, date to date calculator, time from time calculator, time time calculator, map of time zones, time zone time zone map, time differences map, time zone and map, day light saving time, hour calculator, calendar 2026, utc time, time zone, world clock, time zone time zone, time zones with time, world world clock"
        } />
        
        {/* Dynamic Open Graph Tags */}
        <meta property="og:title" content={
          isRunning 
            ? `Live Timer: ${formatTime(isCountdownMode ? countdownTime : time)} | ZentroTime`
            : `Free Online Stopwatch Timer | Track Time Instantly | ZentroTime`
        } />
        <meta property="og:description" content={
          isRunning 
            ? `I'm currently timing: ${formatTime(isCountdownMode ? countdownTime : time)} with ${laps.length} laps! Join me on ZentroTime - the world's most popular free timer!`
            : `World's most popular free stopwatch timer. Used by 10M+ people worldwide. Perfect for sports, study, work, cooking. Start timing in 1 second!`
        } />
        
        {/* Dynamic Twitter Card */}
        <meta name="twitter:title" content={
          isRunning 
            ? `Live Timer: ${formatTime(isCountdownMode ? countdownTime : time)} | ZentroTime`
            : `Free Online Stopwatch Timer | Start Timing in 1 Second | ZentroTime`
        } />
        <meta name="twitter:description" content={
          isRunning 
            ? `Currently timing: ${formatTime(isCountdownMode ? countdownTime : time)} with ${laps.length} laps! Try ZentroTime free timer! #LiveTimer #Stopwatch`
            : `World's most popular free stopwatch timer. Used by 10M+ people. Perfect for sports, study, work, cooking. Start instantly! #FreeTimer #Stopwatch`
        } />
        
        {/* Viral Achievement Meta Tags */}
        {viralScore > 1000 && <meta name="achievement" content="Timer Master" />}
        {viralScore > 5000 && <meta name="achievement" content="Time Champion" />}
        {viralScore > 10000 && <meta name="achievement" content="ZentroTime Legend" />}
        
        {/* Real-time Analytics Tags */}
        <meta name="timer-status" content={isRunning ? "active" : "stopped"} />
        <meta name="timer-mode" content={isCountdownMode ? "countdown" : "stopwatch"} />
        <meta name="timer-duration" content={formatTime(isCountdownMode ? countdownTime : time)} />
        <meta name="lap-count" content={laps.length.toString()} />
        <meta name="viral-score" content={viralScore.toString()} />
        <meta name="session-count" content={stats.totalSessions.toString()} />
        
        {/* Structured Data for Current Session */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ZentroTime - Live Timer Session",
            "description": isRunning 
              ? `Active timing session: ${formatTime(isCountdownMode ? countdownTime : time)} with ${laps.length} laps recorded`
              : "Ready to start timing with world's most popular free stopwatch",
            "url": window.location.href,
            "applicationCategory": "Productivity",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "15420"
            },
            "author": {
              "@type": "Organization",
              "name": "ZentroTime Technologies Inc."
            }
          })}
        </script>
      </Helmet>
      
      <div 
        className={`zentrotime-container ${isDarkTheme ? 'dark-theme' : 'light-theme'} ${isRunning ? 'running' : ''}`}
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
      
      <div className="zentrotime-header">
        <Logo />
        <p>{isCountdownMode ? t('navigation.countdown') : t('navigation.stopwatch')}</p>
        <div className="theme-controls">
          <LanguageSwitcher />
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
            title="Toggle Mode (M)"
          >
            {isCountdownMode ? '⏱️' : '⏰'}
          </button>
          <button 
            className="sound-btn" 
            onClick={() => setSoundEnabled(!soundEnabled)}
            title="Toggle Sound (S)"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      {isCountdownMode && !isRunning && (
        <div className="countdown-input-section">
          <input
            type="number"
            placeholder={t('countdown.minutes')}
            value={countdownInput}
            onChange={(e) => setCountdownInput(e.target.value)}
            min="0"
            max="180"
            className="countdown-input"
          />
          <button className="btn btn-set-countdown" onClick={() => {
            const minutes = parseInt(countdownInput) || 0;
            setCountdownTime(minutes * 60 * 1000);
            playSound('click');
          }}>
            {t('countdown.setTime')}
          </button>
        </div>
      )}
        <div className="time-display">
          {isCountdownMode && isRunning && (
            <div className="progress-ring">
              <svg width="200" height="200">
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
          {isRunning ? t('common.running') : t('common.stopped')}
        </div>
        </div>
      </div>

      <div className="controls">
        {!isRunning ? (
          <button className="btn btn-start" onClick={handleStart} title="Start (Space)">
            {isCountdownMode ? t('countdown.start') : (time === 0 ? t('stopwatch.start') : t('stopwatch.resume'))}
          </button>
        ) : (
          <button className="btn btn-stop" onClick={handleStop} title="Stop (Space)">
            {t('stopwatch.stop')}
          </button>
        )}
        
        <button className="btn btn-lap" onClick={handleLap} disabled={!isRunning} title="Lap (L) or Swipe Left">
          {t('stopwatch.lap')}
        </button>
        
        <button className="btn btn-reset" onClick={handleReset} title="Reset (R) or Swipe Right">
          {t('stopwatch.reset')}
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
        <p>Space (Start/Stop) | R (Reset) | L (Lap) | T (Theme) | M (Mode) | Swipe Left/Right</p>
      </div>

      
      {laps.length > 0 && (
        <div className="laps-section">
          <div className="laps-header">
            <h3>{t('stopwatch.laps')}</h3>
            <div className="laps-actions">
              <button className="btn-export" onClick={exportLaps} title="Export Laps">
                📥 {t('common.save')}
              </button>
              <button className="btn-clear-laps" onClick={handleClearLaps}>
                {t('stopwatch.clear')}
              </button>
            </div>
          </div>
          <div className="laps-list">
            {laps.map((lapTime, index) => {
              const prevLap = index > 0 ? laps[index - 1] : (isCountdownMode ? countdownInput * 60 * 1000 : time);
              const diff = isCountdownMode ? prevLap - lapTime : lapTime - prevLap;
              return (
                <div key={index} className="lap-item">
                  <span className="lap-number">{t('stopwatch.lap')} {index + 1}</span>
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
    </>
  );
};

export default ZentroTime;





