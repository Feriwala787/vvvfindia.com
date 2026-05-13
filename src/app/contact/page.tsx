import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | VVVF India",
  description: "Get in touch with Vishwa Vijeta Vision Foundation. Reach out for partnerships, volunteering, or queries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">
        Have questions or want to collaborate? We&apos;d love to hear from you.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="How can we help?"
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Your message..."
              rows={5}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Send Message
          </button>
        </form>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">Head Office</h3>
            <p className="mt-1 text-sm text-muted-foreground">New Delhi, India</p>
          </div>
          <div>
            <h3 className="font-semibold">Branch Office</h3>
            <p className="mt-1 text-sm text-muted-foreground">Gurugram, Haryana, India</p>
          </div>
          <div>
            <h3 className="font-semibold">Website</h3>
            <p className="mt-1 text-sm text-muted-foreground">vvvfindia.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
