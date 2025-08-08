const express = require("express");
const upload = require("../middlewares/multer")
const { createProduct, get_product, productPagination } = require("../controllers/product-controller");
const router = express.Router();
router.post("/create", upload.fields([{ name: "images", maxCount: 10 }, { name: "cover_image", maxCount: 1 }, { name: "feature_image", maxCount: 5 }]), createProduct);
router.get("/item", get_product);
router.get("/itemdata", productPagination);
module.exports = router;