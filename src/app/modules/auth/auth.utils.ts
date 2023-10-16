import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';

const hashPassword = async (password: string): Promise<string> =>
    await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

const isPasswordValid = async (
    password: string,
    hashedPassword: string,
): Promise<boolean> => await bcrypt.compare(password, hashedPassword);

const isUserExist = async (username: string): Promise<User | null> =>
    await prisma.user.findUnique({
        where: {
            username,
        },
    });

export const AuthUtils = {
    hashPassword,
    isPasswordValid,
    isUserExist,
};
