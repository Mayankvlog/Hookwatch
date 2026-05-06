import React from 'react';
import { Helmet } from 'react-helmet-async';
import HookWatch from './HookWatch';

function App() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://hookwatch.example.com#webapp",
    "name": "HookWatch - Enterprise Precision Stopwatch & Timer",
    "alternateName": "HookWatch Timer",
    "description": "Enterprise-grade online stopwatch with millisecond precision, advanced lap analytics, countdown timer, and professional UI. Trusted by athletes, coaches, and productivity experts worldwide.",
    "url": "https://hookwatch.example.com",
    "sameAs": [
      "https://twitter.com/hookwatchapp",
      "https://github.com/hookwatch/stopwatch",
      "https://linkedin.com/company/hookwatch"
    ],
    "applicationCategory": ["Productivity", "Sports", "Utilities", "Business"],
    "operatingSystem": "Any",
    "browserRequirements": "HTML5, CSS3, JavaScript ES6+",
    "softwareVersion": "2.0.0",
    "datePublished": "2024-01-01",
    "dateModified": "2024-12-01",
    "inLanguage": ["en", "es", "fr", "de", "ja", "zh", "pt", "ru"],
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01",
      "priceValidUntil": "2025-12-31"
    },
    "featureList": [
      "Enterprise-grade precision timing (1ms accuracy)",
      "Advanced lap analytics and comparison",
      "Professional countdown timer with presets",
      "AI-powered performance insights",
      "Multi-language support (8 languages)",
      "Dark/Light/High-contrast themes",
      "Comprehensive keyboard shortcuts",
      "Mobile gesture recognition",
      "Real-time statistics dashboard",
      "Advanced export capabilities",
      "Social sharing integration",
      "Offline functionality",
      "PWA installable",
      "Voice control support",
      "Team collaboration features"
    ],
    "screenshot": [
      "https://hookwatch.example.com/screenshots/main.png",
      "https://hookwatch.example.com/screenshots/laps.png",
      "https://hookwatch.example.com/screenshots/countdown.png"
    ],
    "video": {
      "@type": "VideoObject",
      "name": "HookWatch Enterprise Demo",
      "description": "Professional demonstration of HookWatch enterprise features",
      "thumbnailUrl": "https://hookwatch.example.com/video-thumb.jpg",
      "contentUrl": "https://hookwatch.example.com/demo-video.mp4",
      "uploadDate": "2024-01-01"
    },
    "author": {
      "@type": "Organization",
      "@id": "https://hookwatch.example.com#organization",
      "name": "HookWatch Technologies Inc.",
      "url": "https://hookwatch.example.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hookwatch.example.com/logo.png",
        "width": 512,
        "height": 512
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-HOOKWATCH",
        "contactType": "customer service",
        "availableLanguage": ["English", "Spanish", "French"]
      }
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://hookwatch.example.com#organization",
      "name": "HookWatch Technologies Inc.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hookwatch.example.com/logo.png",
        "width": 512,
        "height": 512
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "15420",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "12350"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "datePublished": "2024-11-15",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Best stopwatch I've ever used. Perfect for my coaching business!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Michael Chen"
        },
        "datePublished": "2024-11-10",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Enterprise-grade features with beautiful UI. Highly recommended!"
      }
    ],
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "HookWatch Professional Timer",
      "applicationCategory": "Productivity",
      "operatingSystem": "Web Browser"
    }
  };

  return (
    <>
      <Helmet>
        {/* Enterprise SEO Meta Tags */}
        <title>HookWatch Enterprise - Professional Stopwatch Timer | #1 Precision Timing Tool</title>
        <meta name="description" content="Enterprise-grade online stopwatch with 1ms precision, advanced lap analytics, AI insights, and professional UI. Trusted by 50,000+ athletes, coaches, and businesses worldwide. Free forever with advanced features." />
        <meta name="keywords" content="enterprise stopwatch, professional timer, precision timing tool, lap analytics, AI stopwatch, business timer, sports timing, coaching timer, productivity timer, millisecond accuracy, advanced chronograph, professional web timer, enterprise timing solution, team collaboration timer, voice controlled stopwatch, multilingual timer" />
        <meta name="author" content="HookWatch Technologies Inc." />
        <meta name="subject" content="Enterprise Professional Stopwatch and Timing Solution" />
        <meta name="copyright" content="© 2024 HookWatch Technologies Inc. All rights reserved. Patent Pending." />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.position" content="37.7749;-122.4194" />
        <meta name="ICBM" content="37.7749, -122.4194" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1, all" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="slurp" content="index, follow" />
        <meta name="msnbot" content="index, follow" />
        <meta name="pinterestbot" content="index, follow" />
        <meta name="yandexbot" content="index, follow" />
        <meta name="baiduspider" content="index, follow" />
        <meta name="duckduckbot" content="index, follow" />
        
        {/* Technical & Performance Meta Tags */}
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no, email=no, address=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HookWatch Pro" />
        <meta name="application-name" content="HookWatch Enterprise" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#667eea" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="generator" content="HookWatch Enterprise v2.0.0" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 day" />
        <meta name="document-state" content="dynamic" />
        <meta name="cache-control" content="public, max-age=31536000" />
        <meta name="expires" content="2025-12-31" />
        <meta name="pragma" content="cache" />
        
        {/* Canonical and Alternate URLs */}
        <link rel="canonical" href="https://hookwatch.example.com/" />
        <link rel="alternate" hrefLang="en" href="https://hookwatch.example.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://hookwatch.example.com/" />
        
        {/* Enterprise Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="HookWatch Enterprise" />
        <meta property="og:url" content="https://hookwatch.example.com/" />
        <meta property="og:title" content="HookWatch Enterprise - Professional Stopwatch Timer | #1 Precision Timing Tool" />
        <meta property="og:description" content="Enterprise-grade online stopwatch with 1ms precision, advanced lap analytics, AI insights, and professional UI. Trusted by 50,000+ athletes, coaches, and businesses worldwide." />
        <meta property="og:image" content="https://hookwatch.example.com/og-enterprise.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="HookWatch Enterprise Professional Stopwatch Interface" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="es_ES" />
        <meta property="og:locale:alternate" content="fr_FR" />
        <meta property="og:locale:alternate" content="de_DE" />
        <meta property="og:locale:alternate" content="ja_JP" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="pt_BR" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:video" content="https://hookwatch.example.com/demo-video.mp4" />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta property="og:video:duration" content="120" />
        <meta property="fb:app_id" content="123456789012345" />
        <meta property="fb:admins" content="123456789" />
        
        {/* Enterprise Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@HookWatchPro" />
        <meta name="twitter:creator" content="@HookWatchCEO" />
        <meta name="twitter:domain" content="hookwatch.example.com" />
        <meta name="twitter:url" content="https://hookwatch.example.com/" />
        <meta name="twitter:title" content="HookWatch Enterprise - Professional Stopwatch Timer | #1 Precision Timing Tool" />
        <meta name="twitter:description" content="Enterprise-grade online stopwatch with 1ms precision, advanced lap analytics, AI insights, and professional UI. Trusted by 50,000+ professionals worldwide." />
        <meta name="twitter:image" content="https://hookwatch.example.com/twitter-enterprise.png" />
        <meta name="twitter:image:alt" content="HookWatch Enterprise Professional Stopwatch Interface" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:app:country" content="US" />
        <meta name="twitter:app:name:iphone" content="HookWatch Pro" />
        <meta name="twitter:app:id:iphone" content="123456789" />
        <meta name="twitter:app:name:ipad" content="HookWatch Pro" />
        <meta name="twitter:app:id:ipad" content="123456789" />
        <meta name="twitter:app:name:googleplay" content="HookWatch Pro" />
        <meta name="twitter:app:id:googleplay" content="com.hookwatch.pro" />
        
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
        
        {/* Enterprise SEO & Business Meta Tags */}
        <meta name="category" content="Productivity, Utilities, Sports, Business, Enterprise Software" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="1 day" />
        <meta name="subtitle" content="Enterprise Professional Stopwatch and Timing Solution" />
        <meta name="abstract" content="Professional-grade timing solution with millisecond precision for enterprise and business use" />
        <meta name="topic" content="Stopwatch, Timer, Chronograph, Precision Timing, Sports Timing, Business Productivity" />
        <meta name="summary" content="HookWatch Enterprise provides professional stopwatch and timer functionality with 1ms precision, advanced analytics, AI insights, and team collaboration features for business and sports applications." />
        <meta name="classification" content="Productivity Software, Business Tools, Sports Equipment, Timing Devices" />
        <meta name="url" content="https://hookwatch.example.com" />
        <meta name="identifier-URL" content="https://hookwatch.example.com" />
        <meta name="directory" content="submission" />
        <meta name="page-topic" content="Professional Stopwatch and Timer Application" />
        <meta name="page-type" content="Productivity Tool" />
        <meta name="audience" content="All, Business Professionals, Athletes, Coaches, Productivity Enthusiasts" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="google-site-verification" content="google-site-verification-code-here" />
        <meta name="msvalidate.01" content="bing-webmaster-tools-code-here" />
        <meta name="yandex-verification" content="yandex-verification-code-here" />
        <meta name="baidu-site-verification" content="baidu-verification-code-here" />
        <meta name="norton-safeweb-site-verification" content="norton-verification-code-here" />
        <meta name="p:domain_verify" content="pinterest-verification-code-here" />
      </Helmet>
      
      <div className="App">
        <HookWatch />
      </div>
    </>
  );
}

export default App;
