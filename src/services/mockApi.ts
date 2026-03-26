import { Transaction, TrustScore, User, SavingsGoal, LoanApplication } from '../types';
import { subDays, format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

const MOCK_USER: User = {
  id: 'user_1',
  phone: '+254 712 345 678',
  name: 'John Kamau',
  businessType: 'vendor',
  incomeRange: '501-1500',
  onboarded: true,
};

const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();
  
  // Generate 90 days of data
  for (let i = 0; i < 90; i++) {
    const date = subDays(now, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Daily sales (inflow)
    const salesCount = Math.floor(Math.random() * 5) + 2;
    for (let j = 0; j < salesCount; j++) {
      transactions.push({
        id: `tx_sale_${i}_${j}`,
        date: dateStr,
        amount: Math.floor(Math.random() * 45) + 5,
        type: 'inflow',
        category: 'sales',
        counterparty: 'Customer',
      });
    }
    
    // Weekly supplier payments (outflow)
    if (i % 7 === 0) {
      transactions.push({
        id: `tx_supp_${i}`,
        date: dateStr,
        amount: Math.floor(Math.random() * 150) + 50,
        type: 'outflow',
        category: 'supplier',
        counterparty: 'Wholesale Depot',
      });
    }
    
    // Monthly fees
    if (i % 30 === 0) {
      transactions.push({
        id: `tx_fee_${i}`,
        date: dateStr,
        amount: Math.floor(Math.random() * 10) + 2,
        type: 'outflow',
        category: 'fees',
        counterparty: 'Mobile Money Provider',
      });
    }
    
    // Occasional personal expenses
    if (i % 3 === 0) {
      transactions.push({
        id: `tx_pers_${i}`,
        date: dateStr,
        amount: Math.floor(Math.random() * 20) + 5,
        type: 'outflow',
        category: 'personal',
        counterparty: 'Local Shop',
      });
    }
    
    // Savings transfers
    if (i % 14 === 0) {
      transactions.push({
        id: `tx_sav_${i}`,
        date: dateStr,
        amount: Math.floor(Math.random() * 50) + 10,
        type: 'outflow',
        category: 'savings',
        counterparty: 'Beyond Wallet Savings',
      });
    }
  }
  
  // Add a loan and some repayments
  transactions.push({
    id: 'tx_loan_1',
    date: format(subDays(now, 45), 'yyyy-MM-dd'),
    amount: 500,
    type: 'inflow',
    category: 'loan',
    counterparty: 'Micro-Lending Partner',
  });
  
  for (let k = 1; k <= 4; k++) {
    transactions.push({
      id: `tx_repay_${k}`,
      date: format(subDays(now, 45 - k * 7), 'yyyy-MM-dd'),
      amount: 135,
      type: 'outflow',
      category: 'repayment',
      counterparty: 'Micro-Lending Partner',
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const MOCK_TRANSACTIONS = generateMockTransactions();

export const calculateTrustScore = (transactions: Transaction[]): TrustScore => {
  // Mock AI Scoring Algorithm
  // volume (30%), consistency (25%), cash flow stability (20%), social trust (15%), savings behavior (10%)
  
  const totalInflow = transactions
    .filter(t => t.type === 'inflow')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalOutflow = transactions
    .filter(t => t.type === 'outflow')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const volumeScore = Math.min(100, (totalInflow / 5000) * 100);
  
  // Consistency: How many days had transactions?
  const uniqueDays = new Set(transactions.map(t => t.date)).size;
  const consistencyScore = Math.min(100, (uniqueDays / 90) * 100);
  
  // Stability: Inflow vs Outflow ratio
  const stabilityScore = Math.min(100, (totalInflow / (totalOutflow || 1)) * 50);
  
  // Social: Number of unique counterparties
  const uniqueCounterparties = new Set(transactions.map(t => t.counterparty)).size;
  const socialScore = Math.min(100, (uniqueCounterparties / 20) * 100);
  
  // Savings: Total savings category
  const totalSavings = transactions
    .filter(t => t.category === 'savings')
    .reduce((sum, t) => sum + t.amount, 0);
  const savingsScore = Math.min(100, (totalSavings / 500) * 100);
  
  const weightedScore = (
    volumeScore * 0.3 +
    consistencyScore * 0.25 +
    stabilityScore * 0.2 +
    socialScore * 0.15 +
    savingsScore * 0.1
  );
  
  const finalScore = Math.round(weightedScore * 10); // Scale to 1000
  
  let rating: TrustScore['rating'] = 'Poor';
  if (finalScore > 800) rating = 'Excellent';
  else if (finalScore > 600) rating = 'Good';
  else if (finalScore > 400) rating = 'Fair';
  
  return {
    score: finalScore,
    factors: {
      volume: Math.round(volumeScore),
      consistency: Math.round(consistencyScore),
      stability: Math.round(stabilityScore),
      social: Math.round(socialScore),
      savings: Math.round(savingsScore),
    },
    date: format(new Date(), 'yyyy-MM-dd'),
    rating,
  };
};

export const MOCK_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: 'goal_1',
    title: 'Emergency Fund',
    targetAmount: 1000,
    currentAmount: 450,
    deadline: '2026-12-31',
    category: 'emergency',
  },
  {
    id: 'goal_2',
    title: 'New Display Stand',
    targetAmount: 300,
    currentAmount: 120,
    deadline: '2026-06-15',
    category: 'business',
  }
];

export const MOCK_LOAN_APPS: LoanApplication[] = [
  {
    id: 'app_1',
    amount: 500,
    status: 'approved',
    trustScoreAtTime: 680,
    date: '2026-02-10',
    partner: 'Zenith Microfinance',
  }
];
