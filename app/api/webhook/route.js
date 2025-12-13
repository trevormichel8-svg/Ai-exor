import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "../../../lib/supabase/admin"; // MUST be service role client
import { NextResponse } from "next/server";

export async function POST(req) {
  // 1. Stripe requires raw body
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Invalid Stripe signature:", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  console.log("🔔 Stripe event received:", event.type);

  // Extract session info if available
  const session = event.data?.object;

  // ────────────────────────────────────────────────
  //   EVENT ROUTING
  // ────────────────────────────────────────────────
  switch (event.type) {
    case "checkout.session.completed":
      console.log("✔ checkout.session.completed");

      // Detect if this was a credit pack purchase
      if (session?.metadata?.amount) {
        await handleCreditPackPurchase(session);
      } else {
        await handleCheckoutCompleted(session);
      }
      break;

    case "customer.subscription.updated":
      console.log("✔ Subscription updated");
      await handleSubscriptionUpdated(session);
      break;

    case "customer.subscription.deleted":
      console.log("✔ Subscription canceled");
      await handleSubscriptionCanceled(session);
      break;

    default:
      console.log("⚠ Unhandled event:", event.type);
  }

  return new NextResponse("OK", { status: 200 });
}

// ────────────────────────────────────────────────
//  CREDIT PACK PURCHASE HANDLER
// ────────────────────────────────────────────────
async function handleCreditPackPurchase(session) {
  try {
    console.log("⚡ Processing credit pack purchase");

    await supabaseAdmin.rpc("increment_credits", {
      uid: session.metadata.userId,
      amount: Number(session.metadata.amount),
      reason: "credit_pack",
    });

    console.log("✔ Credits added:", session.metadata.amount);
  } catch (err) {
    console.error("❌ Error crediting user:", err.message);
  }
}

// ────────────────────────────────────────────────
//  SUBSCRIPTION CHECKOUT COMPLETED
// ────────────────────────────────────────────────
async function handleCheckoutCompleted(session) {
  try {
    console.log("⚡ Processing subscription checkout");

    await supabaseAdmin
      .from("users")
      .update({
        plan: session.metadata.plan,
        stripe_customer_id: session.customer,
      })
      .eq("id", session.metadata.userId);

    console.log("✔ Subscription activated:", session.metadata.plan);
  } catch (err) {
    console.error("❌ Error handling checkout completion:", err.message);
  }
}

// ────────────────────────────────────────────────
//  SUBSCRIPTION UPDATED
// ────────────────────────────────────────────────
async function handleSubscriptionUpdated(session) {
  try {
    await supabaseAdmin
      .from("users")
      .update({ plan: session.metadata.plan })
      .eq("stripe_customer_id", session.customer);

    console.log("✔ Subscription updated");
  } catch (err) {
    console.error("❌ Error updating subscription:", err.message);
  }
}

// ────────────────────────────────────────────────
//  SUBSCRIPTION CANCELED
// ────────────────────────────────────────────────
async function handleSubscriptionCanceled(session) {
  try {
    await supabaseAdmin
      .from("users")
      .update({ plan: "free" })
      .eq("stripe_customer_id", session.customer);

    console.log("✔ Subscription canceled → downgraded to free");
  } catch (err) {
    console.error("❌ Error canceling subscription:", err.message);
  }
}

