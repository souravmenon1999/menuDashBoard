import menuService from '../services/menuService.js';

export const getAllMenus = async (req, res) => {
  try {
    const menus = await menuService.getMenus();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMenu = async (req, res) => {
  try {
    const { name, description } = req.body;
    const menu = await menuService.createMenu({ name, description });
    res.status(201).json({ ...menu, items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
