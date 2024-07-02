// Sets up and starts the Express server, configuring the middleware and routes for handling HTTP requests

import dotenv from 'dotenv';
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';

// Load env variables from .env file
dotenv.config();

// Set the port for the server
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware for parsing JSON data in the request body
app.use(express.json());
app.use('/api', taskRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
