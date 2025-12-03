"use client"

import ControlPanel from "./control-panel"
import CreativePreview from "./creative-preview"

interface WorkspaceLayoutProps {
  onGenerate: (data: any) => void
  generatedCreatives: any[]
  isGenerating: boolean
  lastRun: string | null
  onToggleInspector: () => void
  setGeneratedCreatives: (creatives: any[]) => void
}

export default function WorkspaceLayout({
  onGenerate,
  generatedCreatives,
  isGenerating,
  lastRun,
  onToggleInspector,
  setGeneratedCreatives,
}: WorkspaceLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Control Panel */}
      <div className="lg:col-span-1">
        <ControlPanel
          onGenerate={onGenerate}
          isGenerating={isGenerating}
          lastRun={lastRun}
          onToggleInspector={onToggleInspector}
        />
      </div>

      {/* Right Column - Creative Preview */}
      <div className="lg:col-span-2">
        <CreativePreview
          creatives={generatedCreatives}
          isGenerating={isGenerating}
          setCreatives={setGeneratedCreatives}
        />
      </div>
    </div>
  )
}
