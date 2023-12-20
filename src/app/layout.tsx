import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import React from "react";

export const metadata: Metadata = {
  title: "MedInfoPlus",
  description: "Find any medical article and write your blogs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="">
            <Navbar />
          </div>

          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
