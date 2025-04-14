const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { getProducts, addProduct } = require("../controllers/productController");

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Make sure this folder exists
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.get("/", getProducts);

// ✅ Updated POST route to handle image upload
router.post("/", upload.single("image"), addProduct); // Later, add admin protection

module.exports = router;
