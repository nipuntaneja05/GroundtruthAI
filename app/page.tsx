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

    try {
      const imagePrompt = `Create a ${data.style.toLowerCase()} advertisement for ${data.brandName}. Product: ${data.tagline}. Campaign: ${data.campaignGoal}. Style: Professional, high-quality, campaign-ready. Aspect ratio: ${data.aspectRatio}. Mood: trendy, modern, engaging.`

      const captionPrompt = `Write a ${data.tone} ad caption for ${data.brandName}'s ${data.tagline}. Guidelines: ${data.guidelines}. Language: ${data.language}. Keep it under 3 lines.`

      console.log("[v0] Sending generation request to API")

      const response = await fetch("/api/generate-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: imagePrompt,
          numImages: data.variations,
          aspectRatio: data.aspectRatio,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[v0] API error:", errorData)
        alert("Error generating images: " + (errorData.error || "Unknown error"))
        setIsGenerating(false)
        return
      }

      const { images } = await response.json()
      console.log("[v0] Received images from API:", images.length)

      const newCreatives = images.map((imgDataUrl: string, i: number) => ({
        id: i + 1,
        image: imgDataUrl,
        style: data.style,
        aspectRatio: data.aspectRatio,
        caption: `${data.tagline} - Ad variation ${i + 1}. Perfect for your ${data.campaignGoal}.`,
        dimensions: getDimensions(data.aspectRatio),
        saved: false,
      }))

      setGeneratedCreatives(newCreatives)
      setLastRun("now")
      setInspectorData({
        imagePrompt,
        captionPrompt,
      })
    } catch (error) {
      console.error("[v0] Error during generation:", error)
      alert("Failed to generate images. Please try again.")
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
