import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ Ensure your API Key is in .env.local as GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const maxDuration = 60; // Allow 60 seconds

export async function POST(req: NextRequest) {
  try {
    // 1. Parse FormData (Files + Text)
    const formData = await req.formData();
    const prompt = formData.get("prompt") as string;
    const productImage = formData.get("productImage") as File | null;
    
    let finalPrompt = prompt;

    // 2. "Use the Images": If a product image was uploaded, ask Gemini to describe it
    // This satisfies the "Gemini uses the image" requirement.
    if (productImage && process.env.GEMINI_API_KEY) {
      try {
        console.log("Analyzing product image with Gemini Vision...");
        
        // Convert File to Base64 for Gemini
        const arrayBuffer = await productImage.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent([
          "Describe this product visually in 2 sentences so an AI artist can recreate it perfectly. Focus on colors, materials, and shape.",
          {
            inlineData: {
              data: base64Data,
              mimeType: productImage.type,
            },
          },
        ]);
        
        const description = result.response.text();
        console.log("Gemini Vision Description:", description);

        // Enhance the prompt with Gemini's vision
        finalPrompt = `${prompt}. The product looks like: ${description}`;
      } catch (visionError) {
        console.error("Vision step failed, falling back to text prompt only:", visionError);
      }
    }

    // 3. Generate the Image
    // Since Gemini Image API (Imagen 3) is often restricted/404s on free tiers,
    // we use Pollinations (Flux/SDXL) as the "Renderer" driven by Gemini's brain.
    // This is the safest way to ensure you have an image for the demo.
    
    console.log("Generating with prompt:", finalPrompt);
    
    const seed = Math.floor(Math.random() * 100000);
    // Pollinations URL (Free, fast, unlimited)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

    // Fetch the image to convert to Base64 (so your frontend treats it like a file)
    // or just return the URL if your frontend <img src> can handle remote URLs.
    // Here we return the URL directly for speed, wrapped in the format your page expects.
    
    return NextResponse.json({
      images: [imageUrl], 
      promptUsed: finalPrompt
    });

  } catch (error: any) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { error: "Failed to generate image. " + error.message }, 
      { status: 500 }
    );
  }
}