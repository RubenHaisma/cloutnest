import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { devUsers } from "@/lib/dev-auth";
import { Adapter } from "next-auth/adapters";
import SpotifyProvider from "next-auth/providers/spotify";
import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcryptjs";
import type { User } from "next-auth";
import { RequestInternal } from "next-auth";
import { Session } from "next-auth";
import { getServerSession } from "next-auth";

const isDev = process.env.NODE_ENV === "development";

// Create a custom adapter that extends the Prisma adapter
const customAdapter = {
  ...PrismaAdapter(prisma),
  createUser: async (data: any) => {
    // Get role from query parameters in the callback URL
    const role = data.role || "artist"; // Default to artist if no role specified
    
    // Remove any fields that aren't in our Prisma schema
    const { providerData, ...userData } = data;

    // Hash password if it exists
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    return prisma.user.create({
      data: {
        ...userData,
        role,
        totalEarnings: 0,
        stripeAccountStatus: "pending",
        acceptanceRate: 0,
        increment: 0,
      },
    });
  },
} as Adapter;

export const authOptions: NextAuthOptions = {
  adapter: customAdapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Email not found");
        }

        if (!user.password) {
          throw new Error("Please use the login method you used to create your account");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return a valid User object
        return {
          id: user.id,
          email: user.email || "",  // Ensure email is never null
          name: user.name || null,
          role: user.role || "artist", // Ensure role is never null
          image: user.image || null,
        };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: undefined, // Will be set in createUser based on URL params
          providerData: {
            callbackUrl: profile.callbackUrl,
          },
        };
      },
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "playlist-read-private playlist-read-collaborative user-read-email user-read-private",
        },
      },
      async profile(profile, tokens) {
        console.log("[SPOTIFY_AUTH] Profile received:", {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
        })
        console.log("[SPOTIFY_AUTH] Tokens received:", {
          access_token: tokens.access_token ? "present" : "missing",
          refresh_token: tokens.refresh_token ? "present" : "missing",
          expires_at: tokens.expires_at,
        })

        // Update user with Spotify profile - store as JSON string
        const user = await prisma.user.update({
          where: { email: profile.email },
          data: {
            spotifyProfile: JSON.stringify(profile),
          },
        })

        console.log("[SPOTIFY_AUTH] Updated user:", {
          id: user.id,
          hasSpotifyProfile: !!user.spotifyProfile,
        })

        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
          spotifyProfile: profile,
        }
      },
    }),
    ...(isDev
      ? [
          CredentialsProvider({
            id: "dev",
            name: "Development",
            credentials: {
              role: { label: "Role", type: "text" },
            },
            async authorize(credentials) {
              const role = credentials?.role || "artist";
              const devUser = devUsers[role as keyof typeof devUsers];
              
              if (!devUser || !devUser.id) return null;
              
              // Ensure all required fields are present and of correct type
              return {
                id: devUser.id.toString(), // Ensure id is a string
                email: devUser.email || "",
                name: devUser.name || null,
                role: role,
                image: devUser.image || null,
              };
            },
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
    signOut: "/",
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Extract role from the callback URL if present
        const callbackUrl = (account as any)?.callbackUrl || "";
        const roleMatch = callbackUrl.match(/\/dashboard\/(artist|curator)/);
        if (roleMatch) {
          const role = roleMatch[1];
          // Update the user's role
          if (user) {
            user.role = role;
            // If this is a new user, update their role in the database
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email! },
            });
            if (!dbUser) {
              await prisma.user.update({
                where: { email: user.email! },
                data: { role },
              });
            }
          }
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return true;
      }
    },
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && user) {
        token.role = user.role
        token.stripeCustomerId = user.stripeCustomerId
        token.stripeAccountId = user.stripeAccountId
        token.stripeAccountStatus = user.stripeAccountStatus
      }

      // If trigger is undefined, this is a simple token refresh
      if (trigger === undefined) {
        console.log("[AUTH_JWT] Event triggered:", {
          trigger,
          tokenUserId: token.sub,
        })
      }

      // On every token refresh, fetch latest user data
      const latestUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: {
          role: true,
          stripeCustomerId: true,
          stripeAccountId: true,
          stripeAccountStatus: true,
          spotifyProfile: true,
        },
      })

      if (latestUser) {
        token.role = latestUser.role
        token.stripeCustomerId = latestUser.stripeCustomerId
        token.stripeAccountId = latestUser.stripeAccountId
        token.stripeAccountStatus = latestUser.stripeAccountStatus
        token.spotifyProfile = latestUser.spotifyProfile
      }

      return token
    },

    async session({ session, token }) {
      console.log("[AUTH_SESSION] Creating session for user:", {
        userId: token.sub,
        role: token.role,
        hasSpotifyProfile: !!token.spotifyProfile,
      })

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          stripeCustomerId: token.stripeCustomerId,
          stripeAccountId: token.stripeAccountId,
          stripeAccountStatus: token.stripeAccountStatus,
          spotifyProfile: token.spotifyProfile ? JSON.parse(token.spotifyProfile as string) : null,
        },
      }
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Handle dashboard redirects
      if (url.includes('/dashboard/')) {
        return url;
      }
      
      // Default redirect to dashboard based on role
      if (url === baseUrl || url === `${baseUrl}/`) {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
          return '/dashboard/'; // Default fallback if no session
        }

        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { role: true }
        });
        
        return `/dashboard/${user?.role || 'artist'}`;
      }
      
      // Allow callback URLs
      if (url.startsWith('/api/auth/callback')) {
        return url;
      }
      
      // Allow relative URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      
      // Allow URLs from the same origin
      if (url.startsWith(baseUrl)) {
        return url;
      }
      
      return baseUrl;
    },
  },
};
