import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAccessToken } from "../../components/useAuthToken/useAuthToken";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken/useToken";

const Signup = () => {
  const { createUser, updateUser, signInGoogle } = useContext(AuthContext);
  const [signupError, setSignupError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [userCreatedEmail, setUserCreatedEmail] = useState("");
  const { token } = useToken(userCreatedEmail);
  if (token) {
    navigate(from, { replace: true });
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSignUp = (data) => {
    setSignupError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Sign up successfully");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            toast.success("Profile update successfully");
            saveUser(data.name, data.email);
          })
          .catch((er) => console.error(er));
      })
      .catch((error) => {
        console.error(error);
        setSignupError(error.message);
      });
  };

  const handleGoogle = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

  const saveUser = (name, email) => {
    const user = { name, email };

    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setUserCreatedEmail(email);
        }
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center ">
      <div className="w-96 p-7 shadow-xl rounded-xl">
        <p className="text-4xl text-center">Sign Up</p>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input input-bordered w-full "
            />
            {errors.name && (
              <p className="alert alert-error my-2">{errors.name?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email Address is required" })}
              type="email"
              className="input input-bordered w-full "
            />
            {errors.email && (
              <p className="alert alert-error my-2">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 character or more",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$?&*])(?=.*[0-9])(?=.*[a-z])/,
                  message:
                    "Password must have uppercase,special character,lowercase and number",
                },
              })}
              type="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="alert alert-error my-2">
                {errors.password?.message}
              </p>
            )}
            {signupError && (
              <p className="alert alert-error my-2">{signupError}</p>
            )}
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="btn btn-accent w-full my-4"
          />
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary">
            Please Login
          </Link>
        </p>
        <div className="divider my-4">OR</div>
        <button onClick={handleGoogle} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Signup;
