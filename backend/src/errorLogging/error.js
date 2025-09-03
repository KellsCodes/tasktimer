import multer from "multer";

export const errorLogging = (app) => {
  app.use((err, req, res, next) => {
    if (err.code === 400 && err.message) {
      return res.status(400).json({ error: err.message });
    }
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors (like file too large)
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });
};
