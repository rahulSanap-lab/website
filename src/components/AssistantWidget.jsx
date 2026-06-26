import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Cpu, SendHorizontal } from 'lucide-react';
import './AssistantWidget.css';

const PRESETS = {
  'healing': {
    question: "How do self-healing builds work?",
    answer: "When a compile or runtime error occurs in your workspace container, the Synapse agent reads the error stack trace. It then uses a dedicated self-healing prompt template to isolate the bug, write a patch, test it in a container sandbox, and apply the correction directly to the file tree once verification succeeds."
  },
  'security': {
    question: "Can agents access my local computer?",
    answer: "No. Synapse executes all code and agent actions within isolated, cloud-hosted sandboxed environments (Docker runtimes). Your local files and machine remain completely untouched and secure from unauthorized access or execution risks."
  },
  'context': {
    question: "What are context layers?",
    answer: "Context layers compile the file dependencies, schemas, and import trees of your repository into a dense semantic map. By providing only relevant architectural relationships rather than dumping whole folders, we save 80% on LLM token costs and keep prompt speeds under 500ms."
  }
};

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Welcome! I am Synapse Core, your neural workspace assistant. How can I help you customize your autonomous developer agents today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let replyText = "I've logged your request in my learning matrix. For this demo console, try clicking one of the quick questions above or running commands in the terminal workspace!";
      
      // Check if user text matches presets
      const lowerText = text.toLowerCase();
      if (lowerText.includes('healing') || lowerText.includes('self-healing') || lowerText.includes('heal')) {
        replyText = PRESETS.healing.answer;
      } else if (lowerText.includes('local') || lowerText.includes('access') || lowerText.includes('secure')) {
        replyText = PRESETS.security.answer;
      } else if (lowerText.includes('context') || lowerText.includes('token') || lowerText.includes('layer')) {
        replyText = PRESETS.context.answer;
      } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        replyText = "Hello! Ready to construct high-velocity agent workspaces. Ask me about self-healing builds, security sandboxes, or context compilers.";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: replyText }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="assistant-container">
      {/* Floating Toggle Button */}
      <button 
        className={`floating-badge-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
        {!isOpen && <span className="notification-ping"></span>}
      </button>

      {/* Floating Chat Panel */}
      <div className={`chat-panel glass-panel ${isOpen ? 'open' : ''}`}>
        
        {/* Panel Header */}
        <div className="panel-header">
          <div className="panel-agent-info">
            <div className="agent-avatar">
              <Cpu size={16} />
            </div>
            <div className="agent-meta">
              <span className="agent-name">Synapse Core AI</span>
              <span className="agent-status">
                <span className="pulse-dot"></span>
                Ready to compile
              </span>
            </div>
          </div>
          <button className="panel-close-btn" onClick={() => setIsOpen(false)}>
            <X size={16} />
          </button>
        </div>

        {/* Panel Messages Area */}
        <div className="panel-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`msg-bubble-wrapper ${msg.sender}`}>
              <div className="msg-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="msg-bubble-wrapper bot">
              <div className="msg-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Preset Suggesters */}
        <div className="preset-suggestions">
          <button onClick={() => handleSendMessage(PRESETS.healing.question)}>
            <Sparkles size={10} />
            Self-Healing?
          </button>
          <button onClick={() => handleSendMessage(PRESETS.security.question)}>
            <Sparkles size={10} />
            Sandboxing?
          </button>
          <button onClick={() => handleSendMessage(PRESETS.context.question)}>
            <Sparkles size={10} />
            Context layers?
          </button>
        </div>

        {/* Panel Input Form */}
        <form className="panel-input-form" onSubmit={handleFormSubmit}>
          <input 
            type="text"
            className="chat-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question..."
            disabled={isTyping}
          />
          <button 
            type="submit" 
            className="chat-send-btn"
            disabled={isTyping || !inputText.trim()}
          >
            <SendHorizontal size={14} />
          </button>
        </form>

      </div>
    </div>
  );
}
