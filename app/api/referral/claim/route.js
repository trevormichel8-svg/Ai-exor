import { supabaseAdmin } from "../../../lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { referrerId, newUserId } = await req.json();

  await supabaseAdmin.from("referrals").insert({
    referrer_id: referrerId,
    referred_id: newUserId,
  });

  await supabaseAdmin.rpc("increment_credits", {
    uid: referrerId,
    amount: 10,
    reason: "referral_bonus",
  });

  return NextResponse.json({ success: true });
}
