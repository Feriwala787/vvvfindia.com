import { getSupabase } from "@/lib/supabase";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | VVVF India",
  description: "Read real stories of impact and transformation from Vishwa Vijeta Vision Foundation.",
  openGraph: {
    title: "Success Stories | VVVF India",
    description: "Read real stories of impact and transformation from Vishwa Vijeta Vision Foundation.",
  },
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

async function getStories() {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("stories")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Success Stories</h1>
      <p className="mt-2 text-muted-foreground">
        Real stories of impact and transformation from our work across India.
      </p>

      {stories.length === 0 ? (
        <p className="mt-8 text-center text-muted-foreground">
          Stories coming soon. Stay tuned!
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {story.cover_image_url && (
                <img
                  src={story.cover_image_url}
                  alt={story.title}
                  className="h-44 w-full object-cover transition-transform group-hover:scale-105"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold group-hover:text-primary">
                  {story.title}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  By {story.author} •{" "}
                  {new Date(story.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {story.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
