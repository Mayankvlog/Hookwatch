import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Papa from 'papaparse';
import '../styles/Backlinks.css';

const Backlinks = () => {
  const [backlinks, setBacklinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadBacklinks = async () => {
      try {
        const response = await fetch('/backlinks.csv');
        const text = await response.text();
        
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              // Extract backlink URLs, handling different column names
              const links = results.data
                .map(row => row.Backlink || row.backlink || row.URL || row.url || Object.values(row)[0])
                .filter(link => link && link.trim() && link.startsWith('http'))
                .slice(0, 100); // Limit to first 100
              
              setBacklinks(links);
            }
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error loading backlinks:', error);
        setLoading(false);
      }
    };

    loadBacklinks();
  }, []);

  const displayedLinks = showAll ? backlinks : backlinks.slice(0, 10);

  if (loading) {
    return null;
  }

  if (backlinks.length === 0) {
    return null;
  }

  return (
    <>
      <Helmet>
        {/* Add backlinks to head for SEO */}
        {backlinks.map((link, index) => (
          <link key={`backlink-${index}`} rel="backlink" href={link} />
        ))}
      </Helmet>

      <div className="backlinks-container">
        <div className="backlinks-section">
          <h3 className="backlinks-title">Referenced By</h3>
          <div className="backlinks-grid">
            {displayedLinks.map((link, index) => (
              <a
                key={`${link}-${index}`}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="backlink-item"
                title={link}
              >
                <span className="backlink-icon">🔗</span>
                <span className="backlink-text">{extractDomain(link)}</span>
              </a>
            ))}
          </div>
          {backlinks.length > 10 && (
            <button
              className="backlinks-toggle"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll 
                ? `Show Less (${backlinks.length} total)` 
                : `Show All ${backlinks.length} References`}
            </button>
          )}
          <p className="backlinks-count">
            {backlinks.length} domain{backlinks.length !== 1 ? 's' : ''} referencing this site
          </p>
        </div>
      </div>
    </>
  );
};

// Helper function to extract domain from URL
const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    // Remove 'www.' if present
    return hostname.replace('www.', '');
  } catch {
    return url;
  }
};

export default Backlinks;
