import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] }); 

export const metadata: Metadata = {
  title: {default: 'KSF Store | Modern E-commerce Platform',template: '%s | KSF Store',},
  description:'KSF Store is a modern e-commerce platform offering high-quality products at affordable prices. Shop electronics, gadgets, fashion, and more with fast delivery and secure checkout.',
  keywords: [
    'KSF Store',
    'KSF e-commerce',
    'online shopping Bangladesh',
    'buy electronics online',
    'fashion store online',
    'cheap gadgets Bangladesh',
    'best e-commerce site',
    'online store KSF',
  ],
  authors: [{ name: 'KSF Store Team' }],
  creator: 'KSF Store',
  publisher: 'KSF Store',
  openGraph: {title: 'KSF Store | Modern E-commerce Platform',
    description:'Discover amazing deals on electronics, fashion, and more at KSF Store. Fast delivery and secure checkout guaranteed.',
    url: 'https://your-domain.com',
    siteName: 'KSF Store',
    images: [{url: 'https://your-domain.com/og-image.png',width: 1200,height: 630,alt: 'KSF Store Preview',},],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KSF Store | Modern E-commerce Platform',
    description:
      'Shop the best products online at KSF Store. Fast, secure, and affordable shopping experience.',
    images: ['https://your-domain.com/og-image.png'],
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Toaster position="top-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
