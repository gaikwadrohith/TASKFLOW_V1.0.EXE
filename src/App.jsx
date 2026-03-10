import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Pro from "./pages/Pro";
import Footer from "./components/layout/Footer";

export default function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") === "true");

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={auth ? <Navigate to="/dashboard" /> : <Login setAuth={setAuth} />} />
          <Route path="/register" element={auth ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/dashboard" element={auth ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={auth ? <Tasks setAuth={setAuth} /> : <Navigate to="/login" />} />
          <Route path="/settings" element={auth ? <Settings setAuth={setAuth} /> : <Navigate to="/login" />} />
          <Route path="/about" element={auth ? <About setAuth={setAuth} /> : <Navigate to="/login" />} />
        <Route path="/pro" element={auth ? <Pro setAuth={setAuth} /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}





// git add .
// git commit -m "feat: bento about page + real github/leetcode calendars + pro page full screen + header pro link + nav wired"
// git push origin main