import { useState } from "react";
import axiosInstance from "../api/axios";

const Login = ({ setLog, setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/login", formData);
      alert(response.data.message)
      
      const { accessToken } = response.data;
      // console.log(accessToken);
      
      // Store the access token in localStorage
      setToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);

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

      <button onClick={() => setLog(false)}>Dont have an account? Register</button>
    </div>
  );
};

export default Login;
