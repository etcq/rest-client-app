'use server';

import { signOut } from '@/auth/auth';

export async function logout() {
  try {
    const result = await signOut({
      redirect: false,
    });
    return result;
  } catch (error) {
    return new Error(`Authentication error: ${error instanceof Error && error.message}`);
  }
}
