import multer from "multer";

// 1️⃣ Define where and how files will be stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // folder where files will go
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // name of the saved file
  },
});

// 2️⃣ Create the upload middleware
export const upload = multer({ storage });
