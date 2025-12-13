import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, amount } = await req.json();

  const priceMap = {
    20: process.env.STRIPE_PACK_20,
    50: process.env.STRIPE_PACK_50,
    100: process.env.STRIPE_PACK_100,
  };

  if (!priceMap[amount])
    return NextResponse.json({ error: "Invalid pack amount" }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceMap[amount], quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    metadata: { userId, amount },
  });

  return NextResponse.json({ url: session.url });
}
