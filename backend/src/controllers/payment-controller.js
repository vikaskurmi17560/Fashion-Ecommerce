const Razorpay = require("razorpay")
const Crypto = require("crypto")
const Payment = require("../models/payment")
exports.createOrder = async (req, res) => {

    const instance = new Razorpay({ key_id: process.env.TEST_API_KEY, key_secret: process.env.TEST_KEY_SECRET })

    try {
        const { amount } = req.body
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
            success: true,
            message: "create order Successful",
            data: Order
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Order creation failed"
        })
    }
}
//order create karna 
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer } = req.body

        const hmac = Crypto.createHmac("sha256", process.env.TEST_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id)
        const generated_signature = hmac.digest("hex")

        if (generated_signature == razorpay_signature) {
            // "save information into  database"
            await Payment.create({ razorpay_order_id, razorpay_payment_id, razorpay_signature, customer });
            return res.status(200).json({
                success: true,
                data: razorpay_payment_id
            })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}