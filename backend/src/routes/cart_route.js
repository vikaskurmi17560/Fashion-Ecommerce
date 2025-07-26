const express=require("express");
const router=express.Router();
const {cartCreate,cartUpdate,cartDelete,cartDeletebyUser , cartGet ,ItemExists}=require("../controllers/cart-controller");
router.post("/create",cartCreate);
router.post("/update",cartUpdate);
router.post("/delete",cartDelete);
router.get("/get",cartGet);
router.get("/exist",ItemExists);
router.delete("/deletebyuser",cartDeletebyUser);

module.exports=router;