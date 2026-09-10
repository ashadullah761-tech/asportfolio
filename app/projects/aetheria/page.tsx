'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Wand2,
  Download,
  Copy,
  RefreshCw,
  Sliders,
  Maximize2,
  ChevronLeft,
  Check,
  Zap,
  Layers,
  Image as ImageIcon,
  Cpu,
  Share2,
  Eye,
  SlidersHorizontal,
  Flame,
  Info,
  X,
  History,
  Palette,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface GeneratedImage {
  id: string;
  prompt: string;
  style: string;
  model: string;
  aspectRatio: string;
  imageUrl: string;
  createdAt: string;
  seed: number;
  steps: number;
}

const PRESET_PROMPTS = [
  'Futuristic cybernetic samurai standing on a neon rain-drenched Tokyo rooftop at midnight, volumetric purple haze, 8k octane render',
  'Ethereal cosmic goddess holding a miniature glowing galaxy in her palms, stardust flowing like silk, bioluminescent nebula',
  'Hyper-realistic futuristic electric hypercar concept with glowing aerodynamic veins driving through a crystal tunnel',
  'Cozy isometric greenhouse laboratory with glowing alien flora and floating robotic botanists, highly detailed 3D render',
  'Ancient mythical dragon carved from emerald and obsidian perched on a floating mountain peak surrounded by lightning',
  'Cinematic portrait of an astronaut looking at earth reflection in golden helmet visor, sunrise in outer space',
];

const STYLES = [
  { id: 'photoreal', name: 'Photorealistic', icon: '📸', desc: 'Ultra-realistic 8K camera detail' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', icon: '🌆', desc: 'Vibrant neon, rainy cityscapes' },
  { id: 'anime', name: 'Studio Anime', icon: '✨', desc: 'Makoto Shinkai aesthetic lighting' },
  { id: '3d-render', name: '3D Pixar/Octane', icon: '🔮', desc: 'Ray-traced soft 3D illumination' },
  { id: 'dark-fantasy', name: 'Dark Fantasy', icon: '⚔️', desc: 'Moody Elden Ring oil aesthetics' },
  { id: 'synthwave', name: 'Retro Synthwave', icon: '🌴', desc: '80s magenta glow & wireframes' },
  { id: 'surreal', name: 'Surrealism', icon: '🎨', desc: 'Dalí inspired dreamscapes' },
  { id: 'vector', name: 'Minimalist Vector', icon: '📐', desc: 'Clean geometric vector art' },
];

const MODELS = [
  { id: 'flux-1.1-pro', name: 'Flux 1.1 Pro', tag: 'Fastest & Sharp', time: '1.2s', credits: 2 },
  { id: 'midjourney-v6', name: 'Midjourney v6.1', tag: 'Cinematic Master', time: '2.5s', credits: 3 },
  { id: 'dalle-3', name: 'DALL-E 3 Turbo', tag: 'Precise Semantics', time: '2.0s', credits: 2 },
  { id: 'sdxl-turbo', name: 'SDXL Lightning', tag: 'Open Latent Diffusion', time: '0.8s', credits: 1 },
];

const ASPECT_RATIOS = [
  { id: '1:1', label: '1:1 Square', dimensions: '1024 x 1024', aspectClass: 'aspect-square' },
  { id: '16:9', label: '16:9 Cinema', dimensions: '1920 x 1080', aspectClass: 'aspect-video' },
  { id: '9:16', label: '9:16 Reel/Story', dimensions: '1080 x 1920', aspectClass: 'aspect-[9/16]' },
  { id: '4:3', label: '4:3 Classic', dimensions: '1440 x 1080', aspectClass: 'aspect-[4/3]' },
];

const INITIAL_GALLERY: GeneratedImage[] = [
  {
    id: 'art-1',
    prompt: 'Futuristic cybernetic samurai standing on a neon rain-drenched Tokyo rooftop at midnight, volumetric purple haze, 8k octane render',
    style: 'Cyberpunk Neon',
    model: 'Midjourney v6.1',
    aspectRatio: '16:9',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85',
    createdAt: 'Just now',
    seed: 4892019,
    steps: 35,
  },
  {
    id: 'art-2',
    prompt: 'Ethereal cosmic goddess holding a miniature glowing galaxy in her palms, stardust flowing like silk, bioluminescent nebula',
    style: 'Surrealism',
    model: 'Flux 1.1 Pro',
    aspectRatio: '1:1',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=85',
    createdAt: '12m ago',
    seed: 9283741,
    steps: 40,
  },
  {
    id: 'art-3',
    prompt: 'Hyper-realistic futuristic electric hypercar concept with glowing aerodynamic veins driving through a crystal tunnel',
    style: 'Photorealistic',
    model: 'Flux 1.1 Pro',
    aspectRatio: '16:9',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=85',
    createdAt: '45m ago',
    seed: 3109284,
    steps: 30,
  },
  {
    id: 'art-4',
    prompt: 'Cozy isometric greenhouse laboratory with glowing alien flora and floating robotic botanists, highly detailed 3D render',
    style: '3D Pixar/Octane',
    model: 'DALL-E 3 Turbo',
    aspectRatio: '1:1',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=85',
    createdAt: '1h ago',
    seed: 7729103,
    steps: 50,
  },
  {
    id: 'art-5',
    prompt: 'Ancient mythical dragon carved from emerald and obsidian perched on a floating mountain peak surrounded by lightning',
    style: 'Dark Fantasy',
    model: 'Midjourney v6.1',
    aspectRatio: '16:9',
    imageUrl: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1400&q=85',
    createdAt: '2h ago',
    seed: 5541092,
    steps: 45,
  },
  {
    id: 'art-6',
    prompt: 'Cinematic portrait of an astronaut looking at earth reflection in golden helmet visor, sunrise in outer space',
    style: 'Photorealistic',
    model: 'Flux 1.1 Pro',
    aspectRatio: '1:1',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    createdAt: '3h ago',
    seed: 1092834,
    steps: 32,
  },
];

// Fallback high-res generative image library for dynamic generation simulation
const GENERATIVE_PRESETS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85',
];

export default function AetheriaStudioPage() {
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0]);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[1].name);
  const [selectedModel, setSelectedModel] = useState(MODELS[0].name);
  const [selectedRatio, setSelectedRatio] = useState(ASPECT_RATIOS[1]);
  const [negativePrompt, setNegativePrompt] = useState('blurry, bad anatomy, lowres, distorted faces, watermark');
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [steps, setSteps] = useState(35);
  const [seed, setSeed] = useState(4892019);
  const [credits, setCredits] = useState(840);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('');
  const [gallery, setGallery] = useState<GeneratedImage[]>(INITIAL_GALLERY);
  const [currentActiveArt, setCurrentActiveArt] = useState<GeneratedImage>(INITIAL_GALLERY[0]);
  const [lightboxImage, setLightboxImage] = useState<GeneratedImage | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMagicPrompt = () => {
    const randomIndex = Math.floor(Math.random() * PRESET_PROMPTS.length);
    const chosen = PRESET_PROMPTS[randomIndex];
    setPrompt(chosen);
    setSeed(Math.floor(Math.random() * 9000000) + 1000000);
    toast.success('Prompt injected with AI magic styling!');
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a creative prompt first!');
      return;
    }

    if (credits < 2) {
      toast.error('Insufficient credits. Free demo refill activated!');
      setCredits(500);
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(10);
    setGenerationStage('Tokenizing prompt & semantic embeddings...');
    setCredits((prev) => prev - 2);

    const stage1 = setTimeout(() => {
      setGenerationProgress(45);
      setGenerationStage(`Latent diffusion denoising (${steps} iterations on ${selectedModel})...`);
    }, 700);

    const stage2 = setTimeout(() => {
      setGenerationProgress(80);
      setGenerationStage('Neural upscaling 4K & HDR color grading...');
    }, 1500);

    const stage3 = setTimeout(() => {
      setGenerationProgress(100);
      setGenerationStage('Synthesis completed!');

      // Select generative image based on prompt hash/random
      const randomIndex = Math.floor(Math.random() * GENERATIVE_PRESETS.length);
      const newArt: GeneratedImage = {
        id: `art-${Date.now()}`,
        prompt: prompt,
        style: selectedStyle,
        model: selectedModel,
        aspectRatio: selectedRatio.id,
        imageUrl: GENERATIVE_PRESETS[randomIndex],
        createdAt: 'Just now',
        seed: seed,
        steps: steps,
      };

      setGallery((prev) => [newArt, ...prev]);
      setCurrentActiveArt(newArt);
      setIsGenerating(false);
      setGenerationProgress(0);
      toast.success('✨ Artwork synthesized successfully in 2.1s!');
    }, 2200);

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
    };
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (imageUrl: string, title: string) => {
    toast.success('Downloading high-resolution master asset (4K PNG)...');
    const a = document.createElement('a');
    a.href = imageUrl;
    a.target = '_blank';
    a.download = `${title.slice(0, 20).replace(/\s+/g, '_')}_aetheria_4k.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <Toaster position="top-right" richColors />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0b0f1f]/80 backdrop-blur-xl border-b border-purple-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/30">
              <div className="w-full h-full bg-[#090d1a] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                  Aetheria <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI Studio</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  v2.4 Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Multi-Model Latent Diffusion & Neural Synthesis Engine
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Status badge */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Cluster Online (99.9%)</span>
          </div>

          {/* Credits pill */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{credits} Credits</span>
          </div>

          {/* Creator tag */}
          <div className="hidden lg:flex items-center space-x-1 px-3 py-1 rounded-xl bg-purple-900/20 border border-purple-500/20 text-slate-300 text-xs font-mono">
            <span>Engineered by</span>
            <span className="text-purple-400 font-bold">Ashadullah</span>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 max-w-[1680px] mx-auto w-full">
        {/* Left Sidebar - Studio Prompt & Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-5">
          {/* Prompt Section Card */}
          <div className="bg-[#0e1428]/90 backdrop-blur-md rounded-2xl p-5 border border-purple-500/20 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Wand2 className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-purple-300 font-mono">
                  Prompt Studio
                </h2>
              </div>
              <button
                onClick={handleMagicPrompt}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-[11px] font-semibold text-purple-300 hover:text-white transition-all shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Magic Enhance</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="Describe your vision with intricate lighting, octane render, futuristic mood..."
                className="w-full px-4 py-3 rounded-xl bg-[#080c1a] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all resize-none placeholder:text-slate-500 leading-relaxed font-sans"
              />
            </div>

            {/* Quick Inspiration Pills */}
            <div className="mt-3">
              <p className="text-[11px] text-slate-400 mb-2 font-mono flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> Trending Prompt Starters:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(p);
                      toast.info('Loaded inspiration prompt');
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/20 text-slate-300 hover:text-white text-left truncate max-w-[280px] transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model & Style Selectors */}
          <div className="bg-[#0e1428]/90 backdrop-blur-md rounded-2xl p-5 border border-purple-500/20 shadow-xl space-y-4">
            {/* AI Model Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Synthesis Engine
                </label>
                <span className="text-[11px] text-slate-400">Selected: <strong className="text-cyan-300">{selectedModel}</strong></span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.name)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      selectedModel === model.name
                        ? 'bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border-purple-400 shadow-lg shadow-purple-500/20'
                        : 'bg-[#080c1a] border-white/5 hover:border-purple-500/30 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{model.name}</span>
                      <span className="text-[10px] font-mono text-purple-300">{model.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{model.tag}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Art Style Preset Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-purple-400" /> Artistic Aesthetics
                </label>
                <span className="text-[11px] text-purple-300">{selectedStyle}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.name)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                      selectedStyle === style.name
                        ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-400'
                        : 'bg-[#080c1a] border-white/5 hover:border-purple-500/30 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-lg mb-1">{style.icon}</span>
                    <span className="text-[11px] font-semibold">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-2 block flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Canvas Dimensions
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      selectedRatio.id === ratio.id
                        ? 'bg-indigo-600/30 border-indigo-400 text-white ring-1 ring-indigo-400'
                        : 'bg-[#080c1a] border-white/5 hover:border-purple-500/30 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{ratio.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{ratio.dimensions}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Toggle */}
            <div className="pt-2 border-t border-white/5">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-xs text-slate-400 hover:text-purple-300 font-mono transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Advanced Neural Parameters
                </span>
                <span>{showAdvanced ? '▲ Hide' : '▼ Expand'}</span>
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 pt-3 overflow-hidden"
                  >
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Negative Prompt</label>
                      <input
                        type="text"
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#080c1a] border border-white/10 text-xs text-slate-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>Guidance Scale (CFG)</span>
                          <span className="font-mono text-cyan-400">{guidanceScale}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          step="0.5"
                          value={guidanceScale}
                          onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>Denoising Steps</span>
                          <span className="font-mono text-cyan-400">{steps}</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="60"
                          step="5"
                          value={steps}
                          onChange={(e) => setSteps(parseInt(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-xl ${
                isGenerating
                  ? 'bg-purple-900/50 text-purple-300 cursor-not-allowed border border-purple-500/30'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-purple-600/40 hover:shadow-purple-500/60 hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Synthesizing Latent Diffusion ({generationProgress}%)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-bounce" />
                  <span>Synthesize Masterpiece (2 Credits)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center/Right Main Canvas & Gallery (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-5">
          {/* Active Canvas Showcase */}
          <div className="bg-[#0e1428]/90 backdrop-blur-md rounded-2xl p-5 border border-purple-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  Active Synthesis Canvas
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  {currentActiveArt.model}
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                  {currentActiveArt.style}
                </span>
              </div>
            </div>

            {/* Canvas Viewport */}
            <div className="relative w-full rounded-xl overflow-hidden bg-[#060812] border border-purple-500/30 group min-h-[380px] max-h-[500px] flex items-center justify-center">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 w-full">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
                    <Sparkles className="w-8 h-8 text-purple-400 absolute inset-0 m-auto animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      Generating Neural Artwork
                    </h4>
                    <p className="text-xs text-purple-300 font-mono">{generationStage}</p>
                  </div>
                  <div className="w-full max-w-md bg-slate-900 rounded-full h-2.5 overflow-hidden border border-purple-500/30">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 h-full rounded-full"
                      style={{ width: `${generationProgress}%` }}
                      transition={{ ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative w-full h-[460px]">
                    <Image
                      src={currentActiveArt.imageUrl}
                      alt={currentActiveArt.prompt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Canvas Floating Action Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#090e21]/80 backdrop-blur-md border border-purple-500/30">
                    <div className="truncate max-w-[65%]">
                      <p className="text-xs text-white font-medium truncate">
                        {currentActiveArt.prompt}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Seed: {currentActiveArt.seed} • Steps: {currentActiveArt.steps} • {currentActiveArt.createdAt}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleCopyPrompt(currentActiveArt.prompt)}
                        className="p-2 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 text-purple-300 hover:text-white border border-purple-500/30 transition-all"
                        title="Copy Prompt"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => setLightboxImage(currentActiveArt)}
                        className="p-2 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 text-purple-300 hover:text-white border border-purple-500/30 transition-all"
                        title="Fullscreen Lightbox"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDownload(currentActiveArt.imageUrl, currentActiveArt.prompt)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs flex items-center space-x-1 hover:brightness-110 shadow-md shadow-purple-600/30"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>4K Download</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Creation History & Gallery Feed */}
          <div className="bg-[#0e1428]/90 backdrop-blur-md rounded-2xl p-5 border border-purple-500/20 shadow-xl flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <History className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  Session Gallery History ({gallery.length})
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Click any card to preview</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto max-h-[300px] pr-1">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentActiveArt(item)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all h-28 bg-[#080c1a] ${
                    currentActiveArt.id === item.id
                      ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20'
                      : 'border-purple-500/20 hover:border-purple-400'
                  }`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.prompt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                    <p className="text-[10px] text-white font-semibold line-clamp-1">
                      {item.prompt}
                    </p>
                    <span className="text-[9px] text-cyan-300 font-mono">
                      {item.style}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#0c1024] rounded-2xl border border-purple-500/40 p-4 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[65vh] rounded-xl overflow-hidden mb-4">
                <Image
                  src={lightboxImage.imageUrl}
                  alt={lightboxImage.prompt}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {lightboxImage.prompt}
                  </h4>
                  <p className="text-xs text-purple-300 font-mono">
                    Model: {lightboxImage.model} • Style: {lightboxImage.style} • Seed: {lightboxImage.seed}
                  </p>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleCopyPrompt(lightboxImage.prompt)}
                    className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-semibold flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </button>
                  <button
                    onClick={() => handleDownload(lightboxImage.imageUrl, lightboxImage.prompt)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center space-x-1 shadow-lg shadow-purple-600/40 hover:brightness-110"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Original</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
