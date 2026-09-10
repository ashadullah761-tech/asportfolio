'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ShoppingBag,
  Search,
  Filter,
  Star,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Truck,
  CreditCard,
  X,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  tag: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Aether Studio Cyberdeck Headset v2',
    category: 'Audio & Gear',
    price: 349.00,
    rating: 4.9,
    reviews: 128,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    tag: 'Bestseller',
  },
  {
    id: 'p-2',
    name: 'Luminary Tactile Mechanical Keyboard',
    category: 'Peripherals',
    price: 189.50,
    rating: 4.8,
    reviews: 94,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    tag: 'Featured',
  },
  {
    id: 'p-3',
    name: 'Velox Wireless Ergonomic Precision Mouse',
    category: 'Peripherals',
    price: 99.00,
    rating: 4.7,
    reviews: 210,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
  },
  {
    id: 'p-4',
    name: 'Neural Engine Ultra Wide Monitor 34"',
    category: 'Displays',
    price: 899.99,
    rating: 5.0,
    reviews: 76,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    tag: 'Pro Tier',
  },
  {
    id: 'p-5',
    name: 'Quantum Soundbar System with Subwoofer',
    category: 'Audio & Gear',
    price: 499.00,
    rating: 4.9,
    reviews: 42,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    tag: 'Top Rated',
  },
  {
    id: 'p-6',
    name: 'Cyberpunk Ambient Neon Lighting Desk Strip',
    category: 'Accessories',
    price: 45.00,
    rating: 4.6,
    reviews: 315,
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    tag: 'Popular',
  },
];

interface CartItem extends Product {
  quantity: number;
}

export default function VeloxStorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([
    { ...PRODUCTS[0], quantity: 1 },
    { ...PRODUCTS[2], quantity: 2 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const categories = ['All', 'Audio & Gear', 'Peripherals', 'Displays', 'Accessories'];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`Added "${product.name}" to cart!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'ASHADULLAH20' || couponCode.toUpperCase() === 'VELOX20') {
      const discVal = subtotal * 0.2;
      setDiscount(discVal);
      toast.success('🎉 20% Promo Code Applied Successfully!');
    } else {
      toast.error('Invalid code. Try "VELOX20" for 20% off!');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCart([]);
      setIsCartOpen(false);
      toast.success('📦 Order Placed Successfully! Sub-second headless Stripe session processed.');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <Toaster position="top-right" richColors />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0c1221]/90 backdrop-blur-xl border-b border-purple-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/#projects"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-xs font-semibold text-purple-300 hover:text-white transition-all shadow-sm group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-400 p-0.5 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                  VELOX <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">STORE</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Headless Next.js
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-purple-600/30 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
          <span className="ml-1 font-mono">${total.toFixed(2)}</span>
        </button>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-midnight-950 to-indigo-950/40 border-b border-purple-500/10 px-4 sm:px-8 py-10 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono border border-purple-500/30">
            ⚡ Ultra-Fast Headless E-Commerce Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Next-Gen Hardware & Cyber Setup
          </h2>
          <p className="text-sm text-slate-400">
            Powered by Next.js App Router, Stripe Checkout, and Instant Edge Caching. Use code <code className="text-purple-300 font-bold">VELOX20</code> for 20% off!
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#0f172a] text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0f172a] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-400 transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-[#0e1526] rounded-2xl border border-purple-500/15 overflow-hidden hover:border-purple-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-purple-600 text-white font-mono text-[10px] font-bold shadow-md">
                    {p.tag}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-purple-400 font-mono">
                    <span>{p.category}</span>
                    <span className="flex items-center text-amber-400 gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {p.rating} ({p.reviews})
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {p.name}
                  </h3>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="text-lg font-extrabold text-white font-mono">
                  ${p.price.toFixed(2)}
                </div>
                <button
                  onClick={() => addToCart(p)}
                  className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-semibold text-xs transition-all border border-purple-500/30 flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Side Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#0c1221] h-full p-6 border-l border-purple-500/20 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-bold text-white font-heading">Your Cart ({cart.length})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-[#070b14] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-slate-900 shrink-0">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white truncate max-w-[160px]">{item.name}</h4>
                          <span className="text-xs text-purple-400 font-mono">${item.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-white/5 text-slate-300">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-mono text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-white/5 text-slate-300">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Coupon & Checkout Summary */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (VELOX20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070b14] border border-white/10 text-xs text-white uppercase font-mono"
                />
                <button
                  onClick={applyCoupon}
                  className="px-3 py-2 rounded-xl bg-purple-600/30 text-purple-300 hover:text-white font-bold text-xs shrink-0"
                >
                  Apply
                </button>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (20%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-purple-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cart.length === 0}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing Stripe Session...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Stripe Checkout</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
