import express from 'express';
import menuRoutes from './routes/menuRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/menus', menuRoutes);
app.use('/api/items', itemRoutes);

export default app;
