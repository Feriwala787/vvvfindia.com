import { buttonVariants } from "@/components/ui/button";
import { getSupabase } from "@/lib/supabase";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const revalidate = 60;
export const dynamic = "force-dynamic";

async function getLatestCampaigns() {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("campaigns")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(3);
  return data ?? [];
}

export default async function Home() {
  const latestCampaigns = await getLatestCampaigns();

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Vishwa Vijeta Vision Foundation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Empowering communities across India through education, healthcare, and sustainable development.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className={cn(buttonVariants({ size: "lg" }))}>
              Donate Now
            </Link>
            <Link href="/campaigns" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Our Campaigns
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          We envision a world where every individual has access to quality education, healthcare,
          and opportunities for growth. VVVF India works at the grassroots level to uplift
          underprivileged communities and create lasting social impact.
        </p>
      </section>

      {/* Impact Numbers */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">Our Impact</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "10,000+", label: "Lives Impacted" },
              { number: "50+", label: "Campaigns" },
              { number: "15+", label: "States Covered" },
              { number: "200+", label: "Volunteers" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-card p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary">{stat.number}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Campaigns (Dynamic) */}
      {latestCampaigns.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold">Latest Campaigns</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="overflow-hidden rounded-lg border bg-card shadow-sm"
              >
                {campaign.image_url && (
                  <img
                    src={campaign.image_url}
                    alt={campaign.title}
                    className="h-44 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold">{campaign.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {campaign.description}
                  </p>
                  <Link
                    href={`/campaigns/${campaign.slug}`}
                    className={cn(buttonVariants({ size: "sm", variant: "outline" }), "mt-3")}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/campaigns" className={cn(buttonVariants())}>
              View All Campaigns
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold">Join Our Cause</h2>
        <p className="mt-4 text-muted-foreground">
          Every contribution makes a difference. Support our campaigns or volunteer with us today.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/donate" className={cn(buttonVariants())}>
            Make a Donation
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
            Become a Volunteer
          </Link>
        </div>
      </section>
    </>
  );
}
