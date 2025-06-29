const Address = require("../models/address");
const Customer = require("../models/customer");

exports.createAddress = async (req, res) => {
    const { customer_id, country, city, street, pincode, state, firstname, lastname } = req.body;

    try {
        const customerExists = await Customer.find({ _id: customer_id });
        if (customerExists) {
            const Response = await Address.create({ customer_id, country, city, street, pincode, state, firstname, lastname })
            return res.status(200).json({
                success: true,
                message: "Address Add Successfully",
                data: Response
            })
        }
        return res.status(404).json({
            message: "Please login then add address",
            success: false,
            error: error.message
        })
    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: "address not Created",
            error: error.message
        })
    }

}

exports.getAddress = async (req, res) => {
    const { customer_id } = req.query
    try {
        const Response = await Address.find({ customer_id })
        return res.status(200).json({
            success: true,
            message: "Address Fetch Successfully",
            data: Response
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "address not here"
        })
    }
}

exports.deleteAddress = async (req,res)=>{
    const {Address_id}=req.query;
    try{
        const Response= await Address.findOneAndDelete({_id:Address_id});
        return res.status(200).json({
            message:"Dalete Address Successfuly",
            success:true
        })
    }
    catch(error){
        return res.status(500).json({
            message:"Address not removed",
            success:false
        })
    }
}