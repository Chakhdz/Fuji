"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";
import { Recipe, FILM_COLORS } from "@/lib/data";
import { useApp } from "@/context/AppContext";

interface Props {
  recipe: Recipe;
  compact?: boolean;
}

export default function RecipeCard({ recipe, compact = false }: Props) {
  const { toggleLike, toggleSave } = useApp();
  const filmColor = FILM_COLORS[recipe.filmSimulation];

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ background: "#141414" }}
    >
      <Link href={`/recipe/${recipe.id}`} className="block">
        <div className="relative" style={{ aspectRatio: compact ? "1/1" : "4/5" }}>
          <Image
            src={recipe.photos[0]}
            alt={recipe.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
            }}
          />
          <div className="absolute top-3 left-3">
            <span
              className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded"
              style={{ background: filmColor, color: "#fff", opacity: 0.9 }}
            >
              {recipe.filmSimulation}
            </span>
          </div>
        </div>

        <div className="p-3">
          <p className="font-semibold text-sm text-white truncate">{recipe.name}</p>
          {!compact && (
            <p className="text-xs mt-0.5" style={{ color: "#6b6b6b" }}>
              @{recipe.author.username}
            </p>
          )}
        </div>
      </Link>

      <div className="flex items-center justify-between px-3 pb-3">
        <button
          onClick={() => toggleLike(recipe.id)}
          className="flex items-center gap-1"
        >
          <Heart
            size={16}
            fill={recipe.liked ? "#e8d5b7" : "none"}
            color={recipe.liked ? "#e8d5b7" : "#6b6b6b"}
          />
          <span className="text-xs" style={{ color: "#6b6b6b" }}>
            {recipe.likes.toLocaleString()}
          </span>
        </button>
        <button onClick={() => toggleSave(recipe.id)}>
          <Bookmark
            size={16}
            fill={recipe.saved ? "#e8d5b7" : "none"}
            color={recipe.saved ? "#e8d5b7" : "#6b6b6b"}
          />
        </button>
      </div>
    </div>
  );
}
