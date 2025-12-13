import { supabaseAdmin } from "../../../lib/supabase/admin";

export async function POST(req) {
  const { userId, logos, prompt } = await req.json();

  if (!userId) {
    return Response.json({ error: "Missing userId" }, { status: 400 });
  }

  for (const logo of logos || []) {
    await supabase.from("logos").insert({
      user_id: userId,
      png: logo.png,
      svg: logo.svg,
      prompt
    });
  }

  return Response.json({ success: true });
}
