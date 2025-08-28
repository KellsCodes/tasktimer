import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express..");
});

// Error handling middleware

// Server running
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
