import { supabaseAdmin } from "../../../lib/supabase/admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("credits")
    .select("*");

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return Response.json(data);
}
