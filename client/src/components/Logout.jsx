import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../apis/authApis';

const Logout = () => {
    const navigate = useNavigate();  

    const handleLogout = async () => {
        try {
            localStorage.removeItem('accessToken');
            await logoutUser()
            navigate("/login", { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

