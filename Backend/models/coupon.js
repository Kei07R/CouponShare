const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
    coupon_code : {
        type: String,
        required: [true, "Please add Coupon Code"]
    },
    expiry_date : {
        type: Date,
        required : [true, "Please add Expiry Date"]
    },
    brand : {
        type: String,
        required : [true, "Please add Brand Name"]
    },
    price: {
        type: Number,
        required: [true, "Add Coupon Price"]
    },
    img: {
        type: String,
        required: [true, "Add Coupon Image"]
    },
    desc: {
        type: String,
        required: [true, "Add Coupon Description"]
    },
    status: {
        type: String,
        default: "Unverified"
    },
    rejection_reason: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Coupon",couponSchema);