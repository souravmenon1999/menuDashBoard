import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';  // Import dotenv
import menuRoutes from './routes/menuRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

// Configure dotenv
dotenv.config();

const app = express();

// Enable CORS dynamically based on the environment
app.use(cors({
  origin: process.env.CLIENT_URL, // Now it will use the CLIENT_URL from the .env file
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));

console.log(process.env.CLIENT_URL);  // To verify if the CLIENT_URL is correctly loaded

app.use(express.json());

// API Routes
app.use('/api/menus', menuRoutes);
app.use('/api/items', itemRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
