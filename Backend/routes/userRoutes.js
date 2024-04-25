const express = require("express");
const {getUserProfile, uploadCoupon} = require("../controllers/userController");
const validateToken = require("../middlewares/validTokenHandler");
const router = express.Router();

router.get('/profile', validateToken, getUserProfile);

router.post('/upload-coupon', validateToken, uploadCoupon);

module.exports = router;
