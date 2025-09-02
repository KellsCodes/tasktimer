import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized access." });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ code: 2, message: "Access token expired." });
    }
    return res.status(401).json({ code: 3, message: "Invalid access token." });
  }
};
