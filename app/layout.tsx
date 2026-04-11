import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { DM_Sans, Lora } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSerif = Lora({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Looply",
  description: "Close your open loops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          backgroundColor: "#F7F4F0",
          color: "#2C2416",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {children}
        <Navbar />
      </body>
    </html>
  );
}
