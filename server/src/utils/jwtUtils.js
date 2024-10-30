import jwt from 'jsonwebtoken';

const JWT_SECRET = 'i_will_expire_in_seconds';
const REFRESH_SECRET = 'i_will_expire_in_days';

export const generateAccessToken = (username) => {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '10s' }); 
};

export const generateRefreshToken = (username) => {
    return jwt.sign({ username }, REFRESH_SECRET, { expiresIn: '7d' });  
};

export const verifyAccessToken = (accessToken) => {
    return jwt.verify(accessToken, JWT_SECRET);
}

export const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, REFRESH_SECRET);
}