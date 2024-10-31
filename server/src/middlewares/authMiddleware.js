import { verifyAccessToken } from '../utils/jwtUtils.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ error: 'Access token not provided' });
    }

    try {
        const decoded = verifyAccessToken(accessToken);
        req.user = decoded; 
        next();  
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired access token' });
    }
}
