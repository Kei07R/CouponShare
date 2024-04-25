const express = require("express");
const {registerUser,loginUser,homeAccess} = require("../controllers/authController");
const validateToken = require("../middlewares/validTokenHandler");
const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/home', validateToken, homeAccess);

module.exports = router;