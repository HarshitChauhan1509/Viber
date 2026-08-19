import { useState, useEffect } from 'react';
import { Landing } from './components/Landing';
import { Terms } from './components/Terms';
import { Wizard } from './components/Wizard';
import { ToastProvider } from './context/ToastContext';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type ViewState = 'landing' | 'terms' | 'wizard' | 'success';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // Default to dark based on screenshots

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (view === 'success') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#16537e', '#739bdf', '#9ebad2', '#ffffff'] // Match the Ocean theme
      });
    }
  }, [view]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ToastProvider>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          background: 'var(--card-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--text-color)',
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="split-layout">
        {/* Left Pane: Visual Graphic (Hidden on mobile) */}
        <div className="split-left">
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 style={{ fontSize: '64px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                Let viber <br /> find vibes.
              </h1>
              <p style={{ fontSize: '20px', opacity: 0.9, fontWeight: 500 }}>
                The premium way to host and attend.
              </p>
            </motion.div>
          </div>

          {/* Decorative elements for the left pane */}
          <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)', top: '-50px', left: '-50px' }}></div>
          <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(80px)', bottom: '-100px', right: '-100px' }}></div>
        </div>

        {/* Right Pane: Functional Content */}
        <div className="split-right">
          <div className="right-content-wrapper">
            <AnimatePresence mode="wait">
              {view === 'landing' && (
                <motion.div key="landing" style={{ flex: 1, display: 'flex', flexDirection: 'column' }} exit={{ opacity: 0, x: -20 }}>
                  <Landing onStart={() => setView('wizard')} onTerms={() => setView('terms')} />
                </motion.div>
              )}

              {view === 'terms' && (
                <motion.div key="terms" style={{ flex: 1, display: 'flex', flexDirection: 'column' }} exit={{ opacity: 0 }}>
                  <Terms onBack={() => setView('landing')} />
                </motion.div>
              )}

              {view === 'wizard' && (
                <motion.div key="wizard" style={{ flex: 1, display: 'flex', flexDirection: 'column' }} exit={{ opacity: 0, scale: 0.95 }}>
                  <Wizard onBackToLanding={() => setView('landing')} onComplete={() => setView('success')} />
                </motion.div>
              )}

              {view === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                >
                  <div style={{ background: 'var(--accent-primary)', padding: '24px', borderRadius: '50%', marginBottom: '32px', boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.3)' }}>
                    <Sparkles size={48} color="white" />
                  </div>
                  <h1 style={{ fontSize: '40px', marginBottom: '16px' }}>You're in!</h1>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '18px' }}>
                    Your vibe has been registered. Welcome to the new standard of hosting.
                  </p>
                  <button className="btn-primary" onClick={() => setView('landing')} style={{ width: 'auto', padding: '16px 48px' }}>
                    Back to Home
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
