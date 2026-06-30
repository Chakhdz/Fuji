"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Share } from "lucide-react";
import { AppProvider, useApp } from "@/context/AppContext";
import { FILM_COLORS, SENSOR_COLORS } from "@/lib/data";

function ShareFrame({ id }: { id: string }) {
  const { recipes } = useApp();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <p style={{ color: "#6b6b6b" }}>Receta no encontrada</p>
      </div>
    );
  }

  const filmColor = FILM_COLORS[recipe.filmSimulation];
  const sensorColor = SENSOR_COLORS[recipe.sensorGen];

  return (
    <div className="min-h-screen pb-28" style={{ background: "#0a0a0a" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 pt-14 pb-4"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <Link href={`/recipe/${id}`}>
            <ArrowLeft size={20} color="#6b6b6b" />
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#f5f5f5" }}>
            EXIF Frame
          </h1>
        </div>
        <p className="text-xs mt-1 ml-8" style={{ color: "#6b6b6b" }}>
          Comparte tu receta en Instagram / Stories
        </p>
      </div>

      <div className="px-4 mt-2">
        {/* Square frame — Instagram-ready */}
        <div
          className="w-full relative overflow-hidden rounded-2xl"
          style={{ aspectRatio: "1/1", background: "#0a0a0a" }}
        >
          {/* Background photo */}
          <Image
            src={recipe.photos[0]}
            alt={recipe.name}
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.95) 100%)" }}
          />

          {/* Top-left: Film badge */}
          <div className="absolute top-4 left-4 flex gap-1.5">
            <span
              className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded"
              style={{ background: filmColor, color: "#fff" }}
            >
              {recipe.filmSimulation}
            </span>
            <span
              className="text-[9px] font-bold px-2 py-1 rounded"
              style={{ background: sensorColor, color: "#fff" }}
            >
              {recipe.sensorGen}
            </span>
          </div>

          {/* Top-right: camera */}
          <div className="absolute top-4 right-4">
            <span
              className="text-[9px] font-semibold px-2 py-1 rounded"
              style={{ background: "rgba(0,0,0,0.5)", color: "#e8d5b7", backdropFilter: "blur(4px)" }}
            >
              {recipe.camera}
            </span>
          </div>

          {/* Bottom overlay: recipe data */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-bold text-lg leading-tight mb-1" style={{ color: "#f5f5f5" }}>
              {recipe.name}
            </p>
            <p className="text-xs mb-3" style={{ color: "#e8d5b7" }}>
              @{recipe.author.username} · fujirecipes.app
            </p>

            {/* Settings grid */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
              {[
                ["HL", recipe.settings.highlight],
                ["SH", recipe.settings.shadow],
                ["COL", recipe.settings.color],
                ["SHP", recipe.settings.sharpness],
                ["NR", recipe.settings.noiseReduction],
                ["GRAIN", recipe.settings.grain],
                ["WB", recipe.settings.whiteBalance.split(" ")[0]],
                ["DR", recipe.settings.dynamicRange],
                ["EV", recipe.settings.exposureComp],
              ].map(([label, val]) => (
                <div key={String(label)} className="flex items-center gap-1">
                  <span className="text-[9px] font-bold" style={{ color: "#6b6b6b" }}>
                    {label}
                  </span>
                  <span
                    className="text-[10px] font-bold"
                    style={{
                      color:
                        typeof val === "number" && val > 0
                          ? "#7ec88a"
                          : typeof val === "number" && val < 0
                          ? "#e87070"
                          : "#f5f5f5",
                    }}
                  >
                    {typeof val === "number" && val > 0 ? `+${val}` : String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story format (9:16) preview */}
        <p className="text-xs mt-4 mb-2 font-semibold tracking-widest uppercase" style={{ color: "#6b6b6b" }}>
          Formato Stories
        </p>
        <div
          className="w-full relative overflow-hidden rounded-2xl"
          style={{ aspectRatio: "9/16", background: "#0a0a0a", maxHeight: 480 }}
        >
          <Image src={recipe.photos[0]} alt={recipe.name} fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.9) 100%)" }}
          />

          <div className="absolute top-6 left-4 right-4">
            <div className="flex gap-1.5">
              <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded" style={{ background: filmColor, color: "#fff" }}>
                {recipe.filmSimulation}
              </span>
              <span className="text-[9px] font-bold px-2 py-1 rounded" style={{ background: sensorColor, color: "#fff" }}>
                {recipe.sensorGen}
              </span>
            </div>
          </div>

          <div className="absolute bottom-8 left-4 right-4">
            <p className="font-bold text-xl mb-1" style={{ color: "#f5f5f5" }}>{recipe.name}</p>
            <p className="text-xs mb-4" style={{ color: "#e8d5b7" }}>@{recipe.author.username}</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Highlight", recipe.settings.highlight],
                ["Shadow", recipe.settings.shadow],
                ["Color", recipe.settings.color],
                ["Sharpness", recipe.settings.sharpness],
                ["Noise Red.", recipe.settings.noiseReduction],
                ["Grain", recipe.settings.grain],
              ].map(([label, val]) => (
                <div
                  key={String(label)}
                  className="px-2 py-1.5 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <p className="text-[9px]" style={{ color: "#6b6b6b" }}>{label}</p>
                  <p
                    className="text-xs font-bold"
                    style={{
                      color:
                        typeof val === "number" && val > 0 ? "#7ec88a"
                        : typeof val === "number" && val < 0 ? "#e87070"
                        : "#f5f5f5",
                    }}
                  >
                    {typeof val === "number" && val > 0 ? `+${val}` : String(val)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-5">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm"
            style={{ background: "#141414", color: "#6b6b6b", border: "1px solid #2a2a2a" }}
            onClick={() => alert("En la app nativa: guarda como imagen a tu cámara")}
          >
            <Download size={16} />
            Guardar
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm"
            style={{ background: "#e8d5b7", color: "#0a0a0a" }}
            onClick={() => alert("En la app nativa: abre Instagram directamente")}
          >
            <Share size={16} />
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AppProvider>
      <ShareFrame id={id} />
    </AppProvider>
  );
}
