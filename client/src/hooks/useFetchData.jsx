import { useEffect, useState } from "react";
import axiosInstance from "../apis/axios";

function useFetchData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/user/me");
        setData(response.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data.");
      }
    };

    fetchData();
  }, []);

  return { data, error }
}

export default useFetchData;
