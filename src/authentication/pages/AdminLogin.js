import "./styles/AdminLogin.css";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, signIn } = UserAuth();

  const navigate = useNavigate();

  const emptyState = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async () => {
    // Login form validation
    if (email === "" || password === "") {
      setError("Email and password are mandatory.");
      return;
    } else {
      try {
        await signIn(email, password);
        setIsLogged(true);
        emptyState();
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (isLogged && user) {
      console.log("logging");
      return navigate("/admin/dashboard");
    }
    return;
  }, [isLogged, user]);

  return (
    <div className="admin-login" style={{ flexGrow: 1 }}>
      <h2>Admin Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <h3>{error}</h3>}
      </form>
    </div>
  );
};

export default AdminLogin;
