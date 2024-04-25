const asyncHandler = require("express-async-handler");
const Coupon = require('../models/coupon');

const getCoupons = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find({ status: 'Listed' });
        res.status(200).json({ coupons });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getCouponsByBrand = asyncHandler(async (req, res) => {
    const brand = req.params.brand;
    try {
        const coupons = await Coupon.find({ status: 'Listed', brand: brand });
        res.status(200).json({ coupons });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { getCoupons, getCouponsByBrand };
