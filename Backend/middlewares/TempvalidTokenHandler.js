const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    
    // Extract the token from the cookie instead of the Authorization header
    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        res.status(401);
        throw new Error("Unauthorized: Token not found in cookie");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Unauthorized: Invalid or expired token");
    }
});

module.exports = validateToken;
