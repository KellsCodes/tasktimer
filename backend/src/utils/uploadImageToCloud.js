import { v2 as cloudinary } from "cloudinary";

/**
 * Uploads image file to cloudinary service
 * @returns {object} The uploaded image object
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function cloudImageUpload(buffer, filename) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "timeit",
        public_id: filename.replace(/\.[^/.]+$/, ""),
        resource_type: "image",
        format: "webp",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    // Pipe buffer to cloudinary stream
    uploadStream.end(buffer);
  });
}

export async function deleteCloudImage(imageID) {
  try {
    const result = await cloudinary.uploader.destroy(imageID);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
