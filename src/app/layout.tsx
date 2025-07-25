import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "../store/provider";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AuthModals } from "../components/ui/Modal";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelBooker - Book Hotels, Flights & Cars",
  description: "Your trusted travel companion for booking hotels, flights, and cars worldwide. Experience seamless travel planning with the best deals and customer service.",
  keywords: "travel, booking, hotels, flights, cars, vacation, deals",
  authors: [{ name: "TravelBooker" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReduxProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <AuthModals />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
