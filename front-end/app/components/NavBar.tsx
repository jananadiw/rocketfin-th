"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles/globals.css";

const NavBar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Transactions", path: "/transactions" },
  ];

  return (
    <nav className="flex-col justify-center items-center py-10 font-raleway bg-white sticky">
      <div className="uppercase mt-2 mx-auto">
        <div className="flex justify-center items-center">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`w-32 text-center ${
                item.name === "Transactions" ? "w-40" : ""
              }`}
            >
              <Link
                href={item.path}
                className={`block py-2 px-4 ${
                  pathname === item.path
                    ? "text-blue-600 font-bold"
                    : "text-gray-900 hover:text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
