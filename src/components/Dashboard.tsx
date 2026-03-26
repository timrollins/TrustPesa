import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Target, ChevronRight } from 'lucide-react';
import { Transaction, TrustScore, SavingsGoal } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface DashboardProps {
  user: any;
  transactions: Transaction[];
  score: TrustScore;
  goals: SavingsGoal[];
  onViewScore: () => void;
  onViewLoans: () => void;
}

export const Dashboard = ({ user, transactions, score, goals, onViewScore, onViewLoans }: DashboardProps) => {
  const recentTransactions = transactions.slice(0, 5);
  
  // Prepare chart data
  const monthlyData = [
    { name: 'Jan', inflow: 1200, outflow: 900 },
    { name: 'Feb', inflow: 1450, outflow: 1100 },
    { name: 'Mar', inflow: 1600, outflow: 1050 },
  ];

  const categoryData = [
    { name: 'Sales', value: transactions.filter(t => t.category === 'sales').reduce((s, t) => s + t.amount, 0) },
    { name: 'Suppliers', value: transactions.filter(t => t.category === 'supplier').reduce((s, t) => s + t.amount, 0) },
    { name: 'Personal', value: transactions.filter(t => t.category === 'personal').reduce((s, t) => s + t.amount, 0) },
    { name: 'Savings', value: transactions.filter(t => t.category === 'savings').reduce((s, t) => s + t.amount, 0) },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <section>
        <h2 className="text-xl font-bold text-slate-800">Hello, {user.name}</h2>
        <p className="text-slate-500 text-sm">Your business is growing well this month.</p>
      </section>

      {/* Trust Score Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 text-white shadow-lg shadow-primary/20"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Trust Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{score.score}</span>
              <span className="text-white/80 text-sm">/ 1000</span>
            </div>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
            {score.rating}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span>Progress to next tier</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div className="bg-white h-full w-3/4"></div>
          </div>
        </div>

        <button 
          onClick={onViewScore}
          className="w-full bg-white text-primary font-bold py-2 rounded-xl text-sm flex items-center justify-center gap-2"
        >
          View Full Analysis <ChevronRight size={16} />
        </button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <ArrowUpRight size={16} className="text-primary" />
            <span className="text-xs font-medium">Monthly Inflow</span>
          </div>
          <p className="text-lg font-bold">$1,600</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <ArrowDownRight size={16} className="text-red-500" />
            <span className="text-xs font-medium">Monthly Outflow</span>
          </div>
          <p className="text-lg font-bold">$1,050</p>
        </div>
      </div>

      {/* Charts Section */}
      <section className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          Cash Flow Trends
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="inflow" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outflow" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Savings Goals */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Target size={18} className="text-primary" />
            Savings Goals
          </h3>
          <button className="text-primary text-xs font-bold">Add Goal</button>
        </div>
        {goals.map(goal => (
          <div key={goal.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-slate-800 text-sm">{goal.title}</p>
                <p className="text-slate-400 text-[10px]">Target: ${goal.targetAmount} by {goal.deadline}</p>
              </div>
              <p className="text-primary font-bold text-sm">${goal.currentAmount}</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500" 
                style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Transactions */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Activity</h3>
          <button className="text-slate-400 text-xs font-medium">View All</button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {recentTransactions.map((tx, idx) => (
            <div 
              key={tx.id} 
              className={cn(
                "p-4 flex items-center justify-between",
                idx !== recentTransactions.length - 1 && "border-b border-slate-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  tx.type === 'inflow' ? "bg-primary/10 text-primary" : "bg-blue-50 text-blue-500"
                )}>
                  {tx.type === 'inflow' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm capitalize">{tx.category}</p>
                  <p className="text-slate-400 text-[10px]">{tx.date} • {tx.counterparty}</p>
                </div>
              </div>
              <p className={cn(
                "font-bold text-sm",
                tx.type === 'inflow' ? "text-primary" : "text-slate-800"
              )}>
                {tx.type === 'inflow' ? '+' : '-'}${tx.amount}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Loan Matching Banner */}
      <section 
        onClick={onViewLoans}
        className="bg-blue-600 rounded-2xl p-5 text-white flex items-center justify-between cursor-pointer"
      >
        <div className="space-y-1">
          <p className="text-xs font-medium text-blue-100">ELIGIBLE FOR LOAN</p>
          <p className="text-xl font-bold">Up to $1,200</p>
          <p className="text-[10px] text-blue-100">Interest rates from 1.5% monthly</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Wallet size={24} />
        </div>
      </section>
    </div>
  );
};
