import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { Shield, Info, CheckCircle2, AlertCircle, Download, Share2, TrendingUp, Activity as ActivityIcon } from 'lucide-react';
import { TrustScore } from '../types';
import { motion } from 'motion/react';

interface TrustScoreViewProps {
  score: TrustScore;
}

export const TrustScoreView = ({ score }: TrustScoreViewProps) => {
  const radarData = [
    { subject: 'Volume', A: score.factors.volume, fullMark: 100 },
    { subject: 'Consistency', A: score.factors.consistency, fullMark: 100 },
    { subject: 'Stability', A: score.factors.stability, fullMark: 100 },
    { subject: 'Social', A: score.factors.social, fullMark: 100 },
    { subject: 'Savings', A: score.factors.savings, fullMark: 100 },
  ];

  const trendData = [
    { name: 'Jan', score: 580 },
    { name: 'Feb', score: 640 },
    { name: 'Mar', score: score.score },
  ];

  return (
    <div className="p-4 space-y-6">
      <section className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Trust Score Analysis</h2>
        <p className="text-slate-500 text-sm">Detailed breakdown of your creditworthiness</p>
      </section>

      {/* Score Gauge Visualization */}
      <div className="relative flex justify-center py-8">
        <div className="w-48 h-48 rounded-full border-[12px] border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
          <div 
            className="absolute inset-0 border-[12px] border-primary rounded-full transition-all duration-1000"
            style={{ 
              clipPath: `polygon(50% 50%, -50% -50%, ${score.score / 10}% -50%, 150% 150%, -50% 150%)`,
              transform: `rotate(${(score.score / 1000) * 360}deg)`
            }}
          ></div>
          <span className="text-5xl font-black text-slate-800">{score.score}</span>
          <span className="text-xs font-bold text-primary uppercase tracking-widest mt-1">{score.rating}</span>
        </div>
        <div className="absolute -bottom-2 bg-white px-4 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2">
          <Shield size={16} className="text-primary" />
          <span className="text-xs font-bold text-slate-700">Verified by Beyond AI</span>
        </div>
      </div>

      {/* Radar Chart Breakdown */}
      <section className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <ActivityIcon size={18} className="text-primary" />
          Factor Breakdown
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
              <Radar
                name="Score"
                dataKey="A"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Factors List */}
      <section className="space-y-3">
        <h3 className="font-bold text-slate-800">Key Insights</h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
            <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">High Consistency</p>
              <p className="text-slate-500 text-xs">You have transacted 82 out of the last 90 days. This shows strong business reliability.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Savings Potential</p>
              <p className="text-slate-500 text-xs">Increasing your monthly savings by just 5% could boost your score by 45 points.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trend Chart */}
      <section className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          Score Trend
        </h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis hide domain={[0, 1000]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 pb-8">
        <button className="bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
          <Download size={18} /> Export PDF
        </button>
        <button className="bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
          <Share2 size={18} /> Share Score
        </button>
      </div>
    </div>
  );
};
