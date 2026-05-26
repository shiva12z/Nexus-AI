import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusAI — AI-First Customer Communication Platform",
  description:
    "Automate WhatsApp, Instagram, Facebook, voice calls, bookings, and customer support from one intelligent inbox. The AI employee for modern SMBs.",
  keywords: "AI chatbot, WhatsApp automation, customer communication, unified inbox, SMB",
  openGraph: {
    title: "NexusAI — Your AI Employee for Customer Conversations",
    description: "Automate every customer touchpoint with AI. WhatsApp, Instagram, Facebook, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
