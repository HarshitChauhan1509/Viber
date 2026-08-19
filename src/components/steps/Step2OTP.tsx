import React, { useState, useRef, useEffect } from 'react';
import type { FormData } from '../Wizard';
import { motion, useAnimation } from 'framer-motion';
import { useToast } from '../../context/ToastContext';

interface StepProps {
  email: string;
  onNext: (data: Partial<FormData>) => void;
}

export const Step2OTP: React.FC<StepProps> = ({ email, onNext }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const toastShown = useRef(false);
  const { showToast } = useToast();
  const controls = useAnimation();

  useEffect(() => {
    // Show toast that OTP was sent only once
    if (!toastShown.current) {
      showToast(`OTP sent to ${email}`, 'info');
      toastShown.current = true;
    }
    inputs.current[0]?.focus();
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;

    const newOtp = [...otp];
    // take only the last character if they pasted or typed multiple
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // move to next
    if (index < 3 && val) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        // move to prev if current is empty
        inputs.current[index - 1]?.focus();
        newOtp[index - 1] = '';
      } else {
        newOtp[index] = '';
      }
      setOtp(newOtp);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      if (otp.join('') === '1234') {
        onNext({});
      } else {
        showToast('Invalid OTP. Use 1234 for testing.', 'error');
        controls.start({
          x: [0, -10, 10, -10, 10, -5, 5, 0],
          transition: { duration: 0.4 }
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Enter OTP</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>
          We sent a 4-digit code to {email}
        </p>
        
        <motion.div animate={controls} style={{ display: 'flex', gap: '12px', justifyContent: 'center', margin: '40px 0' }}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              style={{
                width: '60px',
                height: '70px',
                fontSize: '28px',
                textAlign: 'center',
                padding: 0,
                borderRadius: '16px'
              }}
            />
          ))}
        </motion.div>
      </div>

      <div style={{ paddingBottom: '24px' }}>
        <button type="submit" className="btn-primary" disabled={otp.join('').length < 4}>
          VERIFY
        </button>
      </div>
    </form>
  );
};
