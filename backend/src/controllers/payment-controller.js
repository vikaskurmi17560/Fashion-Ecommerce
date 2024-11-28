const Razorpay=require("razorpay")
exports.createOrder= async(req,res)=>{

    const instance = new Razorpay({ key_id: process.env.TEST_API_KEY, key_secret: process.env.TEST_KEY_SECRET })

try{
    const {amount}=req.body
    const Order = await instance.orders.create({
    
        amount: amount,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    })

    
    return res.status(200).json({
        success:true,
        message:"create order Successful",
        data:Order
    })
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Order creation failed"
    })
}
}
//order create karna 