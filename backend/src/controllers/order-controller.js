const Orders = require("../models/order");
const Customer = require("../models/customer");
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
  console.log("Order payload received:", req.body);

  const {
    customer_id,
    payment_id,
    customer_name,
    address,
    phone_no,
    email,
    country,
    payment_method,
    total,
    items
  } = req.body;



  try {
    const order = await Orders.create({
      customer_id,
      payment_id,
      customer_name,
      email,
      phone_no,
      address,
      country,
      payment_method,
      total,
      items: items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        size:item.size
      })),
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
      errors: error.errors || null
    });
  }
};




exports.getOrder = async (req, res) => {
  const { order_id } = req.query

  try {
    const order = await Orders.findById(order_id).select("items.quantity items.price total payment_id createdAt").populate({
        path: "items.product_id",
        select: "name cover_image color",
      })

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data:order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const {user_id} = req.query;
    const userExist = await Customer.findById(user_id);
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User not Exists here"
      })
    }

    const ALLorder = await Orders.find({ customer_id: user_id }).populate({
        path: "address",
        select: "firstname lastname country street city state pincode",
      });
    return res.status(200).json({
      success: true,
      message: "Get all order data of particular user",
      ALLorder
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}