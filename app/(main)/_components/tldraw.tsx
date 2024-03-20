"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useTheme } from "next-themes";
import { Editor, TLEventMapHandler, Tldraw } from "tldraw";
import { components } from "@/components/tldraw";
import { useCallback, useEffect, useState } from "react";

interface TldrawProps {
  documentId: Id<"documents">;
  onChange: (content: string) => void;
  initialContent?: any;
}

export const TLDraw = ({
  documentId,
  initialContent,
  onChange,
}: TldrawProps) => {
  const { resolvedTheme } = useTheme();
  const [editor, setEditor] = useState<Editor>();

  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);

  useEffect(() => {
    if (!editor) return;
    console.log("Rodou o effect");

    const saveSnapshot = () => {
      const snapshot = editor.store.getSnapshot();
      const stringifiedSnapshot = JSON.stringify(snapshot);
      onChange(stringifiedSnapshot);
    };

    const handleChangeEvent: TLEventMapHandler<"change"> = (change) => {
      // Added
      for (const record of Object.values(change.changes.added)) {
        if (record.typeName === "shape") {
          saveSnapshot();
        }
      }

      // Updated
      for (const [from, to] of Object.values(change.changes.updated)) {
        if (
          (from.typeName === "instance" &&
            to.typeName === "instance" &&
            from.currentPageId !== to.currentPageId) ||
          (from.id.startsWith("shape") && to.id.startsWith("shape"))
        ) {
          saveSnapshot();
        }
      }

      // Removed
      for (const record of Object.values(change.changes.removed)) {
        if (record.typeName === "shape") {
          saveSnapshot();
        }
      }
    };

    const cleanupFunction = editor.store.listen(handleChangeEvent, {
      source: "user",
      scope: "all",
    });

    return () => {
      cleanupFunction();
    };
  }, [editor, onChange]);

  return (
    <div
      className="w-full"
      style={{ position: "fixed", inset: 0, marginTop: 60 }}
    >
      <Tldraw
        onMount={(editor) => {
          setAppToState(editor);
          if (
            initialContent &&
            JSON.stringify(editor.store.getSnapshot()).length < 1
          )
            editor.store.loadSnapshot(JSON.parse(initialContent));
        }}
        inferDarkMode={resolvedTheme === "dark"}
        persistenceKey={documentId}
        components={components}
      />
    </div>
  );
};
