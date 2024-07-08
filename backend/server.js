// Sets up and starts the Express server, configuring the middleware and routes for handling HTTP requests

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load env variables from .env file
dotenv.config();

// Set the port for the server
const app = express();
const PORT = process.env.PORT || 3000;

// CORS condiguration (allow cookies to be sent with requests)
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));

// Middleware for parsing JSON data in the request body
app.use(express.json());
app.use(fileUpload());

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

// Routes for API endpoints
app.use('/api', taskRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;