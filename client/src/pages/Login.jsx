import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apis/authApis";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(formData)
      setLoading(false);
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
        <button disabled={loading} type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}

      <a onClick={() => navigate("/register", { replace: true })}>Dont have an account? Register</a>
    </div>
  );
};

export default Login;
