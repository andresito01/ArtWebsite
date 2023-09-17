import "./styles/Footer.css";
import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../authentication/context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { user, signOut } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer>
      {user ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/admin/dashboard">Admin Dashboard</Link>
          <Link to="/admin/login" onClick={handleLogout}>
            Admin Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/admin/login">Admin Login</Link>
        </>
      )}
    </footer>
  );
};

export default Footer;
