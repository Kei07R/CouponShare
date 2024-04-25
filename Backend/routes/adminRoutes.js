const express = require('express');
const {getUnverifiedCoupons, approveCoupon, rejectCoupon} = require('../controllers/adminController');
const validateToken = require("../middlewares/validTokenHandler");
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

router.get('/unverified-coupons',validateToken, isAdmin, getUnverifiedCoupons);

router.post('/approve-coupon',validateToken, isAdmin, approveCoupon);

router.post('/reject-coupon',validateToken, isAdmin, rejectCoupon);

module.exports = router;

