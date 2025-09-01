import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isSimulatingAll, setIsSimulatingAll] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showTop, setShowTop] = useState(false);
  const [nextTarget, setNextTarget] = useState(null);

  // Load theme from localStorage on component mount, default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Set default dark theme if no saved theme exists
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  }, []);

  // Show back-to-top after scrolling a bit
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setShowTop(y > 400);
      const ids = ['experience-section', 'skills-section', 'contact-section'];
      let next = null;
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        const top = el.offsetTop;
        if (top > y + 120) { // next section somewhat below current viewport top
          next = ids[i];
          break;
        }
      }
      setNextTarget(next);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const simulateAllRequests = async () => {
    setIsSimulatingAll(true);
    
    // Simulate a delay for all requests
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Trigger all sections by dispatching custom events
    window.dispatchEvent(new CustomEvent('simulateAllApiRequests'));
    
    setIsSimulatingAll(false);
  };

  return (
    <div className="App">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <HeroSection />
      <div className="container">
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <button 
            className="api-request-button" 
            onClick={simulateAllRequests}
            disabled={isSimulatingAll}
            style={{ fontSize: '1.1rem', padding: '15px 30px' }}
          >
            {isSimulatingAll ? (
              <>
                Fetching All Data
                <span className="loading-indicator"></span>
              </>
            ) : (
              'Fetch All Portfolio Data'
            )}
          </button>
          <p style={{ color: 'var(--text-muted)', marginTop: '15px', fontSize: '0.9rem' }}>
            Click to retrieve all portfolio information simultaneously
          </p>
        </div>
        <ExperienceSection />
        <SkillsSection />
      </div>
      <ContactSection />
      <button
        type="button"
        className={`back-to-top ${showTop ? 'visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
      <button
        type="button"
        className={`scroll-forward ${nextTarget ? 'visible' : ''}`}
        aria-label="Scroll to next section"
        onClick={() => {
          if (nextTarget) {
            const el = document.getElementById(nextTarget);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        title="Next section"
      >
        ↓
      </button>
    </div>
  );
}

export default App;
