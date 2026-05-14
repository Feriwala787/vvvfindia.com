import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <img src="/logo.jpg" alt="VVVF" className="h-8 w-8 rounded-full" />
              VVVF India
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Vishwa Vijeta Vision Foundation — Empowering communities across India.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Head Office: New Delhi | Branch: Gurugram, Haryana
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/campaigns" className="hover:text-primary">Campaigns</Link></li>
              <li><Link href="/donate" className="hover:text-primary">Donate</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Leadership */}
          <div>
            <h4 className="font-semibold">Leadership</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>National President: Shubham Shrivastava</li>
              <li>State President: Mohd Safi</li>
              <li>National Secretary: Amit Garg</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Subscribe to our newsletter for updates.
            </p>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vishwa Vijeta Vision Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
