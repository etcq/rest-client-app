'use server';

import { signIn } from '@/auth/auth';

export async function loginWithCredentials(email: string, password: string) {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return result;
  } catch {
    return new Error('Authentication error. Check email and password');
  }
}
