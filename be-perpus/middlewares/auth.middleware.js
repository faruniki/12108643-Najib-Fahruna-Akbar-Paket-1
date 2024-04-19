const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = await jwt.verify(token, "access_token");
        const user = await User.findById(decoded.userId); 
        if(!user || !['a', 'p', 'u'].includes(user.role)) throw new Error ('Unauthorized');

        req.user = user;
        next();
    } catch (error) {
        res.status(400).send({error: 'Unauthorized'})
    }
};

module.exports = auth;
