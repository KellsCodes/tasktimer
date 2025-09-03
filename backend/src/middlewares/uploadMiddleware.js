import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb({ code: 400, message: "Only .jpg, .png, .webp files allowed" });
      // return cb(new Error("Only .jpg, .png, .webp files allowed"));
    }
    cb(null, true);
  },
});

export default upload.single("profileImage");
