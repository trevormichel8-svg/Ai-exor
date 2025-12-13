import OpenAI from "openai";
import { supabaseAdmin } from "../../../lib/supabase/admin";

export async function POST(req) {
  try {
    const { brandName, tagline, color, style, variations, userId } =
      await req.json();

    // 1. Fetch user from Supabase
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("credits, plan")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return Response.json(
        { error: "User not found." },
        { status: 400 }
      );
    }

    // 2. Unlimited mode for paid plans
    const isUnlimited = user.plan === "pro" || user.plan === "enterprise";

    // FREE PLAN → must check credits
    if (!isUnlimited) {
      if (user.credits < variations) {
        return Response.json(
          { error: "Not enough credits." },
          { status: 400 }
        );
      }

      // Deduct credits BEFORE generating
      await supabaseAdmin.rpc("increment_credits", {
        uid: userId,
        amount: -variations,
        reason: "logo_generation",
      });
    }

    // 3. Build prompt
    const prompt = `Create ${variations} unique logo concepts for a brand named "${brandName}" with the tagline "${tagline}". Use the primary color ${color} and the style "${style}". High-quality, modern, minimal, export-ready.`;

    // 4. Call OpenAI
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const aiResponse = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      n: variations,
    });

    // 5. Return image array
    return Response.json({
      images: aiResponse.data.map((img) => img.url),
      unlimited: isUnlimited,
    });
  } catch (err) {
    console.error("Generate route error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
        }
      
