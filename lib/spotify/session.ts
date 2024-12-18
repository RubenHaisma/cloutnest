import { Session } from "next-auth"
import { Account } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export async function getSpotifyAccount(session: Session): Promise<Account> {
  if (!session.user?.id) {
    throw new Error("No user found in session")
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: "spotify",
    },
  })

  if (!account) {
    throw new Error("No Spotify account connected")
  }

  // Check if token needs refresh
  if (account.expires_at && Number(account.expires_at) * 1000 < Date.now()) {
    return await refreshSpotifyToken(account)
  }

  return account
}

export async function refreshSpotifyToken(account: Account): Promise<Account> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: account.refresh_token!,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to refresh Spotify token")
  }

  const tokens = await response.json()

  // Update account with new tokens
  const updatedAccount = await prisma.account.update({
    where: { id: account.id },
    data: {
      access_token: tokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
      refresh_token: tokens.refresh_token ?? account.refresh_token,
    },
  })

  return updatedAccount
}