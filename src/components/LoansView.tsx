import React, { useState } from 'react';
import { Wallet, ShieldCheck, Clock, ArrowRight, CheckCircle2, Building2, Info } from 'lucide-react';
import { TrustScore, LoanApplication } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface LoansViewProps {
  score: TrustScore;
  loanApps: LoanApplication[];
}

export const LoansView = ({ score, loanApps }: LoansViewProps) => {
  const [applying, setApplying] = useState(false);
  const [step, setStep] = useState(1);

  const partners = [
    { name: 'Zenith Microfinance', rate: '1.5%', maxAmount: 1200, logo: 'Z' },
    { name: 'Emerging Capital', rate: '1.8%', maxAmount: 1500, logo: 'E' },
    { name: 'Vendor Trust Bank', rate: '2.0%', maxAmount: 2000, logo: 'V' },
  ];

  if (applying) {
    return (
      <div className="p-4 space-y-6">
        <header className="flex items-center gap-4">
          <button onClick={() => setApplying(false)} className="text-slate-400">
            <ArrowRight size={24} className="rotate-180" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">Loan Application</h2>
        </header>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800">How much do you need?</h3>
              <div className="space-y-2">
                <input 
                  type="range" 
                  min="100" 
                  max="1200" 
                  step="50" 
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>$100</span>
                  <span>$1,200</span>
                </div>
              </div>
              <div className="text-center py-4">
                <p className="text-4xl font-black text-primary">$800</p>
                <p className="text-xs text-slate-400 mt-1">Estimated monthly repayment: $72.50</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Select Purpose</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Inventory', 'Equipment', 'Emergency', 'Expansion'].map(p => (
                  <button key={p} className="p-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 hover:border-primary hover:text-primary transition-all">
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center py-12">
            <div className="w-24 h-24 bg-green-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Application Sent!</h3>
              <p className="text-slate-500 text-sm px-8">
                Zenith Microfinance is reviewing your request. Based on your Trust Score, approval is expected within 2 hours.
              </p>
            </div>
            <button 
              onClick={() => { setApplying(false); setStep(1); }}
              className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl"
            >
              Back to Dashboard
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <section className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Loan Center</h2>
        <p className="text-slate-500 text-sm">Access affordable credit based on your Trust Score</p>
      </section>

      {/* Eligibility Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Eligible Amount</span>
          </div>
          <div className="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500">
            SCORE: {score.score}
          </div>
        </div>
        <p className="text-4xl font-black text-slate-800">$1,200.00</p>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Interest Rate</p>
            <p className="text-sm font-bold text-slate-700">From 1.5% / mo</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Max Term</p>
            <p className="text-sm font-bold text-slate-700">12 Months</p>
          </div>
        </div>
        <button 
          onClick={() => setApplying(true)}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          Apply Now <ArrowRight size={18} />
        </button>
      </div>

      {/* Partner Comparison */}
      <section className="space-y-3">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Building2 size={18} className="text-primary" />
          Partner Offers
        </h3>
        <div className="space-y-3">
          {partners.map(p => (
            <div key={p.name} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-bold">
                  {p.logo}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                  <p className="text-slate-400 text-[10px]">Max: ${p.maxAmount} • {p.rate} interest</p>
                </div>
              </div>
              <button className="text-primary font-bold text-xs px-3 py-1 bg-primary/5 rounded-full">Select</button>
            </div>
          ))}
        </div>
      </section>

      {/* Informal vs Formal Comparison */}
      <section className="bg-amber-50 p-4 rounded-2xl border border-amber-100 space-y-3">
        <div className="flex items-center gap-2 text-amber-700">
          <Info size={18} />
          <h3 className="font-bold text-sm">Why use Beyond Wallet?</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-amber-800 uppercase">Informal Lender</p>
            <p className="text-lg font-black text-red-500">15-20%</p>
            <p className="text-[10px] text-amber-700">Monthly Interest</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-amber-800 uppercase">Beyond Partners</p>
            <p className="text-lg font-black text-primary">1.5-2.5%</p>
            <p className="text-[10px] text-amber-700">Monthly Interest</p>
          </div>
        </div>
      </section>

      {/* Application History */}
      <section className="space-y-3 pb-8">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          Application History
        </h3>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {loanApps.map(app => (
            <div key={app.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                  <Wallet size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">${app.amount} Loan</p>
                  <p className="text-slate-400 text-[10px]">{app.date} • {app.partner}</p>
                </div>
              </div>
              <div className={cn(
                "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                app.status === 'approved' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
              )}>
                {app.status}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
