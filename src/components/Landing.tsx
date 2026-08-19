import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
  onTerms: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart, onTerms }) => {
  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: '48px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <div style={{ background: 'var(--card-bg)', padding: '12px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <Flame size={32} color="var(--accent-primary)" />
          </div>
        </div>
        <h2 style={{ fontSize: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Welcome</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.5 }}>
          Create an account to host your own events and discover the best parties in town.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        <button className="btn-primary" onClick={onStart}>
          Continue with Email
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            By continuing, you agree to our{' '}
            <button 
              onClick={onTerms}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', fontWeight: 600, textDecoration: 'underline', padding: 0 }}
            >
              Terms & Conditions
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
