"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Bookmark, Search } from "lucide-react";
import { AppProvider, useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import { FILM_COLORS, SENSOR_COLORS, FilmSimulation, SensorGen } from "@/lib/data";

const FILM_FILTERS: (FilmSimulation | "All")[] = [
  "All", "Classic Chrome", "Classic Neg", "Nostalgic Neg", "Velvia", "Acros", "Eterna",
];

const SENSOR_FILTERS: (SensorGen | "All")[] = [
  "All", "X-Trans V", "X-Trans IV", "X-Trans III", "GFX",
];

function DiscoverFeed() {
  const { recipes, toggleLike, toggleSave } = useApp();
  const [filmFilter, setFilmFilter] = useState<FilmSimulation | "All">("All");
  const [sensorFilter, setSensorFilter] = useState<SensorGen | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = recipes.filter((r) => {
    const matchFilm = filmFilter === "All" || r.filmSimulation === filmFilter;
    const matchSensor = sensorFilter === "All" || r.sensorGen === sensorFilter;
    const matchSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.author.username.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.includes(search.toLowerCase()));
    return matchFilm && matchSensor && matchSearch;
  });

  return (
    <div className="min-h-screen pb-24" style={{ background: "#0a0a0a" }}>
      <div
        className="sticky top-0 z-40 px-4 pt-14 pb-3"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: "#e8d5b7", letterSpacing: "-0.02em" }}
          >
            Fuji Recipes
          </h1>
          <div
            className="w-8 h-8 rounded-full overflow-hidden border"
            style={{ borderColor: "#2a2a2a" }}
          >
            <Image
              src="https://i.pravatar.cc/150?img=1"
              alt="avatar"
              width={32}
              height={32}
            />
          </div>
        </div>

        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3"
          style={{ background: "#1e1e1e" }}
        >
          <Search size={15} color="#6b6b6b" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar receta, autor, tag..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#f5f5f5" }}
          />
        </div>

        {/* Film simulation filter */}
        <div className="flex gap-2 overflow-x-auto pb-1.5" style={{ scrollbarWidth: "none" }}>
          {FILM_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilmFilter(f)}
              className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
              style={{
                background: filmFilter === f ? "#e8d5b7" : "#1e1e1e",
                color: filmFilter === f ? "#0a0a0a" : "#6b6b6b",
                border: filmFilter === f ? "none" : "1px solid #2a2a2a",
              }}
            >
              {f === "All" ? "Todos" : f}
            </button>
          ))}
        </div>

        {/* Sensor filter — FREE, sin paywall */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {SENSOR_FILTERS.map((s) => {
            const active = sensorFilter === s;
            const color = s !== "All" ? SENSOR_COLORS[s] : undefined;
            return (
              <button
                key={s}
                onClick={() => setSensorFilter(s)}
                className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full transition-all flex items-center gap-1"
                style={{
                  background: active ? (color ?? "#e8d5b7") : "#141414",
                  color: active ? "#fff" : "#6b6b6b",
                  border: `1px solid ${active ? (color ?? "#e8d5b7") : "#2a2a2a"}`,
                }}
              >
                {s === "All" ? "Sensor: Todos" : s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-2 columns-2 gap-3">
        {filtered.map((recipe, i) => (
          <div
            key={recipe.id}
            className="break-inside-avoid mb-3 rounded-2xl overflow-hidden"
            style={{ background: "#141414" }}
          >
            <Link href={`/recipe/${recipe.id}`} className="block">
              <div className="relative">
                <Image
                  src={recipe.photos[0]}
                  alt={recipe.name}
                  width={400}
                  height={i % 3 === 0 ? 400 : 500}
                  className="w-full object-cover"
                  style={{ aspectRatio: i % 3 === 0 ? "1/1" : "4/5" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
                    style={{ background: FILM_COLORS[recipe.filmSimulation], color: "#fff" }}
                  >
                    {recipe.filmSimulation.split("/")[0]}
                  </span>
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: SENSOR_COLORS[recipe.sensorGen], color: "#fff" }}
                  >
                    {recipe.sensorGen}
                  </span>
                </div>
              </div>
              <div className="px-3 pt-2">
                <p className="font-semibold text-sm truncate" style={{ color: "#f5f5f5" }}>
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
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <DiscoverFeed />
      <BottomNav />
    </AppProvider>
  );
}
