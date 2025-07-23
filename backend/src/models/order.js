const mongoose = require("mongoose");

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
      trim: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
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
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
         size: {
          type: String,
          required: true,
        },

      },
    ],
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
