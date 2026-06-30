"use client";

import Link from "next/link";
import Image from "next/image";
import { AppProvider, useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import { FILM_COLORS, FILM_DESCRIPTIONS, FilmSimulation } from "@/lib/data";

const SIMULATIONS: FilmSimulation[] = [
  "Classic Chrome",
  "Classic Neg",
  "Nostalgic Neg",
  "Velvia",
  "Provia/Standard",
  "Astia/Soft",
  "Eterna",
  "Acros",
  "Reala Ace",
];

function CatalogContent() {
  const { recipes } = useApp();

  return (
    <div className="min-h-screen pb-28" style={{ background: "#0a0a0a" }}>
      <div
        className="sticky top-0 z-40 px-4 pt-14 pb-4"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
      >
        <h1
          className="text-xl font-bold"
          style={{ color: "#f5f5f5", letterSpacing: "-0.02em" }}
        >
          Catálogo
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b6b6b" }}>
          Explora por film simulation
        </p>
      </div>

      <div className="px-4 mt-2 space-y-3">
        {SIMULATIONS.map((sim) => {
          const count = recipes.filter((r) => r.filmSimulation === sim).length;
          const preview = recipes.find((r) => r.filmSimulation === sim);
          const color = FILM_COLORS[sim];

          return (
            <Link
              key={sim}
              href={`/catalog/${encodeURIComponent(sim)}`}
              className="flex items-center gap-4 p-3 rounded-2xl overflow-hidden"
              style={{ background: "#141414" }}
            >
              {/* Preview photo */}
              <div
                className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0"
                style={{ background: "#1e1e1e" }}
              >
                {preview && (
                  <Image
                    src={preview.photos[0]}
                    alt={sim}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                )}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: color }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <p className="font-semibold text-sm truncate" style={{ color: "#f5f5f5" }}>
                    {sim}
                  </p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
                  {FILM_DESCRIPTIONS[sim]}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-bold" style={{ color: "#e8d5b7" }}>
                  {count}
                </p>
                <p className="text-[10px]" style={{ color: "#6b6b6b" }}>
                  recetas
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <AppProvider>
      <CatalogContent />
      <BottomNav />
    </AppProvider>
  );
}
