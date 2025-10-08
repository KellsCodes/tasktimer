import sharp from "sharp";
import path from "path";
import fs from "fs";
import { cloudImageUpload, deleteCloudImage } from "../utils/uploadImageToCloud.js";
// import { saveFile } from "../utils/storage.utils.js";

export const processImage = async (file, userId) => {
  try {
    const processedBuffer = await sharp(file.buffer)
      .resize(500, 500, {
        fit: "inside",
      })
      .webp({ quality: 80 })
      .toBuffer();
    const filename = `profile_${userId}_${Date.now()}.webp`;

    /** For saving to cloudinary service */
    const response = await cloudImageUpload(processedBuffer, filename);
    return {
      profileImage: response.secure_url,
      profileImageCloudID: response.public_id,
    };

    /** This is saving on local file system, uncomment to use it. Also enable it on profile service */
    // const filePath = await saveFile(processedBuffer, filename);
    // return filePath;
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

export const deleteCloudProfileImage = async (profileImageCloudID) => {
  try {
    if (profileImageCloudID) {
      const result = await deleteCloudImage(profileImageCloudID)
    }
    return 1;
  } catch (error) {
    console.log(error);
    return 2;
  }
};
