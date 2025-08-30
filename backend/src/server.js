import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routesGroup from "./routes/routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
routesGroup(app);

// Error handling middleware

// Server running
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((error) => {
  console.error("Failed to connect to mysql server:", error);
  process.exit(1);
});
