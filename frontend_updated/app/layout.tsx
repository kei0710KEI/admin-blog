import type { Metadata } from "next";
import Aos from "@/components/Aos";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TopLoadingLineApp from "@/components/TopLoadingLineApp";
import "@/styles/globals.css";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "VBMBLOGS",
    template: "%s | VBMBLOGS",
  },
  description: "A blog about web development and technology",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "VBMBLOGS",
    type: "website",
    locale: "ja_JP",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          <TopLoadingLineApp />
          <Aos>{children}</Aos>
          <ScrollToTopButton />
          <Footer />
        </main>
      </body>
    </html>
  );
}
