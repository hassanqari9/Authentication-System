import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Profile from "../components/Profile";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
  }, [token, navigate]);

  if (token) {
    return (
      <>
        <Profile />
      </>
    );
  }
}

export default App;
