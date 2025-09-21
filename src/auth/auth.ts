import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/utils/prisma';
import { signInSchema } from '@/schema/auth-schema';
import { getUserFromDb } from '@/utils/get-user';
import { ZodError } from 'zod';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and Password are required');
          }

          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email);

          if (!user || !user.password) {
            throw new Error('Invalid credentials.');
          }

          const isPasswordValid = password === user.password;

          if (!isPasswordValid) {
            throw new Error('Invalid credentials.');
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 3600,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
});
