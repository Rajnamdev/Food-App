import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Success from "./pages/Success";
import Success from "./pages/Success";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Create from "./components/auth/Create";
import Login from "./components/auth/Login"
import AddressForm from "./components/AddressForm";


const App = () => {
  return (

    <BrowserRouter>
      <Routes>
      
      <Route path="/signup" element={<Create />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/address" element={<ProtectedRoute element={<AddressForm />} />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/success"
          element={<ProtectedRoute element={<Success />} />}
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;