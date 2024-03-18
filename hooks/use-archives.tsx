import { create } from "zustand";

type ArchivesStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useArchives = create<ArchivesStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
