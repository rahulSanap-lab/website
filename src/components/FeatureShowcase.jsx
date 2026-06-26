import React from 'react';
import { Cpu, ShieldCheck, GitBranch, Terminal, Layers, Activity } from 'lucide-react';
import './FeatureShowcase.css';

const FEATURES = [
  {
    icon: <Cpu className="feature-card-icon purple" />,
    title: "Multi-Agent Workspaces",
    description: "Orchestrate team operations where developer, tester, review, and deployment agents cooperate in a single, high-fidelity environment."
  },
  {
    icon: <ShieldCheck className="feature-card-icon green" />,
    title: "Self-Healing Builds",
    description: "Built-in static analysis engines diagnose compiler crashes and prompt sandbox agents to write and verify patches instantly."
  },
  {
    icon: <GitBranch className="feature-card-icon blue" />,
    title: "VCS Git Autopilot",
    description: "Automate code branch rebasing, resolve merging conflicts, and draft clean, semantic commits automatically linked to your tickets."
  },
  {
    icon: <Terminal className="feature-card-icon cyan" />,
    title: "Isolated Sandboxes",
    description: "Every file verification process executes in short-lived, isolated Docker runtimes, securing local kernels from unverified execution."
  },
  {
    icon: <Layers className="feature-card-icon orange" />,
    title: "Dense Context Layers",
    description: "Pack entire codebases into active memory. Dynamic context compilers feed structural nodes to LLMs without token bloat."
  },
  {
    icon: <Activity className="feature-card-icon red" />,
    title: "Active Telemetry",
    description: "Monitor cloud functions and servers in real-time, mapping performance bottlenecks directly back to the offending lines of code."
  }
];

export default function FeatureShowcase() {
  return (
    <section id="features" className="section features-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">Core Architecture</span>
          <h2 className="section-title">Engineered for Autonomous Velocity</h2>
          <p className="section-subtitle">
            Synapse bridges the gap between raw LLM capabilities and robust, production-grade software development pipelines.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feat, idx) => (
            <div key={idx} className="glass-panel feature-card">
              <div className="feature-icon-wrapper">
                {feat.icon}
              </div>
              <h3 className="feature-card-title">{feat.title}</h3>
              <p className="feature-card-desc">{feat.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
