"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Plus, User } from "lucide-react";

const NAV = [
  { href: "/", icon: Home, label: "Discover" },
  { href: "/catalog", icon: BookOpen, label: "Catálogo" },
  { href: "/create", icon: Plus, label: "Crear" },
  { href: "/profile", icon: User, label: "Perfil" },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-2 pb-safe"
      style={{
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid #1e1e1e",
        height: 72,
        paddingBottom: "max(env(safe-area-inset-bottom), 8px)",
      }}
    >
      {NAV.map(({ href, icon: Icon, label }) => {
        const isCreate = href === "/create";
        const active = path === href;

        if (isCreate) {
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-center w-12 h-12 rounded-full"
              style={{ background: "#e8d5b7" }}
            >
              <Icon size={22} color="#0a0a0a" strokeWidth={2.5} />
            </Link>
          );
        }

        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 py-2 px-3"
          >
            <Icon
              size={22}
              color={active ? "#e8d5b7" : "#6b6b6b"}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <span
              className="text-[10px] tracking-wide"
              style={{ color: active ? "#e8d5b7" : "#6b6b6b" }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
