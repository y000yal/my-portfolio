import React from 'react';
import { FiPhone, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <div className="hero-section" id="hero-section">
      <div className="hero-content">
        <h1>Yoyal Limbu</h1>
        <h2>Senior PHP Developer</h2>
        <p>
          Experienced PHP/Laravel developer with expertise in WordPress development, 
          API design, and modern web technologies. Passionate about creating scalable 
          solutions and delivering high-quality code.
        </p>
        <div className="social-links">
          <a href="tel:+9779818454474">
            <FiPhone /> Phone
          </a>
          <a href="mailto:yoyal.limbu@gmail.com">
            <FiMail /> Email
          </a>
          <a href="https://github.com/y000yal" target="_blank" rel="noopener noreferrer">
            <FiGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/yoyal-limbu/" target="_blank" rel="noopener noreferrer">
            <FiLinkedin /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
