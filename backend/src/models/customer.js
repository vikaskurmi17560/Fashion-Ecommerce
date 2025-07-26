const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
    profile: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reset_password_token: {
        type: String
    },
    reset_password_token_expire: {
        type: Date
    },
    confirm_password: {
        type: String,
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: "Password confirmation does not match password."
        }
    }
}, { timestamps: true });

customerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirm_password = undefined;
    next();
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
