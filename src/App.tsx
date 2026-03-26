/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TrustScoreView } from './components/TrustScoreView';
import { LoansView } from './components/LoansView';
import { SavingsBot } from './components/SavingsBot';
import { Onboarding } from './components/Onboarding';
import { SettingsView } from './components/SettingsView';
import { 
  MOCK_TRANSACTIONS, 
  calculateTrustScore, 
  MOCK_SAVINGS_GOALS, 
  MOCK_LOAN_APPS 
} from './services/mockApi';
import { User, Transaction, TrustScore, SavingsGoal, LoanApplication } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [score, setScore] = useState<TrustScore | null>(null);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loanApps, setLoanApps] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = (userData: Partial<User>) => {
    const newUser: User = {
      id: 'user_' + Date.now(),
      phone: userData.phone || '',
      name: userData.name || '',
      businessType: userData.businessType || 'vendor',
      incomeRange: userData.incomeRange || '501-1500',
      onboarded: true,
    };
    
    setUser(newUser);
    setTransactions(MOCK_TRANSACTIONS);
    setScore(calculateTrustScore(MOCK_TRANSACTIONS));
    setGoals(MOCK_SAVINGS_GOALS);
    setLoanApps(MOCK_LOAN_APPS);
  };

  const handleUpdateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  if (loading) {
    return (
      <div className="h-screen max-w-md mx-auto bg-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white text-4xl font-black animate-bounce">
          B
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-800">TrustPesa</h1>
          <p className="text-slate-400 text-sm animate-pulse">Analyzing your financial footprint...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      userName={user.name}
    >
      {activeTab === 'home' && (
        <Dashboard 
          user={user}
          transactions={transactions}
          score={score!}
          goals={goals}
          onViewScore={() => setActiveTab('score')}
          onViewLoans={() => setActiveTab('loans')}
        />
      )}
      {activeTab === 'score' && (
        <TrustScoreView score={score!} />
      )}
      {activeTab === 'loans' && (
        <LoansView score={score!} loanApps={loanApps} />
      )}
      {activeTab === 'bot' && (
        <SavingsBot transactions={transactions} goals={goals} />
      )}
      {activeTab === 'settings' && (
        <SettingsView 
          user={user} 
          onUpdateUser={handleUpdateUser} 
          onLogout={handleLogout} 
        />
      )}
    </Layout>
  );
}

