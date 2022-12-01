import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("doctorToken", data.token);
          setToken(data.token);
        }
      });
  }, [email]);
  return { token };
};

export default useToken;
