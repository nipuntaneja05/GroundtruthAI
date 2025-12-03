"use client"

import { X, Copy, Check } from "lucide-react"
import { useState } from "react"

interface PromptInspectorProps {
  data: {
    imagePrompt: string
    captionPrompt: string
  }
  onClose: () => void
}

export default function PromptInspector({ data, onClose }: PromptInspectorProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-md glass rounded-2xl p-6 border border-white/10 z-40 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <h3 className="text-sm font-bold text-slate-100">📋 Prompt Inspector</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition">
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Image Prompt */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-300">Image Generation Prompt</label>
          <button
            onClick={() => handleCopy(data.imagePrompt, "image")}
            className="p-1 hover:bg-white/10 rounded transition"
          >
            {copied === "image" ? (
              <Check className="w-3.5 h-3.5 text-teal-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>
        <pre className="text-xs bg-black/30 rounded-lg p-3 text-slate-300 overflow-x-auto font-mono whitespace-pre-wrap break-words max-h-32">
          {data.imagePrompt}
        </pre>
      </div>

      {/* Caption Prompt */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-300">Caption LLM Prompt</label>
          <button
            onClick={() => handleCopy(data.captionPrompt, "caption")}
            className="p-1 hover:bg-white/10 rounded transition"
          >
            {copied === "caption" ? (
              <Check className="w-3.5 h-3.5 text-teal-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>
        <pre className="text-xs bg-black/30 rounded-lg p-3 text-slate-300 overflow-x-auto font-mono whitespace-pre-wrap break-words max-h-32">
          {data.captionPrompt}
        </pre>
      </div>
    </div>
  )
}
