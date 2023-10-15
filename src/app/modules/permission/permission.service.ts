import { Permission } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (payload: Permission): Promise<Permission> => {
  const result = await prisma.permission.create({
    data: payload,
  });

  return result;
};

export const PermissionService = {
  insertIntoDB,
};
