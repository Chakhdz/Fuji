"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MOCK_RECIPES, Recipe } from "@/lib/data";

interface AppContextType {
  recipes: Recipe[];
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  addRecipe: (recipe: Recipe) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);

  const toggleLike = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
          : r
      )
    );
  };

  const toggleSave = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, saved: !r.saved, saves: r.saved ? r.saves - 1 : r.saves + 1 }
          : r
      )
    );
  };

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [recipe, ...prev]);
  };

  return (
    <AppContext.Provider value={{ recipes, toggleLike, toggleSave, addRecipe }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
