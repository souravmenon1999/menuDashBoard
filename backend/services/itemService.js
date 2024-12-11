import prisma from '../utils/db.js';

const getItemsByMenu = async (menuId) => {
  return await prisma.item.findMany({
    where: { menuId },
  });
};

const createItem = async (data) => {
  return await prisma.item.create({
    data,
  });
};

export default { getItemsByMenu, createItem };
