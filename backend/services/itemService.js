

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getItemsByMenu = async (menuId) => {
  return await prisma.item.findMany({
    where: { menuId },
  });
};

export const createItem = async (data) => {
  return await prisma.item.create({
    data,
  });
};

export default { getItemsByMenu, createItem };
