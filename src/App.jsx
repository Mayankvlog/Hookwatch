import React from 'react';
import { Helmet } from 'react-helmet-async';
import HookWatch from './HookWatch';

function App() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HookWatch - Precision Online Stopwatch",
    "description": "A full-featured online stopwatch with lap times, precision timing, countdown timer, and modern UI. Built with React hooks for accurate performance.",
    "url": "https://hookwatch.example.com",
    "applicationCategory": "Utility",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Precision timing (10ms accuracy)",
      "Lap time recording",
      "Countdown timer mode",
      "Dark/Light themes",
      "Keyboard shortcuts",
      "Sound effects",
      "Mobile gestures",
      "Statistics tracking",
      "Export functionality",
      "Share results"
    ],
    "screenshot": "https://hookwatch.example.com/screenshot.png",
    "softwareVersion": "1.0.0",
    "author": {
      "@type": "Organization",
      "name": "HookWatch Team"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>HookWatch - Precision Online Stopwatch & Timer | Free Web App</title>
        <meta name="description" content="Free online stopwatch with lap times, countdown timer, precision timing (10ms accuracy), dark/light themes, keyboard shortcuts, and statistics. Perfect for sports, cooking, productivity and more." />
        <meta name="keywords" content="online stopwatch, free stopwatch, web timer, chronograph, lap timer, countdown timer, precision timing, sports timer, kitchen timer, productivity timer, react stopwatch, lap times, timer app" />
        <meta name="author" content="HookWatch Team" />
        <meta name="subject" content="Online Stopwatch and Timer Application" />
        <meta name="copyright" content="© 2024 HookWatch Team. All rights reserved." />
        <meta name="language" content="English" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Technical Meta Tags */}
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HookWatch" />
        
        {/* Canonical and Alternate URLs */}
        <link rel="canonical" href="https://hookwatch.example.com/" />
        <link rel="alternate" hrefLang="en" href="https://hookwatch.example.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://hookwatch.example.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="HookWatch" />
        <meta property="og:url" content="https://hookwatch.example.com/" />
        <meta property="og:title" content="HookWatch - Precision Online Stopwatch & Timer | Free Web App" />
        <meta property="og:description" content="Free online stopwatch with lap times, countdown timer, precision timing (10ms accuracy), dark/light themes, keyboard shortcuts, and statistics. Perfect for sports, cooking, productivity and more." />
        <meta property="og:image" content="https://hookwatch.example.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="HookWatch Precision Stopwatch Interface" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@HookWatchApp" />
        <meta name="twitter:creator" content="@HookWatchApp" />
        <meta name="twitter:url" content="https://hookwatch.example.com/" />
        <meta name="twitter:title" content="HookWatch - Precision Online Stopwatch & Timer | Free Web App" />
        <meta name="twitter:description" content="Free online stopwatch with lap times, countdown timer, precision timing (10ms accuracy), dark/light themes, keyboard shortcuts, and statistics. Perfect for sports, cooking, productivity and more." />
        <meta name="twitter:image" content="https://hookwatch.example.com/twitter-image.png" />
        <meta name="twitter:image:alt" content="HookWatch Precision Stopwatch Interface" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="HookWatch" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#667eea" />
        
        {/* Favicon and Icons */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        <link rel="icon" type="image/png" sizes="32x32" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" />
        <link rel="icon" type="image/png" sizes="16x16" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" />
        <link rel="apple-touch-icon" sizes="180x180" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        <link rel="apple-touch-icon" sizes="152x152" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        <link rel="apple-touch-icon" sizes="144x144" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        <link rel="apple-touch-icon" sizes="120x120" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        <link rel="apple-touch-icon" sizes="114x114" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        <link rel="apple-touch-icon" sizes="76x76" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        <link rel="apple-touch-icon" sizes="72x72" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        <link rel="apple-touch-icon" sizes="60x60" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        <link rel="apple-touch-icon" sizes="57x57" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏱️</text></svg>" />
        
        {/* Manifest and PWA */}
        <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect for Critical Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Additional Meta for Search Engines */}
        <meta name="category" content="Productivity, Utilities, Sports" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="subtitle" content="Free Online Stopwatch and Timer" />
      </Helmet>
      
      <div className="App">
        <HookWatch />
      </div>
    </>
  );
}

export default App;
