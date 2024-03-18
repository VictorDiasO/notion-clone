"use client";

import { useArchives } from "@/hooks/use-archives";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const NewArchiveModal = () => {
  const router = useRouter();
  const archives = useArchives();
  const create = useMutation(api.documents.create);

  const onCreateNote = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`),
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created successfully!",
      error: "Failed to create a new note.",
    });
  }

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
                Canvas is a Whiteboard mode, while Note is a Notion-like text-editor
              </span>
            </div>
          </div>
          </div>
          <div className="flex justify-between gap-4">
            <Button className="w-[50%]" onClick={onCreateNote}>
              Canvas
            </Button>
            <Button className="w-[50%]">
              Note
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
