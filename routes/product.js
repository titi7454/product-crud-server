const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { requireAuth } = require("../middleware/authMiddleware.js");

//api routes
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.put("/:id", requireAuth, productController.updateProduct);
router.get("/:id", productController.getProduct);
router.delete("/:id", requireAuth, productController.deleteProduct);
router.get("/get-token/:id", productController.getToken);

module.exports = router;
