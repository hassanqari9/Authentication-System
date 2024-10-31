import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axios';  // Use the axios instance

const Logout = () => {
    const navigate = useNavigate();  

    const handleLogout = async () => {
        try {
            localStorage.removeItem('accessToken');
            await axiosInstance.post('/api/auth/logout');
            navigate("/login", { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

