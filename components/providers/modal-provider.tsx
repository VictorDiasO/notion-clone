"use client";

import { useEffect, useState } from "react";
import { SettingsModal } from "../modals/settings-modal";
import { CoverImageModal } from "../modals/cover-image-modal";
import { NewArchiveModal } from "../modals/new-archive-modal";
import { useArchives } from "@/hooks/use-archives";

export const ModalProvider = () => {
  const archives = useArchives();

  const [isMounted, setIsMounted] = useState(false);

  const { parentId, expanded, onExpand } = archives;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
      <NewArchiveModal
        parentId={parentId}
        expanded={expanded}
        onExpand={onExpand}
      />
    </>
  );
};
