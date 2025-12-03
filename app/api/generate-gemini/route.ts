import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const maxDuration = 60; 

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const basePrompt = formData.get("prompt") as string;
    const productName = basePrompt.split('for')[1]?.split('.')[0]?.trim() || "this product";

    // 1. Define 4 Distinct Visual Styles
    const stylePrompts = [
        `${basePrompt}, minimalist studio lighting, clean white background, 8k resolution, product photography`,
        `${basePrompt}, cinematic outdoor lifestyle shot, golden hour lighting, emotional, human element`,
        `${basePrompt}, neon cyberpunk futuristic city background, glowing lights, high tech vibe`,
        `${basePrompt}, luxury elegant marble texture background, dramatic lighting, commercial masterpiece`
    ];

    // 2. Define Smart Fallbacks (Used ONLY if Gemini API fails)
    // These match the styles above so captions ALWAYS look unique and relevant.
    const fallbackCaptions = [
        `Experience the essence of design. ${productName} features a sleek, minimalist profile that fits perfectly into your modern life. Pure elegance.`,
        `Go where the journey takes you. ${productName} is built for the outdoors, capturing the spirit of adventure in every detail. #Explore`,
        `Welcome to the future. ${productName} redefines innovation with cutting-edge aesthetics and next-gen performance.`,
        `Uncompromising luxury. Crafted with the finest materials, ${productName} makes a statement of sophistication and power.`
    ];

    // 3. Parallel Generation Loop
    const tasks = stylePrompts.map(async (specificPrompt, i) => {
        // A. Image Generation (Flux via Pollinations)
        const seed = Math.floor(Math.random() * 999999) + i;
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(specificPrompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

        // B. Text Generation (Gemini Pro)
        // We start with the smart fallback, then try to overwrite it with real AI generation.
        let finalCaption = fallbackCaptions[i]; 

        try {
           const textModel = genAI.getGenerativeModel({ model: "gemini-pro" });
           
           // Detailed Prompt asking for specific tone match
           const textPrompt = `
             Your role is to Write a compelling, detailed Facebook ad caption (2 sentences + hashtags) for a product image described as: "${specificPrompt}".
             The caption must match the mood of the visual style exactly.
             Dont make any mistakes about the product name or features.
             Try to give description as precise as possible with the most important details.
             Do not include "Here is a caption" or quotes. Just the text.
           `;
           
           const result = await textModel.generateContent(textPrompt);
           const responseText = result.response.text();
           if (responseText && responseText.length > 10) {
               finalCaption = responseText;
           }
        } catch (e) {
           console.error(`Text gen failed for var ${i}, using smart fallback.`);
        }

        return {
            image: imageUrl,
            caption: finalCaption, // Unique per image
            style: ["Minimal", "Lifestyle", "Tech", "Luxury"][i] // Helper tag for UI
        };
    });

    const finalVariations = await Promise.all(tasks);

    return NextResponse.json({ variations: finalVariations });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}