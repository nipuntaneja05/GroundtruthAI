"use client"

import { useState } from "react"
import { Heart, Download, RefreshCw, Filter } from "lucide-react"

interface Creative {
  id: number
  image: string
  style: string
  aspectRatio: string
  caption: string
  dimensions: string
  saved: boolean
}

interface CreativePreviewProps {
  creatives: Creative[]
  isGenerating: boolean
  setCreatives: (creatives: Creative[]) => void
}

export default function CreativePreview({ creatives, isGenerating, setCreatives }: CreativePreviewProps) {
  const [filterActive, setFilterActive] = useState("All")
  const [sortBy, setSortBy] = useState("Newest first")

  const handleSave = (id: number) => {
    setCreatives(creatives.map((c) => (c.id === id ? { ...c, saved: !c.saved } : c)))
  }

  const shimmerCards = Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="rounded-xl overflow-hidden glass p-3 hover:scale-105 transition-transform">
      <div className="w-full aspect-square rounded-lg bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 shimmer" />
      <div className="mt-3 h-8 rounded bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 shimmer" />
    </div>
  ))

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-100">Creative Preview</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
            Model: SDXL-Turbo (Open Source)
          </span>
        </div>
      </div>

      {isGenerating ? (
        <>
          <div className="mb-6">
            <p className="text-sm text-slate-400 mb-4">Creating your ad creatives...</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{shimmerCards}</div>
          </div>
        </>
      ) : creatives.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-indigo-600/10 flex items-center justify-center mb-4">
            <span className="text-3xl">✨</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">No creatives yet</h3>
          <p className="text-sm text-slate-400 max-w-xs">
            Tune your controls on the left and click "Generate Creatives" to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/50">
            <div className="flex items-center gap-2 flex-wrap">
              {["All", "Approved", "Needs revision"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterActive(filter)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition ${
                    filterActive === filter
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-indigo-400/50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs px-2 py-1.5 rounded-lg appearance-none cursor-pointer focus:border-indigo-400"
              >
                <option className="bg-slate-900">Newest first</option>
                <option className="bg-slate-900">Highest rated</option>
                <option className="bg-slate-900">By style</option>
              </select>
            </div>
          </div>

          {/* Creatives Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {creatives.map((creative, index) => (
              <div
                key={creative.id}
                className="group rounded-xl overflow-hidden glass p-3 hover:scale-105 hover:shadow-xl hover:shadow-indigo-600/10 transition-all"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
                  <img
                    src={creative.image || "/placeholder.svg"}
                    alt={`Creative ${creative.id}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Style Tag */}
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/50 backdrop-blur text-xs font-semibold text-slate-100">
                    {creative.style} · {creative.aspectRatio}
                  </div>
                </div>

                {/* Caption */}
                <p className="mt-3 text-sm text-slate-300 line-clamp-2 leading-snug">{creative.caption}</p>

                {/* Metadata */}
                <p className="text-xs text-slate-500 mt-2">
                  #{index + 1} of {creatives.length} · {creative.dimensions}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium hover:bg-slate-700/50 transition flex items-center justify-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                  <button className="flex-1 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium hover:bg-slate-700/50 transition flex items-center justify-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5" />
                    Regen
                  </button>
                  <button
                    onClick={() => handleSave(creative.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-center ${
                      creative.saved
                        ? "bg-indigo-600/20 text-indigo-300"
                        : "bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-indigo-400/50"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${creative.saved ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
