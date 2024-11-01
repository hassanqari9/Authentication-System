import { userArray } from '../constants/userArray.js';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    
    if (!username ||!email ||!password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        if (userArray.find(user => user.username === username || user.email === email)) {
            return res.status(400).json({ error: 'User already exists' });
        }
        userArray.push({
            username,
            email,
            password,
            refreshToken: null
        })
        // console.log(userArray);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
}

export const getUser =  async (req, res) => {
    
    try {
        const decodedUser = req.user
        // console.log('decodedUser: ', decodedUser);
        
        const user = userArray.find(user => user.username === decodedUser.username);
        if (!user) return res.status(401).json({ error: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(403).json({ error: 'Something went wrong' });
    }
}