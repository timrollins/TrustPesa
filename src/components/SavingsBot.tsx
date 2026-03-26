import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles, Target, TrendingUp, Wallet } from 'lucide-react';
import { ChatMessage, getBotResponse } from '../services/chatbot';
import { Transaction, SavingsGoal } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SavingsBotProps {
  transactions: Transaction[];
  goals: SavingsGoal[];
}

export const SavingsBot = ({ transactions, goals }: SavingsBotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your Beyond Wallet assistant. I can help you with savings tips, investment advice, or tracking your goals. What's on your mind?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate bot thinking
    setTimeout(() => {
      const botResponseText = getBotResponse(input, transactions, goals);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const quickActions = [
    { icon: TrendingUp, label: "Savings Tips", query: "Give me some savings tips" },
    { icon: Wallet, label: "Investment Advice", query: "Where should I invest?" },
    { icon: Target, label: "Goal Progress", query: "How is my goal progress?" },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Chat Header */}
      <div className="bg-white p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="font-bold text-slate-800">Beyond AI Assistant</h2>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex items-end gap-2 max-w-[85%]",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.sender === 'user' ? "bg-primary text-white" : "bg-white text-slate-400 border border-slate-100"
              )}>
                {msg.sender === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
              </div>
              <div className={cn(
                "p-3 rounded-2xl text-sm shadow-sm",
                msg.sender === 'user' 
                  ? "bg-primary text-white rounded-br-none" 
                  : "bg-white text-slate-700 rounded-bl-none border border-slate-100"
              )}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 space-y-4">
        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(action.query);
                // handleSend() would need to be called after state update, 
                // but we'll just let the user click send for simplicity or 
                // use a useEffect for input change if we wanted auto-send.
              }}
              className="flex-shrink-0 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium px-3 py-2 rounded-full border border-slate-100 flex items-center gap-2 transition-colors"
            >
              <action.icon size={14} className="text-primary" />
              {action.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 bg-slate-100 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
