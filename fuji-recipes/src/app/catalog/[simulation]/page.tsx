"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Bookmark } from "lucide-react";
import { AppProvider, useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import { FILM_COLORS, FILM_DESCRIPTIONS, FilmSimulation } from "@/lib/data";

function SimulationList({ simulation }: { simulation: string }) {
  const { recipes, toggleLike, toggleSave } = useApp();
  const sim = decodeURIComponent(simulation) as FilmSimulation;
  const filtered = recipes.filter((r) => r.filmSimulation === sim);
  const color = FILM_COLORS[sim] || "#888";

  return (
    <div className="min-h-screen pb-28" style={{ background: "#0a0a0a" }}>
      <div
        className="sticky top-0 z-40 px-4 pt-14 pb-4"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Link href="/catalog">
            <ArrowLeft size={20} color="#6b6b6b" />
          </Link>
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: color }}
          />
          <h1 className="text-lg font-bold" style={{ color: "#f5f5f5" }}>
            {sim}
          </h1>
        </div>
        <p className="text-sm ml-9" style={{ color: "#6b6b6b" }}>
          {FILM_DESCRIPTIONS[sim]} · {filtered.length} recetas
        </p>
      </div>

      <div className="px-4 mt-2 columns-2 gap-3">
        {filtered.map((recipe) => (
          <div
            key={recipe.id}
            className="break-inside-avoid mb-3 rounded-2xl overflow-hidden"
            style={{ background: "#141414" }}
          >
            <Link href={`/recipe/${recipe.id}`} className="block">
              <div className="relative" style={{ aspectRatio: "4/5" }}>
                <Image
                  src={recipe.photos[0]}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }}
                />
              </div>
              <div className="px-3 pt-2">
                <p className="font-semibold text-sm" style={{ color: "#f5f5f5" }}>
                  {recipe.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#6b6b6b" }}>
                  @{recipe.author.username}
                </p>
              </div>
            </Link>
            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={() => toggleLike(recipe.id)}
                className="flex items-center gap-1"
              >
                <Heart
                  size={15}
                  fill={recipe.liked ? "#e8d5b7" : "none"}
                  color={recipe.liked ? "#e8d5b7" : "#6b6b6b"}
                />
                <span className="text-xs" style={{ color: "#6b6b6b" }}>
                  {recipe.likes.toLocaleString()}
                </span>
              </button>
              <button onClick={() => toggleSave(recipe.id)}>
                <Bookmark
                  size={15}
                  fill={recipe.saved ? "#e8d5b7" : "none"}
                  color={recipe.saved ? "#e8d5b7" : "#6b6b6b"}
                />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-20">
            <p style={{ color: "#6b6b6b" }}>No hay recetas aún para {sim}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SimulationPage({ params }: { params: Promise<{ simulation: string }> }) {
  const { simulation } = use(params);
  return (
    <AppProvider>
      <SimulationList simulation={simulation} />
      <BottomNav />
    </AppProvider>
  );
}
