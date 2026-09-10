'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Wallet,
  Activity,
  Bot,
  ShieldCheck,
  Zap,
  Globe,
  RefreshCw,
  Clock,
  CheckCircle2,
  ExternalLink,
  Copy,
  ChevronDown,
  Sliders,
  Bell,
  Sparkles,
  PieChart,
  DollarSign,
  BarChart3,
  Flame,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface MarketPair {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: string;
  chartData: number[];
}

const INITIAL_PAIRS: MarketPair[] = [
  {
    symbol: 'BTC/USDT',
    name: 'Bitcoin',
    price: 67420.5,
    change24h: 4.85,
    high24h: 68150.0,
    low24h: 64200.0,
    volume: '$1.42B',
    chartData: [64200, 64800, 65300, 64900, 66200, 65800, 66900, 67420],
  },
  {
    symbol: 'ETH/USDT',
    name: 'Ethereum',
    price: 3584.2,
    change24h: 6.42,
    high24h: 3620.0,
    low24h: 3350.0,
    volume: '$890M',
    chartData: [3350, 3390, 3420, 3480, 3460, 3520, 3550, 3584],
  },
  {
    symbol: 'SOL/USDT',
    name: 'Solana',
    price: 168.4,
    change24h: 11.2,
    high24h: 172.0,
    low24h: 151.0,
    volume: '$430M',
    chartData: [151, 154, 158, 162, 159, 165, 166, 168.4],
  },
  {
    symbol: 'AVAX/USDT',
    name: 'Avalanche',
    price: 38.6,
    change24h: -1.45,
    high24h: 40.1,
    low24h: 37.8,
    volume: '$95M',
    chartData: [39.5, 39.8, 39.2, 38.9, 38.4, 38.0, 38.2, 38.6],
  },
  {
    symbol: 'LMN/USDT',
    name: 'Luminary Protocol',
    price: 4.85,
    change24h: 24.6,
    high24h: 5.1,
    low24h: 3.8,
    volume: '$45M',
    chartData: [3.8, 4.0, 4.1, 4.3, 4.2, 4.6, 4.75, 4.85],
  },
];

const INITIAL_BOTS = [
  {
    id: 'bot-1',
    name: 'High-Freq Grid Arbitrage (BTC)',
    status: 'Running',
    pnl: '+18.4%',
    profitUsd: '+$4,280.50',
    trades: 142,
    active: true,
  },
  {
    id: 'bot-2',
    name: 'Smart DCA Accumulator (ETH)',
    status: 'Running',
    pnl: '+9.2%',
    profitUsd: '+$1,140.20',
    trades: 38,
    active: true,
  },
  {
    id: 'bot-3',
    name: 'Momentum Breakout Trigger (SOL)',
    status: 'Paused',
    pnl: '+31.8%',
    profitUsd: '+$3,890.00',
    trades: 64,
    active: false,
  },
];

const INITIAL_TRANSACTIONS = [
  { id: 'tx-1', hash: '0x8f4b...39a1', pair: 'Swap ETH → USDC', amount: '2.5 ETH ($8,960)', time: '12s ago', status: 'Confirmed' },
  { id: 'tx-2', hash: '0x1c9e...d82a', pair: 'Buy SOL/USDT', amount: '50 SOL ($8,420)', time: '45s ago', status: 'Confirmed' },
  { id: 'tx-3', hash: '0x7e2a...44f0', pair: 'Bot Grid Rebalance', amount: '0.25 BTC ($16,855)', time: '2m ago', status: 'Confirmed' },
  { id: 'tx-4', hash: '0x3d1b...99a7', pair: 'Stake LMN Token', amount: '1,500 LMN ($7,275)', time: '5m ago', status: 'Confirmed' },
];

export default function LuminaryDashboardPage() {
  const [pairs, setPairs] = useState<MarketPair[]>(INITIAL_PAIRS);
  const [selectedPair, setSelectedPair] = useState<MarketPair>(INITIAL_PAIRS[0]);
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '1M' | '1Y'>('24H');
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletBalance, setWalletBalance] = useState(148920.45);
  const [network, setNetwork] = useState('Ethereum Mainnet');
  const [bots, setBots] = useState(INITIAL_BOTS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  // Swap Form state
  const [swapFromToken, setSwapFromToken] = useState('ETH');
  const [swapToToken, setSwapToToken] = useState('USDC');
  const [swapAmount, setSwapAmount] = useState('1.5');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapStep, setSwapStep] = useState('');

  // Live simulated price ticks every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prevPairs) =>
        prevPairs.map((p) => {
          const deltaPct = (Math.random() * 0.6 - 0.28) / 100;
          const newPrice = Number((p.price * (1 + deltaPct)).toFixed(p.price > 10 ? 2 : 4));
          const updatedChart = [...p.chartData.slice(1), newPrice];
          return {
            ...p,
            price: newPrice,
            change24h: Number((p.change24h + deltaPct * 10).toFixed(2)),
            chartData: updatedChart,
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Update selected pair whenever pairs array mutates
  useEffect(() => {
    const current = pairs.find((p) => p.symbol === selectedPair.symbol);
    if (current) {
      setSelectedPair(current);
    }
  }, [pairs, selectedPair.symbol]);

  // Calculate swap receive amount
  const getEstimatedReceive = () => {
    const amt = parseFloat(swapAmount) || 0;
    if (swapFromToken === 'ETH' && swapToToken === 'USDC') return (amt * 3584.2).toFixed(2);
    if (swapFromToken === 'SOL' && swapToToken === 'USDT') return (amt * 168.4).toFixed(2);
    if (swapFromToken === 'BTC' && swapToToken === 'USDC') return (amt * 67420.5).toFixed(2);
    if (swapFromToken === 'USDC' && swapToToken === 'ETH') return (amt / 3584.2).toFixed(4);
    if (swapFromToken === 'LMN' && swapToToken === 'ETH') return ((amt * 4.85) / 3584.2).toFixed(4);
    return (amt * 1.0).toFixed(2);
  };

  const handleSwap = () => {
    const amt = parseFloat(swapAmount);
    if (!amt || amt <= 0) {
      toast.error('Please enter a valid swap amount.');
      return;
    }

    setIsSwapping(true);
    setSwapStep('Requesting off-chain signature...');

    setTimeout(() => {
      setSwapStep('Submitting to decentralized liquidity pool...');
    }, 800);

    setTimeout(() => {
      setSwapStep('Routing through Uniswap v3 & Curve optimal path...');
    }, 1500);

    setTimeout(() => {
      const receiveAmt = getEstimatedReceive();
      setIsSwapping(false);
      setSwapStep('');
      setWalletBalance((prev) => prev + 50); // slight positive delta

      const newTx = {
        id: `tx-${Date.now()}`,
        hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
        pair: `Swap ${swapAmount} ${swapFromToken} → ${receiveAmt} ${swapToToken}`,
        amount: `${receiveAmt} ${swapToToken}`,
        time: 'Just now',
        status: 'Confirmed',
      };

      setTransactions((prev) => [newTx, ...prev]);
      toast.success(`🎉 Swap Executed! Received ${receiveAmt} ${swapToToken} in wallet.`);
    }, 2400);
  };

  const toggleBot = (id: string) => {
    setBots((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextState = !b.active;
          toast.info(`${b.name} is now ${nextState ? 'ACTIVE' : 'PAUSED'}`);
          return {
            ...b,
            active: nextState,
            status: nextState ? 'Running' : 'Paused',
          };
        }
        return b;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      <Toaster position="top-right" richColors />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#090e1c]/90 backdrop-blur-xl border-b border-emerald-500/20 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/#projects"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-xs font-semibold text-emerald-400 hover:text-emerald-200 transition-all shadow-sm group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                  LUMINARY <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">TERMINAL</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Web3 Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                High-Frequency DEX Analytics & Automated Execution Suite
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Network dropdown */}
          <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#0e162b] border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{network}</span>
          </div>

          {/* Wallet connect button */}
          <button
            onClick={() => {
              if (walletConnected) {
                toast.info('Wallet 0x7F...8a92 is active with $148k liquidity.');
              } else {
                setWalletConnected(true);
                toast.success('MetaMask Wallet connected!');
              }
            }}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-black font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>0x7F...8a92</span>
          </button>
        </div>
      </header>

      {/* Realtime Live Price Ticker Strip */}
      <div className="bg-[#0b1224] border-b border-emerald-500/10 px-4 sm:px-8 py-2 overflow-x-auto flex items-center space-x-6 text-xs font-mono">
        <span className="text-slate-400 flex items-center gap-1 shrink-0">
          <Flame className="w-3.5 h-3.5 text-amber-400" /> LIVE MARKETS:
        </span>
        {pairs.map((p) => {
          const isSelected = selectedPair.symbol === p.symbol;
          const isPositive = p.change24h >= 0;
          return (
            <button
              key={p.symbol}
              onClick={() => setSelectedPair(p)}
              className={`flex items-center space-x-2 shrink-0 px-2.5 py-1 rounded-lg transition-all ${
                isSelected
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-white font-bold'
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              <span>{p.symbol}</span>
              <span className="text-white font-bold">${p.price.toLocaleString()}</span>
              <span
                className={`flex items-center text-[10px] ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPositive ? '+' : ''}{p.change24h}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1680px] w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0c1328]/90 rounded-2xl p-4 border border-emerald-500/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>Total Net Portfolio</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white tracking-tight">
              ${walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 mt-2 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+$14,290.12 (+10.6%) 24h</span>
            </div>
          </div>

          <div className="bg-[#0c1328]/90 rounded-2xl p-4 border border-emerald-500/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>24h DEX Volume</span>
              <BarChart3 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white tracking-tight">
              $2.48M USD
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-cyan-400 mt-2 font-mono">
              <Activity className="w-3.5 h-3.5" />
              <span>4,120 Liquidity Pool Swaps</span>
            </div>
          </div>

          <div className="bg-[#0c1328]/90 rounded-2xl p-4 border border-emerald-500/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>Active Automated Bots</span>
              <Bot className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-white tracking-tight">
              {bots.filter((b) => b.active).length} Running / 3
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-purple-300 mt-2 font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>+$9,310.70 Cumulative Profit</span>
            </div>
          </div>

          <div className="bg-[#0c1328]/90 rounded-2xl p-4 border border-emerald-500/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>Liquidity Staking APY</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-amber-300 tracking-tight">
              18.42% APY
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-amber-400 mt-2 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Compounding Daily</span>
            </div>
          </div>
        </div>

        {/* Middle Trading Grid (2 columns: 8 cols chart, 4 cols DEX Swap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Chart Terminal (8 cols) */}
          <div className="lg:col-span-8 bg-[#0c1328]/90 rounded-2xl p-5 border border-emerald-500/20 shadow-xl flex flex-col justify-between">
            {/* Chart Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-extrabold text-white font-heading">
                    {selectedPair.symbol}
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono">
                    {selectedPair.name}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      selectedPair.change24h >= 0
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {selectedPair.change24h >= 0 ? '+' : ''}{selectedPair.change24h}%
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">
                  ${selectedPair.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center space-x-1 bg-[#070b14] p-1 rounded-xl border border-white/10 text-xs font-mono">
                {(['1H', '24H', '7D', '1M', '1Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      timeframe === tf
                        ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Custom SVG Chart */}
            <div className="relative h-64 sm:h-72 w-full my-4 flex items-end">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 240">
                <defs>
                  <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal lines */}
                <line x1="0" y1="40" x2="700" y2="40" stroke="#1f293d" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="700" y2="100" stroke="#1f293d" strokeDasharray="4 4" />
                <line x1="0" y1="160" x2="700" y2="160" stroke="#1f293d" strokeDasharray="4 4" />
                <line x1="0" y1="220" x2="700" y2="220" stroke="#1f293d" strokeDasharray="4 4" />

                {/* Dynamic Area Fill & Stroke based on chartData */}
                {(() => {
                  const data = selectedPair.chartData;
                  const min = Math.min(...data) * 0.99;
                  const max = Math.max(...data) * 1.01;
                  const points = data
                    .map((val, idx) => {
                      const x = (idx / (data.length - 1)) * 700;
                      const y = 220 - ((val - min) / (max - min)) * 180;
                      return `${x},${y}`;
                    })
                    .join(' ');

                  const areaPoints = `0,230 ${points} 700,230`;

                  return (
                    <>
                      <polygon points={areaPoints} fill="url(#emeraldGradient)" />
                      <polyline
                        points={points}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Pulse point at latest coordinate */}
                      {data.length > 0 && (
                        <circle
                          cx="700"
                          cy={220 - ((data[data.length - 1] - min) / (max - min)) * 180}
                          r="6"
                          fill="#34d399"
                          className="animate-ping"
                        />
                      )}
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* Sub stats row */}
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/5 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">24h High</span>
                <span className="text-white font-bold">${selectedPair.high24h.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">24h Low</span>
                <span className="text-white font-bold">${selectedPair.low24h.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">24h Vol (USDT)</span>
                <span className="text-white font-bold">{selectedPair.volume}</span>
              </div>
            </div>
          </div>

          {/* Workable DEX Token Swap Widget (4 cols) */}
          <div className="lg:col-span-4 bg-[#0c1328]/90 rounded-2xl p-5 border border-emerald-500/20 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                    Instant DEX Swap
                  </h3>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono">Slippage: 0.5%</span>
              </div>

              {/* Pay Token */}
              <div className="bg-[#070b14] p-3.5 rounded-xl border border-white/10 mb-3">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
                  <span>You Pay</span>
                  <span>Balance: 12.45 {swapFromToken}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="number"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                    className="bg-transparent text-xl font-bold text-white focus:outline-none w-full font-mono"
                    placeholder="0.0"
                  />
                  <select
                    value={swapFromToken}
                    onChange={(e) => setSwapFromToken(e.target.value)}
                    className="bg-[#0e162b] text-xs font-bold text-white px-2.5 py-1.5 rounded-lg border border-white/20 focus:outline-none"
                  >
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                    <option value="BTC">BTC</option>
                    <option value="USDC">USDC</option>
                    <option value="LMN">LMN</option>
                  </select>
                </div>
              </div>

              {/* Swap Arrow Button */}
              <div className="flex justify-center -my-2 relative z-10">
                <button
                  onClick={() => {
                    const temp = swapFromToken;
                    setSwapFromToken(swapToToken);
                    setSwapToToken(temp);
                  }}
                  className="p-2 rounded-xl bg-[#0c1328] hover:bg-emerald-950 border border-emerald-500/40 text-emerald-400 transition-colors shadow-md"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 rotate-90" />
                </button>
              </div>

              {/* Receive Token */}
              <div className="bg-[#070b14] p-3.5 rounded-xl border border-white/10 mt-1 mb-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
                  <span>You Receive (Estimated)</span>
                  <span>Fee: $1.20</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xl font-bold text-emerald-400 font-mono">
                    {getEstimatedReceive()}
                  </div>
                  <select
                    value={swapToToken}
                    onChange={(e) => setSwapToToken(e.target.value)}
                    className="bg-[#0e162b] text-xs font-bold text-white px-2.5 py-1.5 rounded-lg border border-white/20 focus:outline-none"
                  >
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                    <option value="LMN">LMN</option>
                  </select>
                </div>
              </div>

              {/* Route details */}
              <div className="space-y-1.5 text-[11px] font-mono text-slate-400 mb-4 p-2.5 rounded-lg bg-white/5">
                <div className="flex justify-between">
                  <span>Best Route</span>
                  <span className="text-slate-200">Uniswap v3 (0.05% pool)</span>
                </div>
                <div className="flex justify-between">
                  <span>Price Impact</span>
                  <span className="text-emerald-400">&lt; 0.01%</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Gas</span>
                  <span className="text-slate-200">~ 14 Gwei ($0.68)</span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              disabled={isSwapping}
              className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-xl ${
                isSwapping
                  ? 'bg-emerald-900/50 text-emerald-300 cursor-not-allowed border border-emerald-500/30'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isSwapping ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>{swapStep}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-black fill-black" />
                  <span>Execute Swap ({swapFromToken} → {swapToToken})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Section: Automated Trading Bots & Live Activity Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Automated Bots Studio (6 cols) */}
          <div className="lg:col-span-6 bg-[#0c1328]/90 rounded-2xl p-5 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                  Automated Trading Bots
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Real-time triggers</span>
            </div>

            <div className="space-y-3">
              {bots.map((bot) => (
                <div
                  key={bot.id}
                  className="bg-[#070b14] p-3.5 rounded-xl border border-white/5 flex items-center justify-between hover:border-emerald-500/30 transition-all"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{bot.name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          bot.active
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-700/50 text-slate-400'
                        }`}
                      >
                        {bot.status}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      Profit: <strong className="text-emerald-400">{bot.profitUsd}</strong> ({bot.pnl}) • {bot.trades} trades executed
                    </div>
                  </div>

                  <button
                    onClick={() => toggleBot(bot.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                      bot.active
                        ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                    }`}
                  >
                    {bot.active ? 'Pause Bot' : 'Start Bot'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Web3 Transactions Stream (6 cols) */}
          <div className="lg:col-span-6 bg-[#0c1328]/90 rounded-2xl p-5 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                  Live Network Activity
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Mempool Stream
              </span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-2.5 rounded-xl bg-[#070b14] border border-white/5 flex items-center justify-between text-xs font-mono hover:bg-[#0a1020] transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-white font-semibold">{tx.pair}</span>
                      <div className="text-[10px] text-slate-500">{tx.hash} • {tx.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-300 font-bold">{tx.amount}</span>
                    <span className="block text-[10px] text-emerald-400">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
