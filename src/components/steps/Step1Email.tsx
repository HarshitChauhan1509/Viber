import React, { useState } from 'react';
import type { FormData } from '../Wizard';

interface StepProps {
  data: FormData;
  onNext: (data: Partial<FormData>) => void;
}

export const Step1Email: React.FC<StepProps> = ({ data, onNext }) => {
  const [email, setEmail] = useState(data.email);
  const [error, setError] = useState('');

  const validateEmail = (val: string) => {
    if (!val) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Invalid email format';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (error) setError(validateEmail(val));
  };

  const handleBlur = () => {
    setError(validateEmail(email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    onNext({ email });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>What's your email?</h2>
        
        <div>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ borderColor: error ? 'var(--accent-red)' : undefined }}
          />
          {error && <div className="error-text">{error}</div>}
        </div>
      </div>

      <div style={{ paddingBottom: '24px' }}>
        <button type="submit" className="btn-primary" disabled={!!error || !email}>
          NEXT
        </button>
      </div>
    </form>
  );
};
