import React from 'react';

const Logo = () => {
  return (
    <div className="logo-container">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        className="logo-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#0099ff" />
            <stop offset="100%" stopColor="#0066ff" />
          </linearGradient>
        </defs>
        
        {/* Modern abstract H shape - like GitHub's octocat style */}
        <g transform="translate(6, 4)">
          {/* Left vertical bar */}
          <rect 
            x="0" 
            y="0" 
            width="6" 
            height="24" 
            rx="3" 
            fill="url(#logoGradient)"
          />
          
          {/* Right vertical bar */}
          <rect 
            x="14" 
            y="0" 
            width="6" 
            height="24" 
            rx="3" 
            fill="url(#logoGradient)"
          />
          
          {/* Middle horizontal bar */}
          <rect 
            x="0" 
            y="9" 
            width="20" 
            height="6" 
            rx="3" 
            fill="url(#logoGradient)"
          />
          
          {/* Small accent dots for modern look */}
          <circle cx="10" cy="4" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="10" cy="20" r="1.5" fill="#ffffff" opacity="0.8" />
        </g>
      </svg>
      <span className="logo-text">HookWatch</span>
    </div>
  );
};

export default Logo;
