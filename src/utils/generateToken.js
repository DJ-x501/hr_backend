const jwt = require('jsonwebtoken');
require('dotenv').config();


async function generateToken(payload){
    
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
    return token;
}


async function verifyToken(token){
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
}

module.exports = {
    generateToken,
    verifyToken
}