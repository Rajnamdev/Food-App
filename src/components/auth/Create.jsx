import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function Create() {
  const firebase = useFirebase();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const handleFullNameFocus = () => setFullNameFocused(true);
  const handleFullNameBlur = () => !formData.fullName.trim() && setFullNameFocused(false);
  const handleFullNameChange = (e) => setFormData({ ...formData, fullName: e.target.value });

  const handleEmailFocus = () => setEmailFocused(true);
  const handleEmailBlur = () => !formData.email.trim() && setEmailFocused(false);
  const handleEmailChange = (e) => setFormData({ ...formData, email: e.target.value });

  const handlePasswordFocus = () => setPasswordFocused(true);
  const handlePasswordBlur = () => !formData.password.trim() && setPasswordFocused(false);
  const handlePasswordChange = (e) => setFormData({ ...formData, password: e.target.value });

  const handleLoginClick = () => navigate("/login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password, fullName } = formData;

      // Create user with email and password using Firebase Auth
      await firebase.signUpUserWithEmailAndPassword(email, password);
       
      // Save additional user data to Firebase Realtime Database
      await firebase.putData("users", {
        fullName,
        email,
      });

      // Display a toast for successful user registration
      toast.success("User registered successfully!");

      // Clear form inputs after successful registration
      

    } catch (error) {
      // Display a toast if the user is already registered
      if (error.code === "auth/email-already-in-use") {
        toast.error("User already registered!");
      } else {
        console.error("Error signing up:", error);
      }
    }
    finally{
      setFormData({ fullName: "", email: "", password: "" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Your Account</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96" onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <input
            type="text"
            id="fullname"
            value={formData.fullName}
            className={`border text-lg h-12 w-full px-4 rounded-md ${fullNameFocused ? "border-blue-500" : "border-gray-300"}`}
            placeholder=" "
            onFocus={handleFullNameFocus}
            onBlur={handleFullNameBlur}
            onChange={handleFullNameChange}
          />
          <label
            htmlFor="fullname"
            className={`absolute left-4 ${fullNameFocused || formData.fullName.trim() ? "-top-3 text-xs text-blue-500" : "top-2 text-sm text-gray-500"} bg-white px-2`}
          >
            Full Name
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="email"
            id="email"
            value={formData.email}
            className={`border text-lg h-12 w-full px-4 rounded-md ${emailFocused ? "border-blue-500" : "border-gray-300"}`}
            placeholder=" "
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
          />
          <label
            htmlFor="email"
            className={`absolute left-4 ${emailFocused || formData.email.trim() ? "-top-3 text-xs text-blue-500" : "top-2 text-sm text-gray-500"} bg-white px-2`}
          >
            Email Address
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="password"
            id="password"
            value={formData.password}
            className={`border text-lg h-12 w-full px-4 rounded-md ${passwordFocused ? "border-blue-500" : "border-gray-300"}`}
            placeholder=" "
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
          />
          <label
            htmlFor="password"
            className={`absolute left-4 ${passwordFocused || formData.password.trim() ? "-top-3 text-xs text-blue-500" : "top-2 text-sm text-gray-500"} bg-white px-2`}
          >
            Password
          </label>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
          Create Account
        </button>
        <div className="mt-4 flex items-center justify-center">
          <span className="text-gray-600 text-sm">or</span>
          <button className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Sign Up With Google</button>
        </div>
        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
            <span className="ml-1 text-blue-500 cursor-pointer" onClick={handleLoginClick}>
              Log in
            </span>
          </span>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Create;