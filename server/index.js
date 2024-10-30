// index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } = require('./utils/jwtUtils');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

let usersArray = []

// Register Route
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username ||!email ||!password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        if (usersArray.find(user => user.username === username || user.email === email)) {
            return res.status(400).json({ error: 'User already exists' });
        }
        usersArray.push({
            username,
            email,
            password,
            refreshToken: null
        })
        console.log(usersArray);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = usersArray.find(user => user.email === email);
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
    console.log(usersArray);
    

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
    });
    res.status(201).json({ accessToken, message: 'User logged successfully'});
    // res.json({ accessToken, refreshToken });
});

// Refresh Token Route
app.post('/api/refresh-token', async (req, res) => {
    // const { refreshToken } = req.body
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ error: 'No refresh token provided' });

    try {

        const decoded = verifyRefreshToken(refreshToken)

        const user = usersArray.find(user => user.username === decoded.username);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(405).json({ error: 'Invalid refresh token' });
        }


        // Generate a new access token
        const newAccessToken = generateAccessToken(user.username);
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(405).json({ error: 'Invalid or expired refresh token' });
    }
});


// Profile Route (protected)
app.get('/api/me', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) return res.status(401).json({ error: 'Access token not provided' });
    
    try {
        const decoded = verifyAccessToken(accessToken);
        const user = usersArray.find(user => user.username === decoded.username);
        // console.log(user);
        if (!user) return res.status(401).json({ error: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired access token' });
    }
});

// Logout Route
app.post('/api/logout', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) return res.status(204).json({ error: 'refreshToken not provided' });  // No content
    
    try {
      
        const user = usersArray.find(user => user.refreshToken === refreshToken);
        
        if (!user) return res.status(401).json({ error: 'User not found' });
        if (user) {
            user.refreshToken = null;
            console.log(usersArray);
        }

        res.clearCookie('refreshToken', { path: '/' });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired access token' });
    }
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));