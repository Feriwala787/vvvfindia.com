import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | VVVF India",
  description: "Support Vishwa Vijeta Vision Foundation. Your donation helps empower communities across India.",
};

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center">
      <h1 className="text-3xl font-bold">Make a Donation</h1>
      <p className="mt-4 text-muted-foreground">
        Your generosity fuels our mission. Every rupee counts towards building a better India.
      </p>

      <div className="mt-8 rounded-lg border bg-card p-8">
        <p className="text-lg font-medium">Payment integration coming soon</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We are setting up secure payment processing via Razorpay.
          In the meantime, please contact us directly for donations.
        </p>
        {/* Razorpay embed will go here */}
        <div id="razorpay-container" className="mt-6" />
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
  );
}
