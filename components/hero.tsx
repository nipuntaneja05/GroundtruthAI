"use client"

export default function Hero() {
  return (
    <div className="relative pt-12 md:pt-20 pb-12 md:pb-16 px-4 max-w-4xl mx-auto text-center">
      <div className="absolute inset-0 -top-20 blur-3xl opacity-15">
        <div className="absolute w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply left-1/4 animate-pulse" />
        <div className="absolute w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply right-1/4 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6 md:mb-8">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs md:text-sm font-medium text-slate-300">
            Hackathon Edition · Powered by open-source models
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-4 md:mb-6 leading-tight">
          Auto-Generate High-Impact
          <span className="gradient-text"> Ad Creatives</span>
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10">
          Upload your brand assets, pick a vibe, and let AI create campaign-ready visuals and captions in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold hover:shadow-lg hover:shadow-indigo-600/30 hover:scale-105 transition-all">
            Start Creating
          </button>
          <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full glass-light text-slate-200 font-semibold hover:bg-white/10 transition">
            View Docs
          </button>
        </div>
      </div>
    </div>
  )
}
