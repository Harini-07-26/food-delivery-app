import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "../services/queryClientProvider";
import { Navbar } from "../components/shared/navbar";
import { Footer } from "../components/shared/footer";
import { CartDrawer } from "../components/features/cart/cart-drawer";
import { StickyCartSummary } from "../components/features/cart/sticky-cart-summary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GourmetDash - Premium Food Delivery",
  description: "Order fresh, restaurant-quality meals delivered hot to your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <TanstackProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <CartDrawer />
          <StickyCartSummary />
        </TanstackProvider>
      </body>
    </html>
  );
}
