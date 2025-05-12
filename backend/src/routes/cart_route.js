const express=require("express");
const router=express.Router();
const {cartCreate,cartUpdate,cartDelete, cartGet}=require("../controllers/cart-controller");
router.post("/create",cartCreate);
router.post("/update",cartUpdate);
router.post("/delete",cartDelete);
router.get("/get",cartGet);

module.exports=router;