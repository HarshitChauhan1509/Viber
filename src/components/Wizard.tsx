import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, Flame } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { Step1Email } from './steps/Step1Email';
import { Step2OTP } from './steps/Step2OTP';
import { Step3Profile } from './steps/Step3Profile';
import { Step4Location } from './steps/Step4Location';

export interface FormData {
  email: string;
  name: string;
  age: string;
  pronouns: string;
  state: string;
  city: string;
}

interface WizardProps {
  onBackToLanding: () => void;
  onComplete: () => void;
}

export const Wizard: React.FC<WizardProps> = ({ onBackToLanding, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    age: '',
    pronouns: '',
    state: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleNext = async (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      showToast('Profile completed successfully!', 'success');
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onBackToLanding();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Email data={formData} onNext={handleNext} />;
      case 2:
        return <Step2OTP onNext={handleNext} email={formData.email} />;
      case 3:
        return <Step3Profile data={formData} onNext={handleNext} />;
      case 4:
        return <Step4Location data={formData} onNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={handleBack} style={{ background: 'transparent', color: 'var(--text-color)', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={24} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={28} color="var(--accent-primary)" />
            <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '-1px' }}>viber</h1>
          </div>
        </div>
        <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '1px', color: 'var(--text-secondary)' }}>HOST</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute', width: '100%', height: '100%', padding: '0', display: 'flex', flexDirection: 'column' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation is usually handled inside the step to access form validity, 
          but we could handle generic back here or inside steps. 
          Given the screenshots, "NEXT" and "BACK" are at the bottom of the screen.
          We will inject them inside the steps so forms can trigger submit on NEXT. */}
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 50
            }}
          >
            <Loader2 size={48} color="var(--btn-bg)" className="spin" />
            <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
