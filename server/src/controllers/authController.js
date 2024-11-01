import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwtUtils.js';
import { userArray } from '../constants/userArray.js';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email ||!password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const user = userArray.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = user.password === password;
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user.username);
    const refreshToken = generateRefreshToken(user.username);

    user.refreshToken = refreshToken;
    // console.log(userArray);
    

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });
    res.status(201).json({ accessToken, message: 'User logged successfully'});
}

export const tokenRefresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log('refreshToken: '+ refreshToken);

    if (!refreshToken) return res.status(401).json({ error: 'No refresh token provided' });

    try {

        const decoded = verifyRefreshToken(refreshToken)

        const user = userArray.find(user => user.username === decoded.username);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(405).json({ error: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(user.username);
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(405).json({ error: 'Invalid or expired refresh token' });
    }
}

export const logoutUser =  async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) return res.status(204).json({ error: 'refreshToken not provided' });  // No content
    
    try {
      
        const user = userArray.find(user => user.refreshToken === refreshToken);
        
        if (!user) return res.status(401).json({ error: 'User not found' });
        if (user) {
            user.refreshToken = null;
            // console.log(userArray);
        }

        res.clearCookie('refreshToken', { path: '/' });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired access token' });
    }
}