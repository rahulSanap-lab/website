import React, { useState, useEffect, useRef } from 'react';
import { Terminal, FileCode, Play, RotateCcw, Monitor, CheckCircle, ShieldAlert, Cpu, ChevronRight, Server, Globe } from 'lucide-react';
import './InteractiveWorkspace.css';

const FILE_CONTENTS = {
  'server.js': `const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// TODO: Fix critical auth routing logic
app.get('/api/secure-data', (req, res) => {
  res.json({ data: "Insecure" });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,

  'main.py': `def start_server():
    print("Initializing server configurations...")
    # SYNTAX ERROR INCOMING
    port = 5000
    print("Listening on port " + port
    
if __name__ == '__main__':
    start_server()`,

  'handler.js': `// Synapse Edge Handler
export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from the Edge!' }),
  };
};`
};

export default function InteractiveWorkspace() {
  const [selectedFile, setSelectedFile] = useState('server.js');
  const [editorContent, setEditorContent] = useState(FILE_CONTENTS['server.js']);
  const [terminalLogs, setTerminalLogs] = useState([
    'Synapse Kernel v2.4.0 active.',
    'System ready. Choose a workspace task above or enter command.'
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWorkflow, setCurrentWorkflow] = useState(null); // 'refactor', 'healing', 'deploy'
  const [previewState, setPreviewState] = useState('idle'); // 'idle', 'running', 'success', 'error'
  
  const terminalEndRef = useRef(null);
  const typingTimerRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  // Cleanup typewriter effect on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  const addLogs = (logs, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, ...logs]);
        resolve();
      }, delay);
    });
  };

  const selectFile = (fileName) => {
    if (isPlaying) return;
    setSelectedFile(fileName);
    setEditorContent(FILE_CONTENTS[fileName]);
  };

  // Workflow 1: Auto-Refactor Auth Router
  const runRefactorWorkflow = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentWorkflow('refactor');
    setSelectedFile('server.js');
    setEditorContent(FILE_CONTENTS['server.js']);
    setPreviewState('running');

    setTerminalLogs([
      '> Starting Task: Auto-Refactor API Authorization Route',
      '🤖 Agent [Ariadne] initialized to task routing context.',
      '🔍 Scanning server.js for vulnerabilities...'
    ]);

    await addLogs(['⚠️ VULNERABILITY FOUND: Route /api/secure-data lacks authentication verification.'], 1200);
    await addLogs(['💡 Proposing resolution: Integrate JWT verification middleware and encrypt response.'], 800);
    await addLogs(['🚀 Modifying server.js in workspace...'], 1000);

    // Typewriter effect in editor to show agent typing code
    const secureCode = `const express = require('express');
const app = express();
const jwt = require('./auth-jwt'); // Synapse Secure Module
const PORT = process.env.PORT || 8080;

// Refactored secure auth routing logic
app.get('/api/secure-data', jwt.verifyToken, (req, res) => {
  res.json({ 
    status: "authorized",
    data: "🔒 Encrypted payload received successfully!" 
  });
});

app.listen(PORT, () => {
  console.log(\`Secure Server running on port \${PORT}\`);
});`;

    let currentLength = 100;
    setEditorContent(secureCode.substring(0, currentLength));

    typingTimerRef.current = setInterval(() => {
      currentLength += 12;
      setEditorContent(secureCode.substring(0, currentLength));
      if (currentLength >= secureCode.length) {
        clearInterval(typingTimerRef.current);
        finishRefactor();
      }
    }, 30);
  };

  const finishRefactor = async () => {
    await addLogs(['💾 File saved: server.js updated.'], 300);
    await addLogs(['🛡️ Running security tests on compilation...'], 500);
    await addLogs([
      '  ✓ Test 1: Route existence (PASSED)',
      '  ✓ Test 2: Anonymous rejection - 401 unauthorized (PASSED)',
      '  ✓ Test 3: JWT decryption & verification (PASSED)'
    ], 1000);
    await addLogs([
      '💯 Core tests passed. Refactoring deployment successful!',
      '🎉 System state updated: Secure.'
    ], 600);
    
    setPreviewState('success');
    setIsPlaying(false);
  };

  // Workflow 2: Self-Healing Build
  const runHealingWorkflow = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentWorkflow('healing');
    setSelectedFile('main.py');
    setEditorContent(FILE_CONTENTS['main.py']);
    setPreviewState('running');

    setTerminalLogs([
      '> Starting Task: Launch Python Web Application',
      '🤖 Agent [Vulcan] assigned to runtime diagnostics.',
      '⚙️ Executing: python main.py'
    ]);

    await addLogs([
      '  File "main.py", line 5',
      '    print("Listening on port " + port',
      '                                     ^',
      'SyntaxError: unexpected EOF while parsing',
      '❌ RUNTIME BUILD FAILED.'
    ], 1200);

    setPreviewState('error');

    await addLogs([
      '🔍 Analyzing traceback logs...',
      '🤖 Agent detected 2 issues in main.py:',
      '  1. Missing closing parenthesis ")" in print call.',
      '  2. Type mismatch: Concatenating string with integer "port" (requires str(port)).'
    ], 1500);

    await addLogs(['🛠️ Executing automated patch: repairing syntax errors...'], 1000);

    const healedCode = `def start_server():
    print("Initializing server configurations...")
    # FIXED BY SYNAPSE AGENT
    port = 5000
    print("Listening on port " + str(port))
    
if __name__ == '__main__':
    start_server()`;

    // Type out the corrected lines
    setEditorContent(healedCode);

    await addLogs([
      '💾 File saved: main.py corrected.',
      '⚙️ Re-executing: python main.py'
    ], 1000);

    await addLogs([
      'Initializing server configurations...',
      'Listening on port 5000',
      '✓ Application listening, heartbeat verified.',
      '💯 Healing sequence completed successfully.'
    ], 1200);

    setPreviewState('success');
    setIsPlaying(false);
  };

  // Workflow 3: Cloud Edge Deployment
  const runDeployWorkflow = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentWorkflow('deploy');
    setSelectedFile('handler.js');
    setEditorContent(FILE_CONTENTS['handler.js']);
    setPreviewState('running');

    setTerminalLogs([
      '> Starting Task: Deploy Serverless Function to Edge',
      '🤖 Agent [Hermes] orchestrating serverless deployment cloud nodes...',
      '📦 Bundling source asset package...'
    ]);

    await addLogs(['✓ Bundling complete: package size 1.2KB (compressed)'], 800);
    await addLogs(['☁️ Uploading artifacts to edge gateway...'], 800);
    await addLogs([
      '🛰️ Provisioning edge routing headers...',
      '🛰️ Configuring security rules on CDN nodes...'
    ], 1200);

    await addLogs([
      '⚡ Hot-loading cloud serverless environments...',
      '⚡ Warm-up execution completed. Speed latency: 4ms'
    ], 1000);

    await addLogs([
      '🚀 DEPLOYMENT COMPLETED SUCCESSFULLY!',
      '🔗 Live URL: https://syn-edge-handler.synapse.sh/api'
    ], 800);

    setPreviewState('success');
    setIsPlaying(false);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (isPlaying || !terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    setTerminalLogs((prev) => [...prev, `$ ${terminalInput}`]);
    setTerminalInput('');

    if (cmd === '/refactor') {
      runRefactorWorkflow();
    } else if (cmd === '/heal' || cmd === '/run-py') {
      runHealingWorkflow();
    } else if (cmd === '/deploy') {
      runDeployWorkflow();
    } else if (cmd === '/clear') {
      setTerminalLogs([]);
    } else if (cmd === '/help') {
      setTerminalLogs((prev) => [
        ...prev,
        'Available terminal actions:',
        '  /refactor    Run the security authorization refactoring sequence',
        '  /heal        Simulate build diagnosis and self-healing python script',
        '  /deploy      Deploy active serverless edge functions to clouds',
        '  /clear       Clear output history logs'
      ]);
    } else {
      setTerminalLogs((prev) => [
        ...prev,
        `Command '${cmd}' not recognized. Type /help to see all executable procedures.`
      ]);
    }
  };

  const resetWorkspace = () => {
    if (isPlaying) return;
    setSelectedFile('server.js');
    setEditorContent(FILE_CONTENTS['server.js']);
    setTerminalLogs([
      'Synapse Kernel v2.4.0 reset complete.',
      'System ready. Choose a workspace task above or enter command.'
    ]);
    setPreviewState('idle');
    setCurrentWorkflow(null);
  };

  return (
    <section id="workspace" className="section workspace-section">
      <div className="container">
        
        <div className="workspace-intro">
          <span className="section-tag">Interactive Environment</span>
          <h2 className="section-title">Test the Neural Workspace</h2>
          <p className="section-subtitle">
            See the collaborative AI agents in action. Select an execution workflow scenario below to watch the autonomous agent write, heal, and deploy code in real-time.
          </p>
        </div>

        {/* Task Trigger Buttons */}
        <div className="workspace-triggers">
          <button 
            className={`trigger-btn ${currentWorkflow === 'refactor' ? 'active' : ''}`}
            onClick={runRefactorWorkflow}
            disabled={isPlaying}
          >
            <Cpu size={16} />
            <span>Refactor API Router</span>
          </button>
          
          <button 
            className={`trigger-btn ${currentWorkflow === 'healing' ? 'active' : ''}`}
            onClick={runHealingWorkflow}
            disabled={isPlaying}
          >
            <ShieldAlert size={16} />
            <span>Self-Healing Build</span>
          </button>

          <button 
            className={`trigger-btn ${currentWorkflow === 'deploy' ? 'active' : ''}`}
            onClick={runDeployWorkflow}
            disabled={isPlaying}
          >
            <Server size={16} />
            <span>Deploy to Edge</span>
          </button>

          <button 
            className="trigger-btn reset-btn"
            onClick={resetWorkspace}
            disabled={isPlaying}
            title="Reset Workspace"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Main IDE Mockup Grid */}
        <div className="ide-container glass-panel">
          
          {/* Header Bar */}
          <div className="ide-header">
            <div className="ide-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="ide-active-tab">
              <FileCode size={14} className="tab-icon" />
              <span>{selectedFile}</span>
            </div>
            <div className="ide-status-badge">
              <span className={`status-indicator ${isPlaying ? 'active' : ''}`}></span>
              <span>{isPlaying ? 'Agent Processing...' : 'Idle'}</span>
            </div>
          </div>

          <div className="ide-workspace-body">
            
            {/* Sidebar File Tree */}
            <div className="ide-sidebar">
              <span className="sidebar-title">WORKSPACE FILES</span>
              <div className="file-list">
                <button 
                  className={`file-item ${selectedFile === 'server.js' ? 'active' : ''}`}
                  onClick={() => selectFile('server.js')}
                  disabled={isPlaying}
                >
                  <FileCode size={14} />
                  <span>server.js</span>
                </button>
                <button 
                  className={`file-item ${selectedFile === 'main.py' ? 'active' : ''}`}
                  onClick={() => selectFile('main.py')}
                  disabled={isPlaying}
                >
                  <FileCode size={14} />
                  <span>main.py</span>
                </button>
                <button 
                  className={`file-item ${selectedFile === 'handler.js' ? 'active' : ''}`}
                  onClick={() => selectFile('handler.js')}
                  disabled={isPlaying}
                >
                  <FileCode size={14} />
                  <span>handler.js</span>
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="ide-editor">
              <textarea 
                className="editor-textarea"
                value={editorContent}
                readOnly
              />
            </div>

            {/* Preview Output Frame */}
            <div className="ide-preview">
              <div className="preview-header">
                <Monitor size={14} />
                <span>LIVE PREVIEW</span>
              </div>
              <div className="preview-content">
                {previewState === 'idle' && (
                  <div className="preview-placeholder">
                    <Globe size={32} className="placeholder-icon animate-float" />
                    <span>Run a task workflow to trigger preview deployment rendering.</span>
                  </div>
                )}
                {previewState === 'running' && (
                  <div className="preview-placeholder">
                    <div className="preview-loader"></div>
                    <span>Agent compiling code & initializing containers...</span>
                  </div>
                )}
                {previewState === 'error' && (
                  <div className="preview-placeholder preview-fail">
                    <ShieldAlert size={40} className="placeholder-icon text-danger animate-pulse" />
                    <span className="text-danger font-bold">Build Error #504</span>
                    <span className="text-sm">Server execution terminated due to SyntaxError. Diagnostic in progress...</span>
                  </div>
                )}
                {previewState === 'success' && currentWorkflow === 'refactor' && (
                  <div className="preview-live-mock">
                    <div className="mock-browser-header">
                      <span className="mock-url">https://localhost:8080/api/secure-data</span>
                    </div>
                    <div className="mock-browser-body text-left">
                      <div className="badge-authorized">
                        <CheckCircle size={14} />
                        <span>Security verification: OK</span>
                      </div>
                      <pre className="mock-json">
{`{
  "status": "authorized",
  "data": "🔒 Encrypted payload received successfully!",
  "agent_diagnostics": {
    "action": "refactor",
    "verifiedBy": "Ariadne Agent"
  }
}`}
                      </pre>
                    </div>
                  </div>
                )}
                {previewState === 'success' && currentWorkflow === 'healing' && (
                  <div className="preview-live-mock">
                    <div className="mock-browser-header">
                      <span className="mock-url">https://localhost:5000/</span>
                    </div>
                    <div className="mock-browser-body text-center">
                      <div className="mock-success-check">
                        <CheckCircle size={32} className="text-success" />
                      </div>
                      <span className="text-success font-bold text-lg">Server Online</span>
                      <p className="text-xs text-muted mt-1">Self-healing sequence completed. Parentheses restored and variable type-cast verification passed.</p>
                    </div>
                  </div>
                )}
                {previewState === 'success' && currentWorkflow === 'deploy' && (
                  <div className="preview-live-mock">
                    <div className="mock-browser-header">
                      <span className="mock-url">https://syn-edge-handler.synapse.sh/api</span>
                    </div>
                    <div className="mock-browser-body text-center">
                      <Globe size={32} className="text-primary animate-float mb-2" />
                      <span className="font-bold text-primary">Edge Handler Running</span>
                      <p className="text-xs text-secondary mt-1">Hello from the Edge!</p>
                      <span className="mock-latency-tag">Latency: 4ms</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Terminal Panel */}
          <div className="ide-terminal">
            <div className="terminal-header">
              <Terminal size={14} />
              <span>TERMINAL OUTPUT // synapse-agent-kernel</span>
            </div>
            <div className="terminal-lines">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="terminal-line">
                  {log}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
            <form className="terminal-form" onSubmit={handleCommandSubmit}>
              <span className="terminal-prompt">$</span>
              <input 
                type="text" 
                className="terminal-input"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type /help for actions, or run commands here..."
                disabled={isPlaying}
              />
              <button 
                type="submit" 
                className="terminal-submit-btn"
                disabled={isPlaying || !terminalInput.trim()}
              >
                <ChevronRight size={14} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
