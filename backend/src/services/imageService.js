import sharp from "sharp";
// import path from "path";
// import fs from "fs";
import { saveFile } from "../utils/storage.utils.js";

export const processImage = async (file, userId) => {
  try {
    const processedBuffer = await sharp(file.buffer)
      .resize(500, 500, {
        fit: "inside",
      })
      .webp({ quality: 80 })
      .toBuffer();
    const filename = `profile_${userId}_${Date.now()}.webp`;
    const filePath = await saveFile(processedBuffer, filename);
    return filePath;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
