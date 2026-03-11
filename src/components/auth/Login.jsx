import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";
import AuthLayout from "./AuthLayout";
import api from "../../services/api";
import { FaAt, FaLock, FaArrowRight, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

function Field({ name, type, placeholder, icon, formik, toggleShow, showPassword }) {
  return (
    <div className="mb-4">
      <label className="text-xs tracking-widest text-gray-500 block mb-1">{name.toUpperCase()}</label>
      <div className="flex items-center border-2 border-black bg-white focus-within:border-pink-400 transition-colors">
        <span className="px-3 text-gray-400 text-xs border-r-2 border-black py-3">{icon}</span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="flex-1 px-3 py-3 outline-none text-sm bg-transparent"
          style={{ fontFamily: "var(--font)" }}
        />
        {toggleShow && (
          <button type="button" onClick={toggleShow} className="px-3 text-gray-400 hover:text-black transition border-l-2 border-black py-3">
            {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
          </button>
        )}
      </div>
      {formik.touched[name] && formik.errors[name] && <p className="text-red-500 text-xs mt-1 tracking-widest">&gt; {formik.errors[name]}</p>}
    </div>
  );
}

export default function Login({ setAuth }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [serverStatus, setServerStatus] = useState("waking");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("INVALID EMAIL").required("REQUIRED"),
      password: Yup.string().min(6, "MIN 6 CHARS").required("REQUIRED"),
    }),
    onSubmit: async (values) => {
      try {
        // Hardcoded demo account — always works even if db resets
        if (values.email === "devid123@gmail.com" && values.password === "dev@123") {
          const demoUser = { id: "dummy-user-001", name: "DEV USER", email: "devid123@gmail.com" };
          localStorage.setItem("user", JSON.stringify(demoUser));
          localStorage.setItem("auth", "true");
          if (remember) {
            localStorage.setItem("remembered_email", values.email);
          } else {
            localStorage.removeItem("remembered_email");
          }
          if (setAuth) setAuth(true);
          navigate("/dashboard");
          return;
        }

        const response = await api.get("/users");
        const user = response.data.find((u) => u.email === values.email && u.password === values.password);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("auth", "true");
          if (remember) {
            localStorage.setItem("remembered_email", values.email);
          } else {
            localStorage.removeItem("remembered_email");
          }
          if (setAuth) setAuth(true);
          navigate("/dashboard");
        } else {
          alert("INVALID CREDENTIALS");
        }
      } catch {
        alert("SERVER_UNAVAILABLE — TRY AGAIN IN 30 SECONDS");
      }
    },
  });

  useEffect(() => {
    const remembered = localStorage.getItem("remembered_email");
    if (remembered) {
      setTimeout(() => {
        formik.setFieldValue("email", remembered);
        setRemember(true);
      }, 0);
    }

    api
      .get("/users")
      .then(() => setServerStatus("ready"))
      .catch(() => setServerStatus("error"));
  }, []);

  const getStrength = (pwd) => {
    if (!pwd) return null;
    if (pwd.length < 6) return { label: "WEAK", color: "#dc2626", width: "25%" };
    if (pwd.length < 8) return { label: "FAIR", color: "#ca8a04", width: "50%" };
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/)) return { label: "STRONG", color: "#16a34a", width: "100%" };
    return { label: "GOOD", color: "#2563eb", width: "75%" };
  };

  const strength = getStrength(formik.values.password);
  const isDemoUser = formik.values.email === "devid123@gmail.com";

  return (
    <AuthLayout title="LOGIN">
      <Motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {/* Security badge */}
        <div className="flex items-center gap-2 border-2 border-black px-3 py-2 mb-3" style={{ background: "#f0fdf4" }}>
          <FaShieldAlt className="text-green-600 text-xs" />
          <span className="text-xs tracking-widest text-green-700 font-bold">SECURE_CONNECTION_ACTIVE</span>
          <span className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        {/* Server status */}
        <div
          className="flex items-center gap-2 border-2 border-black px-3 py-2 mb-5"
          style={{
            background: serverStatus === "ready" ? "#f0fdf4" : serverStatus === "error" ? "#fef2f2" : "#fefce8",
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
            style={{
              background: serverStatus === "ready" ? "#16a34a" : serverStatus === "error" ? "#dc2626" : "#ca8a04",
            }}
          />
          <span
            className="text-xs tracking-widest font-bold"
            style={{
              color: serverStatus === "ready" ? "#16a34a" : serverStatus === "error" ? "#dc2626" : "#ca8a04",
            }}
          >
            {serverStatus === "ready" && "SERVER_ONLINE — READY TO LOGIN"}
            {serverStatus === "waking" && "SERVER_WAKING_UP — PLEASE WAIT..."}
            {serverStatus === "error" && "SERVER_OFFLINE — RETRY IN 30s"}
          </span>
        </div>

        <Field name="email" type="email" placeholder="name@example.com" icon={<FaAt />} formik={formik} />

        <Field
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          icon={<FaLock />}
          formik={formik}
          toggleShow={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
        />

        {strength && (
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 -mt-2">
            <div className="flex justify-between mb-1">
              <span className="text-xs tracking-widest text-gray-400">PWD_STRENGTH</span>
              <span className="text-xs font-bold tracking-widest" style={{ color: strength.color }}>
                {strength.label}
              </span>
            </div>
            <div className="w-full h-1.5 border border-black" style={{ background: "#f0f0f0" }}>
              <Motion.div initial={{ width: 0 }} animate={{ width: strength.width }} transition={{ duration: 0.4 }} className="h-full" style={{ background: strength.color }} />
            </div>
          </Motion.div>
        )}

        <div className="flex items-center gap-2 mb-5">
          <button
            type="button"
            onClick={() => setRemember(!remember)}
            className="w-5 h-5 border-2 border-black flex items-center justify-center flex-shrink-0 transition"
            style={{ background: remember ? "var(--black)" : "transparent" }}
          >
            {remember && <span style={{ color: "white", fontSize: "0.5rem" }}>✓</span>}
          </button>
          <span className="text-xs tracking-widest text-gray-500">REMEMBER_THIS_DEVICE</span>
        </div>

        <button
          type="button"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting || (serverStatus === "waking" && !isDemoUser)}
          className="w-full flex items-center justify-between border-2 border-black px-5 py-3 font-bold text-sm tracking-widest hover:bg-black hover:text-white transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "var(--pink)" }}
        >
          <span>{formik.isSubmitting ? "AUTHENTICATING..." : serverStatus === "waking" && !isDemoUser ? "WAITING_FOR_SERVER..." : "SIGN_IN"}</span>
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 border-t border-black" />
          <span className="text-xs tracking-widest text-gray-400">OR_CONTINUE_WITH</span>
          <div className="flex-1 border-t border-black" />
        </div>

        <div className="flex gap-2 mb-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-black py-2 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition"
            onClick={() => alert("GOOGLE_AUTH — NOT CONFIGURED")}
          >
            <span>G</span> GOOGLE
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-black py-2 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition"
            onClick={() => alert("GITHUB_AUTH — NOT CONFIGURED")}
          >
            <span>⌥</span> GITHUB
          </button>
        </div>

        <p className="text-xs text-center tracking-widest text-gray-400">
          NO ACCOUNT?{" "}
          <Link to="/register" className="font-bold text-black hover:underline">
            REGISTER.EXE
          </Link>
        </p>
      </Motion.div>
    </AuthLayout>
  );
}
