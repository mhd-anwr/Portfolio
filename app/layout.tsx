import type { Metadata } from "next";
import { plusJakartaSans, bricolageGrotesque } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import CustomCursor from "@/components/cursor";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "FAWELL — Muhammed Anwar | Graphic Designer & UI/UX Specialist",
  description:
    "Award-winning portfolio of Muhammed Anwar (FAWELL), Graphic Designer & UI/UX Specialist crafting high-impact digital experiences, brand identities, and visual products.",
  keywords: [
    "Muhammed Anwar",
    "FAWELL",
    "UI/UX Designer",
    "Graphic Designer",
    "Portfolio",
    "Web Designer",
    "Brand Identity",
    "Kerala Designer",
  ],
  authors: [{ name: "Muhammed Anwar", url: "https://www.arrowsdesign.me" }],
  openGraph: {
    title: "FAWELL — Muhammed Anwar | Portfolio",
    description:
      "Award-winning portfolio of Muhammed Anwar (FAWELL), Graphic Designer & UI/UX Specialist.",
    url: "https://mhd-anwr.github.io/Portfolio/",
    siteName: "FAWELL Portfolio",
    images: [
      {
        url: "/assets/images/anwar_profile.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammed Anwar Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAWELL — Muhammed Anwar Portfolio",
    description:
      "Graphic Designer & UI/UX Specialist crafting high-impact digital products.",
    images: ["/assets/images/anwar_profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${bricolageGrotesque.variable}`}
    >
      <body className="bg-background text-white antialiased selection:bg-accent-blue selection:text-white">
        <div className="noise-overlay" />
        <Providers>
          <CustomCursor />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
