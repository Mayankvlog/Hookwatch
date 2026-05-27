import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import './HookWatch.css';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './components/Logo';
import Backlinks from './components/Backlinks';

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
        <meta name="keywords" content="timer, stop watch, stopwatch watch, stop stopwatch, onestopwatch, 5 minute timer, 30 minute timer, 1 minute timer, 2 minute timer, world clock, clock alarm clock, clock and alarm, alarm alarm clock, alarm clock alarm clock, 3 minute timer, clock with seconds, clock tab, timer clock, timer with seconds, online timer timer, online timer online, 0nline timer, time clock time clock, clock time clock, timer 10 minutes, google timer, exact time, 30 second timer, time for date, time now, countdown clock timer, 5 min, stopwatch timer, stop clock timer, world time clock, real time, set a timer for 10 minutes, timer and stopwatch, global time clock, time and stopwatch, stop watch and timer, timerstopwatch, classroom timer, digital clock, one minute timer, game timer, new years countdown, 10 minutes, live timer, clock atomic, world clock with seconds, online online stopwatch, stopwatch online stopwatch, set a timer for 30 minutes, time right now, 0nline stopwatch, online stopwatch online stopwatch, set alarm, date and time, 2 hour timer, fast timer, second minute, alarm set alarm, real time clock, world time, 10 second timer, time and seconds, time usa, digital clock with seconds, countdown timer app, live clock with seconds, 1 hour, 2 min, time now with seconds, visual timer, alarm clock online, online clock, clock app, two minute timer, internet alarm clock, digital timer, stopwatch online, time timer, countdown clock, free timer, clock timer with seconds, minute timer, time clock with seconds, set time, website stopwatch, stopwatch web, stopwatch watch online, online stop watches, fun timer, timer in minutes, add timer, online sto, stop watch timer, timer countdown, 30 seconds, set a timer, egg timers, set alarm clock, atomic time, stop watch time, timer block, countdown app, stopwatch google, one hour time, new year's eve countdown, global timer, timer online, timer watch, study timer, digital clock online, time stopper, timer apps, time watcher, timer application, date time, online digital timer clock, visual timer for classroom, 2 hours, 6 min, official time, digital stopwatch, interval timer, time counter, clock alarm, google clock, time count, time with seconds live, 8 min, google time, stop clock, digital time clock, countdown calendar, stopwatch clock, clock live, day countdown, countdown app iphone, timer upwards, stopwatch and clock, stopper clock, 10 seconds, play timer, timer clock digital, correct time, time live, digital timer clock, digital countdown clock, big clock, digital countdown timer, multi timer, real time clock with seconds, race timer, elapsed timer, clock time app, alarm google, digital clock with countdown timer, digital clock and timer, set alarm for 1 hour, 4 hours, world clock live, set alarm for, classroom timer online, timer clock online, free countdown timer, countdown timer online, countdown widget, world clock digital, 12 hour timer, countdown to date, clock with second hand, stopwatch timer online, interactive clock, live clock with seconds and date, live time clock, stop clock timer online, timer and stopwatch online, stop watch online timer, countdown clock free, online time stopwatch, start timer, count up, counter up, countdown timer to date, countdown clock widget, online class timer, timer com, timer stop watch online, count up timer, big timer, running timer, word clock, simple timer, google clock app, my alarm clock, 5 minute countdown, time set, track timer online, set my alarm, live countdown, clock with milliseconds, my clock alarm, clock app google, google stopper, small timer, big digital clock, large digital clock, countdown clock online, cool clock, set clock, time taker, phone timer, real clock, start stop watch, start stopwatch, start stop clock, time check, number timer, right time, watch counting, us clock, make timer, countdown clock for new years, stopwatch app, large clock, global clock, round clock, clock watch, show me a clock, hand clock, tell the time clock, timer online free, stop clock app, cool timers, time widget, game clock, stopwatch application, open timer, counter seconds, free online time, accurate time, time online free, non digital clock, the time right now, alarm online, countdown app free, 5 sec, timer alarm clock, clock with minutes, set alarm clock on my phone, visual timer online, create a countdown, stop watch timer online, 5 minute countdown timer, automatic clock, countdown website, countdown maker, timer clock with alarm, clock with alarm and timer, live timer countdown, countdown page, real life timer, countclock, alarm timer, free alarm clock, timer display, visual countdown timer, accurate clock, alarm clock online free, time display, atomic time clock, countdown timer for website, open clock app, customizable clock, onscreen timer, timer video, countdown clock for website, set an alarm for 2 hours, set alarm for 2 hours, hour clock, clock right now, real world clock, timer stop watch, full screen countdown timer, classroom clock, silent timer, digital clock display, internet time, stopwatch timer clock, learning clock, show clock, digital timer online, time website, timer with sound, stopwatch for study, fun clock, set a stopwatch, internet timer, stopwatch timer google, n timer, timer stopwatch google, time clock electronic, digital time clock online, time starter, time start, timer starter, timer web, digital timer website, reverse timer, classroom timers free, digital timer for classroom, interactive alarm clock, running clock, minute countdown, timer go, countdown on iphone, clock site, lap time, clock set alarm, clock time now, system time clock, dates now, set stop watch, time timer watch, talking clock, timer tool, clock with date and time, start watch, clock and timer, teacher timer, visual time timer, time timer visual timer, online timer tools, create a countdown clock, find timer, international time, time time clock, time tools, make a countdown, date time clock, set an alarm for an hour, date countdown app, countdown generator, clock now, time clock time, watch with timer, time timer app, online time clock free, holiday countdown, study clock, internet clock, countdown video, timer website, online countdown, atomic clock online, accurate time clock, timer clock online free, stopwatch online free, online timer in seconds, give me a timer, online timer website, stopwatch windows, clock on home screen, timer webpage, clock with minutes and seconds, official time clock, teacher clock, english timer, precise time, set my alarm clock, show me the time, real time now, online stop watch com, www stopwatch com online, large timer, countdown clock app, loud timer, display clock, visual clock, free stopwatch, online stopwatch countdown, online stopwatch timer countdown, moving clock, online stopwatch countdown clock, screen clock, watch stopper, free stop clock, learn the time clock, online watch, free countdown widget, interval timer online, timer generator, countdown timer on iphone, time and seconds right now, real life clock, time in real time, time right now clock, clock with screen, widget countdown free, online time keeper, desktop timer, timer download, stopwatch download, spot watch, visual timer clock, date and time display, free alarm, free clock, custom timers, set up alarm, open stopwatch, www online stopwatch, black timer, online stopwatch full screen, study with me io, interactive timer, timer clock free, custom countdown, loud alarm clock online, open alarm clock, the real time, open my alarm, a stopwatch, www online stop watch com, free timer app, classroom stopwatch, large stopwatch, chronometer online, timer app windows, egg timer online, countdown stopwatch, digital clock for desktop, big clock online, big stopwatch, clock with date, clock system, shareable countdown timer, stopwatch with seconds, countdown and stopwatch, stopwatch countdown timer, chronometer watch online, stop clock countdown, slow timer, iphone countdown widget free, regular clock, big stop clock, precise clock, interactive clock online, watch with seconds, 10 minute timer video, 5 minute timer video, set me an alarm, time io, the alarm clock, best clock app, large countdown timer, large timer for classroom, electronic timer, large timer clock, presentation timer, digital stop clock, now clock, digital alarm, big clock on screen, time clock counter, study timer app, big clock timer, multiple timer app, alarm website, digital stopwatch clock, stop a timer, stopwatch google timer, hour stopwatch, mini timers, hold timer, date and time stopwatch, big countdown timer, digital clock for classroom, timer for presentations, stream timer, play clock, countdown free, automatic time clocks, class clock, add alarm, learn how to tell time on a clock, time real, clock app for phone, stopwatchwatch, timer clock for study, electronic clock, clock app for windows, online stopper, hand timer, 5 minute countdown video download, stop watch clock, count up clock, time, time in india, today in usa, date date today, ny time, date calculator, time calculator, calendar 2025, time zone map, map of time zones, calendar 2026, date, calendar of 2026, time zone, time zone times, pacific time, us time zones map, time change, american time zones map, time clock, date today, time with seconds, time zone converter, a time clock, aus time, clock in time clock, time and clock, time clock time clock, time to clock, time clock calculator, date and hour, time with date, time and date time and date, time and date calculator, current time, time date calculator, current time now, time in new york, time now in the uk, time in china, time duration calculator, meanddate, timesanddates, time in australia right now, time france, countdown timer, day counter, countdown time, date and date, time with countdown, time in la, time italy, new zealand time, days calculator, time zones usa, timeanddate world clock, world clock date time, time and world clock, may's calendar, california time now, calendar of the day, time zone singapore, zulu time, new york time now, calendar calculator, new year countdown, time and date calendar, live time, datetime calendar, pt time, aus time now, pakistan time, my timer, the time, time converter, time screen, online time calculator, clocks on time, time portugal, feb cal, world time zone map, today's date and time, dates and times, date aur time, map of time zones world, global time zone map, second minute, working days calculator, iran time, usa time now, america time now, calendar for this month, usa time, canada time, usa timer, times usa, mexico time, today's date in numbers, turkey timing, time in uae, cet now, time malaysia, 24 hour clock, yearly calendar, exact time with seconds, clock calculator, us time now, usa time zone map, current time with seconds, clock live with seconds, time right now with seconds, time now with seconds, time countdown app, england time, greece time, 24 hour time, timeday, world time zones, time rn, clocker app, online world clock, norway time, time europe, time in qatar, egypt time, time utc, canada time now, local time, usa time zone, date spain, standard time, clock change, number of days between two dates, time zones canada, set a time, timer 24 hours, day and date today, world clock website, calendar with day counter, time philippines, time japan, 24 hrs timer, online calendar, daily date, calendar and date, day and date, daily timer, calendar & date, time app, clock with seconds online, time nyc, time new york, current date, google what is the date today, actual time, hour timer, date days, time germany, all months, the date, timeanddate com, time and temp, united states time zones, days of the month, time in oman, central time zone map, countdown calendar, web clock, day countdown, the time uk, date time stamp, clock on screen, timeanddate converter, year calculator, countdown clock days, timezone bermuda, counter calendar, clock timer digital, american time zones, clock stopwatch, timer clock digital, whatdate, meeting planner, hour counter, time zone meeting planner, us calendar, august 2024 calendar, usa calendar, october 2024 calendar, meeting time zone planner, november 2024 calendar, date today calendar, now date and time, present date and time, time singapore, live time with seconds, google clock countdown, calendar for today's date, north american time zones, calendar with today's date, time map, meeting time planner time zones, time et, calendar united states, digital timer with clock, time korea, july 2024 calendar, time zone chart, exact clock, american date, time date change, time and date change, time zone clock usa, digital world time clock, date and time changer, usa time zone clocks, time 10, 7 time, calendar days, time change usa, countdown timer free, Mar-25, april calendar 2025, and time, time a, timeans, times and, time zone clock, world time watch, world map clock, world clock converter, may 2024 calendar, world clock meeting planner, server time, worldwide clock, actual time clock, exact time and seconds, new york clock, today's date and year, 24 hour clock time now, time south africa, computer time, time ireland, set the timer, time netherlands, time thailand, true time, clock with hand, clock online, calendar date, meeting time planner, time and date meeting planner, usa clock, world meeting planner, global meeting planner, day and time, show me this month's calendar, us clock, calendar september, time zone map canada, timer alarm, date to date, time around the world, time and day, date of date, global time zones, world time now, date and time planner, date zones, time ca, meeting date and time planner, data calculator, timer and alarm, timeanddate com world clock, show me a clock, time scheduler, exact time clock, russia date, date usa, march 2024 calendar, watch clock, america time, date international, day date time, date in japan, utc clock, time day and date, day and date time, day time and date, time date and day, time down, the time and seconds, exact time right now, timeanddate countdown, exact time now, timer nz, time sweden, dst time, add days, 26 calendar, utc time clock, time zone denmark, 12 hour timers, today number, japan date, schedule calculator, clock timer countdown, live clock countdown, world time map, clock counter, black friday countdown, current time and date, time my location, live time countdown, date tomorrow, show me a calendar for november, countdown clock with seconds, timer from now, countdown with seconds, live time now, hours minutes seconds, year to date calculator, dr time, us time change, start a timer, web time, international meeting planner, june 2022 calendar, current calendar, show me the calendar, 2024 calendar year, day tracker, days of the week calendar, korea date, go to a date, date second, full screen clock, show me a calendar for october, clock current time, now time clock, date tracker, show a calendar, free timer clock, time hours, month and date, time zone jordan, date korea, 2026 june calendar, show me calendar for may, vatican time, july 25th calendar, show me the october calendar, show me the may calendar, international clock, internet time, date now, july 2022 calendar, march 2022 calendar, digital time, international time zones, digital time clock online, date time today, date time now, running clock, clock time now, timer clock google, system time clock, date today english, real world timer, clock site, time zones around the world, google clock time, time and weather, show me april's calendar, show me the calendar for april, japan's date, clock japan, minute countdown, timer web, years between two dates, clock digital display, time start, google timer clock, nowdate, calendar clock, time online, world time zones clock, calendar website, april 2022 calendar, international time zone clocks, date in australia, february 2022 calendar, international time, set time and date, time calendar, time georgia, digital clock live, clock with hours minutes and seconds, date & time clock, timeanddate singapore, current clock, set time date, time and date online timer, correct time now, vatican city time, new zealand summer time, alarm, alarm clock, alarm for clock, alarm cl0ck, warm clock, digital alarm clock, v clock, clock alarm digital, digital clock and alarm, timer for clock, set and alarm, set on alarm, set set alarm, set alarm set alarm, set an alarm alarm, alarm clock web, online alarm watch, alarm clock website, online alarm c, online alarm clock online, alarm clock site, alarm clock app, alarm clock application, app for an alarm clock, internet alarm clock, morning timer, alarm clock sound, alarm clock with loud alarm, alarm to set, vclock timer, alarm clocks that are loud, clock alarme, digital clock timer, wake up alarm, google alarm, alarm on my phone, digital clock with timer, alarm set for, set the alarm for, digital clock and timer, alarm clock in my phone, set alarm 1 hour, google alarm clock, timer clock online, clock alarm google, alarm clock on google, app for alarm, set the timer, clocks online, time with alarm, timer and alarm, cute alarm clock, free alarm clock apps, alarm 1 hour, alarm 10 minutes, set alarm clock on my phone, timer clock with alarm, go to set alarm, set my alarm clock on my phone, personalized alarm, simple alarm clock, phone alarm clock, alarm on phone, wake up timer, timer to wake up, very loud alarm, free alarm clock website, free internet alarm clock, vclock alarm clock, alarm clock basic, really loud alarm, vibrate alarm, wake up alarm clock, very loud alarm clock, alarm clock for me, interactive alarm clock, set alarm on phone, alarm clock android, alarm clock set alarm clock, set set alarm clock, set alarm for clock, clock set alarm, 6am alarm, 6 am alarm, very very loud alarm clock, gentle alarm clock, bedside alarm clocks, bedside clock digital, silent alarm clocks, vclock alarm, alarm to go off, customizable alarm, alarm 5 am, alarm at 5am, show me my alarm, alarm watch, super loud alarm clock, alarm clock with multiple alarms, multiple alarm clock, virtual clock, alarm stop, pm timer, set alarm for 7am, set my clock alarm, set up my alarm clock, alarm clock downloads, set an alarm for an hour and a half, my alarm clock settings, 2 hour alarm, alarm 5 hours, aesthetic alarm clock, music alarm clock, loud timer, watch alarm clock, super loud alarm, alarm with music, online time alarm, online alarm timer, 7 am alarm, alarm 7 am, clock watch alarm, alarm for, 5 30 alarm, alarm at 7 am, online time with alarm, alarm for 6 am, show alarms, alarm clock loud sound, open alarm clock, alarm computer, alarm set on computer, set an alarm on the computer, alarm clock 6am, alarm clock 6 am, 6 am alarm clock, set alarm 6 am, set alarm for noon, set an alarm for noon, open the alarm clock, alarms to wake up to, open my alarms, alarm clock big, wake me up at 5, sleep alarm, online alarm clock vclock, alarm clock for pc, go to alarms, put alarm, computer alarm clock, set me alarm, put on alarm, set alarm for me, alarm 8 am, set alarm for tomorrow, set the alarm for tomorrow, set an alarm for me, the clock alarm, set an alarm for tomorrow, set alarm for 7, set alarm on google, google set alarm, google set an alarm, google set the alarm, reminder alarms, an alarm, alarm for 8 am, alarm at 8 am, wake up clock, digital alarm, alarm website, add alarm, alarm web, alarm site, alarm clock set with phone, google alarm timer, alarm timer google, google timer alarm, alarm 4am, alarm clock set by phone, set alarm clock on phone, set phone alarm clock, set alarm clock on this phone, alarm for 4am, quiet alarm clock, wifi alarm clock, custom alarm clock, clock alarm set, morning alarm clock, free alarm app, alarm hours, set alarm at, 9 am alarm, hour alarm, show me the alarm, a alarm, alarm 6 30 am, v clock com, vclock com, nice alarm clock, free alarm clock download, gentle alarm, an alarm clock, alarm clock aesthetic, make a alarm, make an alarm, digital alarm watch, 5 pm alarm, set multiple alarms, alarm timer with sound, alarm for 6, 5 am alarm clock, alarm clock 7am, 7am alarm clock, set alarm 8am, time alarm sound, alarm for 6 30 am, show my alarm, open my alarm clock, alarm 11, 4 hour timer with loud alarm, alarm 5 pm, google alarm clock online, digital alarm clock online, alarm on laptop, loud timer alarm, 10 am alarm, alarm 2 pm, set my alarm for, time setting clock, set alarm for 6, alarm to wake you up, alarm for 10am, alarm for 7 30 am, cuckoo clock alarm, cuckoo clock alarm clock, set the time clock, online cuckoo clock, set my alarm for 7am, set an alarm for 730 am, alarm on, alarm at, alarm cute, cute alarm, on alarm, online a, time set up, alarm set online, reminder clock, easy alarm clock, alarm clock with custom sound, quiet alarm, basic alarm, alarms and clock, alarm clock for heavy sleepers online, v alarm, stopwatch with alarm, set wake up alarm, countdown timer with alarm, online set alarm, free online alarm, set alarm clock online, set an alarm time, set alarm time, time set alarm, set alarm wake up, alarm set timer, 8 am alarm, world alarm clock, alarm clock countdown, clock in reminder, alarm clock w, alarm clock 1 hour, a loud alarm, turn my alarm on, set an alarm for 5, set an alarm for 10am, alarm clock easy, set alarm for 11am, set alarm for 5am in the morning, aesthetic alarm, go to my alarm clock, setting an alarm on my phone, alarm 6 pm, vclock com timer, easy to use alarm clock, personalized alarm clock, desk alarm clock, best alarm watch, morning clock, find alarm clock, one alarm, find my alarm clock, alarm with sound, vclock online alarm clock, set alarm today, alarm clock virtual, set alarm up, set an alarm for today, set alarm for today, pm alarm, set an alarm to, alarm clock for laptop, work alarm, to set alarm, set alarm to, alarm for 12, chrome alarm clock, alarm with message, to set an alarm, 4pm alarm, timer v clock, to set the alarm, alarm repeat, search alarm clock, vclock countdown, alarm for tomorrow, find me an alarm clock, alarm clock for chromebook, alarm for chromebook, timer for 12 am, alarm clock desk, alarm 3, show me alarm clocks, alarm on chromebook, alarm chromebook, desk clock with alarm, find the alarm, timer for 5am, alarm tomorrow, get alarm clock, 10 00 alarm, set up a alarm, alarm clock with app, alarm clock online with sound, set alarm for 4 am, internet alarm, desktop alarm clock, clock v, loud alarm online, alert time, real alarm clock, 10 pm alarm, alarm for 8, 3am alarm clock, alarm 3am, 3 am alarm clock, alarm for 6 pm, vibration clock, set an alarm for tomorrow morning, alarm for 5 pm, alarm clock for computer desktop, give me a clock, 3am alarm, loud clock, set alarm for tomorrow morning, set alarm for 3am, set an alarm for 3am, set alarm for 12pm, wake me up at 5am, alarm clock to wake you up, check alarms, digital clock cute, 12 00 alarm, alarm 3 am, online clock website, set morning alarm, virtual alarm, alarm clock app for pc, computer alarm clock app, put a alarm, live alarm clock, time alarm clock online, put alarm on, put an alarm on, timer alarm clock online, set alarm on laptop, desktop alarm, fake alarm clock, daily alarms, alarm for 5, online v clock, day alarm, clock app alarm, set alarm for the morning, alarm kuku, online loud timer, alarm clock stopwatch, 8 00 am alarm, set an alarm for the morning, alarm clock with multiple alarm settings, alarm for 8 pm, google alarm set, set alarm for 4pm, a timer clock, big alarm, set alarm google, wake me up at 7, clock with multiple alarm settings, alarm clock com, alarm maker, alarm today, setalarmclock net, very loud alarm clock online, reminder alarm clock, voice alarm clock, automatic alarm clock, alarm clock v, alarm browser, alarm clock seconds, second alarm clock, really loud alarm clock online, alarm clock online with music, alarm seconds, give me the alarm clock, ala4m clock, 1 am alarm, give me alarm clock, time and alarm clock, alarm clock offline, timer and alarm clock, alarm clock 7, aesthetic alarm clock online, open the alarm, give me an alarm clock, clock with sound, kuku clock online, alarm 5, show alarm clock, virtual clock online, 1pm alarm, alarm for 8pm, set alarm clock google, set an alarm for every 30 minutes, onlive clock, set alarm for 4am tomorrow, open up alarm, wake me up at 6, set a timer for 5am, set alarm every 30 minutes, i need to set my alarm, alarm set on my phone, alarm clock with screen, timer for 6am, alarm clock screen, open up my alarm, alarm clock 2 alarms, wake alarm, alarm to, visual alarm clock, alarm clock with date and time, google alarm clock free, browser alarm clock, v alarm clock, online alarm clock with multiple alarms, multi alarm clock online, set alarm clock for, set alarm on" />
        
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
      
      <Backlinks />
    </>
  );
};

export default ZentroTime;





