import { motion as Motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaListUl, FaCog, FaSignOutAlt, FaTerminal, FaUser, FaCrown } from "react-icons/fa";

export default function Header({ setAuth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    if (setAuth) setAuth(false);
    navigate("/login");
  };

  const navLinks = [
    { label: "DASHBOARD", path: "/dashboard", icon: <FaHome /> },
    { label: "TASKS", path: "/tasks", icon: <FaListUl /> },
    { label: "ABOUT", path: "/about", icon: <FaUser /> },
    { label: "SETTINGS", path: "/settings", icon: <FaCog /> },
    { label: "PRO_MODE", path: "/pro", icon: <FaCrown /> },
  ];

  return (
    <>
      <Motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full border-b-2 border-black px-5 py-2 flex items-center justify-between"
        style={{ background: "var(--white)", fontFamily: "var(--font)" }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={() => setOpenSidebar(true)} className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition">
            <FaBars className="text-xs" />
          </button>

          <div
            className="flex items-center gap-2 border-2 border-black px-3 py-1 cursor-pointer hover:bg-black hover:text-white transition"
            onClick={() => navigate("/dashboard")}
            style={{ background: "var(--pink)" }}
          >
            <FaTerminal className="text-xs" />
            <span className="text-xs font-bold tracking-widest">TASKFLOW.EXE</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 border-2 border-black px-3 py-1">
            <span className="text-xs tracking-widest font-bold">USER: {user?.name?.toUpperCase() || "UNKNOWN"}</span>
          </div>

          <button
            onClick={() => navigate("/pro")}
            className="flex items-center gap-1.5 border-2 border-black px-2 py-1 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition"
            style={{ background: "var(--pink)" }}
          >
            <FaCrown style={{ fontSize: "0.65rem" }} />
            PRO_MODE
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border-2 border-black px-3 py-1 text-xs font-bold tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            style={{ background: "var(--white)" }}
          >
            <FaSignOutAlt className="text-xs" />
            <span className="hidden sm:block">EXIT</span>
          </button>
        </div>
      </Motion.header>

      {/* Sidebar */}
      <AnimatePresence>
        {openSidebar && (
          <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setOpenSidebar(false)}>
            <Motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.22 }}
              className="h-full w-64 border-r-2 border-black flex flex-col"
              style={{ background: "var(--white)", fontFamily: "var(--font)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sidebar Title Bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b-2 border-black" style={{ background: "var(--pink)" }}>
                <div className="flex items-center gap-2">
                  <FaTerminal className="text-xs" />
                  <span className="text-xs font-bold tracking-widest">NAV_MENU.EXE</span>
                </div>
                <button onClick={() => setOpenSidebar(false)} className="w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition text-xs">
                  <FaTimes />
                </button>
              </div>

              {/* User Info */}
              <div className="px-4 py-4 border-b-2 border-black" style={{ background: "#fafafa" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-2 border-black flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "var(--pink)" }}>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest">{user?.name?.toUpperCase() || "USER"}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[130px]">{user?.email || ""}</p>
                  </div>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 p-3 space-y-1">
                <p className="text-xs text-gray-400 tracking-widest px-2 py-2">// NAVIGATE</p>
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  const isPro = link.path === "/pro";
                  return (
                    <Motion.button
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => {
                        navigate(link.path);
                        setOpenSidebar(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 border-2 text-xs font-bold tracking-widest transition text-left"
                      style={{
                        borderColor: isActive ? "var(--black)" : isPro ? "var(--pink)" : "transparent",
                        background: isActive ? "var(--black)" : isPro ? "var(--pink)" : "transparent",
                        color: isActive ? "var(--white)" : "var(--black)",
                      }}
                    >
                      <span
                        className="w-6 h-6 border flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: isActive ? "var(--white)" : "var(--black)",
                          fontSize: "0.65rem",
                        }}
                      >
                        {link.icon}
                      </span>
                      {link.label}
                      {isActive && <span className="ml-auto text-xs">●</span>}
                      {isPro && !isActive && (
                        <span className="ml-auto text-xs font-bold tracking-widest" style={{ fontSize: "0.48rem" }}>
                          NEW
                        </span>
                      )}
                    </Motion.button>
                  );
                })}
              </nav>

              {/* Bottom */}
              <div className="p-3 border-t-2 border-black">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 border-2 border-black text-xs font-bold tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition"
                >
                  <span className="w-6 h-6 border border-black flex items-center justify-center flex-shrink-0" style={{ fontSize: "0.65rem" }}>
                    <FaSignOutAlt />
                  </span>
                  LOGOUT.EXE
                </button>
                <p className="text-xs text-gray-400 tracking-widest text-center mt-3">SYS.V1.0 © {new Date().getFullYear()}</p>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
