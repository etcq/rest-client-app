'use server';

import { type SignUpInput } from '@/schema/auth-schema';
import { prisma } from '@/utils/prisma';

export async function registerUser(formData: SignUpInput) {
  const { name, email, password } = formData;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User with same email already exists');
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return user;
  } catch (error) {
    return new Error(`Failed to register: ${error instanceof Error && error.message}`);
  }
}
