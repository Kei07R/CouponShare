const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"]
    },
    email: {
        type: String,
        required: [true, "Please add email"]
    },
    password: {
        type: String,
        required: [true, "Please add password"]
    },
    uploadedCoupons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
