import { useState } from "react";
import axiosInstance from "../api/axios";

const Register = ({setLog}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/register", formData);
      alert(response.data.message)
      setLog(true)
      
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error || "Register failed. Please check your credentials. ");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
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
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}

      <button onClick={() => setLog(true)}>Already have an account? Login</button>
    </div>
  );
};

export default Register;
