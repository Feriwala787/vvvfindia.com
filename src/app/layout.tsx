import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vvvfindia.com"),
  title: {
    default: "Vishwa Vijeta Vision Foundation | VVVF India",
    template: "%s | VVVF India",
  },
  description:
    "Vishwa Vijeta Vision Foundation - Empowering communities across India through education, healthcare, and sustainable development.",
  keywords: ["NGO", "India", "Foundation", "VVVF", "Vishwa Vijeta Vision Foundation", "charity", "donate"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vvvfindia.com",
    siteName: "VVVF India",
    title: "Vishwa Vijeta Vision Foundation | VVVF India",
    description: "Empowering communities across India through education, healthcare, and sustainable development.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "VVVF India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishwa Vijeta Vision Foundation | VVVF India",
    description: "Empowering communities across India through education, healthcare, and sustainable development.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
