import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle'); // 'idle', 'loading', 'success'

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please provide a valid email address";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitState('loading');
    
    // Simulate server request delay
    setTimeout(() => {
      setSubmitState('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1800);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-container">
        
        <div className="contact-grid">
          {/* Info Side */}
          <div className="contact-info">
            <span className="section-tag">CONNECT WITH US</span>
            <h2 className="section-title text-left">Initiate Agent Integrations</h2>
            <p className="contact-desc">
              Have questions about integrating Synapse's cognitive compute clusters into your private VPC? Contact our solutions engineering squad to coordinate custom agent structures.
            </p>
            
            <div className="info-cards">
              <div className="info-card">
                <span className="info-card-label">EMAIL COMMUNIQUE</span>
                <span className="info-card-value">telemetry@synapse.sh</span>
              </div>
              <div className="info-card">
                <span className="info-card-label">ORCHESTRATOR HQ</span>
                <span className="info-card-value">San Francisco, California</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-container">
            <div className="glass-panel form-card">
              {submitState === 'success' ? (
                <div className="form-success-state">
                  <div className="success-icon-wrapper">
                    <CheckCircle2 size={48} className="success-check-icon" />
                  </div>
                  <h3 className="success-title">Communique Encrypted & Sent</h3>
                  <p className="success-desc">
                    Your request has been logged in our agent routing table. A Synapse human coordinator will query you back within 12 execution cycles.
                  </p>
                  <button 
                    className="btn btn-secondary mt-4"
                    onClick={() => setSubmitState('idle')}
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="actual-form">
                  <h3 className="form-card-title">Transmission Portal</h3>
                  
                  {/* Name field */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">IDENTITY / NAME</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Architect John Doe"
                      disabled={submitState === 'loading'}
                    />
                    {errors.name && (
                      <div className="error-message">
                        <AlertCircle size={12} />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">COMMUNICATION VECTOR / EMAIL</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@matrix.io"
                      disabled={submitState === 'loading'}
                    />
                    {errors.email && (
                      <div className="error-message">
                        <AlertCircle size={12} />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">TRANSMISSION BODY / SPECIFICATIONS</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows="4"
                      className={`form-input textarea-input ${errors.message ? 'input-error' : ''}`}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Outline your compute node scale or agent workflows..."
                      disabled={submitState === 'loading'}
                    />
                    {errors.message && (
                      <div className="error-message">
                        <AlertCircle size={12} />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-submit"
                    disabled={submitState === 'loading'}
                  >
                    {submitState === 'loading' ? (
                      <>
                        <Loader2 size={16} className="spinner" />
                        <span>Encrypting Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
