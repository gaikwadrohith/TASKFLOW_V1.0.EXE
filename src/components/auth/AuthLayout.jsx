import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTerminal } from "react-icons/fa";

export default function AuthLayout({ title, subtitle, children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <Motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
        style={{ fontFamily: "var(--font)" }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-4 py-2 border-2 border-b-0"
          style={{ background: "var(--pink)", borderColor: "var(--black)" }}
        >
          <div className="flex items-center gap-2">
            <FaTerminal style={{ fontSize: "0.7rem" }} />
            <span className="text-xs font-bold tracking-widest">{title}.EXE</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-xs font-bold hover:bg-black hover:text-white px-2 py-0.5 transition border border-black"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div
          className="border-2 border-b-0 px-8 py-8"
          style={{ background: "var(--white)", borderColor: "var(--black)" }}
        >
          {/* Icon */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 border-2 border-black flex items-center justify-center mb-3">
              <FaTerminal className="text-xl" />
            </div>
            <h2 className="text-xl font-bold tracking-tight" style={{ fontStyle: "italic" }}>
              {title === "LOGIN" ? "WELCOME BACK" : "CREATE ACCOUNT"}
            </h2>
            <p className="text-xs text-gray-400 tracking-widest mt-1">
              {subtitle || "SECURE ACCESS TO YOUR WORKSPACE"}
            </p>
          </div>

          {children}
        </div>

        {/* Status Bar */}
        <div
          className="border-2 border-t px-4 py-1.5 flex justify-between"
          style={{ background: "var(--black)", borderColor: "var(--black)" }}
        >
          <span className="text-xs tracking-widest" style={{ color: "var(--pink)" }}>
            AWAITING_INPUT
          </span>
          <span className="text-xs" style={{ color: "var(--gray)" }}>
            TASKFLOW_AUTH
          </span>
        </div>
      </Motion.div>
    </div>
  );
}