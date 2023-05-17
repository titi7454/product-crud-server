const Product = require("../models/Product");
require("dotenv").config({ path: "variables.env" });
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_AUTH, {
    expiresIn: "1h",
  });
};

//functions used when api is called
exports.createProduct = async (req, res) => {
  try {
    let product;

    product = new Product(req.body);

    await product.save();
    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occured");
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occured");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, category, details, price } = req.body;
    const id = req.params.id;
    let product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ msg: "The product doesn't exist" });
    }

    product.name = name;
    product.category = category;
    product.details = details;
    product.price = price;

    product = await Product.findOneAndUpdate({ _id: id }, product, {
      new: true,
    });

    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occured");
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ msg: "The product doesn't exist" });
    }

    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occured");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ msg: "The product doesn't exist" });
    }

    await Product.findOneAndRemove({ _id: id });
    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occured");
  }
};

exports.getToken = (req, res) => {
  try {
    const id = req.params.id;
    const token = createToken(id);
    // res.cookie("jwt", token)
    // res.status(201).json("Token set")
    res.json(token);
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occured");
  }
};
