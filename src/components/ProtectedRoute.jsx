// ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useFirebase } from "./context/Firebase";

const ProtectedRoute = ({ element }) => {
  const { isUserSignedIn } = useFirebase();
  const cartItems = useSelector((state) => state.cart.cart);

  if (!isUserSignedIn()) {
    return <Navigate to="/login" />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;