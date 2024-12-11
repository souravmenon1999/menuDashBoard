import itemService from '../services/itemService.js';
import prisma from '../utils/db.js';

export const getItemsByMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const items = await itemService.getItemsByMenu(menuId);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const { menuId, name, description, price } = req.body;

    // Validate menuId (optional, but recommended)
    const menuExists = await prisma.menu.findUnique({
      where: { id: menuId },
    });

    if (!menuExists) {
      return res.status(404).json({ error: "Menu not found" });
    }

    // Create item
    const item = await itemService.createItem({ menuId, name, description, price });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};