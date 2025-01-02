"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";

const uploadSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(500),
  price: z.number().min(1),
  type: z.enum(["image", "video", "template"]),
  categories: z.array(z.string()).min(1),
  file: z.any(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit = async (data: UploadFormData) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "categories") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch("/api/marketplace/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Price ($)</label>
              <Input
                type="number"
                min="1"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <select
                {...register("type")}
                className="w-full p-2 border rounded"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="template">Template</option>
              </select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Categories</label>
            <Input
              {...register("categories")}
              placeholder="Enter categories separated by commas"
            />
            {errors.categories && (
              <p className="text-sm text-red-500">{errors.categories.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">File</label>
            <Input type="file" {...register("file")} />
            {errors.file && (
              <p className="text-sm text-red-500">{errors.file.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}