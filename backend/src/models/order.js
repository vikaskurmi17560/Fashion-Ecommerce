// Require mongoose
const mongoose = require("mongoose");

// Create Schema
const OrderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10,15}$/.test(v); 
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); 
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    order_notes: {
      type: String,
      required: false, 
    },
    address: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Address",
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create model
const Order = mongoose.model("Order", OrderSchema);

// Export model
module.exports = Order;
