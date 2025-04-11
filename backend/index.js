import express from 'express';
import { DbConnect } from './DB/DbConnect.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import Authrouter from './Routes/AuthRoute.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Verifyrouter from './Routes/verifyRoute.js';

// Load .env variables
dotenv.config();

// For __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect DB
DbConnect();

const app = express();

// CORS settings - switch based on environment
app.use(cors({
  origin:"https://fakesnapgenerator.onrender.com" || 'http://localhost:5174',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Serve frontend's index.html for all routes not matched by backend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Auth routes
app.use('/api/auth', Authrouter);

app.use('/api/verify',Verifyrouter);

// Fallback route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
