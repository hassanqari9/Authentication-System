import { verifyAccessToken } from '../utils/jwtUtils.js';
import { userArray } from '../constants/userArray.js';

export const getUser =  async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    console.log(accessToken);
    
    if (!accessToken) return res.status(401).json({ error: 'Access token not provided' });
    
    try {
        const decoded = verifyAccessToken(accessToken);
        const user = userArray.find(user => user.username === decoded.username);
        // console.log(user);
        if (!user) return res.status(401).json({ error: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired access token' });
    }
}