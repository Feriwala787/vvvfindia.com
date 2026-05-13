import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | VVVF India",
  description: "Learn about Vishwa Vijeta Vision Foundation, our mission, leadership, and impact across India.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Vishwa Vijeta Vision Foundation (VVVF) is a registered non-governmental organization
        committed to empowering underprivileged communities across India. With our head office
        in New Delhi and branch in Gurugram, Haryana, we work tirelessly to bridge the gap
        in education, healthcare, and sustainable development.
      </p>

      <h2 className="mt-10 text-2xl font-bold">Our Leadership</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { name: "Shubham Shrivastava", role: "National President" },
          { name: "Mohd Safi", role: "State President" },
          { name: "Amit Garg", role: "National Secretary" },
        ].map((leader) => (
          <div key={leader.name} className="rounded-lg border p-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              {leader.name[0]}
            </div>
            <p className="mt-3 font-semibold">{leader.name}</p>
            <p className="text-sm text-muted-foreground">{leader.role}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-bold">Our Vision</h2>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        To create a self-reliant India where every citizen has equal access to opportunities,
        education, and healthcare — regardless of their socio-economic background.
      </p>

      <h2 className="mt-10 text-2xl font-bold">Office Locations</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-4">
          <p className="font-semibold">Head Office</p>
          <p className="text-sm text-muted-foreground">New Delhi, India</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="font-semibold">Branch Office</p>
          <p className="text-sm text-muted-foreground">Gurugram, Haryana, India</p>
        </div>
      </div>
    </div>
  );
}
