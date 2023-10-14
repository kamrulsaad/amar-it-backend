import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

const isPasswordValid = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => await bcrypt.compare(password, hashedPassword);

export const AuthUtils = {
  hashPassword,
  isPasswordValid,
};
