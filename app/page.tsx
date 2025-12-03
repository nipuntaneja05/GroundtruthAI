"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import WorkspaceLayout from "@/components/workspace-layout"
import PromptInspector from "@/components/prompt-inspector"

export default function Home() {
  const [showInspector, setShowInspector] = useState(false)
  const [generatedCreatives, setGeneratedCreatives] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastRun, setLastRun] = useState<string | null>(null)
  const [inspectorData, setInspectorData] = useState({
    imagePrompt: "",
    captionPrompt: "",
  })

  const handleGenerate = async (data: any) => {
    setIsGenerating(true)
    setGeneratedCreatives([])

    try {
      // 1. Construct the Prompt (Keep your existing logic)
      const imagePrompt = `Create a ${data.style.toLowerCase()} advertisement for ${data.brandName}. Product: ${data.tagline}. Campaign: ${data.campaignGoal}. Style: Professional, high-quality, campaign-ready. Aspect ratio: ${data.aspectRatio}. Mood: trendy, modern, engaging.`

      // 2. Build FormData
      const form = new FormData()
      form.append("prompt", imagePrompt)
      form.append("aspectRatio", data.aspectRatio || "1:1")
      form.append("numImages", "1") // Hackathon speed: Generate 1 at a time to be safe

      // Append files if they exist
      if (data.brandLogo) form.append("brandLogo", data.brandLogo)
      if (data.productImage) form.append("productImage", data.productImage)

      console.log("[v0] Sending to API...")

      // 3. Fetch - NOTE: Do NOT set 'Content-Type': 'multipart/form-data' headers manually!
      const response = await fetch("/api/generate-gemini", {
        method: "POST",
        body: form,
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Generation failed")
      }

      const { images } = await response.json()

      // 4. Map response to your UI
      const newCreatives = images.map((imgUrl: string, i: number) => ({
        id: Date.now() + i,
        image: imgUrl,
        style: data.style,
        aspectRatio: data.aspectRatio,
        caption: `Generated for ${data.brandName}`,
        dimensions: "1024x1024",
        saved: false,
      }))

      setGeneratedCreatives(newCreatives)
      setLastRun("now")

    } catch (error: any) {
      console.error("Error:", error)
      alert(error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const getDimensions = (ratio: string): string => {
    const ratioMap: Record<string, string> = {
      "1:1": "1024×1024",
      "4:5": "1024×1280",
      "16:9": "1440×810",
      "9:16": "810×1440",
    }
    return ratioMap[ratio.split(" ")[0]] || "1024×1024"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navbar />

      <main className="relative">
        <Hero />

        <div className="relative px-4 md:px-8 lg:px-12 py-8 max-w-7xl mx-auto">
          <WorkspaceLayout
            onGenerate={handleGenerate}
            generatedCreatives={generatedCreatives}
            isGenerating={isGenerating}
            lastRun={lastRun}
            onToggleInspector={() => setShowInspector(!showInspector)}
            setGeneratedCreatives={setGeneratedCreatives}
          />
        </div>
      </main>

      {showInspector && <PromptInspector data={inspectorData} onClose={() => setShowInspector(false)} />}
    </div>
  )
}
