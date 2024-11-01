import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../apis/userApis";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createUser(formData)
      alert(response.data.message)
      navigate("/login", { replace: true });
      
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error || "Register failed. Please check your credentials. ");
    } finally {
      setLoading(false);
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
        <button disabled={loading} type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}

      <a onClick={() => navigate("/login", { replace: true })}>Already have an account? Login</a>
    </div>
  );
};

export default Register;
