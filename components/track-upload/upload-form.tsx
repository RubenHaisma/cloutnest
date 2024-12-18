"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Music, Upload, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  artist: z.string().min(2, "Artist name must be at least 2 characters"),
  genre: z.string().min(1, "Please select a genre"),
  spotifyUrl: z.string().url("Please enter a valid Spotify URL"),
})

const genres = [
  "Pop",
  "Hip Hop",
  "R&B",
  "Rock",
  "Electronic",
  "Jazz",
  "Classical",
  "Country",
]

export function TrackUploadForm() {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav']
    },
    maxFiles: 1,
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true)
      const response = await fetch("/api/tracks/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error("Failed to submit track")

      toast({
        title: "Success",
        description: "Your track has been submitted for review",
      })

      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit track",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Track Title</Label>
          <Input
            id="title"
            placeholder="Enter track title"
            {...form.register("title")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="artist">Artist Name</Label>
          <Input
            id="artist"
            placeholder="Enter artist name"
            {...form.register("artist")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select onValueChange={(value) => form.setValue("genre", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre.toLowerCase()}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="spotifyUrl">Spotify URL</Label>
          <Input
            id="spotifyUrl"
            placeholder="https://open.spotify.com/track/..."
            {...form.register("spotifyUrl")}
          />
        </div>

        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input {...getInputProps()} />
          <Music className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2">
            {isDragActive
              ? "Drop your track here"
              : "Drag and drop your track here, or click to select"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Supported formats: MP3, WAV (max 10MB)
          </p>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Submit Track
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}