import Navbar from "@/components/nav-bar";
import React from "react";
export const instant = false;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning>
      <Navbar />
      {children}
    </div>
  );
}
