const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String, 
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{5,6}$/.test(v); 
        },
        message: (props) => `${props.value} is not a valid pincode!`,
      },
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;