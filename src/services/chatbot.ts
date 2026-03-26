import { Transaction, SavingsGoal } from '../types';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export const getBotResponse = (
  message: string,
  transactions: Transaction[],
  goals: SavingsGoal[]
): string => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('save') || lowerMsg.includes('savings')) {
    const totalInflow = transactions
      .filter(t => t.type === 'inflow')
      .reduce((sum, t) => sum + t.amount, 0);
    const dailyAvg = totalInflow / 90;
    const recommended = Math.round(dailyAvg * 0.1);
    
    return `Based on your daily average sales of $${dailyAvg.toFixed(2)}, I recommend saving $${recommended} per day. This would help you reach your goals faster!`;
  }
  
  if (lowerMsg.includes('invest') || lowerMsg.includes('investment')) {
    return "Since you're a vendor, I suggest low-risk micro-investments like government treasury bills or a high-yield savings account. Would you like to see our partner options?";
  }
  
  if (lowerMsg.includes('goal') || lowerMsg.includes('progress')) {
    const mainGoal = goals[0];
    if (mainGoal) {
      const percent = Math.round((mainGoal.currentAmount / mainGoal.targetAmount) * 100);
      return `You've reached ${percent}% of your '${mainGoal.title}' goal. Keep going! At your current rate, you'll finish by ${mainGoal.deadline}.`;
    }
  }
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return "Hello! I'm your Beyond Wallet assistant. I can help you with savings tips, investment advice, or tracking your goals. What's on your mind?";
  }

  return "I'm not sure I understand. Try asking about 'savings tips', 'investment advice', or 'my goals'.";
};
