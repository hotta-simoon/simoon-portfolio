export type WorkCategory = "brand" | "planning" | "direction" | "uiux" | "pm" | "web" | "movie" | "graphic";

export type Work = {
  id: number;
  name: string;
  cats: WorkCategory[];
  year: string;
  featured: boolean;
  client: string;
  thumbnail: string;
  url: string;
};

export const CAT_LABELS: Record<WorkCategory, string> = {
  brand: "Brand Direction",
  planning: "Planning",
  direction: "Direction",
  uiux: "UI/UX Design",
  pm: "Project Management",
  web: "Web",
  movie: "Movie",
  graphic: "Graphic",
};

export const ALL_CATS: WorkCategory[] = ["brand", "planning", "direction", "uiux", "pm", "web", "movie", "graphic"];
