import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((er) => console.error(er));
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-96">
      <div className="flex justify-center items-center text-red-400 text-4xl ">
        <p>Something wr</p>
        <div className="h-8 w-8 animate-spin border-2 border-dashed rounded-full"></div>
        <p>ng</p>
      </div>
      <p className="text-3xl my-6">
        Please{" "}
        <button onClick={handleLogOut} className="btn btn-error">
          LogOut
        </button>{" "}
        then log in
      </p>
    </div>
  );
};

export default DisplayError;
