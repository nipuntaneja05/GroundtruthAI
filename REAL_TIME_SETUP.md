# Real-Time Image Generation Setup

## Quick Start

1. **Add your Hugging Face token to `.env.local`:**
   ```
   HF_TOKEN=your_actual_huggingface_token_here
   ```

2. **The application now supports real-time image generation with streaming:**
   - Images are generated one by one and displayed as they arrive
   - You can see the progress in real-time (e.g., "Generating 1 of 4 images...")
   - Each image appears on screen as soon as it's ready

## What Changed

### API Route (`app/api/generate-images/route.ts`)
- ✅ Changed from batch processing to **streaming with Server-Sent Events (SSE)**
- ✅ Images are sent to frontend as they are generated
- ✅ Supports real-time display without waiting for all images

### Frontend (`app/page.tsx`)
- ✅ Updated `handleGenerate()` to handle streaming responses
- ✅ Uses `ReadableStream` to process Server-Sent Events
- ✅ Updates component state in real-time as images arrive
- ✅ Shows live progress: "Generating X of Y images..."

### Preview Component (`components/creative-preview.tsx`)
- ✅ Enhanced UI to show:
  - Loading spinner with progress count
  - Incoming images appear instantly without page flickering
  - Streaming completion status

## How It Works

1. You fill out the form and click "Generate Creatives"
2. Frontend sends request to `/api/generate-images`
3. Backend connects to Hugging Face SDXL model
4. **As each image completes**, it's sent via SSE to the frontend
5. Frontend displays it **immediately** - no waiting for all images
6. Progress shows: "Generating 1 of 4 images..." → "Generating 2 of 4..." etc.

## Testing

1. Visit: `http://localhost:3000`
2. Fill in the campaign details (they have defaults)
3. Click "Generate Creatives"
4. Watch images appear one by one in real-time!

## Notes

- The Hugging Face API uses the free Pollinations
- Inference times: 30-60 seconds per image (depends on API load)
- All images are base64-encoded and displayed directly in the browser
- Progress is shown with animated dots and a counter
