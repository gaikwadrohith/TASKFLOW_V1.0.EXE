import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { FaTerminal, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">

      {/* OS Window */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-lg"
        style={{ fontFamily: "var(--font)" }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-4 py-2 border-2 border-b-0"
          style={{ background: "var(--pink)", borderColor: "var(--black)" }}
        >
          <div className="flex items-center gap-2">
            <FaTerminal style={{ fontSize: "0.75rem" }} />
            <span className="text-xs font-bold tracking-widest">TASKFLOW_V1.0.EXE</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
            <span className="w-3 h-3 rounded-full bg-green-400 border border-black" />
            <span className="w-3 h-3 rounded-full bg-red-400 border border-black" />
          </div>
        </div>

        {/* Window Body */}
        <div
          className="border-2 p-10 text-center"
          style={{ background: "var(--white)", borderColor: "var(--black)" }}
        >
          {/* Icon */}
          <Motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 border-2 border-black flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--white)" }}
          >
            <FaTerminal className="text-2xl" />
          </Motion.div>

          <Motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-3xl font-bold tracking-tight mb-2"
            style={{ fontStyle: "italic", letterSpacing: "-0.02em" }}
          >
            TASKFLOW
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-gray-500 mb-8 tracking-widest"
          >
            YOUR MINIMAL TASK OPERATING SYSTEM
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col gap-3"
          >
            <Link
              to="/login"
              className="flex items-center justify-between border-2 border-black px-5 py-3 font-bold text-sm tracking-widest hover:bg-black hover:text-white transition-all group"
              style={{ background: "var(--pink)" }}
            >
              <span>SIGN_IN.EXE</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/register"
              className="flex items-center justify-between border-2 border-black px-5 py-3 font-bold text-sm tracking-widest hover:bg-black hover:text-white transition-all group"
              style={{ background: "var(--white)" }}
            >
              <span>REGISTER.EXE</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </Motion.div>
        </div></Motion.div>
    </div>
  );
}