import React, { useState } from 'react';
import { Phone, ArrowRight, User as UserIcon, Building2, Smartphone, ShieldCheck } from 'lucide-react';
import { BusinessType, IncomeRange } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingProps {
  onComplete: (userData: any) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('vendor');
  const [incomeRange, setIncomeRange] = useState<IncomeRange>('501-1500');

  const nextStep = () => setStep(prev => prev + 1);

  const businessTypes: { id: BusinessType; label: string; icon: any }[] = [
    { id: 'vendor', label: 'Market Vendor', icon: Building2 },
    { id: 'farmer', label: 'Small Farmer', icon: Building2 },
    { id: 'driver', label: 'Taxi/Delivery', icon: Building2 },
    { id: 'artisan', label: 'Artisan/Craft', icon: Building2 },
    { id: 'other', label: 'Other Business', icon: Building2 },
  ];

  const incomeRanges: { id: IncomeRange; label: string }[] = [
    { id: '0-500', label: '$0 - $500' },
    { id: '501-1500', label: '$501 - $1,500' },
    { id: '1501-3000', label: '$1,501 - $3,000' },
    { id: '3001+', label: '$3,001+' },
  ];

  return (
    <div className="h-screen max-w-md mx-auto bg-white flex flex-col p-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-2">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-3xl font-black mb-6">
                B
              </div>
              <h1 className="text-3xl font-black text-slate-800 leading-tight">
                Beyond the <span className="text-primary">Wallet</span>
              </h1>
              <p className="text-slate-500">Financial inclusion for the informal economy. Build trust, get credit.</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-primary focus:bg-white outline-none transition-all font-bold"
                />
              </div>
              <button 
                onClick={nextStep}
                disabled={!phone}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                Get Started <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Verify Phone</h2>
              <p className="text-slate-500">We sent a 4-digit code to {phone}</p>
            </div>

            <div className="flex justify-between gap-4">
              {[1, 2, 3, 4].map(i => (
                <input 
                  key={i}
                  type="text" 
                  maxLength={1}
                  className="w-full aspect-square bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-2xl font-black focus:border-primary focus:bg-white outline-none transition-all"
                  onChange={(e) => {
                    if (e.target.value && i < 4) {
                      // Focus next input (simplified for prototype)
                    }
                  }}
                />
              ))}
            </div>

            <button 
              onClick={nextStep}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20"
            >
              Verify Code
            </button>
            <button className="text-slate-400 text-sm font-bold text-center w-full">Resend Code</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Tell us about you</h2>
              <p className="text-slate-500">This helps us calculate your initial Trust Score.</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-primary focus:bg-white outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {businessTypes.map(type => (
                    <button 
                      key={type.id}
                      onClick={() => setBusinessType(type.id)}
                      className={cn(
                        "p-3 rounded-xl border-2 text-xs font-bold transition-all flex items-center gap-2",
                        businessType === type.id ? "border-primary bg-primary/5 text-primary" : "border-slate-100 text-slate-500"
                      )}
                    >
                      <type.icon size={16} />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Income</p>
                <div className="flex flex-wrap gap-2">
                  {incomeRanges.map(range => (
                    <button 
                      key={range.id}
                      onClick={() => setIncomeRange(range.id)}
                      className={cn(
                        "px-4 py-2 rounded-full border-2 text-xs font-bold transition-all",
                        incomeRange === range.id ? "border-primary bg-primary/5 text-primary" : "border-slate-100 text-slate-500"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={nextStep}
              disabled={!name}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mx-auto">
                <Smartphone size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Connect Mobile Money</h2>
              <p className="text-slate-500">We analyze your transaction history to generate your Trust Score. Your data is encrypted and secure.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-3 border border-slate-100">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-primary" />
                <p className="text-xs font-medium text-slate-600">End-to-end encryption</p>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-primary" />
                <p className="text-xs font-medium text-slate-600">No access to your PIN</p>
              </div>
            </div>

            <button 
              onClick={() => onComplete({ name, phone, businessType, incomeRange })}
              className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
            >
              Connect M-Pesa / Mobile Money
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
