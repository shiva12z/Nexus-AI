"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function DashboardAuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setReady(true);
  }, [router, pathname]);

  if (!ready) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-primary)",
          color: "rgba(240,240,255,0.5)",
          fontSize: 14,
        }}
      >
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
