"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

type Campaign = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  goal_amount: number;
  is_active: boolean;
};

type Story = {
  id: string;
  title: string;
  author: string;
  content: string;
  cover_image_url: string | null;
  published: boolean;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<"campaigns" | "stories">("campaigns");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stories, setStories] = useState<Story[]>([]);

  const headers = { "x-admin-password": password, "Content-Type": "application/json" };

  const fetchData = useCallback(async () => {
    const [c, s] = await Promise.all([
      fetch("/api/admin/campaigns", { headers: { "x-admin-password": password } }),
      fetch("/api/admin/stories", { headers: { "x-admin-password": password } }),
    ]);
    if (c.ok) setCampaigns(await c.json());
    if (s.ok) setStories(await s.json());
  }, [password]);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  const handleLogin = async () => {
    const res = await fetch("/api/admin/campaigns", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full rounded-md border px-3 py-2"
          />
          <Button onClick={handleLogin} className="w-full">Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4 flex gap-2">
        <Button
          variant={tab === "campaigns" ? "default" : "outline"}
          onClick={() => setTab("campaigns")}
        >
          Campaigns
        </Button>
        <Button
          variant={tab === "stories" ? "default" : "outline"}
          onClick={() => setTab("stories")}
        >
          Stories
        </Button>
      </div>

      <div className="mt-6">
        {tab === "campaigns" ? (
          <CampaignManager
            campaigns={campaigns}
            headers={headers}
            password={password}
            onRefresh={fetchData}
          />
        ) : (
          <StoryManager
            stories={stories}
            headers={headers}
            password={password}
            onRefresh={fetchData}
          />
        )}
      </div>
    </div>
  );
}

function CampaignManager({
  campaigns,
  headers,
  password,
  onRefresh,
}: {
  campaigns: Campaign[];
  headers: Record<string, string>;
  password: string;
  onRefresh: () => void;
}) {
  const [form, setForm] = useState({ title: "", description: "", goal_amount: "" });
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "x-admin-password": password },
      body: fd,
    });
    const data = await res.json();
    setImageUrl(data.url || "");
    setUploading(false);
  };

  const handleCreate = async () => {
    await fetch("/api/admin/campaigns", {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        goal_amount: Number(form.goal_amount),
        image_url: imageUrl || null,
      }),
    });
    setForm({ title: "", description: "", goal_amount: "" });
    setImageUrl("");
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this campaign?")) return;
    await fetch("/api/admin/campaigns", {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    });
    onRefresh();
  };

  const toggleActive = async (c: Campaign) => {
    await fetch("/api/admin/campaigns", {
      method: "PUT",
      headers,
      body: JSON.stringify({ id: c.id, is_active: !c.is_active }),
    });
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4 space-y-3">
        <h3 className="font-semibold">Create Campaign</h3>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
          rows={3}
        />
        <input
          placeholder="Goal Amount (₹)"
          type="number"
          value={form.goal_amount}
          onChange={(e) => setForm({ ...form, goal_amount: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
          className="text-sm"
        />
        {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
        {imageUrl && <p className="text-xs text-green-600">Image uploaded ✓</p>}
        <Button onClick={handleCreate} disabled={!form.title || !form.description}>
          Create
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">All Campaigns ({campaigns.length})</h3>
        {campaigns.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-md border p-3">
            <div>
              <p className="font-medium">{c.title}</p>
              <p className="text-xs text-muted-foreground">
                Goal: ₹{c.goal_amount} | {c.is_active ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toggleActive(c)}>
                {c.is_active ? "Deactivate" : "Activate"}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(c.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoryManager({
  stories,
  headers,
  password,
  onRefresh,
}: {
  stories: Story[];
  headers: Record<string, string>;
  password: string;
  onRefresh: () => void;
}) {
  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "x-admin-password": password },
      body: fd,
    });
    const data = await res.json();
    setImageUrl(data.url || "");
    setUploading(false);
  };

  const handleCreate = async () => {
    await fetch("/api/admin/stories", {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: form.title,
        author: form.author,
        content: form.content,
        cover_image_url: imageUrl || null,
      }),
    });
    setForm({ title: "", author: "", content: "" });
    setImageUrl("");
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this story?")) return;
    await fetch("/api/admin/stories", {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    });
    onRefresh();
  };

  const togglePublish = async (s: Story) => {
    await fetch("/api/admin/stories", {
      method: "PUT",
      headers,
      body: JSON.stringify({ id: s.id, published: !s.published }),
    });
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4 space-y-3">
        <h3 className="font-semibold">Create Story</h3>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full rounded-md border px-3 py-2 text-sm"
          rows={5}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
          className="text-sm"
        />
        {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
        {imageUrl && <p className="text-xs text-green-600">Image uploaded ✓</p>}
        <Button onClick={handleCreate} disabled={!form.title || !form.content}>
          Create
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">All Stories ({stories.length})</h3>
        {stories.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-md border p-3">
            <div>
              <p className="font-medium">{s.title}</p>
              <p className="text-xs text-muted-foreground">
                By {s.author} | {s.published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => togglePublish(s)}>
                {s.published ? "Unpublish" : "Publish"}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(s.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
