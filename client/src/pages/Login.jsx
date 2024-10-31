import { useState } from "react";
import axiosInstance from "../apis/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", formData);
      alert(response.data.message)
      
      const { accessToken } = response.data;
      // console.log(accessToken);
      
      // Store the access token in localStorage
      localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);
      navigate("/", { replace: true });

    } catch (error) {  
      console.log(error);
      setError(error?.response?.data?.error || "Login failed. Please check your credentials. ");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}

      <a onClick={() => navigate("/register", { replace: true })}>Dont have an account? Register</a>
    </div>
  );
};

export default Login;
