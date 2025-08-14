import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import ThemeToggle from './components/ThemeToggle';
import Navigation from './components/Navigation';

function App() {
  const [isSimulatingAll, setIsSimulatingAll] = useState(false);
  const [theme, setTheme] = useState('dark');

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
      <Navigation />
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
        <EducationSection />
        <SkillsSection />
      </div>
      <ContactSection />
    </div>
  );
}

export default App;
