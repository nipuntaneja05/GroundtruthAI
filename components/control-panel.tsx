"use client"

import { useState } from "react"
import { Upload, ChevronDown, Lightbulb } from "lucide-react"

interface ControlPanelProps {
  onGenerate: (data: any) => void
  isGenerating: boolean
  lastRun: string | null
  onToggleInspector: () => void
}

export default function ControlPanel({ onGenerate, isGenerating, lastRun, onToggleInspector }: ControlPanelProps) {
  const [campaignName, setCampaignName] = useState("Winter Launch – Coffee Bliss")
  const [campaignGoal, setCampaignGoal] = useState("Drive awareness for our new hazelnut latte in urban cafes.")
  const [brandName, setBrandName] = useState("Coffee Bliss")
  const [tagline, setTagline] = useState("Hazelnut Latte Perfection")
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Minimal"])
  const [aspectRatio, setAspectRatio] = useState("1:1 Square")
  const [variations, setVariations] = useState(4)
  const [generateCaptions, setGenerateCaptions] = useState(true)
  const [tone, setTone] = useState("energetic")
  const [guidelines, setGuidelines] = useState("Energetic, playful, Gen Z friendly. Mention limited-time 20% discount.")
  const [language, setLanguage] = useState("English")
  const [brandLogo, setBrandLogo] = useState<string | null>(null)
  const [productImage, setProductImage] = useState<string | null>(null)

  const styles = ["Minimal", "Bold", "Luxury", "Playful", "Tech", "Organic"]
  const aspectRatios = ["1:1 Square", "4:5 Portrait", "16:9 Landscape", "9:16 Story"]
  const languages = ["English", "Hindi", "Spanish", "French", "German"]

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]))
  }

  const handleGenerate = () => {
    onGenerate({
      campaignName,
      campaignGoal,
      brandName,
      tagline,
      style: selectedStyles[0],
      aspectRatio,
      variations,
      generateCaptions,
      tone,
      guidelines,
      language,
    })
  }

  return (
    <div className="glass rounded-2xl p-6 md:p-8 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-indigo-400" />
        Creative Setup
      </h2>

      {/* Project Info */}
      <div className="mb-6 pb-6 border-b border-slate-800/50">
        <label className="block text-sm font-semibold text-slate-300 mb-2">Campaign Name</label>
        <input
          type="text"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-100 text-sm placeholder-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        />

        <label className="block text-sm font-semibold text-slate-300 mt-4 mb-2">Campaign Goal</label>
        <textarea
          value={campaignGoal}
          onChange={(e) => setCampaignGoal(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-100 text-sm placeholder-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 resize-none h-20"
        />
      </div>

      {/* Brand Assets */}
      <div className="mb-6 pb-6 border-b border-slate-800/50">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Brand Assets</h3>

        {/* Logo Upload */}
        <label className="block mb-4">
          <div className="relative border-2 border-dashed border-slate-700/50 rounded-lg p-6 hover:border-indigo-400/50 transition cursor-pointer bg-slate-800/30">
            <div className="flex flex-col items-center justify-center text-center">
              {brandLogo ? (
                <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center text-xs text-slate-400">
                  ✓ Logo
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-xs text-slate-400">Brand logo (PNG/SVG)</span>
                </>
              )}
            </div>
            <input type="file" className="hidden" onChange={(e) => setBrandLogo(e.target.files?.[0]?.name || null)} />
          </div>
        </label>

        {/* Product Upload */}
        <label className="block">
          <div className="relative border-2 border-dashed border-slate-700/50 rounded-lg p-6 hover:border-indigo-400/50 transition cursor-pointer bg-slate-800/30">
            <div className="flex flex-col items-center justify-center text-center">
              {productImage ? (
                <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center text-xs text-slate-400">
                  ✓ Product
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-xs text-slate-400">Product image (PNG/JPG)</span>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setProductImage(e.target.files?.[0]?.name || null)}
            />
          </div>
        </label>

        <p className="text-xs text-slate-500 mt-3">
          💡 You will later connect this to your image generation API. For now, these are front-end only.
        </p>
      </div>

      {/* Creative Controls */}
      <div className="mb-6 pb-6 border-b border-slate-800/50">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Creative Controls</h3>

        <label className="block text-xs font-semibold text-slate-400 mb-1">Brand Name</label>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-100 text-sm mb-4 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        />

        <label className="block text-xs font-semibold text-slate-400 mb-1">Tagline / Key Phrase</label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-100 text-sm mb-4 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        />

        <label className="block text-xs font-semibold text-slate-400 mb-3">Ad Style</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => handleStyleToggle(style)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedStyles.includes(style)
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-indigo-400/50"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Aspect Ratio</label>
            <div className="relative">
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-100 text-sm appearance-none cursor-pointer focus:border-indigo-400"
              >
                {aspectRatios.map((ratio) => (
                  <option key={ratio} value={ratio} className="bg-slate-900 text-slate-100">
                    {ratio}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Variations</label>
            <input
              type="range"
              min="1"
              max="10"
              value={variations}
              onChange={(e) => setVariations(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-slate-700/50 appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-xs text-slate-400 mt-1 block text-center">{variations} variations</span>
          </div>
        </div>
      </div>

      {/* Copy & Caption */}
      <div className="mb-6 pb-6 border-b border-slate-800/50">
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            id="captions"
            checked={generateCaptions}
            onChange={(e) => setGenerateCaptions(e.target.checked)}
            className="w-4 h-4 rounded cursor-pointer accent-indigo-600"
          />
          <label htmlFor="captions" className="text-sm font-semibold text-slate-300 cursor-pointer">
            Generate captions with AI
          </label>
        </div>

        {generateCaptions && (
          <>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Tone & Guidelines</label>
            <textarea
              value={guidelines}
              onChange={(e) => setGuidelines(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-100 text-sm placeholder-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 resize-none h-16 mb-3"
            />

            <label className="block text-xs font-semibold text-slate-400 mb-1">Primary Language</label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-100 text-sm appearance-none cursor-pointer focus:border-indigo-400"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-slate-900 text-slate-100">
                    {lang}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mb-4">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold hover:shadow-lg hover:shadow-indigo-600/30 hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="pulse-dots">
                <span />
                <span />
                <span />
              </div>
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Creatives"
          )}
        </button>
        <button className="w-full px-4 py-2 rounded-lg glass-light text-slate-200 font-semibold hover:bg-white/10 text-sm">
          Quick Preview
        </button>
      </div>

      {/* Status */}
      <div className="pt-4 border-t border-slate-800/50 text-center">
        {isGenerating ? (
          <p className="text-xs text-slate-400">Generating creatives...</p>
        ) : lastRun ? (
          <p className="text-xs text-slate-400">
            ✓ Last run: <span className="text-indigo-400">just now</span>
          </p>
        ) : (
          <p className="text-xs text-slate-500">Ready to generate</p>
        )}
      </div>

      {/* Inspector Toggle */}
      <button
        onClick={onToggleInspector}
        className="w-full mt-4 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition"
      >
        📋 Show Prompt Inspector
      </button>
    </div>
  )
}
