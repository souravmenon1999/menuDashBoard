import itemService from '../services/itemService.js';

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
    const item = await itemService.createItem({ menuId, name, description, price });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
