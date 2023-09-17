import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    console.log(
      "Protected Route Check: User Not Logged In Return To Home Page"
    );
    return <Navigate to="/" />;
  } else {
    console.log(
      "Protected Route Check: User Logged In Access To Admin Dashboard Granted"
    );
    return children;
  }
};

export default ProtectedRoute;
