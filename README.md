# TrustPesa: Beyond the Wallet

**AI-Driven Alternative Credit Scorer & Micro-Investment Bot for Informal Workers**

TrustPesa is a production-ready prototype designed to bridge the financial gap for informal workers and vendors in emerging markets. By translating informal digital footprints (like mobile money transactions) into a verifiable **Trust Score**, the app enables users to access formal credit and receive automated, AI-powered investment advice.

## 🚀 The Problem
Informal workers often have high transaction volumes but lack formal credit history. This forces them to rely on informal loans with predatory interest rates (often 15-20% monthly). TrustPesa solves this by creating a "Trust Network" that formalizes their financial reliability.

## ✨ Core Features

### 1. Alternative Credit Scoring Engine
*   **AI-Driven Analysis**: Calculates a score (0-1000) based on transaction volume (30%), consistency (25%), cash flow stability (20%), social trust (15%), and savings behavior (10%).
*   **Visual Breakdown**: Interactive radar charts showing exactly which factors are driving the score.
*   **Trend Tracking**: Monitor how your creditworthiness improves over time.

### 2. Micro-Investment AI Bot
*   **Personalized Advice**: Analyzes spending patterns to suggest daily/weekly savings amounts.
*   **Goal Tracking**: Set and monitor progress for emergency funds, business expansion, or education.
*   **Investment Nudges**: Recommends low-risk micro-investments based on the user's risk profile.

### 3. Loan Eligibility & Matching
*   **Instant Eligibility**: See exactly how much you can borrow based on your real-time Trust Score.
*   **Partner Comparison**: Compare formal micro-lending rates (1.5-2.5%) vs. informal market rates.
*   **Approval Simulation**: A streamlined application workflow with predicted approval times.

### 4. Comprehensive Dashboard
*   **Real-time Insights**: At-a-glance view of cash flow, savings progress, and recent activity.
*   **Data Visualization**: Professional charts for monthly inflows/outflows and expense categorization.

### 5. User Settings & Profile
*   **Profile Customization**: Manage business type, income range, and personal details.
*   **App Preferences**: Toggle notifications, security settings (biometrics), and appearance (dark mode).

## 🛠️ Tech Stack
*   **Frontend**: React 19, TypeScript, Tailwind CSS 4.0
*   **Animations**: Motion (formerly Framer Motion)
*   **Charts**: Recharts (Radar, Bar, Line, Pie)
*   **Icons**: Lucide React
*   **Date Handling**: date-fns
*   **Build Tool**: Vite

## 📂 Project Structure
*   `src/components/`: Modular UI components (Dashboard, TrustScore, Loans, Bot, Settings).
*   `src/services/`: Mock API and AI logic (Scoring algorithm, Chatbot responses).
*   `src/types.ts`: Centralized TypeScript interfaces for data models.
*   `src/lib/utils.ts`: Tailwind CSS utility helpers.

## 🚦 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🔮 Future Roadmap
*   **Real API Integration**: Connect to M-Pesa, Flutterwave, or bank aggregation services.
*   **Offline-First (PWA)**: Full functionality in low-connectivity areas using Service Workers.
*   **Community Trust**: A vouching system to digitize traditional "Chama" lending circles.
*   **Voice Interface**: Accessibility-focused voice commands for the AI assistant.

---
*Built with ❤️ for financial inclusion.*
