import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken/useToken";

const Login = () => {
  const { signIn, signInGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  const [loginEmail, setLoginEmail] = useState("");
  const { token } = useToken(loginEmail);
  if (token) {
    navigate(from, { replace: true });
  }

  const [loginError, setLoginError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginEmail(data.email);
      })
      .catch((error) => {
        console.error(error.message);
        setLoginError(error.message);
      });
  };

  const handleGoogleLogIn = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="h-[800px] flex justify-center items-center ">
      <div className="w-96 p-7 shadow-xl rounded-xl">
        <p className="text-4xl text-center">Login</p>
        <form onSubmit={handleSubmit(handleLogin)}>
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
              })}
              type="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="alert alert-error my-2">
                {errors.password?.message}
              </p>
            )}
            {loginError && <p className="text-red-500">{loginError}</p>}
            <label className="label">
              <span className="label-text">Forgot Password?</span>
            </label>
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-accent w-full my-4"
          />
        </form>

        <p className="text-center">
          New to Doctors Portal?{" "}
          <Link to="/signup" className="text-secondary">
            Create new account
          </Link>
        </p>
        <div className="divider my-4">OR</div>
        <button onClick={handleGoogleLogIn} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
