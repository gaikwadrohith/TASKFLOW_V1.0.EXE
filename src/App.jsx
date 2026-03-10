import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Pro from "./pages/Pro";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Footer from "./components/layout/Footer";

function AppRoutes({ auth, setAuth }) {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            auth ? <Navigate to="/dashboard" /> : <Login setAuth={setAuth} />
          }
        />

        <Route
          path="/register"
          element={auth ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={auth ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
        />

        <Route
          path="/tasks"
          element={auth ? <Tasks setAuth={setAuth} /> : <Navigate to="/login" />}
        />

        <Route
          path="/settings"
          element={auth ? <Settings setAuth={setAuth} /> : <Navigate to="/login" />}
        />

        <Route
          path="/about"
          element={auth ? <About setAuth={setAuth} /> : <Navigate to="/login" />}
        />

        <Route
          path="/pro"
          element={auth ? <Pro setAuth={setAuth} /> : <Navigate to="/login" />}
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") === "true");

  return (
    <BrowserRouter>
      <AppRoutes auth={auth} setAuth={setAuth} />
    </BrowserRouter>
  );
}