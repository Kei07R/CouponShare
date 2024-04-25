const express = require('express');
const { getCoupons, getCouponsByBrand } = require('../controllers/couponController');
const validateToken = require("../middlewares/validTokenHandler");
const router = express.Router();

router.get('/all', validateToken, getCoupons);
router.get('/brand/:brand',validateToken, getCouponsByBrand);

module.exports = router;
