import { userArray } from '../constants/userArray.js';

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