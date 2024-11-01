import { useEffect, useState } from "react";

function useFetchData(getUser) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser()
        setData(response.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data.");
      }
    }

    fetchData();
  }, []);

  return { data, error }
}

export default useFetchData;