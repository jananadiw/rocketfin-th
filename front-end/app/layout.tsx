import React from "react";
import { Metadata } from "next";
import NavBar from "./components/NavBar";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Investment Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
