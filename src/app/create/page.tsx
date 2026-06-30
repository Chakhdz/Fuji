"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Camera } from "lucide-react";
import Link from "next/link";
import { AppProvider, useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import { FilmSimulation, FILM_COLORS, Recipe, SensorGen, RecipeCategory } from "@/lib/data";

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

const CAMERAS = ["X-T5", "X-T4", "X-Pro3", "X100V", "X-S20", "X-H2S", "GFX50S II"];

function SliderField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm" style={{ color: "#6b6b6b" }}>
          {label}
        </span>
        <span
          className="text-sm font-bold"
          style={{ color: value > 0 ? "#7ec88a" : value < 0 ? "#e87070" : "#f5f5f5" }}
        >
          {value > 0 ? `+${value}` : value}
        </span>
      </div>
      <input
        type="range"
        min={-4}
        max={4}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          background: `linear-gradient(to right, #e8d5b7 0%, #e8d5b7 ${((value + 4) / 8) * 100}%, #2a2a2a ${((value + 4) / 8) * 100}%, #2a2a2a 100%)`,
        }}
      />
    </div>
  );
}

function CreateForm() {
  const router = useRouter();
  const { addRecipe } = useApp();

  const [name, setName] = useState("");
  const [film, setFilm] = useState<FilmSimulation>("Classic Chrome");
  const [camera, setCamera] = useState("X-T5");
  const [tags, setTags] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [shadow, setShadow] = useState(0);
  const [color, setColor] = useState(0);
  const [sharpness, setSharpness] = useState(0);
  const [noiseReduction, setNoiseReduction] = useState(-2);
  const [grain, setGrain] = useState<"Off" | "Weak" | "Strong">("Off");
  const [colorChrome, setColorChrome] = useState<"Off" | "Weak" | "Strong">("Off");
  const [sensorGen, setSensorGen] = useState<SensorGen>("X-Trans V");
  const [category, setCategory] = useState<RecipeCategory>("Landscape");
  const [isPublic, setIsPublic] = useState(true);
  const [step, setStep] = useState<"info" | "settings" | "preview">("info");

  const handleSubmit = () => {
    const recipe: Recipe = {
      id: `new-${Date.now()}`,
      name: name || "Mi Receta",
      filmSimulation: film,
      sensorGen,
      category,
      isPublic,
      author: {
        id: "me",
        username: "tu_usuario",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      photos: [
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      ],
      settings: {
        dynamicRange: "DR200",
        highlight,
        shadow,
        color,
        sharpness,
        noiseReduction,
        grain,
        colorChrome,
        whiteBalance: "Auto",
        wbShiftR: 0,
        wbShiftB: 0,
        iso: "Auto",
        exposureComp: "0",
      },
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      likes: 0,
      saves: 0,
      camera,
      createdAt: new Date().toISOString().split("T")[0],
      liked: false,
      saved: false,
    };
    addRecipe(recipe);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: "#0a0a0a" }}>
      <div
        className="sticky top-0 z-40 px-4 pt-14 pb-4"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <ArrowLeft size={20} color="#6b6b6b" />
            </Link>
            <h1 className="text-lg font-bold" style={{ color: "#f5f5f5" }}>
              Nueva Receta
            </h1>
          </div>
          {step === "preview" && (
            <button
              onClick={handleSubmit}
              className="text-sm font-bold px-4 py-1.5 rounded-full"
              style={{ background: "#e8d5b7", color: "#0a0a0a" }}
            >
              Publicar
            </button>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex gap-1.5 mt-4">
          {(["info", "settings", "preview"] as const).map((s) => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full"
              style={{
                background:
                  s === step
                    ? "#e8d5b7"
                    : (["info", "settings", "preview"].indexOf(s) <
                        ["info", "settings", "preview"].indexOf(step))
                    ? "#8B7355"
                    : "#2a2a2a",
              }}
            />
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        {step === "info" && (
          <div>
            {/* Photo placeholder */}
            <div
              className="w-full aspect-video rounded-2xl flex flex-col items-center justify-center mb-5 border-2 border-dashed"
              style={{ borderColor: "#2a2a2a", background: "#141414" }}
            >
              <Camera size={32} color="#6b6b6b" />
              <p className="text-sm mt-2" style={{ color: "#6b6b6b" }}>
                Agregar fotos
              </p>
              <p className="text-xs mt-1" style={{ color: "#3a3a3a" }}>
                (simulado en prototipo)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#6b6b6b" }}>
                  Nombre de la Receta
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Golden Hour Melt"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#141414", color: "#f5f5f5", border: "1px solid #2a2a2a" }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#6b6b6b" }}>
                  Film Simulation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SIMULATIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilm(s)}
                      className="text-xs py-2 px-2 rounded-xl font-semibold transition-all"
                      style={{
                        background: film === s ? FILM_COLORS[s] : "#141414",
                        color: film === s ? "#fff" : "#6b6b6b",
                        border: `1px solid ${film === s ? FILM_COLORS[s] : "#2a2a2a"}`,
                      }}
                    >
                      {s.split("/")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#6b6b6b" }}>
                  Cámara
                </label>
                <div className="flex flex-wrap gap-2">
                  {CAMERAS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCamera(c)}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        background: camera === c ? "#e8d5b7" : "#141414",
                        color: camera === c ? "#0a0a0a" : "#6b6b6b",
                        border: `1px solid ${camera === c ? "#e8d5b7" : "#2a2a2a"}`,
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#6b6b6b" }}>
                  Sensor
                </label>
                <div className="flex gap-2 flex-wrap">
                  {(["X-Trans V", "X-Trans IV", "X-Trans III", "GFX"] as SensorGen[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSensorGen(s)}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        background: sensorGen === s ? "#e8d5b7" : "#141414",
                        color: sensorGen === s ? "#0a0a0a" : "#6b6b6b",
                        border: `1px solid ${sensorGen === s ? "#e8d5b7" : "#2a2a2a"}`,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#6b6b6b" }}>
                  Categoría
                </label>
                <div className="flex gap-2 flex-wrap">
                  {(["Landscape", "Portrait", "Street", "Cinematic", "Vintage"] as RecipeCategory[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        background: category === c ? "#e8d5b7" : "#141414",
                        color: category === c ? "#0a0a0a" : "#6b6b6b",
                        border: `1px solid ${category === c ? "#e8d5b7" : "#2a2a2a"}`,
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#6b6b6b" }}>
                  Tags (separados por coma)
                </label>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="landscape, golden hour, warm"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#141414", color: "#f5f5f5", border: "1px solid #2a2a2a" }}
                />
              </div>

              {/* Community toggle */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: "#141414", border: "1px solid #2a2a2a" }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#f5f5f5" }}>
                    Compartir con la comunidad
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#6b6b6b" }}>
                    Tu receta aparecerá en el feed público
                  </p>
                </div>
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className="w-12 h-6 rounded-full transition-all relative"
                  style={{ background: isPublic ? "#e8d5b7" : "#2a2a2a" }}
                >
                  <span
                    className="absolute top-1 w-4 h-4 rounded-full transition-all"
                    style={{
                      background: "#fff",
                      left: isPublic ? "calc(100% - 20px)" : "4px",
                    }}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={() => setStep("settings")}
              className="w-full mt-6 py-3.5 rounded-2xl font-semibold text-sm"
              style={{ background: "#e8d5b7", color: "#0a0a0a" }}
            >
              Siguiente → Ajustes
            </button>
          </div>
        )}

        {step === "settings" && (
          <div>
            <p className="text-sm mb-5" style={{ color: "#6b6b6b" }}>
              Ajusta los parámetros de tu receta
            </p>

            <div
              className="rounded-2xl p-4 mb-5"
              style={{ background: "#141414" }}
            >
              <SliderField label="Highlight" value={highlight} onChange={setHighlight} />
              <SliderField label="Shadow" value={shadow} onChange={setShadow} />
              <SliderField label="Color" value={color} onChange={setColor} />
              <SliderField label="Sharpness" value={sharpness} onChange={setSharpness} />
              <SliderField label="Noise Reduction" value={noiseReduction} onChange={setNoiseReduction} />
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#6b6b6b" }}>
                  Grain
                </label>
                <div className="flex gap-2">
                  {(["Off", "Weak", "Strong"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setGrain(v)}
                      className="flex-1 py-2 text-sm rounded-xl"
                      style={{
                        background: grain === v ? "#e8d5b7" : "#141414",
                        color: grain === v ? "#0a0a0a" : "#6b6b6b",
                        border: `1px solid ${grain === v ? "#e8d5b7" : "#2a2a2a"}`,
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#6b6b6b" }}>
                  Color Chrome
                </label>
                <div className="flex gap-2">
                  {(["Off", "Weak", "Strong"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setColorChrome(v)}
                      className="flex-1 py-2 text-sm rounded-xl"
                      style={{
                        background: colorChrome === v ? "#e8d5b7" : "#141414",
                        color: colorChrome === v ? "#0a0a0a" : "#6b6b6b",
                        border: `1px solid ${colorChrome === v ? "#e8d5b7" : "#2a2a2a"}`,
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("info")}
                className="flex-1 py-3.5 rounded-2xl font-semibold text-sm"
                style={{ background: "#141414", color: "#6b6b6b", border: "1px solid #2a2a2a" }}
              >
                ← Atrás
              </button>
              <button
                onClick={() => setStep("preview")}
                className="flex-1 py-3.5 rounded-2xl font-semibold text-sm"
                style={{ background: "#e8d5b7", color: "#0a0a0a" }}
              >
                Vista previa →
              </button>
            </div>
          </div>
        )}

        {step === "preview" && (
          <div>
            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{ background: "#141414" }}
            >
              <div
                className="w-full flex items-center justify-center"
                style={{ aspectRatio: "4/5", background: "#1e1e1e" }}
              >
                <Camera size={40} color="#3a3a3a" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
                    style={{ background: FILM_COLORS[film], color: "#fff" }}
                  >
                    {film.split("/")[0]}
                  </span>
                </div>
                <p className="font-bold text-base mt-2" style={{ color: "#f5f5f5" }}>
                  {name || "Mi Receta"}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#6b6b6b" }}>
                  @tu_usuario · {camera}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.split(",").filter(Boolean).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "#1e1e1e", color: "#6b6b6b" }}
                    >
                      #{t.trim()}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4" style={{ borderTop: "1px solid #2a2a2a" }}>
                  <div className="grid grid-cols-2 gap-y-2">
                    {[
                      ["Highlight", highlight],
                      ["Shadow", shadow],
                      ["Color", color],
                      ["Sharpness", sharpness],
                      ["Noise Reduction", noiseReduction],
                      ["Grain", grain],
                    ].map(([label, val]) => (
                      <div key={String(label)}>
                        <p className="text-[10px]" style={{ color: "#6b6b6b" }}>{label}</p>
                        <p
                          className="text-sm font-semibold"
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
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("settings")}
              className="w-full py-3.5 rounded-2xl font-semibold text-sm mb-3"
              style={{ background: "#141414", color: "#6b6b6b", border: "1px solid #2a2a2a" }}
            >
              ← Editar ajustes
            </button>
            <button
              onClick={handleSubmit}
              className="w-full py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: "#e8d5b7", color: "#0a0a0a" }}
            >
              Publicar receta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <AppProvider>
      <CreateForm />
      <BottomNav />
    </AppProvider>
  );
}
