import React, { useState, useMemo } from 'react';
import type { FormData } from '../Wizard';
import { MapPin } from 'lucide-react';

interface StepProps {
  data: FormData;
  onNext: (data: Partial<FormData>) => void;
}

const LOCATION_DATA = {
  'California': ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose'],
  'New York': ['New York City', 'Buffalo', 'Rochester', 'Syracuse'],
  'Texas': ['Houston', 'Austin', 'Dallas', 'San Antonio'],
  'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
};

export const Step4Location: React.FC<StepProps> = ({ data, onNext }) => {
  const [state, setState] = useState(data.state);
  const [city, setCity] = useState(data.city);

  const availableCities = useMemo(() => {
    if (!state) return [];
    return LOCATION_DATA[state as keyof typeof LOCATION_DATA] || [];
  }, [state]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
    setCity(''); // reset city when state changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state && city) {
      onNext({ state, city });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Where's the party?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
            Set your primary city to discover local viber.
          </p>
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
            State
          </label>
          <select value={state} onChange={handleStateChange} style={{ height: '54px' }}>
            <option value="" disabled>Select a state</option>
            {Object.keys(LOCATION_DATA).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', opacity: state ? 1 : 0.5 }}>
            City
          </label>
          <div style={{ position: 'relative' }}>
            <select 
              value={city} 
              onChange={e => setCity(e.target.value)} 
              disabled={!state}
              style={{ 
                height: '54px', 
                opacity: state ? 1 : 0.5,
                paddingLeft: '40px' 
              }}
            >
              <option value="" disabled>Select a city</option>
              {availableCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <MapPin size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: '24px' }}>
        <button type="submit" className="btn-primary" disabled={!state || !city}>
          COMPLETE PROFILE
        </button>
      </div>
    </form>
  );
};
