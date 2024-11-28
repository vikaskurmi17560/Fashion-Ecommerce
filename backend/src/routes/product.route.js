const express=require("express");
const upload=require("../middlewares/multer/multer")
const {createProduct, get_products, update_products, get_product} = require("../controllers/product-controller");
const router=express.Router();
router.post("/create",upload.fields([{name:"images",maxCount:10},{name:"cover_image",maxCount:1 },{name:"feature_image",maxCount:5}]),createProduct);
router.get("/get",get_products);
router.get("/item",get_product);
router.post("/update",upload.fields([{name:"images",maxCount:10},{name:"cover_image",maxCount:1},{name:"feature_image",maxCount:5}]),update_products);
module.exports=router;