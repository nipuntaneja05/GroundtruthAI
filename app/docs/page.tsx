"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Code2, Zap, Palette, Brain, FileText } from "lucide-react"

export default function DocsPage() {
  const [selectedSection, setSelectedSection] = useState<string>("overview")

  const sections = {
    overview: {
      title: "Overview",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-3">AdCreative Studio</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              An AI-powered Auto-Creative Engine that takes a brand's logo, product image, and creative preferences,
              then automatically generates a full set of marketing-ready ad creatives with matching captions in seconds.
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 my-4">
            <p className="text-slate-300">
              Uses open-source image generation models (FLUX.1 & GEMINI-1.5) and LLMs for caption generation,
              packaged inside a beautiful, intuitive interface.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Built for Innovation</h3>
            <p className="text-slate-300">
              This project was built for GroundTruth AI Hackathon 2025 – Generative AI & Marketing Tech Track (H-003)
            </p>
          </div>
        </div>
      ),
    },
    problem: {
      title: "The Problem",
      icon: Brain,
      content: (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg">
            Brands and marketers spend weeks designing variations of the same ad creative:
          </p>
          <ul className="space-y-3">
            {[
              "Multiple sizes & formats",
              "New backgrounds & color themes",
              "Changing the vibe/style",
              "Matching captions and messaging",
              "Updating campaigns frequently",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-300">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4 mt-4">
            <p className="text-red-100">
              This manual process wastes time, costs money, and slows down creative iteration.
            </p>
          </div>
        </div>
      ),
    },
    solution: {
      title: "Vision & Solution",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-indigo-400 mb-3">Our Vision</h3>
            <p className="text-slate-300 mb-4">Create an Auto-Creative Engine that can:</p>
            <ul className="space-y-2 ml-4">
              {[
                "Accept a brand logo + product image",
                "Generate multiple high-quality creative variations",
                "Produce matching captions",
                "Export everything as a downloadable ZIP bundle",
                "Reduce weeks of design iteration down to seconds",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-300">
                  <span className="text-green-400">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    howItWorks: {
      title: "How It Works",
      icon: Palette,
      content: (
        <div className="space-y-8">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-indigo-400 mb-3">Step 1: Input</h3>
            <p className="text-slate-300 mb-4">Users provide:</p>
            <ul className="space-y-2 ml-4 text-slate-300">
              {[
                "Brand Logo (PNG / JPG / SVG)",
                "Product Image (e.g., coffee cup, shoe, bottle)",
                "Ad Style (Minimal / Bold / Luxury / Playful / Tech / Organic)",
                "Aspect Ratio (1:1, 4:5, 16:9, 9:16)",
                "Tone Guidelines for captions",
                "Number of variations to generate",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-400">→</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-indigo-400 mb-3">Step 2: Processing</h3>
            <p className="text-slate-300 mb-4">Multi Modal AI system works together:</p>
            <div className="space-y-4">
              <div className="ml-4 border-l-2 border-indigo-500 pl-4">
                <h4 className="font-semibold text-indigo-300 mb-2">Image Generation Pipeline</h4>
                <p className="text-slate-400 text-sm mb-2">Powered by open-source models:</p>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• GEMINI-1.5 (VISION)</li>
                  <li>• FLUX.1 (GENERATION)</li>
                  <li>• NOTE: These models were used as high performing models like midjourney,DALL-E are paid (Otherwise performance of images being generated can be drastically better)</li>
                </ul>
              </div>
              <div className="ml-4 border-l-2 border-green-500 pl-4">
                <h4 className="font-semibold text-green-300 mb-2">Caption Generation Pipeline</h4>
                <p className="text-slate-400 text-sm mb-2">LLM generates matching captions:</p>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Short ad copy</li>
                  <li>• Taglines</li>
                  <li>• CTA suggestions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-indigo-400 mb-3">Step 3: Output</h3>
            <p className="text-slate-300 mb-4">The system produces:</p>
            <ul className="space-y-2 ml-4 text-slate-300">
              {[
                "A grid of AI-generated ad creatives",
                "Matching captions under each image",
                "A downloadable ZIP file with all assets",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-400">📦</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    features: {
      title: "Features",
      icon: Palette,
      content: (
        <div className="space-y-4">
          {[
            {
              title: "Beautiful & Intuitive UI",
              desc: "React + Tailwind with gradient backgrounds, glassmorphism, and smooth animations",
            },
            {
              title: "Creative Setup Panel",
              desc: "Upload assets, select styles, choose aspect ratios, and customize preferences",
            },
            {
              title: "AI Creative Preview",
              desc: "Responsive grid with hover effects, metadata tags, and download options",
            },
            // { title: "Prompt Inspector", desc: "See exact prompts sent to models for debugging and transparency" },
            { title: "Caption Generation", desc: "AI-powered captions matching your brand tone and guidelines" },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 hover:border-indigo-500/50 transition"
            >
              <h4 className="font-semibold text-indigo-400 mb-1">{feature.title}</h4>
              <p className="text-slate-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    techStack: {
      title: "Tech Stack",
      icon: Code2,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <h4 className="font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                <span className="text-lg">🎨</span> Frontend
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• React 19+</li>
                <li>• Tailwind CSS v4</li>
                <li>• Next.js 16 (App Router)</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                <span className="text-lg">⚙️</span> Backend
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Next.js API Routes</li>
                <li>• Node.js Runtime</li>
                <li>• HuggingFace Inference</li>
                <li>• Google Gen-AI</li>
              </ul>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <span className="text-lg">🤖</span> AI Models
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• GEMINI-1.5(Vision)</li>
                <li>• FLUX.1(Generation)</li>
                <li>• LLMs for Captions(Gemini-pro)</li>
              </ul>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <span className="text-lg">💾</span> Storage
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• In-memory for demo</li>
                <li>• ZIP export capability</li>
                <li>• Base64 encoding</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  }

  const SectionIcon = sections[selectedSection as keyof typeof sections]?.icon || FileText

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navbar />
      <main className="px-4 md:px-8 lg:px-12 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-sm font-semibold text-slate-400 px-4 mb-4 uppercase tracking-wider">Documentation</h3>
              {Object.entries(sections).map(([key, { title, icon: Icon }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedSection(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                    selectedSection === key
                      ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                      : "text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <div className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur">
              <div className="flex items-start gap-3 mb-6">
                <SectionIcon className="w-8 h-8 text-indigo-400 flex-shrink-0 mt-1" />
                <h1 className="text-4xl font-bold text-slate-100">
                  {sections[selectedSection as keyof typeof sections]?.title}
                </h1>
              </div>
              <div className="text-slate-300 space-y-4">
                {sections[selectedSection as keyof typeof sections]?.content}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
