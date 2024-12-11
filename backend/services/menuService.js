import prisma from '../utils/db.js';

const getMenus = async () => {
  return await prisma.menu.findMany({
    include: { items: true },
  });
};

const createMenu = async (data) => {
  return await prisma.menu.create({
    data,
  });
};

export default { getMenus, createMenu };
