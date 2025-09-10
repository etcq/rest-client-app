export const validationMessages = {
  name: 'Name is required.',
  nameUppercase: 'Name must start with an uppercase letter.',
  email: 'Email is required.',
  emailInvalid: 'Invalid email address.',
  password: 'Password is required.',
  passwordLength: 'Password must be at least 8 characters long.',
  passwordUppercase: 'Password must contain at least one uppercase letter.',
  passwordLowercase: 'Password must contain at least one lowercase letter.',
  passwordNumber: 'Password must contain at least one number.',
  passwordSpecial: 'Password must contain at least one special character.',
} as const;
