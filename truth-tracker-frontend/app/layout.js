import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Newsreader({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-serif" });

export const metadata = {
  title: "Truth Tracker | AI Fact Verification",
  description: "Check claims against real-time news with semantic search and AI evidence analysis.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
