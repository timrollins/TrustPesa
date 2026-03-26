import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Phone, 
  Briefcase, 
  DollarSign,
  Check
} from 'lucide-react';
import { User, BusinessType, IncomeRange } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SettingsViewProps {
  user: User;
  onUpdateUser: (userData: Partial<User>) => void;
  onLogout: () => void;
}

export const SettingsView = ({ user, onUpdateUser, onLogout }: SettingsViewProps) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBusinessType, setEditBusinessType] = useState<BusinessType>(user.businessType);
  const [editIncomeRange, setEditIncomeRange] = useState<IncomeRange>(user.incomeRange);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveProfile = () => {
    onUpdateUser({
      name: editName,
      businessType: editBusinessType,
      incomeRange: editIncomeRange,
    });
    setIsEditingProfile(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const businessTypes: { id: BusinessType; label: string }[] = [
    { id: 'vendor', label: 'Market Vendor' },
    { id: 'farmer', label: 'Small Farmer' },
    { id: 'driver', label: 'Taxi/Delivery' },
    { id: 'artisan', label: 'Artisan/Craft' },
    { id: 'other', label: 'Other Business' },
  ];

  const incomeRanges: { id: IncomeRange; label: string }[] = [
    { id: '0-500', label: '$0 - $500' },
    { id: '501-1500', label: '$501 - $1,500' },
    { id: '1501-3000', label: '$1,501 - $3,000' },
    { id: '3001+', label: '$3,001+' },
  ];

  const SettingItem = ({ icon: Icon, label, value, onClick, color = "text-slate-600" }: any) => (
    <button 
      onClick={onClick}
      className="w-full bg-white p-4 flex items-center justify-between border-b border-slate-50 last:border-0 active:bg-slate-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50", color)}>
          <Icon size={18} />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-slate-800">{label}</p>
          {value && <p className="text-[10px] text-slate-400 font-medium">{value}</p>}
        </div>
      </div>
      <ChevronRight size={16} className="text-slate-300" />
    </button>
  );

  const ToggleItem = ({ icon: Icon, label, enabled, onToggle, color = "text-slate-600" }: any) => (
    <div className="bg-white p-4 flex items-center justify-between border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50", color)}>
          <Icon size={18} />
        </div>
        <p className="text-sm font-bold text-slate-800">{label}</p>
      </div>
      <button 
        onClick={onToggle}
        className={cn(
          "w-10 h-5 rounded-full relative transition-colors duration-200",
          enabled ? "bg-primary" : "bg-slate-200"
        )}
      >
        <div className={cn(
          "absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200",
          enabled ? "left-6" : "left-1"
        )}></div>
      </button>
    </div>
  );

  if (isEditingProfile) {
    return (
      <div className="p-4 space-y-6">
        <header className="flex items-center gap-4">
          <button onClick={() => setIsEditingProfile(false)} className="text-slate-400">
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">Edit Profile</h2>
        </header>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:border-primary outline-none transition-all text-sm font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Type</label>
            <div className="grid grid-cols-2 gap-2">
              {businessTypes.map(type => (
                <button 
                  key={type.id}
                  onClick={() => setEditBusinessType(type.id)}
                  className={cn(
                    "p-3 rounded-xl border text-xs font-bold transition-all",
                    editBusinessType === type.id ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Income</label>
            <div className="flex flex-wrap gap-2">
              {incomeRanges.map(range => (
                <button 
                  key={range.id}
                  onClick={() => setEditIncomeRange(range.id)}
                  className={cn(
                    "px-4 py-2 rounded-full border text-xs font-bold transition-all",
                    editIncomeRange === range.id ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSaveProfile}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <header className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500 text-sm">Manage your account and preferences</p>
      </header>

      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-green-100"
        >
          <Check size={14} /> Profile updated successfully!
        </motion.div>
      )}

      {/* Profile Summary */}
      <section className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          <UserIcon size={32} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-800">{user.name}</h3>
          <p className="text-slate-400 text-xs">{user.phone}</p>
          <p className="text-primary text-[10px] font-bold uppercase tracking-wider mt-1">{user.businessType}</p>
        </div>
        <button 
          onClick={() => setIsEditingProfile(true)}
          className="text-primary text-xs font-bold px-3 py-1 bg-primary/5 rounded-full"
        >
          Edit
        </button>
      </section>

      {/* Account Settings */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Account</h3>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <SettingItem 
            icon={Phone} 
            label="Phone Number" 
            value={user.phone} 
            onClick={() => {}} 
            color="text-blue-500"
          />
          <SettingItem 
            icon={Briefcase} 
            label="Business Type" 
            value={user.businessType} 
            onClick={() => setIsEditingProfile(true)} 
            color="text-amber-500"
          />
          <SettingItem 
            icon={DollarSign} 
            label="Income Range" 
            value={user.incomeRange} 
            onClick={() => setIsEditingProfile(true)} 
            color="text-green-500"
          />
        </div>
      </section>

      {/* Preferences */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Preferences</h3>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <ToggleItem 
            icon={Bell} 
            label="Push Notifications" 
            enabled={true} 
            onToggle={() => {}} 
            color="text-purple-500"
          />
          <ToggleItem 
            icon={Shield} 
            label="Biometric Login" 
            enabled={false} 
            onToggle={() => {}} 
            color="text-cyan-500"
          />
          <SettingItem 
            icon={Globe} 
            label="Language" 
            value="English" 
            onClick={() => {}} 
            color="text-indigo-500"
          />
          <ToggleItem 
            icon={Moon} 
            label="Dark Mode" 
            enabled={false} 
            onToggle={() => {}} 
            color="text-slate-700"
          />
        </div>
      </section>

      {/* More */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Support</h3>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <SettingItem 
            icon={HelpCircle} 
            label="Help & Support" 
            onClick={() => {}} 
            color="text-slate-500"
          />
          <button 
            onClick={onLogout}
            className="w-full p-4 flex items-center gap-3 text-red-500 active:bg-red-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50">
              <LogOut size={18} />
            </div>
            <p className="text-sm font-bold">Log Out</p>
          </button>
        </div>
      </section>

      <div className="text-center py-4">
        <p className="text-[10px] text-slate-300 font-medium">TrustPesa v1.0.0</p>
      </div>
    </div>
  );
};
