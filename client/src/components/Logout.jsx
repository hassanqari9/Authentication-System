import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axios';  // Use the axios instance

const Logout = () => {
    const navigate = useNavigate();  

    const handleLogout = async () => {
        try {
            localStorage.removeItem('accessToken');
            const response = await axiosInstance.post('/api/auth/logout');
            alert(response.data.message)
            navigate("/login", { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

