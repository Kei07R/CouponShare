const asyncHandler = require("express-async-handler");
const Coupon = require('../models/coupon');

const getUnverifiedCoupons = asyncHandler(async (req, res) => {
    try {
        const unverifiedCoupons = await Coupon.find({ status: 'Unverified' });
        res.status(200).json({ unverifiedCoupons });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const approveCoupon = asyncHandler(async (req, res) => {
    try {
        const { coupon_code } = req.body;
        const updatedCoupon = await Coupon.findOneAndUpdate({ coupon_code }, { status: 'Listed' }, { new: true });
        res.status(200).json({ message: 'Coupon approved successfully', coupon: updatedCoupon });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const rejectCoupon = asyncHandler(async (req, res) => {
    try {
        const { coupon_code, rejectionReason } = req.body;
        const updatedCoupon = await Coupon.findOneAndUpdate({ coupon_code }, { status: 'Rejected', rejection_reason: rejectionReason }, { new: true });
        res.status(200).json({ message: 'Coupon rejected successfully', coupon: updatedCoupon });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {getUnverifiedCoupons, approveCoupon, rejectCoupon};