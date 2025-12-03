import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const basePrompt = formData.get("prompt") as string;
    const productImage = formData.get("productImage") as File | null;
    
    // Force 4 images as requested
    const numImages = 4;
    
    let productDescription = "";

    // --- STEP 1: VISION (Describe the product) ---
    if (productImage && process.env.GEMINI_API_KEY) {
      try {
        const arrayBuffer = await productImage.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent([
          "Describe this product visually in 1 short sentence (focus on color, material, shape).",
          { inlineData: { data: base64Data, mimeType: productImage.type } },
        ]);
        productDescription = result.response.text();
      } catch (e) {
        console.error("Vision failed");
      }
    }

    // --- STEP 2: BRAINSTORMING (The "System Prompting" part) ---
    // We ask Gemini to invent 4 DISTINCT art styles.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const variationPrompt = `
      I need 4 distinct AI image generation prompts for an ad campaign.
      
      User's Idea: "${basePrompt}"
      Product Visuals: "${productDescription}"
      
      Create 4 TOTALLY DIFFERENT variations:
      1. A clean, minimalist Studio Product Shot.
      2. A dynamic "In-Action" or Lifestyle shot.
      3. A futuristic / creative artistic background.
      4. A luxury / high-end cinematic shot.
      
      Output ONLY the 4 prompts separated strictly by "|||". Do not add numbering or labels.
    `;

    let prompts: string[] = [];
    try {
      const result = await model.generateContent(variationPrompt);
      const rawText = result.response.text();
      // Split by our separator to get the 4 unique prompts
      prompts = rawText.split("|||").map(p => p.trim()).filter(p => p.length > 0);
    } catch (e) {
      // Fallback if Gemini text generation fails: just use base prompt 4 times
      prompts = [basePrompt, basePrompt, basePrompt, basePrompt];
    }

    // Ensure we have exactly 4 (fill with duplicates if split failed)
    while (prompts.length < 4) {
      prompts.push(basePrompt + " high quality, 8k");
    }

    // --- STEP 3: RENDER (Pollinations) ---
    const imageLinks: string[] = [];

    // Loop through the UNIQUE prompts
    for (let i = 0; i < numImages; i++) {
      // Use the specific unique prompt for this iteration
      const specificPrompt = prompts[i] || basePrompt;
      
      // Still add a random seed for extra entropy
      const seed = Math.floor(Math.random() * 1000000) + i;
      
      // Generate URL
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(specificPrompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;
      
      imageLinks.push(imageUrl);
    }

    return NextResponse.json({
      images: imageLinks,
      promptUsed: basePrompt 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}