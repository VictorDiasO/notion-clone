"use client";

import { useArchives } from "@/hooks/use-archives";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

interface NewArchiveModalProps {
  parentId?: Id<"documents">;
  expanded?: boolean;
  onExpand?: () => void;
}

export const NewArchiveModal = ({
  parentId,
  expanded,
  onExpand,
}: NewArchiveModalProps) => {
  const router = useRouter();
  const archives = useArchives();
  const create = useMutation(api.documents.create);
  const archivesModal = useArchives();

  const onCreateNote = () => {
    const promise = parentId
      ? create({
          title: "Untitled",
          parentDocument: parentId,
          fileType: "note",
        }).then((documentId) => {
          if (!expanded) {
            onExpand?.();
          }
          router.push(`/documents/${documentId}`);
        })
      : create({ title: "Untitled", fileType: "note" }).then((documentId) =>
          router.push(`/documents/${documentId}`),
        );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created successfully!",
      error: "Failed to create a new note.",
    });
    archivesModal.onClose();
  };

  const onCreateCanvas = () => {
    const promise = parentId
      ? create({
          title: "Untitled",
          parentDocument: parentId,
          fileType: "canvas",
        }).then((documentId) => {
          if (!expanded) {
            onExpand?.();
          }
          router.push(`/documents/${documentId}`);
        })
      : create({ title: "Untitled", fileType: "canvas" }).then((documentId) =>
          router.push(`/documents/${documentId}`),
        );

    toast.promise(promise, {
      loading: "Creating a new canvas...",
      success: "New canvas created successfully!",
      error: "Failed to create a new canvas.",
    });
    archivesModal.onClose();
  };

  return (
    <Dialog open={archives.isOpen} onOpenChange={archives.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Which kind</h2>
        </DialogHeader>
        <div className="flex items-center">
          <div>
            <Label>Options</Label>
            <div>
              <span className="text-[0.8rem] text-muted-foreground">
                Canvas is a Whiteboard mode, while Note is a Notion-like
                text-editor
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <Button className="w-[50%]" onClick={onCreateCanvas}>
            Canvas
          </Button>
          <Button className="w-[50%]" onClick={onCreateNote}>
            Note
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
