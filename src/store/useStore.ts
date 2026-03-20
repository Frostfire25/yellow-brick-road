import { create } from "zustand";

export type ZoneName =
  | "kansas"
  | "munchkinland"
  | "scarecrow"
  | "tinman"
  | "lion"
  | "emeraldcity";

export const ZONE_ORDER: ZoneName[] = [
  "kansas",
  "munchkinland",
  "scarecrow",
  "tinman",
  "lion",
  "emeraldcity",
];

export const ZONE_LABELS: Record<ZoneName, string> = {
  kansas: "Kansas",
  munchkinland: "Munchkinland",
  scarecrow: "Scarecrow's Crossroads",
  tinman: "Tin Man's Workshop",
  lion: "Lion's Clearing",
  emeraldcity: "The Emerald City",
};

interface PortfolioState {
  currentZone: ZoneName;
  isAutoWalking: boolean;
  isLocked: boolean;
  hasStarted: boolean;
  isLoading: boolean;
  selectedProject: number | null;
  selectedExperience: number | null;

  setCurrentZone: (zone: ZoneName) => void;
  setAutoWalking: (v: boolean) => void;
  setLocked: (v: boolean) => void;
  setHasStarted: (v: boolean) => void;
  setIsLoading: (v: boolean) => void;
  setSelectedProject: (i: number | null) => void;
  setSelectedExperience: (i: number | null) => void;
}

export const useStore = create<PortfolioState>((set) => ({
  currentZone: "kansas",
  isAutoWalking: false,
  isLocked: false,
  hasStarted: false,
  isLoading: true,
  selectedProject: null,
  selectedExperience: null,

  setCurrentZone: (zone) => set({ currentZone: zone }),
  setAutoWalking: (v) => set({ isAutoWalking: v }),
  setLocked: (v) => set({ isLocked: v }),
  setHasStarted: (v) => set({ hasStarted: v }),
  setIsLoading: (v) => set({ isLoading: v }),
  setSelectedProject: (i) => set({ selectedProject: i }),
  setSelectedExperience: (i) => set({ selectedExperience: i }),
}));
