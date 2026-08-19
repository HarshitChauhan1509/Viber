import React, { useState } from 'react';
import type { FormData } from '../Wizard';

interface StepProps {
  data: FormData;
  onNext: (data: Partial<FormData>) => void;
}

export const Step3Profile: React.FC<StepProps> = ({ data, onNext }) => {
  const [form, setForm] = useState({
    name: data.name,
    age: data.age,
    pronouns: data.pronouns
  });
  
  const [errors, setErrors] = useState({ name: '', age: '' });

  const validate = (field: string, val: string) => {
    if (field === 'name') {
      if (!val.trim()) return 'Name is required';
      if (val.trim().length > 50) return 'Name is too long';
      return '';
    }
    if (field === 'age') {
      if (!val) return 'Age is required';
      const ageNum = parseInt(val, 10);
      if (isNaN(ageNum)) return 'Must be a number';
      if (ageNum < 18) return 'You must be 18 or older to party';
      if (ageNum > 120) return 'Please enter a valid age';
      return '';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Constraints
    if (name === 'age' && value && !/^\d+$/.test(value)) return;
    if (name === 'name' && /\d/.test(value)) return;
    
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameErr = validate('name', form.name);
    const ageErr = validate('age', form.age);
    
    if (nameErr || ageErr) {
      setErrors({ name: nameErr, age: ageErr });
      return;
    }
    
    onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Who's hosting?</h2>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Vaibhav Mishra"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ borderColor: errors.name ? 'var(--accent-red)' : undefined }}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Age
            </label>
            <input
              type="text"
              inputMode="numeric"
              name="age"
              placeholder="21"
              value={form.age}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ borderColor: errors.age ? 'var(--accent-red)' : undefined }}
            />
            {errors.age && <div className="error-text">{errors.age}</div>}
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Pronouns
            </label>
            <select
              name="pronouns"
              value={form.pronouns}
              onChange={handleChange}
              style={{ height: '54px' }}
            >
              <option value="">Optional</option>
              <option value="he/him">He/Him</option>
              <option value="she/her">She/Her</option>
              <option value="they/them">They/Them</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: '24px' }}>
        <button type="submit" className="btn-primary" disabled={!form.name || !form.age}>
          NEXT
        </button>
      </div>
    </form>
  );
};
