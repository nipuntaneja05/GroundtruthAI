/**
 * 🤖 MULTI-MODAL AGENTIC WORKFLOW
 * ------------------------------------------------------------------
 * This API route implements a chained AI pipeline using a "Orchestrator-Workers" pattern.
 * * ARCHITECTURE:
 * 1. 👁️ VISION AGENT (Gemini 1.5 Flash): 
 * - Ingests the raw binary data of the uploaded product image.
 * - Performs semantic visual analysis to extract key features (color, texture, form) 
 * - Output: A grounded visual descriptor string to prevent hallucination.
 *
 * 2. 🧠 CREATIVE DIRECTOR AGENT (Gemini 1.5 Flash):
 * - Receives User Prompt + Vision Data.
 * - Uses System Prompting to generate distinct art styles and creative directions.
 * - Output: 4 highly detailed, style-specific generation prompts.(Limited to 4 due to to API constraints)
 *
 * 3. 🎨 RENDERER AGENT (Black Forest Labs FLUX.1):
 * - Runs in parallel threads via Pollinations inference layer.
 * - Takes the detailed prompts and performs latent diffusion to generate high-fidelity assets.
 * - Output: 4 unique image URLs.
 *
 * 4. ✍️ COPYWRITER AGENT (Gemini Pro):
 * - Analyzes the specific art style of each variation.
 * - Generates context-aware marketing copy and captions.
 * - Output: JSON object containing captions and descriptions.
 * ------------------------------------------------------------------
 */

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
      // 1. Construct Prompt
      const imagePrompt = `Create a ${data.style?.toLowerCase() || "modern"} advertisement for ${data.brandName}. Product: ${data.tagline}. Campaign: ${data.campaignGoal}. Style: Professional, high-quality. Aspect ratio: ${data.aspectRatio}. Mood: trendy, modern.`

      const form = new FormData()
      form.append("prompt", imagePrompt)
      form.append("aspectRatio", data.aspectRatio || "1:1")
      // Force 4 variations
      form.append("numImages", data.variations ? String(data.variations) : "4") 

      if (data.brandLogo) form.append("brandLogo", data.brandLogo)
      if (data.productImage) form.append("productImage", data.productImage)

      console.log(" Sending to API...")

      // 2. Fetch
      const response = await fetch("/api/generate-gemini", {
        method: "POST",
        body: form,
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Unknown Error" }))
        throw new Error(err.error || "Generation failed")
      }

      const dataResponse = await response.json()

      // ⚡️ ROBUST FIX: Look for 'variations' OR 'images'
      // This prevents the app from crashing if the backend format changes
      const items = dataResponse.variations || dataResponse.images || [];

      if (!items || items.length === 0) {
        throw new Error("No images returned from API")
      }

      // 3. Map Data (Handles both Strings and Objects)
      const newCreatives = items.map((item: any, i: number) => {
        // Check if item is a simple URL string or a rich object
        const isObject = typeof item === 'object' && item !== null;
        
        return {
          id: Date.now() + i,
          // If Object -> use item.image. If String -> use item.
          image: isObject ? item.image : item,
          // If Object -> use item.caption. If String -> use Fallback Caption.
          caption: (isObject && item.caption) ? item.caption : `Ad variation ${i+1} for ${data.brandName}. optimized for high engagement.`,
          description: (isObject && item.description) ? item.description : "",
          style: data.style,
          aspectRatio: data.aspectRatio,
          dimensions: getDimensions(data.aspectRatio),
          saved: false,
        }
      })

      setGeneratedCreatives(newCreatives)
      setLastRun("now")

      setInspectorData({
        imagePrompt,
        captionPrompt: `Write a catchy caption for ${data.brandName}`,
      })

    } catch (error: any) {
      console.error("Error:", error)
      alert("Error: " + error.message)
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