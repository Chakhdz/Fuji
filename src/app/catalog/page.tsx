"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppProvider, useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import {
  FILM_COLORS, FILM_DESCRIPTIONS, FilmSimulation,
  SENSOR_COLORS, CATEGORY_ICONS, SensorGen, RecipeCategory,
} from "@/lib/data";

const SIMULATIONS: FilmSimulation[] = [
  "Classic Chrome", "Classic Neg", "Nostalgic Neg", "Velvia",
  "Provia/Standard", "Astia/Soft", "Eterna", "Acros", "Reala Ace",
];

const SENSORS: SensorGen[] = ["X-Trans V", "X-Trans IV", "X-Trans III", "GFX"];
const CATEGORIES: RecipeCategory[] = ["Landscape", "Portrait", "Street", "Cinematic", "Vintage"];

function CatalogContent() {
  const { recipes } = useApp();
  const [tab, setTab] = useState<"film" | "sensor" | "style">("film");

  return (
    <div className="min-h-screen pb-28" style={{ background: "#0a0a0a" }}>
      <div
        className="sticky top-0 z-40 px-4 pt-14 pb-0"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
      >
        <h1 className="text-xl font-bold mb-1" style={{ color: "#f5f5f5", letterSpacing: "-0.02em" }}>
          Catálogo
        </h1>

        {/* Tab selector */}
        <div className="flex border-b" style={{ borderColor: "#1e1e1e" }}>
          {([["film", "Film Sim"], ["sensor", "Sensor"], ["style", "Estilo"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex-1 py-3 text-xs font-bold tracking-wide"
              style={{
                color: tab === key ? "#e8d5b7" : "#6b6b6b",
                borderBottom: tab === key ? "2px solid #e8d5b7" : "2px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-3 space-y-3">
        {/* Film Simulation tab */}
        {tab === "film" && SIMULATIONS.map((sim) => {
          const count = recipes.filter((r) => r.filmSimulation === sim).length;
          const preview = recipes.find((r) => r.filmSimulation === sim);
          const color = FILM_COLORS[sim];
          return (
            <Link
              key={sim}
              href={`/catalog/${encodeURIComponent(sim)}`}
              className="flex items-center gap-4 p-3 rounded-2xl"
              style={{ background: "#141414" }}
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ background: "#1e1e1e" }}>
                {preview && <Image src={preview.photos[0]} alt={sim} fill className="object-cover" sizes="64px" />}
                <div className="absolute inset-0 opacity-30" style={{ background: color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                  <p className="font-semibold text-sm truncate" style={{ color: "#f5f5f5" }}>{sim}</p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>{FILM_DESCRIPTIONS[sim]}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold" style={{ color: "#e8d5b7" }}>{count}</p>
                <p className="text-[10px]" style={{ color: "#6b6b6b" }}>recetas</p>
              </div>
            </Link>
          );
        })}

        {/* Sensor tab */}
        {tab === "sensor" && SENSORS.map((sensor) => {
          const count = recipes.filter((r) => r.sensorGen === sensor).length;
          const preview = recipes.find((r) => r.sensorGen === sensor);
          const color = SENSOR_COLORS[sensor];
          return (
            <div key={sensor} className="rounded-2xl overflow-hidden" style={{ background: "#141414" }}>
              <div className="flex items-center gap-4 p-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ background: "#1e1e1e" }}>
                  {preview && <Image src={preview.photos[0]} alt={sensor} fill className="object-cover" sizes="64px" />}
                  <div className="absolute inset-0 opacity-30" style={{ background: color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <p className="font-semibold text-sm" style={{ color: "#f5f5f5" }}>{sensor}</p>
                  </div>
                  <p className="text-xs" style={{ color: "#6b6b6b" }}>
                    {sensor === "GFX" ? "Sensor de formato medio" :
                     sensor === "X-Trans V" ? "Cámaras: X-T5, X-H2S, X100VI" :
                     sensor === "X-Trans IV" ? "Cámaras: X-T4, X-Pro3, X-S10" :
                     "Cámaras: X-T3, X-Pro2, X100V"}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold" style={{ color: "#e8d5b7" }}>{count}</p>
                  <p className="text-[10px]" style={{ color: "#6b6b6b" }}>recetas</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Style/Category tab */}
        {tab === "style" && CATEGORIES.map((cat) => {
          const catRecipes = recipes.filter((r) => r.category === cat);
          const preview = catRecipes[0];
          return (
            <div key={cat} className="rounded-2xl overflow-hidden" style={{ background: "#141414" }}>
              <div className="flex items-center gap-4 p-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ background: "#1e1e1e" }}>
                  {preview && <Image src={preview.photos[0]} alt={cat} fill className="object-cover" sizes="64px" />}
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">
                    {CATEGORY_ICONS[cat]}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: "#f5f5f5" }}>{cat}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6b6b6b" }}>
                    {catRecipes.slice(0, 2).map(r => r.name).join(", ")}
                    {catRecipes.length > 2 ? "..." : ""}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold" style={{ color: "#e8d5b7" }}>{catRecipes.length}</p>
                  <p className="text-[10px]" style={{ color: "#6b6b6b" }}>recetas</p>
                </div>
              </div>
            </div>
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
