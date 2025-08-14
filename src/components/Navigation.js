import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiHome, FiBriefcase, FiBook, FiCode, FiMail } from 'react-icons/fi';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: <FiHome />, target: 'hero-section' },
    { id: 'experience', label: 'Experience', icon: <FiBriefcase />, target: 'experience-section' },
    { id: 'education', label: 'Education', icon: <FiBook />, target: 'education-section' },
    { id: 'skills', label: 'Skills', icon: <FiCode />, target: 'skills-section' },
    { id: 'contact', label: 'Contact', icon: <FiMail />, target: 'contact-section' }
  ];

  // Handle smooth scrolling to sections
  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.target));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.navigation')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="navigation">
      {/* Hamburger Button */}
      <button 
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Navigation Menu */}
      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <h3>Navigation</h3>
          <button 
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          >
            <FiX />
          </button>
        </div>
        
        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.target)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {activeSection === item.id && <span className="active-indicator"></span>}
            </button>
          ))}
        </nav>

        <div className="nav-footer">
          <div className="scroll-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` 
                }}
              ></div>
            </div>
            <span className="progress-text">Scroll Progress</span>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && <div className="nav-backdrop" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default Navigation;
