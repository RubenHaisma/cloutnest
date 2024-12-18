"use client"

import { motion } from "framer-motion"

const playlistBanners = [
  {
    name: "Indie Hits",
    followers: "250K",
    imageUrl: "https://source.unsplash.com/random/400x400/?music"
  },
  {
    name: "Emerging Artists",
    followers: "180K", 
    imageUrl: "https://source.unsplash.com/random/400x400/?artist"
  },
  {
    name: "Fresh Finds",
    followers: "350K",
    imageUrl: "https://source.unsplash.com/random/400x400/?playlist"
  }
];


export function SpotifyPlaylistBanners() {
  return (
    <section className="bg-background border-t py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-12 text-gray-800">
          Playlists Our Artists Have Reached
        </h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {playlistBanners.map((playlist, index) => (
            <motion.div
              key={playlist.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative aspect-square">
                <img 
                  src={playlist.imageUrl} 
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{playlist.name}</h3>
                <p className="text-sm text-gray-500">{playlist.followers} Followers</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SpotifyPlaylistBanners