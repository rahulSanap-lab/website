import React, { useState, useEffect } from 'react';
import { BrainCircuit, Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavLinkClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container container">
        <a href="#" className="navbar-logo" onClick={(e) => handleNavLinkClick(e, 'root')}>
          <BrainCircuit className="logo-icon" />
          <span className="logo-text">Synapse</span>
        </a>

        {/* Desktop Links */}
        <div className="navbar-links">
          <a href="#features" onClick={(e) => handleNavLinkClick(e, 'features')} className="nav-link">Features</a>
          <a href="#workspace" onClick={(e) => handleNavLinkClick(e, 'workspace')} className="nav-link">Workspace</a>
          <a href="#pricing" onClick={(e) => handleNavLinkClick(e, 'pricing')} className="nav-link">Pricing</a>
          <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="nav-link">Contact</a>
        </div>

        <div className="navbar-cta">
          <button 
            className="btn btn-primary btn-nav"
            onClick={(e) => handleNavLinkClick(e, 'workspace')}
          >
            Launch Console
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#features" onClick={(e) => handleNavLinkClick(e, 'features')} className="mobile-nav-link">Features</a>
          <a href="#workspace" onClick={(e) => handleNavLinkClick(e, 'workspace')} className="mobile-nav-link">Workspace</a>
          <a href="#pricing" onClick={(e) => handleNavLinkClick(e, 'pricing')} className="mobile-nav-link">Pricing</a>
          <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="mobile-nav-link">Contact</a>
          <button 
            className="btn btn-primary mobile-btn-nav"
            onClick={(e) => handleNavLinkClick(e, 'workspace')}
          >
            Launch Console
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
