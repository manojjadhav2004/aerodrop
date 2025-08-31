import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken, setUser } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl =
      currState === "Login"
        ? `${url}/api/user/login`
        : `${url}/api/user/register`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        try {
          const decoded = jwtDecode(response.data.token);
          setUser({
            userId: decoded.id || decoded._id,
            name: decoded.name,
            email: decoded.email,
          });
        } catch (e) {
          setUser(null);
        }
        setShowLogin(false);
        setData({ name: "", email: "", password: "" });
      } else {
        alert(response.data.message || "Something went wrong");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Server error. Please try again later."
      );
    }
  };

  return (
    <div className="login-popup fixed inset-0 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm z-50">
      <form
        onSubmit={onLogin}
        className="login-popup-container w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-300 dark:border-neutral-700"
      >
        {/* Title */}
        <div className="login-popUp-title flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {currState}
          </h2>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="text-neutral-500 hover:text-black dark:hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Inputs */}
        <div className="login-popUp-Input flex flex-col gap-4 mb-6">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              className="w-full p-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            className="w-full p-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            className="w-full p-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-md font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Terms */}
        <div className="login-popup-condition flex items-center gap-2 mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {/* Switch login/signup */}
        <div className="text-center mt-6 text-sm">
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="underline cursor-pointer hover:text-black dark:hover:text-white"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="underline cursor-pointer hover:text-black dark:hover:text-white"
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopUp;
