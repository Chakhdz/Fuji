export type FilmSimulation =
  | "Classic Chrome"
  | "Velvia"
  | "Provia/Standard"
  | "Astia/Soft"
  | "Classic Neg"
  | "Eterna"
  | "Acros"
  | "Nostalgic Neg"
  | "Reala Ace";

export type SensorGen = "X-Trans V" | "X-Trans IV" | "X-Trans III" | "GFX";
export type RecipeCategory = "Landscape" | "Portrait" | "Street" | "Cinematic" | "Vintage";

export interface Recipe {
  id: string;
  name: string;
  filmSimulation: FilmSimulation;
  sensorGen: SensorGen;
  category: RecipeCategory;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  photos: string[];
  settings: {
    dynamicRange: string;
    highlight: number;
    shadow: number;
    color: number;
    sharpness: number;
    noiseReduction: number;
    grain: "Off" | "Weak" | "Strong";
    colorChrome: "Off" | "Weak" | "Strong";
    whiteBalance: string;
    wbShiftR: number;
    wbShiftB: number;
    iso: string;
    exposureComp: string;
  };
  tags: string[];
  likes: number;
  saves: number;
  camera: string;
  createdAt: string;
  isPublic?: boolean;
  liked?: boolean;
  saved?: boolean;
}

export const FILM_COLORS: Record<FilmSimulation, string> = {
  "Classic Chrome": "#8B7355",
  Velvia: "#E8472A",
  "Provia/Standard": "#4A90D9",
  "Astia/Soft": "#D4A5A5",
  "Classic Neg": "#6B8E6B",
  Eterna: "#7B6B8E",
  Acros: "#2C2C2C",
  "Nostalgic Neg": "#C4A882",
  "Reala Ace": "#5B8A6B",
};

export const FILM_DESCRIPTIONS: Record<FilmSimulation, string> = {
  "Classic Chrome": "Tonos apagados, contraste suave. Estilo documental.",
  Velvia: "Colores vibrantes y saturados. Ideal para paisajes.",
  "Provia/Standard": "Reproducción equilibrada y natural.",
  "Astia/Soft": "Tonos de piel suaves y naturales.",
  "Classic Neg": "Alto contraste, tonos vintage de negativo.",
  Eterna: "Contraste bajo, cine cinematográfico.",
  Acros: "Blanco y negro de alto contraste.",
  "Nostalgic Neg": "Estética analógica cálida y desvanecida.",
  "Reala Ace": "Natural y detallado, fiel a la realidad.",
};

const UNSPLASH_PHOTOS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80",
  "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80",
  "https://images.unsplash.com/photo-1439853949212-36089e252d48?w=800&q=80",
];

export const SENSOR_COLORS: Record<SensorGen, string> = {
  "X-Trans V": "#5B8A9E",
  "X-Trans IV": "#7B9E5B",
  "X-Trans III": "#9E7B5B",
  GFX: "#9E5B7B",
};

export const CATEGORY_ICONS: Record<RecipeCategory, string> = {
  Landscape: "🏔",
  Portrait: "👤",
  Street: "🏙",
  Cinematic: "🎬",
  Vintage: "📷",
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: "1",
    name: "Golden Hour Melt",
    filmSimulation: "Classic Chrome",
    sensorGen: "X-Trans V",
    category: "Landscape",
    author: { id: "u1", username: "kaori_shoots", avatar: "https://i.pravatar.cc/150?img=1" },
    photos: [UNSPLASH_PHOTOS[0], UNSPLASH_PHOTOS[8], UNSPLASH_PHOTOS[12]],
    settings: {
      dynamicRange: "DR200",
      highlight: -1, shadow: -2, color: -1, sharpness: -2, noiseReduction: -4,
      grain: "Weak", colorChrome: "Strong",
      whiteBalance: "Daylight", wbShiftR: 3, wbShiftB: -3,
      iso: "Auto up to 3200", exposureComp: "+1/3",
    },
    tags: ["landscape", "golden hour", "warm", "moody"],
    likes: 1247, saves: 389, camera: "X-T5", createdAt: "2024-03-15",
    isPublic: true, liked: false, saved: false,
  },
  {
    id: "2",
    name: "Tokyo Drift",
    filmSimulation: "Classic Neg",
    sensorGen: "X-Trans IV",
    category: "Street",
    author: { id: "u2", username: "marco.frame", avatar: "https://i.pravatar.cc/150?img=3" },
    photos: [UNSPLASH_PHOTOS[5], UNSPLASH_PHOTOS[13], UNSPLASH_PHOTOS[1]],
    settings: {
      dynamicRange: "DR400",
      highlight: 0, shadow: -1, color: 0, sharpness: 0, noiseReduction: -4,
      grain: "Strong", colorChrome: "Strong",
      whiteBalance: "Auto", wbShiftR: 0, wbShiftB: 0,
      iso: "Auto up to 6400", exposureComp: "0",
    },
    tags: ["street", "urban", "gritty", "contrast"],
    likes: 892, saves: 241, camera: "X-Pro3", createdAt: "2024-03-10",
    isPublic: true, liked: true, saved: false,
  },
  {
    id: "3",
    name: "Summer Haze",
    filmSimulation: "Nostalgic Neg",
    sensorGen: "X-Trans IV",
    category: "Portrait",
    author: { id: "u3", username: "lena.vis", avatar: "https://i.pravatar.cc/150?img=5" },
    photos: [UNSPLASH_PHOTOS[6], UNSPLASH_PHOTOS[9], UNSPLASH_PHOTOS[3]],
    settings: {
      dynamicRange: "DR200",
      highlight: -2, shadow: -1, color: -2, sharpness: -2, noiseReduction: -2,
      grain: "Weak", colorChrome: "Weak",
      whiteBalance: "Cloudy", wbShiftR: 4, wbShiftB: -2,
      iso: "Auto up to 1600", exposureComp: "+2/3",
    },
    tags: ["portrait", "summer", "vintage", "film"],
    likes: 2103, saves: 756, camera: "X-T4", createdAt: "2024-03-08",
    isPublic: true, liked: false, saved: true,
  },
  {
    id: "4",
    name: "Midnight Acros",
    filmSimulation: "Acros",
    sensorGen: "X-Trans III",
    category: "Street",
    author: { id: "u4", username: "noir.lens", avatar: "https://i.pravatar.cc/150?img=7" },
    photos: [UNSPLASH_PHOTOS[11], UNSPLASH_PHOTOS[4], UNSPLASH_PHOTOS[15]],
    settings: {
      dynamicRange: "DR400",
      highlight: 1, shadow: -2, color: 0, sharpness: 1, noiseReduction: -4,
      grain: "Strong", colorChrome: "Off",
      whiteBalance: "Auto", wbShiftR: 0, wbShiftB: 0,
      iso: "ISO 6400", exposureComp: "-1/3",
    },
    tags: ["bw", "night", "street", "dramatic"],
    likes: 678, saves: 312, camera: "X100V", createdAt: "2024-03-05",
    isPublic: true, liked: false, saved: false,
  },
  {
    id: "5",
    name: "Velvia Landscape",
    filmSimulation: "Velvia",
    sensorGen: "GFX",
    category: "Landscape",
    author: { id: "u5", username: "peak.chaser", avatar: "https://i.pravatar.cc/150?img=9" },
    photos: [UNSPLASH_PHOTOS[2], UNSPLASH_PHOTOS[10], UNSPLASH_PHOTOS[14]],
    settings: {
      dynamicRange: "DR200",
      highlight: 0, shadow: 0, color: 3, sharpness: 1, noiseReduction: -2,
      grain: "Off", colorChrome: "Strong",
      whiteBalance: "Daylight", wbShiftR: 1, wbShiftB: -1,
      iso: "Auto up to 800", exposureComp: "-1/3",
    },
    tags: ["landscape", "nature", "vibrant", "mountains"],
    likes: 3412, saves: 1089, camera: "GFX50S II", createdAt: "2024-02-28",
    isPublic: true, liked: true, saved: true,
  },
  {
    id: "6",
    name: "Cinematic Eterna",
    filmSimulation: "Eterna",
    sensorGen: "X-Trans V",
    category: "Cinematic",
    author: { id: "u6", username: "cine.frame", avatar: "https://i.pravatar.cc/150?img=11" },
    photos: [UNSPLASH_PHOTOS[7], UNSPLASH_PHOTOS[1], UNSPLASH_PHOTOS[5]],
    settings: {
      dynamicRange: "DR400",
      highlight: -2, shadow: -1, color: -1, sharpness: -2, noiseReduction: -2,
      grain: "Weak", colorChrome: "Weak",
      whiteBalance: "Fluorescent 1", wbShiftR: 2, wbShiftB: -3,
      iso: "Auto up to 3200", exposureComp: "0",
    },
    tags: ["cinematic", "moody", "portrait", "film"],
    likes: 1567, saves: 498, camera: "X-H2S", createdAt: "2024-02-20",
    isPublic: true, liked: false, saved: false,
  },
];

export const MOCK_USERS = [
  { id: "u1", username: "kaori_shoots", avatar: "https://i.pravatar.cc/150?img=1", recipes: 34, followers: 2891 },
  { id: "u2", username: "marco.frame", avatar: "https://i.pravatar.cc/150?img=3", recipes: 18, followers: 1204 },
  { id: "u3", username: "lena.vis", avatar: "https://i.pravatar.cc/150?img=5", recipes: 52, followers: 4732 },
  { id: "u4", username: "noir.lens", avatar: "https://i.pravatar.cc/150?img=7", recipes: 11, followers: 891 },
];
