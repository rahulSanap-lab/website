import React, { useState } from 'react';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';
import './Pricing.css';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Developer",
      tagline: "For individual software engineers experimenting with autonomous agents.",
      priceMonthly: 19,
      priceYearly: 15,
      features: [
        "2 concurrent active agents",
        "100,000 token context layer limit",
        "Community Discord support",
        "Standard sandboxed runtime access",
        "Basic VCS git integration"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Team",
      tagline: "For scaling engineering squads coordinating agent pipelines.",
      priceMonthly: 79,
      priceYearly: 59,
      features: [
        "12 concurrent active agents",
        "Unlimited context layer indexing",
        "Prioritized GPU cluster queue",
        "Dedicated container environments",
        "Advanced CI/CD self-healing webhooks",
        "Priority email/chat support"
      ],
      cta: "Launch Squad Console",
      popular: true
    },
    {
      name: "Enterprise",
      tagline: "For organization-wide autonomous development clusters.",
      priceMonthly: "Custom",
      priceYearly: "Custom",
      features: [
        "Unlimited orchestrator agents",
        "Self-hosted VPC secure sandboxes",
        "On-prem LLM model fine-tuning",
        "SSO, SAML & role-based controls",
        "Custom service level agreements (SLA)",
        "24/7 dedicated solutions engineer"
      ],
      cta: "Schedule Architecture Call",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="section pricing-section">
      <div className="container">
        
        <div className="pricing-intro">
          <span className="section-tag">Flexible Pricing</span>
          <h2 className="section-title">Transparent, Value-Driven Plans</h2>
          <p className="section-subtitle">
            Deploy cognitive compute resources tailored to your workload. Scalable node infrastructure for solo hackers and global engineering hubs alike.
          </p>

          {/* Toggle Switch */}
          <div className="billing-toggle-container">
            <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>Monthly Billing</span>
            <button 
              className={`toggle-switch ${isYearly ? 'yearly' : ''}`}
              onClick={() => setIsYearly(!isYearly)}
              aria-label="Toggle annual billing discount"
            >
              <span className="toggle-handle"></span>
            </button>
            <span className={`toggle-label ${isYearly ? 'active' : ''}`}>
              Yearly Billing
              <span className="discount-tag">Save 25%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {plans.map((plan, idx) => {
            const hasNumericPrice = typeof plan.priceMonthly === 'number';
            const displayPrice = hasNumericPrice 
              ? (isYearly ? plan.priceYearly : plan.priceMonthly)
              : plan.priceMonthly;

            return (
              <div 
                key={idx} 
                className={`glass-panel pricing-card ${plan.popular ? 'popular-card' : ''}`}
              >
                {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
                
                <div className="card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-tagline">{plan.tagline}</p>
                </div>

                <div className="card-price-container">
                  {hasNumericPrice ? (
                    <>
                      <span className="currency">$</span>
                      <span className="price-number animate-price">{displayPrice}</span>
                      <span className="billing-period">/ mo</span>
                    </>
                  ) : (
                    <span className="price-number-custom">{displayPrice}</span>
                  )}
                  {hasNumericPrice && isYearly && (
                    <div className="yearly-disclaimer">Billed annually (${displayPrice * 12}/yr)</div>
                  )}
                </div>

                <div className="divider"></div>

                <ul className="plan-features">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="feature-item-li">
                      <Check size={16} className="check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button className={`btn btn-cta ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  {plan.cta}
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
