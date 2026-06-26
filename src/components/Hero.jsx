import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Terminal, Shield, Zap, Cpu } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [metrics, setMetrics] = useState({
    activeAgents: 8,
    contextTokens: 124800,
    gpuUtilization: 78,
    buildSuccessRate: 99.8
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeAgents: prev.activeAgents + (Math.random() > 0.75 ? (Math.random() > 0.5 ? 1 : -1) : 0),
        contextTokens: prev.contextTokens + Math.floor((Math.random() - 0.45) * 800),
        gpuUtilization: Math.min(100, Math.max(60, prev.gpuUtilization + Math.floor((Math.random() - 0.5) * 6))),
        buildSuccessRate: Math.min(100, Math.max(99.4, Number((prev.buildSuccessRate + (Math.random() - 0.5) * 0.05).toFixed(2))))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLaunchClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('workspace');
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
    <section className="hero-section">
      <div className="container hero-container grid-cols-2">
        <div className="hero-content">
          <div className="hero-badge animate-float">
            <Sparkles size={14} className="badge-icon" />
            <span>Synapse OS v2.4.0 is now live</span>
          </div>
          
          <h1 className="hero-title">
            The Neural IDE for <br />
            <span className="gradient-text">Autonomous Engineering</span>
          </h1>
          
          <p className="hero-subtitle">
            Synapse is the next-generation AI-native workspace where autonomous developer agents and human engineers co-create in a seamless, high-fidelity environment.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-large" onClick={handleLaunchClick}>
              <Play size={16} fill="currentColor" />
              Launch Console
            </button>
            <a href="#features" className="btn btn-secondary btn-large">
              Explore Engine
            </a>
          </div>

          <div className="hero-features-list">
            <div className="hero-feature-item">
              <Zap size={18} className="feature-icon" />
              <span>100x Faster Iterations</span>
            </div>
            <div className="hero-feature-item">
              <Terminal size={18} className="feature-icon" />
              <span>Self-Healing Builds</span>
            </div>
            <div className="hero-feature-item">
              <Shield size={18} className="feature-icon" />
              <span>Sandboxed Execution</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Monitor Visual */}
        <div className="hero-visual">
          <div className="visual-glow-glow"></div>
          <div className="glass-panel monitor-card">
            <div className="monitor-header">
              <div className="monitor-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="monitor-title">SYSTEM MONITOR // synapse-node-09</span>
              <div className="monitor-status">
                <span className="pulse-dot"></span>
                ONLINE
              </div>
            </div>

            <div className="monitor-body">
              <div className="monitor-grid">
                
                {/* Metric 1 */}
                <div className="metric-box">
                  <div className="metric-meta">
                    <span className="metric-label">ACTIVE NEURAL AGENTS</span>
                    <Cpu size={16} className="metric-icon" />
                  </div>
                  <div className="metric-val">{metrics.activeAgents}</div>
                  <span className="metric-sub text-success">Thread Status: Nominal</span>
                </div>

                {/* Metric 2 */}
                <div className="metric-box">
                  <div className="metric-meta">
                    <span className="metric-label">CONTEXT LAYER TOKEN SIZE</span>
                    <Terminal size={16} className="metric-icon" />
                  </div>
                  <div className="metric-val">{(metrics.contextTokens).toLocaleString()}</div>
                  <span className="metric-sub text-primary">Dynamic scaling enabled</span>
                </div>

                {/* Metric 3 */}
                <div className="metric-box">
                  <div className="metric-meta">
                    <span className="metric-label">GPU COMPUTE LOAD</span>
                    <Zap size={16} className="metric-icon" />
                  </div>
                  <div className="metric-val">{metrics.gpuUtilization}%</div>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${metrics.gpuUtilization}%` }}></div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="metric-box">
                  <div className="metric-meta">
                    <span className="metric-label">BUILD RECOVERY RATE</span>
                    <Shield size={16} className="metric-icon" />
                  </div>
                  <div className="metric-val">{metrics.buildSuccessRate}%</div>
                  <span className="metric-sub text-success">No container failures</span>
                </div>

              </div>

              {/* Console log ticker */}
              <div className="monitor-console">
                <div className="console-line text-muted">&gt; Initializing Synapse agent engine context...</div>
                <div className="console-line text-muted">&gt; Loading local repository parser...</div>
                <div className="console-line text-success">&gt; Index successfully compiled. 4,923 vector nodes mapped.</div>
                <div className="console-line text-primary">&gt; Agent 4 instantiated: refactoring `auth-router.js`</div>
                <div className="console-line blink-line">&gt; Listening for trigger commands...</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
