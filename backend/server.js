// Sets up and starts the Express server, configuring the middleware and routes for handling HTTP requests

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load env variables from .env file
dotenv.config();

// Set the port for the server
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware for parsing JSON data in the request body
app.use(express.json());

// CORS condiguration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));

// Routes for API endpoints
app.use('/api', taskRoutes);
app.use('/auth', authRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
