import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tihouredjavoyage.site"),
  title: {
    default: "Tihouredja Voyage | Sahara Desert Tours in Djanet",
    template: "%s | Tihouredja Voyage",
  },
  description:
    "Premium Sahara desert tours in Djanet, Tassili N'Ajjer, Tadrart Rouge, Ihrir, Erg Admer, and camel trekking experiences with local Tuareg guides.",
  openGraph: {
    title: "Tihouredja Voyage | Sahara Desert Tours",
    description: "Discover the magic of the Sahara with premium guided tours in Djanet, Algeria.",
    url: "https://tihouredjavoyage.site",
    siteName: "Tihouredja Voyage",
    images: [
      {
        url: "/assets/desert-path.png",
        width: 1200,
        height: 630,
        alt: "Tihouredja Voyage Sahara Desert",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tihouredja Voyage | Sahara Desert Tours",
    description: "Discover the magic of the Sahara with premium guided tours in Djanet, Algeria.",
    images: ["/assets/desert-path.png"],
  },
};

import SmoothScroller from "./components/SmoothScroller";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
