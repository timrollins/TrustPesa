export type BusinessType = 'vendor' | 'farmer' | 'driver' | 'artisan' | 'other';
export type IncomeRange = '0-500' | '501-1500' | '1501-3000' | '3001+';

export interface User {
  id: string;
  phone: string;
  name: string;
  businessType: BusinessType;
  incomeRange: IncomeRange;
  onboarded: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'inflow' | 'outflow';
  category: 'sales' | 'supplier' | 'fees' | 'loan' | 'repayment' | 'savings' | 'personal';
  counterparty: string;
}

export interface TrustScore {
  score: number;
  factors: {
    volume: number;
    consistency: number;
    stability: number;
    social: number;
    savings: number;
  };
  date: string;
  rating: 'Poor' | 'Fair' | 'Good' | 'Excellent';
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: 'emergency' | 'business' | 'education' | 'other';
}

export interface LoanApplication {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  trustScoreAtTime: number;
  date: string;
  partner: string;
}
