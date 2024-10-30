// tokenUtils.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'i_will_expire_in_seconds';
const REFRESH_SECRET = 'i_will_expire_in_days';

const generateAccessToken = (username) => {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '10s' }); 
};

const generateRefreshToken = (username) => {
    return jwt.sign({ username }, REFRESH_SECRET, { expiresIn: '7d' });  
};

const verifyAccessToken = (accessToken) => {
    return jwt.verify(accessToken, JWT_SECRET);
}

const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, REFRESH_SECRET);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};