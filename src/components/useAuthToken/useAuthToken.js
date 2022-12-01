export const getAccessToken = (email) => {
  fetch(`${process.env.REACT_APP_API_URL}/jwt?email=${email}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("doctorToken", data.token);
      }
    });
};
