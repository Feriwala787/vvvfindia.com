"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Script from "next/script";

const AMOUNTS = [500, 1000, 2500, 5000, 10000];

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function DonatePage() {
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    const finalAmount = custom ? Number(custom) : amount;
    if (!finalAmount || finalAmount < 1) return;

    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount }),
      });
      const { orderId, key } = await res.json();

      const options = {
        key,
        amount: finalAmount * 100,
        currency: "INR",
        name: "VVVF India",
        description: "Donation to Vishwa Vijeta Vision Foundation",
        order_id: orderId,
        handler: () => {
          alert("Thank you for your donation! 🙏");
        },
        theme: { color: "#16a34a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold">Make a Donation</h1>
        <p className="mt-4 text-muted-foreground">
          Your generosity fuels our mission. Every rupee counts towards building a better India.
        </p>

        <div className="mt-8 rounded-lg border bg-card p-8 text-left">
          <p className="text-lg font-medium">Select Amount</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => { setAmount(a); setCustom(""); }}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                  amount === a && !custom
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:border-primary"
                }`}
              >
                ₹{a.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <input
              type="number"
              placeholder="Or enter custom amount (₹)"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              min={1}
            />
          </div>

          <Button
            onClick={handleDonate}
            disabled={loading}
            className="mt-6 w-full"
            size="lg"
          >
            {loading ? "Processing..." : `Donate ₹${(custom ? Number(custom) : amount).toLocaleString("en-IN")}`}
          </Button>
        </div>

        <div className="mt-8 rounded-lg border p-6 text-left">
          <h2 className="font-semibold">Why Donate?</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>✓ 100% transparent fund utilization</li>
            <li>✓ Tax benefits under Section 80G</li>
            <li>✓ Direct impact on underprivileged communities</li>
            <li>✓ Regular updates on how your donation is used</li>
          </ul>
        </div>
      </div>
    </>
  );
}
