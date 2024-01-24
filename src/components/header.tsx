"use client";
import React from "react";
import { RiHome2Line, RiSettings2Line, RiWallet3Line } from "react-icons/ri";
import { RiRobot2Line } from "react-icons/ri";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";

import { PiWalletBold } from "react-icons/pi";
import Link from "next/link";
import useUserAgent from "@/hooks/useUserAgent";
import { Session } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    icon: <RiHome2Line className="text-2xl" />,
    path: "/dashboard",
  },
  {
    name: "Wallet",
    icon: <RiWallet3Line className="text-2xl" />,
    path: "/wallet",
  },
  {
    name: "Snipper",
    icon: <RiRobot2Line className="text-2xl" />,
    path: "/snipper",
  },
  {
    name: "Swap",
    icon: <MdOutlineSwapHorizontalCircle className="text-2xl" />,
    path: "/swap",
  },
  {
    name: "Settings",
    icon: <RiSettings2Line className="text-2xl" />,
    path: "/settings",
  },
];

const Header = ({ session }: { session: any }) => {
  const { isStandalone } = useUserAgent();
  const pathname = usePathname();

  return (
    isStandalone && (
      // !!user && (
      <div className="fixed bottom-0 left-0 w-full bg-[#16171a] shadow-lg shadow-slate-50 z-10">
        <ul className="flex justify-between py-4 px-4  ">
          {navLinks.map((link) => (
            <li className="text-white" key={link.name}>
              <Link
                href={link.path}
                className={`flex flex-col text-xs items-center text-[#a7a7cb] ${
                  pathname === link.path && "text-primary"
                }`}
              >
                {link.icon} {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
  // );
};

export default Header;
