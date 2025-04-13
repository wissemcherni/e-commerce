const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const fs = require("fs");

exports.addProduct = async (req, res) => {
  console.log("req.body:", req.body);
    console.log("req.file:", req.file);
  try {
    let imageBase64 = null;

    if (req.file) {
      const fileData = fs.readFileSync(req.file.path);
      imageBase64 = fileData.toString("base64");
    }

    const newProduct = await Product.create({
      ...req.body,
      image: imageBase64,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


