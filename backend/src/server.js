import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routesGroup from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import { errorLogging } from "./errorLogging/error.js";
import { defaultHomePage } from "./utils/templates/defaultHomePage.js";

const app = express();
const port = process.env.PORT || 5001;
// Set up allowed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];
// CORS middleware options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send(defaultHomePage());
});
routesGroup(app, express);

// Error handling
errorLogging(app);

// Connect remote DB and run server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to mysql server: ", error);
    process.exit(1);
  });

// module.exports = app;
