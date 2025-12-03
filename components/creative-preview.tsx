"use client"

import { useState } from "react"
import { Heart, Download, Filter, Copy, Check, Loader2 } from "lucide-react"
import JSZip from "jszip"
import { saveAs } from "file-saver"

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
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [isZipping, setIsZipping] = useState(false)

  const handleSave = (id: number) => {
    setCreatives(creatives.map((c) => (c.id === id ? { ...c, saved: !c.saved } : c)))
  }

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // 🔥 NEW FUNCTION: Download All as ZIP
  const handleDownloadAll = async () => {
    if (creatives.length === 0) return
    setIsZipping(true)

    try {
      const zip = new JSZip()
      const folder = zip.folder("ad_campaign_assets")

      // Fetch all images and add to zip
      const promises = creatives.map(async (creative, index) => {
        try {
          const response = await fetch(creative.image)
          const blob = await response.blob()
          const fileName = `variation_${index + 1}_${creative.style}.jpg`
          
          // Add image to zip folder
          folder?.file(fileName, blob)
          
          // Optional: Add a text file with the caption
          folder?.file(`variation_${index + 1}_caption.txt`, creative.caption)
        } catch (err) {
          console.error("Failed to zip image:", err)
        }
      })

      await Promise.all(promises)

      // Generate and save
      const content = await zip.generateAsync({ type: "blob" })
      saveAs(content, "Campaign_Assets.zip")

    } catch (error) {
      alert("Failed to create zip file")
    } finally {
      setIsZipping(false)
    }
  }

  const shimmerCards = Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="rounded-xl overflow-hidden glass p-3 hover:scale-105 transition-transform">
      <div className="w-full aspect-square rounded-lg bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 shimmer animate-pulse" />
      <div className="mt-3 h-8 rounded bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 shimmer animate-pulse" />
    </div>
  ))

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-100">Creative Preview</h2>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-400 px-3 py-1 rounded-full bg-indigo-900/20 border border-indigo-500/20">
             Powered by Flux.1 & Gemini 1.5
          </span>
        </div>
      </div>

      {isGenerating ? (
        <>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
              <p className="text-sm text-slate-400">Generating {creatives.length} of 4 variations...</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creatives.map((creative) => (
                <div key={creative.id} className="group rounded-xl overflow-hidden glass p-3 opacity-50">
                   <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <img src={creative.image} className="w-full h-full object-cover" />
                   </div>
                </div>
              ))}
              {shimmerCards.slice(creatives.length)}
            </div>
          </div>
        </>
      ) : creatives.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center border-2 border-dashed border-slate-700/50 rounded-xl">
          <div className="w-16 h-16 rounded-full bg-indigo-600/10 flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Ready to Create</h3>
          <p className="text-sm text-slate-400 max-w-xs">
            Configure your campaign settings on the left and click "Generate" to see the magic.
          </p>
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/50">
            <div className="flex items-center gap-2 flex-wrap">
              {["All", ].map((filter) => (
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
              {/* 🔥 REPLACED SORT DROPDOWN WITH DOWNLOAD ALL BUTTON */}
              <button
                onClick={handleDownloadAll}
                disabled={isZipping}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isZipping ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Zipping...
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    Download All (.zip)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Creatives Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {creatives.map((creative, index) => (
              <div
                key={creative.id}
                className="group rounded-xl overflow-hidden glass p-3 hover:scale-[1.01] transition-all duration-300 border border-slate-700/50 hover:border-indigo-500/50"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-800">
                  <img
                    src={creative.image || "/placeholder.svg"}
                    alt={`Creative ${creative.id}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold tracking-wide text-white border border-white/10">
                    {creative.style?.toUpperCase()}
                  </div>
                </div>

                {/* Caption Section */}
                <div className="mt-3 space-y-2">
                    <div className="h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pr-1">
                        <p className="text-sm font-medium text-slate-200 leading-relaxed">
                            {creative.caption || "Generating caption..."}
                        </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800">
                        <span>Variation #{index + 1}</span>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => handleCopy(creative.caption, creative.id)}
                                className="hover:text-white transition" 
                                title="Copy Caption"
                            >
                                {copiedId === creative.id ? <Check size={14} className="text-green-400"/> : <Copy size={14}/>}
                            </button>
                            <span>{creative.dimensions}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3 pt-2">
                  <a 
                    href={creative.image} 
                    download={`creative_${creative.id}.jpg`}
                    target="_blank"
                    className="flex-1 px-3 py-2 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold hover:bg-indigo-600 hover:text-white transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>
                  
                  <button
                    onClick={() => handleSave(creative.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-center border ${
                      creative.saved
                        ? "bg-pink-600/20 border-pink-500/20 text-pink-300"
                        : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-slate-500"
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