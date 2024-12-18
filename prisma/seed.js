const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a development artist account
  const artist = await prisma.user.create({
    data: {
      name: "Dev Artist",
      email: "devartist@example.com",
      role: "artist",
      stripeCustomerId: "cus_test_artist",
      genres: ["Pop", "Rock"],
    },
  });

  // Create a development curator account
  const curator = await prisma.user.create({
    data: {
      name: "Dev Curator",
      email: "devcurator@example.com",
      role: "curator",
      stripeCustomerId: "cus_test_curator",
      genres: ["Electronic", "Classical"],
    },
  });

  console.log("Seed data created:");
  console.log({ artist, curator });

  // Add some mock tracks
  await prisma.track.createMany({
    data: [
      {
        title: "Track 1",
        artist: "Artist 1",
        genre: "Pop",
        spotifyUrl: "https://open.spotify.com/track/1",
        userId: artist.id,
      },
      {
        title: "Track 2",
        artist: "Artist 2",
        genre: "Rock",
        spotifyUrl: "https://open.spotify.com/track/2",
        userId: artist.id,
      },
    ],
  });

  console.log("Mock tracks added!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
