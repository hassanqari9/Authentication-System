import axiosInstance from '../api/axios';  // Use the axios instance

const Logout = ({setLog, setToken}) => {
    const handleLogout = async () => {
        try {
            setToken(null)
            localStorage.removeItem('accessToken');
            const response = await axiosInstance.post('/api/logout');
            alert(response.data.message)
            
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

