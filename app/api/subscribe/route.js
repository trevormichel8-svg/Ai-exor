import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "../../../lib/supabase/admin";

export async function POST(req) {
  try {
    const { plan, userId } = await req.json();

    if (!stripe) {
      return Response.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const priceId =
      plan === "pro"
        ? process.env.STRIPE_PRICE_PRO
        : process.env.STRIPE_PRICE_ENTERPRISE;

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      metadata: { userId, plan },
    });

    // Save stripe customer ID to Supabase
    if (session.customer) {
      await supabase
        .from("users")
        .update({ stripe_customer_id: session.customer })
        .eq("id", userId);
    }

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
