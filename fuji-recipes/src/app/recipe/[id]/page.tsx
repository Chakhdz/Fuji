"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Bookmark, Camera, Share2 } from "lucide-react";
import { AppProvider, useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import { FILM_COLORS } from "@/lib/data";

function SettingRow({ label, value }: { label: string; value: string | number }) {
  const isNumber = typeof value === "number";
  const isPositive = isNumber && (value as number) > 0;
  const isNegative = isNumber && (value as number) < 0;

  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: "1px solid #1e1e1e" }}
    >
      <span className="text-sm" style={{ color: "#6b6b6b" }}>
        {label}
      </span>
      <span
        className="text-sm font-semibold"
        style={{
          color: isPositive ? "#7ec88a" : isNegative ? "#e87070" : "#f5f5f5",
        }}
      >
        {isNumber && value > 0 ? `+${value}` : String(value)}
      </span>
    </div>
  );
}

function RecipeDetail({ id }: { id: string }) {
  const { recipes, toggleLike, toggleSave } = useApp();
  const recipe = recipes.find((r) => r.id === id);
  const [photoIdx, setPhotoIdx] = useState(0);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <p style={{ color: "#6b6b6b" }}>Receta no encontrada</p>
      </div>
    );
  }

  const filmColor = FILM_COLORS[recipe.filmSimulation];

  return (
    <div className="min-h-screen pb-28" style={{ background: "#0a0a0a" }}>
      {/* Photo gallery */}
      <div className="relative" style={{ aspectRatio: "4/5" }}>
        <Image
          src={recipe.photos[photoIdx]}
          alt={recipe.name}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Back button */}
        <Link
          href="/"
          className="absolute top-14 left-4 w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
        >
          <ArrowLeft size={18} color="#fff" />
        </Link>

        {/* Film badge */}
        <div className="absolute top-14 right-4">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded"
            style={{ background: filmColor, color: "#fff" }}
          >
            {recipe.filmSimulation}
          </span>
        </div>

        {/* Photo dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {recipe.photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setPhotoIdx(i)}
              className="rounded-full transition-all"
              style={{
                width: i === photoIdx ? 20 : 6,
                height: 6,
                background: i === photoIdx ? "#e8d5b7" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pt-5">
        {/* Author + title */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image
              src={recipe.author.avatar}
              alt={recipe.author.username}
              width={38}
              height={38}
              className="rounded-full"
            />
            <div>
              <p className="font-bold text-base" style={{ color: "#f5f5f5" }}>
                {recipe.name}
              </p>
              <p className="text-xs" style={{ color: "#6b6b6b" }}>
                @{recipe.author.username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleLike(recipe.id)}
              className="flex flex-col items-center gap-0.5"
            >
              <Heart
                size={22}
                fill={recipe.liked ? "#e8d5b7" : "none"}
                color={recipe.liked ? "#e8d5b7" : "#6b6b6b"}
              />
              <span className="text-[10px]" style={{ color: "#6b6b6b" }}>
                {recipe.likes.toLocaleString()}
              </span>
            </button>
            <button
              onClick={() => toggleSave(recipe.id)}
              className="flex flex-col items-center gap-0.5"
            >
              <Bookmark
                size={22}
                fill={recipe.saved ? "#e8d5b7" : "none"}
                color={recipe.saved ? "#e8d5b7" : "#6b6b6b"}
              />
              <span className="text-[10px]" style={{ color: "#6b6b6b" }}>
                {recipe.saves.toLocaleString()}
              </span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <Share2 size={22} color="#6b6b6b" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: "#1e1e1e", color: "#6b6b6b" }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Camera info */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-5"
          style={{ background: "#141414" }}
        >
          <Camera size={15} color="#e8d5b7" />
          <span className="text-sm font-medium" style={{ color: "#e8d5b7" }}>
            {recipe.camera}
          </span>
          <span className="text-sm" style={{ color: "#6b6b6b" }}>
            · {recipe.settings.iso} · EV {recipe.settings.exposureComp}
          </span>
        </div>

        {/* Settings */}
        <div
          className="rounded-2xl px-4"
          style={{ background: "#141414" }}
        >
          <p
            className="text-xs font-bold tracking-widest uppercase pt-4 pb-2"
            style={{ color: "#6b6b6b" }}
          >
            Configuración
          </p>
          <SettingRow label="Film Simulation" value={recipe.filmSimulation} />
          <SettingRow label="Dynamic Range" value={recipe.settings.dynamicRange} />
          <SettingRow label="Highlight" value={recipe.settings.highlight} />
          <SettingRow label="Shadow" value={recipe.settings.shadow} />
          <SettingRow label="Color" value={recipe.settings.color} />
          <SettingRow label="Sharpness" value={recipe.settings.sharpness} />
          <SettingRow label="Noise Reduction" value={recipe.settings.noiseReduction} />
          <SettingRow label="Grain" value={recipe.settings.grain} />
          <SettingRow label="Color Chrome" value={recipe.settings.colorChrome} />
          <SettingRow label="White Balance" value={recipe.settings.whiteBalance} />
          <SettingRow label="WB Shift R" value={recipe.settings.wbShiftR} />
          <SettingRow label="WB Shift B" value={recipe.settings.wbShiftB} />
          <div className="py-4" />
        </div>
      </div>
    </div>
  );
}

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AppProvider>
      <RecipeDetail id={id} />
      <BottomNav />
    </AppProvider>
  );
}
