import fs from "fs";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const saveFile = async (buffer, filename) => {
  if (isProduction) {
    // Integrate with GCP bucket
    // return path to the storage
  } else {
    const uploadDir = path.join(process.cwd(), "storage");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    return `storage/${filename}`;
  }
};
