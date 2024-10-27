import React from "react";
import { Metadata } from "next";
import NavBar from "./components/NavBar";
import "../styles/globals.css";

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
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
