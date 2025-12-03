import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, numImages, aspectRatio } = await request.json()

    if (!prompt || !numImages) {
      return NextResponse.json({ error: "Missing required parameters: prompt, numImages" }, { status: 400 })
    }

    const hfToken = process.env.HF_TOKEN
    if (!hfToken) {
      console.error("[v0] HF_TOKEN environment variable is not set")
      return NextResponse.json({ error: "HF_TOKEN not configured" }, { status: 500 })
    }

    const images: string[] = []

    // Call Hugging Face API for each image
    for (let i = 0; i < numImages; i++) {
      try {
        console.log(`[v0] Generating image ${i + 1}/${numImages} with prompt: ${prompt}`)

        const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/sdxl-turbo", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              num_inference_steps: 1, // SDXL-Turbo is optimized for 1 step
            },
          }),
        })

        if (!response.ok) {
          const errorData = await response.text()
          console.error(`[v0] Hugging Face API error: ${response.status}`, errorData)
          return NextResponse.json(
            { error: `Hugging Face API error: ${response.statusText}` },
            { status: response.status },
          )
        }

        const buffer = await response.arrayBuffer()
        const base64 = Buffer.from(buffer).toString("base64")
        const dataUrl = `data:image/jpeg;base64,${base64}`

        images.push(dataUrl)
        console.log(`[v0] Successfully generated image ${i + 1}/${numImages}`)
      } catch (error) {
        console.error(`[v0] Error generating image ${i + 1}:`, error)
        throw error
      }
    }

    console.log(`[v0] All ${numImages} images generated successfully`)
    return NextResponse.json({ images })
  } catch (error) {
    console.error("[v0] Generate images API error:", error)
    return NextResponse.json({ error: "Failed to generate images" }, { status: 500 })
  }
}
