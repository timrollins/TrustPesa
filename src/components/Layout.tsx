import React from 'react';
import { LayoutDashboard, Wallet, TrendingUp, MessageSquare, Bell, User as UserIcon, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center w-full py-2 transition-colors",
      active ? "text-primary" : "text-slate-400 hover:text-slate-600"
    )}
  >
    <Icon size={24} />
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName: string;
}

export const Layout = ({ children, activeTab, setActiveTab, userName }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 shadow-xl overflow-hidden">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            B
          </div>
          <h1 className="font-bold text-slate-800">TrustPesa</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-1 text-slate-500 hover:text-slate-700">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div 
            className="flex items-center gap-2 pl-2 border-l border-slate-100 cursor-pointer"
            onClick={() => setActiveTab('settings')}
          >
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-colors",
              activeTab === 'settings' ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
            )}>
              <UserIcon size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 flex justify-around items-center px-2 z-50">
        <NavItem 
          icon={LayoutDashboard} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavItem 
          icon={TrendingUp} 
          label="Trust Score" 
          active={activeTab === 'score'} 
          onClick={() => setActiveTab('score')} 
        />
        <NavItem 
          icon={Wallet} 
          label="Loans" 
          active={activeTab === 'loans'} 
          onClick={() => setActiveTab('loans')} 
        />
        <NavItem 
          icon={MessageSquare} 
          label="AI Bot" 
          active={activeTab === 'bot'} 
          onClick={() => setActiveTab('bot')} 
        />
        <NavItem 
          icon={Settings} 
          label="Settings" 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
        />
      </nav>
    </div>
  );
};
