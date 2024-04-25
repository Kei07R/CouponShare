const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Coupon = require("../models/coupon");

const getUserProfile = asyncHandler(async(req,res)=>{
    const reqUser = req.user;
    const user = await User.findOne({email: reqUser.email}).populate('uploadedCoupons');
    if (user) {
        res.status(200).json(
                            {message: "User Profile",
                            id: user.id, 
                            username: user.username,
                            email: user.email,
                            uploadedCoupons: user.uploadedCoupons,
                            soldCoupons: user.soldCoupons
                            })
    } else {
        res.status(401).json({ message: "Unauthorized: User is not authenticated" });
    }
});

const uploadCoupon = asyncHandler(async (req, res) => {
    const { coupon_code, expiry_date, brand, price, img, desc } = req.body;
    
    const coupon = new Coupon({
        coupon_code,
        expiry_date,
        brand,
        price,
        img,
        desc
    });

    try {
        await coupon.save();

        const reqUser = req.user;
        const user = await User.findOne({email: reqUser.email})

        user.uploadedCoupons.push(coupon._id);
        await user.save();

        res.status(201).json({ message: "Coupon uploaded successfully", coupon });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {getUserProfile, uploadCoupon};