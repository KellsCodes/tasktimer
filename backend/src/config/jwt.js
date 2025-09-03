import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const options = { expiresIn: process.env.ACCESS_TOKEN_TIMER || "15m" };
  return jwt.sign(payload, secret, options);
};

export const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const options = { expiresIn: "7d" };
  return jwt.sign(payload, secret, options);
};

export const verifyAccessToken = (token) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};
