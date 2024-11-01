import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../apis/authApis';

const Logout = () => {
    const navigate = useNavigate();  
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        try {
            localStorage.removeItem('accessToken');
            setLoading(true);
            await logoutUser()
            navigate("/login", { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

