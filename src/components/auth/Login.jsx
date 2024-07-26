import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { toast, Toaster } from "react-hot-toast";


function Login() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.loginWithEmailAndPassword(email, password);
      // Handle successful login, e.g., navigate to a different page
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid Credentials!");
      // Handle login error, e.g., display an error message
    }finally{
      setEmail("");
      setPassword("")
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
          >
            Sign In
          </button>
          <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">
              Create an Account{" "}
              <span
                className="ml-1 text-blue-500 cursor-pointer"
                onClick={handleSignUpClick}
              >
                SignUp
              </span>
            </span>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;