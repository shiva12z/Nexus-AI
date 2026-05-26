import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "NexusAI Dashboard",
  description: "AI-powered customer communication dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
