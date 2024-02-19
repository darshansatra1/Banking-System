const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const morgan = require("morgan"); // HTTP request and response logging
const helmet = require("helmet"); // Security middleware
const cors = require("cors"); // Cross-Origin Resource Sharing (CORS) configuration
const rateLimit = require("express-rate-limit"); // Rate limiting middleware
const xss = require("xss-clean"); // Cross-site scripting (XSS) protection
const mongoSanitize = require("express-mongo-sanitize"); // Data sanitization
const { errorHandler, notFound } = require("./middlewares/errorHandler");

// Import routes

const adminRoutes = require('./routes/adminRoutes'); // Import the admin routes

const app = express();

// Database connection 
dbConnect();

// Middleware for enhanced security and functionality:
app.use(morgan("dev")); // Log HTTP requests and responses
app.use(helmet()); // Set security headers
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" })); // Configure CORS based on your needs
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Limit requests per window
app.use(xss()); // Clean incoming requests from XSS attacks
app.use(mongoSanitize()); // Sanitize data for MongoDB queries

// Body parsing middleware:
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data (if needed)

// Router for authentication:
const usersRoute = require("./routes/usersRoute");
app.use('/api/user', usersRoute);

// Error handling middleware:
app.use(notFound);
app.use(errorHandler);

// Determine the port from the environment or use 4000 as a fallback
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
