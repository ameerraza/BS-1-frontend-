import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Loader from "../../components/common/Loader";
import ToastProvider from "../../components/common/ToastProvider";
import ProtectedRoutes from "../../components/auth/ProtectedRoutes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwapNShare Dashboard",
  description: "Dashboard for SwapNShare platform administrators and vendors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Loader />
        <ToastProvider />

        <ProtectedRoutes>{children}</ProtectedRoutes>
      </body>
    </html>
  );
}
