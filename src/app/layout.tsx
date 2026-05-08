import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "KSF Home Decor | Artificial Garden & Home Decoration",
    template: "%s | KSF Home Decor",
  },

  description:
    "KSF Home Decor offers premium artificial flowers, artificial gardens, stylish home decor items, and modern decorative accessories in Bangladesh.",

  keywords: [
    "KSF Home Decor",
    "artificial garden Bangladesh",
    "home decor Bangladesh",
    "artificial flowers",
    "decorative items",
    "indoor decoration",
    "modern home decor",
    "wall decor",
    "flower vase",
    "home accessories",
    "artificial plants",
    "KSF artificial garden",
  ],

  authors: [{ name: "KSF Home Decor Team" }],

  creator: "KSF Home Decor",

  publisher: "KSF Home Decor",

  metadataBase: new URL("https://www.ksf-ecommerce.online"),

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "KSF Home Decor | Artificial Garden & Home Decoration",

    description:
      "Discover premium artificial gardens, flowers, and stylish home decor products at KSF Home Decor.",

    url: "https://www.ksf-ecommerce.online",

    siteName: "KSF Home Decor",

    images: [
      {
        url: "https://www.ksf-ecommerce.online/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "KSF Home Decor Logo",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "KSF Home Decor | Artificial Garden & Home Decoration",

    description:
      "Shop stylish artificial gardens, flowers, and modern home decor products online from KSF Home Decor.",

    images: ["https://www.ksf-ecommerce.online/logo.jpeg"],
  },

  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },

  other: {
    "facebook:url": "https://www.facebook.com/ksfhomedecor/",
    "instagram:url": "https://www.instagram.com/ksfartificalgarden/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)n=f.fbq;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1427866301708580');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1427866301708580&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <AuthProvider>
          <CartProvider>
            <Navbar />

            <main className="min-h-screen">
              {children}
            </main>

            <Footer />

            <Toaster position="top-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
