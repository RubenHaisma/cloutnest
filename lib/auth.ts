import { type NextAuthOptions, type Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import SpotifyProvider from "next-auth/providers/spotify";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Adapter } from "next-auth/adapters";
import { getServerSession } from "next-auth";

const isDev = process.env.NODE_ENV === "development";

// Extend the Prisma adapter to add custom user creation logic
const customAdapter = {
  ...PrismaAdapter(prisma),
  createUser: async (data: any) => {
    const role = data.role || "creator"; // Default to "creator" for CloutNest users
    const { providerData, ...userData } = data;

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    return prisma.user.create({
      data: {
        ...userData,
        role,
        totalSpend: 0, // For tracking expenses for creators
        campaignCount: 0, // Tracks campaigns for creators
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
    // Email and password login
    CredentialsProvider({
      id: "credentials",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials.");
        }

        return { id: user.id, email: user.email!, role: user.role! };
      },
    }),
    // Google OAuth login
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    // Spotify OAuth login
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "playlist-read-private user-read-email",
        },
      },
      async profile(profile) {
        const user = await prisma.user.upsert({
          where: { email: profile.email },
          update: { spotifyProfile: JSON.stringify(profile) },
          create: {
            email: profile.email,
            name: profile.display_name,
            role: "creator",
            spotifyProfile: JSON.stringify(profile),
          },
        });

        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        };
      },
    }),
    // Email login for secure links
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
  ],
  pages: {
    signIn: "/login",
    error: "/error",
    signOut: "/",
  },
  callbacks: {
    async signIn({ user }) {
      // Ensure the user can sign in
      return !!user?.email;
    },
    async jwt({ token, user }) {
      // Include role, totalSpend, and campaignCount in JWT
      if (user) {
        token.role = user.role;
      }

      // Fetch latest user data on token refresh
      const latestUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: {
          role: true,
          campaignCount: true,
          totalSpend: true,
        },
      });

      if (latestUser) {
        token.role = latestUser.role;
        token.campaignCount = latestUser.campaignCount;
        token.totalSpend = latestUser.totalSpend;
      }

      return token;
    },
    async session({ session, token }: { session: Session & { user: { campaignCount?: number; totalSpend?: number } }; token: any }) {
      // Attach user details to the session
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.user.role = token.role as string;
      session.user.campaignCount = token.campaignCount;
      session.user.totalSpend = token.totalSpend;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect based on user role
      if (url.startsWith("/dashboard")) return url;

      const session = await getServerSession(authOptions);
      const user = session?.user
        ? await prisma.user.findUnique({ where: { email: session.user.email! } })
        : null;

      return user ? `/dashboard/${user.role || "creator"}` : baseUrl;
    },
  },
};
