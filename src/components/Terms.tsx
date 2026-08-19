import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface TermsProps {
  onBack: () => void;
}

export const Terms: React.FC<TermsProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
        <button onClick={onBack} style={{ background: 'transparent', color: 'var(--text-color)', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ margin: '0 0 0 16px' }}>Terms & Conditions</h2>
      </div>

      <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
        <p style={{ marginBottom: '16px' }}>
          Welcome to our app! By signing up, you agree to these terms and conditions.
        </p>
        <h3 style={{ color: 'var(--text-color)', marginBottom: '8px' }}>1. Privacy Policy</h3>
        <p style={{ marginBottom: '16px' }}>
          We respect your privacy and will not share your personal data with third parties without your explicit consent. Your data is encrypted and securely stored.
        </p>
        <h3 style={{ color: 'var(--text-color)', marginBottom: '8px' }}>2. Acceptable Use</h3>
        <p style={{ marginBottom: '16px' }}>
          You agree to use this platform responsibly and respectfully. Harassment, hate speech, or any form of abuse will not be tolerated and will result in immediate account termination.
        </p>
        <h3 style={{ color: 'var(--text-color)', marginBottom: '8px' }}>3. Eligibility</h3>
        <p style={{ marginBottom: '16px' }}>
          You must be at least 18 years old to use this service. By registering, you confirm that you meet this age requirement.
        </p>
      </div>

      <div style={{ marginTop: '24px' }}>
        <button className="btn-primary" onClick={onBack}>
          I Understand
        </button>
      </div>
    </motion.div>
  );
};
