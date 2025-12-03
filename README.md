📦 AdCreative Studio – Auto-Creative Engine for Marketing Creatives
Generate 4+ high-quality ad creatives automatically using open-source AI models

AdCreative Studio is an AI-powered Auto-Creative Engine that takes a brand’s logo, product image, and creative preferences, then automatically generates a full set of marketing-ready ad creatives with matching captions in seconds.

It uses open-source image generation models (SDXL-Turbo / Stable Diffusion) and LLMs for caption generation, packaged inside a beautiful, intuitive interface.

This project was built for the GroundTruth AI 2025 – Generative AI & Marketing Tech Track (H-003).

🚀 Problem

Brands and marketers spend weeks designing variations of the same ad creative:

Multiple sizes & formats

New backgrounds & color themes

Changing the vibe/style

Matching captions and messaging

Updating campaigns frequently

This manual process wastes time, costs money, and slows down creative iteration.

🎯 Vision

Create an Auto-Creative Engine that can:

Accept a brand logo + product image

Generate multiple high-quality creative variations

Produce matching captions

Export everything as a downloadable ZIP bundle

Reduce weeks of design iteration down to seconds

🧠 How It Works
1. Input

Users provide:

Brand Logo (PNG / JPG / SVG)

Product Image (e.g., coffee cup, shoe, bottle)

Ad Style (Minimal / Bold / Luxury / Playful / Tech / Organic)

Aspect Ratio (1:1, 4:5, 16:9, 9:16)

Tone Guidelines for captions

Number of variations to generate

Optional: Brand name, tagline, color palette

2. Processing

Two AI systems work together:

A. Image Generation Pipeline

Powered by open-source models:

SDXL Turbo (fastest)

OR Stable Diffusion (fallback)

The system constructs a dynamic prompt using user preferences:

“Generate a high-quality ad creative for {brand}. Style: {style}. Use product from the uploaded image. Use colors: {palette}. Aspect ratio: {ratio}.”

The model returns multiple unique creatives, each in high resolution.

B. Caption Generation Pipeline

LLM (GPT-4o mini / GEMINI-2.5-flash) generates matching captions:

Short ad copy

Taglines

CTA suggestions

Emotional/brand-aligned phrases

3. Output

The system produces:

A grid of AI-generated ad creatives

Matching captions under each image

A downloadable ZIP file containing:

All generated images

captions.json (structured captions)

metadata.json (styles, ratios, prompts used)

Perfect for rapid campaign testing, content creation, and marketing team workflows.

🎨 Features
🔹 Beautiful and Intuitive UI

Built using React + Tailwind
Designed like a high-end SaaS design tool:

Gradient backgrounds

Glassmorphism cards

Drag & drop file upload

Real-time previews

Smooth micro-animations

🔹 Creative Setup Panel

Campaign name & description

Upload brand logo

Upload product image

Select creative styles

Choose aspect ratio

Pick color palette or auto-detect from logo

Caption tone & language

Variation slider (1–10)

🔹 AI Creative Preview

Responsive grid of creatives

Hover animations

Metadata tags (style, ratio, variation number)

Captions below each image

Download / Regenerate / Save buttons

🔹 Prompt Inspector

A collapsible side panel showing:

Exact image prompt sent

Exact caption prompt

Helps debugging + transparency

🔹 Recent Campaigns

Horizontally scrollable

Thumbnails preview

Status tags (draft, completed)

One-click load


🛠️ Tech Stack
Frontend

React

Tailwind CSS

File Upload UI

Styled components (glassmorphism + gradients)

State management (local state or Zustand)

Backend

Node.js / FastAPI for API endpoints

HuggingFace Inference API for SDXL-Turbo

LLM API for caption generation

AI Models

Image Generation:

SDXL-Turbo (HuggingFace free inference)

Stable Diffusion 1.5 (fallback)

Or any open source free model availaible to use as all of the given names are either paid or closed source.

Caption Generation:

GPT-4o-mini

or GEMINI-2.5

Storage

In-memory for demo

ZIP generation using JS/Python libraries

NOTE:
The system prompting on LLM is done really well to enhance the efficiency of the outputs being generated