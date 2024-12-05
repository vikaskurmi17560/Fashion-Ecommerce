const Address=require("../models/address");

exports.createAddress= async(req,res)=>{
    const{customer_id,country,city ,street,pincode,state}=req.body;

    try{
        const Response = await Address.create({customer_id,country,city ,street,pincode,state})
        return res.status(200).json({
            success:true,
            message:"Address Add Successfully",
            data:Response
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"address not Created"
        })
    }

}

exports.getAddress= async(req,res)=>{
    const {customer_id}=req.query
    try{
        const Response = await Address.find({customer_id:customer_id})
        return res.status(200).json({
            success:true,
            message:"Address Add Successfully",
            data:Response
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"address not Created"
        })
    }
}