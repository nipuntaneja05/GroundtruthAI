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

  const getDimensions = (ratio: string): string => {
    const ratioMap: Record<string, string> = {
      "1:1": "1024×1024",
      "4:5": "1024×1280",
      "16:9": "1440×810",
      "9:16": "810×1440",
    }
    // Safety check: if ratio is undefined, default to 1:1
    const key = ratio ? ratio.split(" ")[0] : "1:1"
    return ratioMap[key] || "1024×1024"
  }

  const handleGenerate = async (data: any) => {
    setIsGenerating(true)
    setGeneratedCreatives([])

    try {
      // 1. Construct the Base Prompt
      const imagePrompt = `Create a ${data.style?.toLowerCase() || "modern"} advertisement for ${data.brandName}. Product: ${data.tagline}. Campaign: ${data.campaignGoal}. Style: Professional, high-quality, campaign-ready. Aspect ratio: ${data.aspectRatio}. Mood: trendy, modern, engaging.`

      const captionPrompt = `Write a ${data.tone || "professional"} ad caption for ${data.brandName}.`

      // 2. Build FormData
      const form = new FormData()
      form.append("prompt", imagePrompt)
      form.append("aspectRatio", data.aspectRatio || "1:1")
      
      // ⚡ UPDATE: Request 4 variations explicitly (or use UI selection)
      // This triggers the loop in your backend to generate 4 unique styles
      form.append("numImages", data.variations ? String(data.variations) : "4")

      // Append files if they exist
      if (data.brandLogo) form.append("brandLogo", data.brandLogo)
      if (data.productImage) form.append("productImage", data.productImage)

      console.log("[v0] Sending to API (Requesting 4 variations)...")

      // 3. Fetch
      const response = await fetch("/api/generate-gemini", {
        method: "POST",
        body: form,
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Unknown Error" }))
        throw new Error(err.error || "Generation failed")
      }

      const { images } = await response.json()

      if (!images || images.length === 0) {
        throw new Error("No images were returned from the API")
      }

      // 4. Map response to your UI
      const newCreatives = images.map((imgUrl: string, i: number) => ({
        id: Date.now() + i,
        image: imgUrl,
        style: data.style, // Each image technically has a different style now, but we keep the user selection for reference
        aspectRatio: data.aspectRatio,
        caption: `Variation ${i + 1}: Generated for ${data.brandName}`, 
        dimensions: getDimensions(data.aspectRatio),
        saved: false,
      }))

      setGeneratedCreatives(newCreatives)
      setLastRun("now")
      
      // Update inspector to show what we sent
      setInspectorData({
        imagePrompt,
        captionPrompt,
      })

    } catch (error: any) {
      console.error("Error:", error)
      alert("Generation failed: " + error.message)
    } finally {
      setIsGenerating(false)
    }
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