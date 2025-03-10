const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan"); // Add morgan for HTTP request logging
const fs = require("fs");
const path = require("path");
const router = require("./routes");

dotenv.config();
const app = express();

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Create custom logger middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${req.method} ${
    req.url
  } - Request body: ${JSON.stringify(req.body)}`;
  console.log(logMessage);
  fs.appendFile(
    path.join(__dirname, "detailed.log"),
    logMessage + "\n",
    (err) => {
      if (err) console.error("Error writing to log file:", err);
    }
  );
  next();
};

// Set up logging middleware
app.use(morgan("combined", { stream: accessLogStream })); // Log HTTP requests to file
app.use(morgan("dev")); // Log HTTP requests to console in dev format

// Enable CORS for all origins
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);
app.use(express.json());
app.use(logger); // Apply our custom logger after body parsing

// Log MongoDB connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected successfully");
  fs.appendFile(
    path.join(__dirname, "detailed.log"),
    `[${new Date().toISOString()}] MongoDB Connected successfully\n`,
    (err) => {
      if (err) console.error("Error writing to log file:", err);
    }
  );
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  fs.appendFile(
    path.join(__dirname, "detailed.log"),
    `[${new Date().toISOString()}] MongoDB connection error: ${err}\n`,
    (err) => {
      if (err) console.error("Error writing to log file:", err);
    }
  );
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
  fs.appendFile(
    path.join(__dirname, "detailed.log"),
    `[${new Date().toISOString()}] MongoDB disconnected\n`,
    (err) => {
      if (err) console.error("Error writing to log file:", err);
    }
  );
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error("Initial MongoDB connection error:", err);
    fs.appendFile(
      path.join(__dirname, "detailed.log"),
      `[${new Date().toISOString()}] Initial MongoDB connection error: ${err}\n`,
      (err) => {
        if (err) console.error("Error writing to log file:", err);
      }
    );
  });

// Error handling middleware
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] ERROR: ${err.stack}`;
  console.error(errorMessage);
  fs.appendFile(
    path.join(__dirname, "error.log"),
    errorMessage + "\n",
    (err) => {
      if (err) console.error("Error writing to error log file:", err);
    }
  );
  res.status(500).send("Server Error");
});

app.use("/", router); // Use the router

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  fs.appendFile(
    path.join(__dirname, "detailed.log"),
    `[${new Date().toISOString()}] Server running on port ${PORT}\n`,
    (err) => {
      if (err) console.error("Error writing to log file:", err);
    }
  );
});

// Log server shutdown
process.on("SIGINT", () => {
  console.log("Server shutting down");
  fs.appendFile(
    path.join(__dirname, "detailed.log"),
    `[${new Date().toISOString()}] Server shutting down\n`,
    (err) => {
      if (err) console.error("Error writing to log file:", err);
    }
  );
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed through app termination");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
});
