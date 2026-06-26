import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureShowcase from './components/FeatureShowcase';
import InteractiveWorkspace from './components/InteractiveWorkspace';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AssistantWidget from './components/AssistantWidget';

function App() {
  return (
    <>
      {/* Background Glowing Ambient Orbs */}
      <div className="bg-glow-container">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
        <div className="bg-glow-3"></div>
      </div>

      {/* Main Page Layout */}
      <Navbar />
      <Hero />
      <FeatureShowcase />
      <InteractiveWorkspace />
      <Pricing />
      <ContactForm />
      <Footer />

      {/* Floating AI Agent Chat Assistant */}
      <AssistantWidget />
    </>
  );
}

export default App;
