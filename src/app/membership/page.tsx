"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function MembershipContent() {
  const params = useSearchParams();
  const tab = params.get("tab") || "register";
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", dob: "" });
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [trackEmail, setTrackEmail] = useState("");
  const [memberData, setMemberData] = useState<{ id: string; name: string; status: string; member_id: string | null } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (photo) fd.append("photo", photo);

    const res = await fetch("/api/membership", { method: "POST", body: fd });
    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", dob: "" });
      setPhoto(null);
    } else {
      const data = await res.json();
      setErrorMsg(data.error || "Something went wrong");
      setStatus("error");
    }
  };

  const handleTrack = async () => {
    if (!trackEmail) return;
    const res = await fetch(`/api/membership?email=${encodeURIComponent(trackEmail)}`);
    if (res.ok) {
      const data = await res.json();
      setMemberData(data);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">Become a Member</h1>
      <p className="mt-2 text-muted-foreground">
        Join VVVF India as an official member. Once approved, you&apos;ll receive a digital ID card.
      </p>

      <div className="mt-6 flex gap-2">
        <a href="/membership" className={`rounded-md px-4 py-2 text-sm font-medium border ${tab === "register" ? "bg-primary text-primary-foreground" : ""}`}>Register</a>
        <a href="/membership?tab=track" className={`rounded-md px-4 py-2 text-sm font-medium border ${tab === "track" ? "bg-primary text-primary-foreground" : ""}`}>Track / ID Card</a>
      </div>

      {tab === "register" ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
            <input type="email" placeholder="Email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
            <input placeholder="Phone *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
            <input type="date" placeholder="Date of Birth *" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
          </div>
          <input placeholder="Address *" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
          <div className="grid gap-4 sm:grid-cols-3">
            <input placeholder="City *" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
            <input placeholder="State *" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
            <input placeholder="Pincode *" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="text-sm font-medium">Passport Photo</label>
            <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} className="mt-1 w-full text-sm" />
          </div>
          <Button type="submit" disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Submitting..." : "Submit Application"}
          </Button>
          {status === "success" && <p className="text-sm text-green-600">Application submitted! You&apos;ll receive your ID card once approved by admin.</p>}
          {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
        </form>
      ) : (
        <div className="mt-6 space-y-4 rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Check Membership Status</h2>
          <div className="flex gap-2">
            <input type="email" placeholder="Your registered email" value={trackEmail} onChange={e => setTrackEmail(e.target.value)} className="flex-1 rounded-md border bg-background px-3 py-2 text-sm" />
            <Button onClick={handleTrack} variant="outline">Check</Button>
          </div>
          {memberData && (
            <div className="mt-4 rounded-md border p-4">
              <p className="font-medium">{memberData.name}</p>
              <p className="text-sm text-muted-foreground">
                Status: <span className={memberData.status === "approved" ? "text-green-600 font-medium" : memberData.status === "rejected" ? "text-red-600" : "text-yellow-600"}>{memberData.status}</span>
              </p>
              {memberData.member_id && (
                <a href={`/membership/id-card?id=${memberData.id}`} target="_blank" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
                  🪪 View ID Card
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MembershipPage() {
  return (
    <Suspense fallback={<p className="p-12 text-center">Loading...</p>}>
      <MembershipContent />
    </Suspense>
  );
}
