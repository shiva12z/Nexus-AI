"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import PageTransition from "@/components/dashboard/PageTransition";
import { ToastProvider } from "@/components/dashboard/Toast";
import DashboardAuthGate from "@/components/dashboard/DashboardAuthGate";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardAuthGate>
    <ToastProvider>
      <div className="dashboard-shell">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {sidebarOpen && (
          <button
            className="sidebar-overlay"
            aria-label="Close navigation menu"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="dashboard-content">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="dashboard-main">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </ToastProvider>
    </DashboardAuthGate>
  );
}
