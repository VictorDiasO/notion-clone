import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type ArchivesStore = {
  isOpen: boolean;
  parentId?: Id<"documents">;
  expanded?: boolean;
  onExpand?: () => void;
  onOpen: ({
    parentId,
    expanded,
    onExpand,
  }: {
    parentId?: Id<"documents">;
    expanded?: boolean;
    onExpand?: () => void;
  }) => void;
  onClose: () => void;
};

export const useArchives = create<ArchivesStore>((set) => ({
  isOpen: false,
  onOpen: ({ parentId, expanded, onExpand }) =>
    set({ isOpen: true, parentId, expanded, onExpand }),
  onClose: () => set({ isOpen: false }),
}));
