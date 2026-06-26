import React, { useState } from 'react';
import { BrainCircuit, Send } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        {/* Top Info section */}
        <div className="footer-top">
          
          {/* Logo & Pitch */}
          <div className="footer-brand">
            <div className="footer-logo">
              <BrainCircuit className="logo-icon" />
              <span className="logo-text">Synapse</span>
            </div>
            <p className="brand-pitch">
              Constructing the next generation of cognitive development systems for engineers who design the future.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter link">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="social-link" aria-label="GitHub link">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn link">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="footer-links-col">
            <h4 className="links-col-title">Engine Core</h4>
            <a href="#features" className="footer-link">Multi-Agent Sys</a>
            <a href="#features" className="footer-link">Self-Healing</a>
            <a href="#features" className="footer-link">Dense Context</a>
            <a href="#features" className="footer-link">Edge CDN Functions</a>
          </div>

          {/* Links Column 2 */}
          <div className="footer-links-col">
            <h4 className="links-col-title">Platform</h4>
            <a href="#workspace" className="footer-link">Agent Workspace</a>
            <a href="#pricing" className="footer-link">Compute Pricing</a>
            <a href="#contact" className="footer-link">Enterprise Sales</a>
            <a href="#" className="footer-link">Documentation</a>
          </div>

          {/* Newsletter signup */}
          <div className="footer-newsletter">
            <h4 className="links-col-title">Subscribe to Intelligence</h4>
            <p className="newsletter-pitch">Get weekly updates on neural runtime benchmarks and agent optimization guides.</p>
            {subscribed ? (
              <div className="newsletter-success">
                <span>✓ Transmission Channel Active</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  className="newsletter-input"
                  placeholder="communication@address.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe to newsletter">
                  <Send size={12} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom divider & Legal copyright */}
        <div className="footer-bottom">
          <span className="copyright">© {new Date().getFullYear()} Synapse Systems Inc. All telemetry encrypted.</span>
          <div className="legal-links">
            <a href="#" className="legal-link">Privacy policy</a>
            <a href="#" className="legal-link">Terms of compute</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
