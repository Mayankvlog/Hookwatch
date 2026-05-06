import React from 'react';

const Logo = () => {
  return (
    <div className="logo-container">
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        className="logo-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        {/* Clock face */}
        <circle 
          cx="20" 
          cy="20" 
          r="18" 
          fill="none" 
          stroke="url(#logoGradient)" 
          strokeWidth="2"
        />
        {/* Hour markers */}
        <line x1="20" y1="4" x2="20" y2="8" stroke="url(#logoGradient)" strokeWidth="2" />
        <line x1="36" y1="20" x2="32" y2="20" stroke="url(#logoGradient)" strokeWidth="2" />
        <line x1="20" y1="36" x2="20" y2="32" stroke="url(#logoGradient)" strokeWidth="2" />
        <line x1="4" y1="20" x2="8" y2="20" stroke="url(#logoGradient)" strokeWidth="2" />
        {/* Clock hands */}
        <line 
          x1="20" 
          y1="20" 
          x2="20" 
          y2="14" 
          stroke="url(#logoGradient)" 
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line 
          x1="20" 
          y1="20" 
          x2="26" 
          y2="20" 
          stroke="url(#logoGradient)" 
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Center dot */}
        <circle cx="20" cy="20" r="2" fill="url(#logoGradient)" />
      </svg>
      <span className="logo-text">HookWatch</span>
    </div>
  );
};

export default Logo;
