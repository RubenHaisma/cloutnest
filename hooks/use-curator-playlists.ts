import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export interface SpotifyPlaylist {
  id: string;
  name: string;
  tracks: {
    total: number;
  };
  owner: {
    display_name: string;
  };
  images: Array<{ url: string }>;
}

export function useCuratorPlaylists() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        console.log("[PLAYLISTS_HOOK] Starting playlist fetch");
        if (!session?.user) {
          console.log("[PLAYLISTS_HOOK] No session found, skipping fetch");
          setIsLoading(false);
          return;
        }

        console.log("[PLAYLISTS_HOOK] Session found:", {
          userId: session.user.id,
          hasSpotifyProfile: !!session.user.spotifyProfile,
        });

        setIsLoading(true);
        const response = await fetch("/api/curator/playlists");
        const data = await response.json();

        if (!response.ok) {
          console.error("[PLAYLISTS_HOOK] API error:", data);
          throw new Error(data.error || "Failed to fetch playlists");
        }

        if (!data.connected) {
          console.log("[PLAYLISTS_HOOK] No Spotify connection");
          setPlaylists([]);
          setError(null);
          setIsLoading(false);
          return;
        }

        console.log("[PLAYLISTS_HOOK] Playlists received:", {
          total: data.total,
          itemCount: data.playlists?.length || 0,
        });

        setPlaylists(data.playlists || []);
        setError(null);
      } catch (error) {
        console.error("[PLAYLISTS_HOOK] Error:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch playlists");
        toast({
          title: "Error",
          description: "Failed to fetch playlists. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlaylists();
  }, [session]);

  return { playlists, isLoading, error };
}
