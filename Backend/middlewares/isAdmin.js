const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const isAdmin = asyncHandler(async(req, res, next) => {
    try {
        const reqUser = req.user;
        const user = await User.findOne({email: reqUser.email})

        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = isAdmin;
