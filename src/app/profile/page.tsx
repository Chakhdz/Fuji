"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Bookmark, Grid3X3 } from "lucide-react";
import { AppProvider, useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import { FILM_COLORS } from "@/lib/data";

const ME = {
  username: "tu_usuario",
  avatar: "https://i.pravatar.cc/150?img=1",
  bio: "Fujifilm X-T5 · Amante de la fotografía análoga digital",
  followers: 0,
  following: 24,
};

function ProfileContent() {
  const { recipes } = useApp();
  const [tab, setTab] = useState<"created" | "saved">("created");

  const myRecipes = recipes.filter((r) => r.author.id === "me" || r.author.id === "u1");
  const savedRecipes = recipes.filter((r) => r.saved);

  const displayed = tab === "created" ? myRecipes : savedRecipes;

  return (
    <div className="min-h-screen pb-28" style={{ background: "#0a0a0a" }}>
      {/* Header */}
      <div className="pt-14 px-4 pb-4">
        <div className="flex items-start gap-4 mb-5">
          <Image
            src={ME.avatar}
            alt={ME.username}
            width={72}
            height={72}
            className="rounded-full"
          />
          <div className="flex-1">
            <p className="font-bold text-lg" style={{ color: "#f5f5f5" }}>
              @{ME.username}
            </p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "#6b6b6b" }}>
              {ME.bio}
            </p>
            <div className="flex gap-4 mt-3">
              <div>
                <p className="font-bold text-sm" style={{ color: "#f5f5f5" }}>
                  {ME.followers}
                </p>
                <p className="text-xs" style={{ color: "#6b6b6b" }}>
                  seguidores
                </p>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#f5f5f5" }}>
                  {ME.following}
                </p>
                <p className="text-xs" style={{ color: "#6b6b6b" }}>
                  siguiendo
                </p>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#f5f5f5" }}>
                  {myRecipes.length}
                </p>
                <p className="text-xs" style={{ color: "#6b6b6b" }}>
                  recetas
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/create"
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "#e8d5b7", color: "#0a0a0a" }}
        >
          + Nueva receta
        </Link>
      </div>

      {/* Tabs */}
      <div
        className="flex border-b mx-4 mb-3"
        style={{ borderColor: "#1e1e1e" }}
      >
        <button
          onClick={() => setTab("created")}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold"
          style={{
            color: tab === "created" ? "#e8d5b7" : "#6b6b6b",
            borderBottom: tab === "created" ? "2px solid #e8d5b7" : "2px solid transparent",
          }}
        >
          <Grid3X3 size={14} />
          Mis recetas
        </button>
        <button
          onClick={() => setTab("saved")}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold"
          style={{
            color: tab === "saved" ? "#e8d5b7" : "#6b6b6b",
            borderBottom: tab === "saved" ? "2px solid #e8d5b7" : "2px solid transparent",
          }}
        >
          <Bookmark size={14} />
          Guardadas
        </button>
      </div>

      {/* Grid */}
      {displayed.length > 0 ? (
        <div className="px-4 columns-2 gap-3">
          {displayed.map((recipe) => (
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
                  <div className="absolute top-2 left-2">
                    <span
                      className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
                      style={{ background: FILM_COLORS[recipe.filmSimulation], color: "#fff" }}
                    >
                      {recipe.filmSimulation.split("/")[0]}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <p className="font-semibold text-sm" style={{ color: "#f5f5f5" }}>
                    {recipe.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Heart size={11} color="#6b6b6b" />
                    <span className="text-[10px]" style={{ color: "#6b6b6b" }}>
                      {recipe.likes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <p className="text-center" style={{ color: "#6b6b6b" }}>
            {tab === "created"
              ? "Aún no tienes recetas. ¡Crea la primera!"
              : "Aún no has guardado recetas."}
          </p>
          {tab === "created" && (
            <Link
              href="/create"
              className="mt-4 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: "#e8d5b7", color: "#0a0a0a" }}
            >
              Crear receta
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AppProvider>
      <ProfileContent />
      <BottomNav />
    </AppProvider>
  );
}
