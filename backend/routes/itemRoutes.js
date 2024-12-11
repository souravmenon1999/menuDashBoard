import express from 'express';
import { getItemsByMenu, createItem } from '../controllers/itemController.js';

const router = express.Router();

router.get('/:menuId', getItemsByMenu);
router.post('/', createItem);

export default router;
