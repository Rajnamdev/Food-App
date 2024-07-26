import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { CgProfile } from "react-icons/cg";
import { useFirebase } from "./context/Firebase";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const dispatch = useDispatch();
  const { signOutUser } = useFirebase();

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsUserSignedIn(false); // Update the isUserSignedIn state after signing out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserSignedIn(!!user);
    });

    return unsubscribe; // Unsubscribe from the listener on component unmount
  }, []);

  return (
    <nav className="flex flex-col lg:flex-row justify-between py-3 mx-6 mb-10">
      <div>
        {/* Profile section */}
        <div className="ml-4 relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="focus:outline-none"
          >
            <CgProfile className="w-8 h-8 rounded-full" />
          </button>
          <span className="ml-2 text-gray-600 font-semibold">
  {isUserSignedIn ? (
    <span className="ml-2 text-gray-600 font-semibold">Welcome</span>
  ) : (
    <span>
      Please sign in{" "}
      <Link to="/login" className="text-blue-500 cursor-pointer">
        here
      </Link>
    </span>
  )}
</span>
          {/* Slide-in profile section */}
          {isProfileOpen && isUserSignedIn && (
            <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              {/* Profile options */}
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Settings
                </a>
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={handleSignOut}
                >
                  Sign out
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {/* Wrapper for date and profile section */}
          <h3 className="text-xl font-bold text-gray-600">
            {new Date().toUTCString().slice(0, 16)}
          </h3>
        </div>
        <h1 className="text-2xl font-bold ">Flavoro Foods</h1>
       
      </div>

      <div>
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search here"
          autoComplete="off"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="p-3 border border-gray-400 text-sm rounded-lg outline-none w-full lg:w-[25vw]"
        />
      </div>
    </nav>
  );
};

export default Navbar;