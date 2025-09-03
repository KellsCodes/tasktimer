import sharp from "sharp";
import path from "path";
import fs from "fs";
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

export const removeImage = async (oldProfileImage) => {
  const oldImage = path.join(process.cwd(), oldProfileImage);
  if (fs.existsSync(oldImage)) {
    fs.unlinkSync(oldImage);
    console.log("Deleted old profile image");
    return 0;
  }
  return 1;
};
