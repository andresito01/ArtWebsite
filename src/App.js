import React, { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ThemeSwitcher from "./components/ThemeSwitcher";
//import Home from "./pages/Home.js";
//import AdminLogin from "./authentication/pages/AdminLogin.js";
//import AdminDashboard from "./authentication/pages/AdminDashboard.js";
import ScrollToTop from "./components/ScrollToTop.js";
import Footer from "./components/Footer.js";
import { useStorage } from "./authentication/context/StorageContext.js";
import ProtectedRoute from "./authentication/modules/ProtectedRoute.js";

const Home = lazy(() => wait(1000).then(() => import("./pages/Home.js")));
const AdminLogin = lazy(() =>
  wait(1000).then(() => import("./authentication/pages/AdminLogin.js"))
);
const AdminDashboard = lazy(() =>
  wait(1000).then(() => import("./authentication/pages/AdminDashboard.js"))
);

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { isLoading } = useStorage();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  console.log(isLoading);
  return (
    <div className={`App ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <div className="content-wrap">
        {/* Header */}
        <header className="header">
          <h1 className="headerTitle">Dalia's Portfolio</h1>
          <ThemeSwitcher toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        </header>

        <ScrollToTop />
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                width: "100vw",
              }}
            ></div>
          }
        >
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home isDarkTheme={isDarkTheme} />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export default App;
