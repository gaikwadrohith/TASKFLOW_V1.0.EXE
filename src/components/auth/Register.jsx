import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";
import AuthLayout from "./AuthLayout";
import api from "../../services/api";
import { FaUser, FaAt, FaLock, FaArrowRight, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";

function Field({ name, type, placeholder, icon, formik, toggleShow, showPassword }) {
  const label = name === "confirmPassword" ? "CONFIRM_PASSWORD" : name.toUpperCase();
  return (
    <div className="mb-4">
      <label className="text-xs tracking-widest text-gray-500 block mb-1">{label}</label>
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

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "MIN 3 CHARS").required("REQUIRED"),
      email: Yup.string().email("INVALID EMAIL").required("REQUIRED"),
      password: Yup.string().min(6, "MIN 6 CHARS").required("REQUIRED"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "PASSWORDS MUST MATCH")
        .required("REQUIRED"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await api.get("/users");
        if (res.data.find((u) => u.email === values.email)) {
          alert("EMAIL ALREADY REGISTERED");
          return;
        }
        await api.post("/users", {
          id: crypto.randomUUID(),
          name: values.name,
          email: values.email,
          password: values.password,
        });
        alert("ACCOUNT CREATED — SIGN IN NOW");
        navigate("/login");
      } catch {
        alert("CONNECTION ERROR — IS SERVER RUNNING?");
      }
    },
  });

  const getStrength = (pwd) => {
    if (!pwd) return null;
    if (pwd.length < 6) return { label: "WEAK", color: "#dc2626", width: "25%" };
    if (pwd.length < 8) return { label: "FAIR", color: "#ca8a04", width: "50%" };
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/)) return { label: "STRONG", color: "#16a34a", width: "100%" };
    return { label: "GOOD", color: "#2563eb", width: "75%" };
  };

  const strength = getStrength(formik.values.password);

  const pwd = formik.values.password;
  const checks = [
    { label: "MIN 6 CHARACTERS", pass: pwd.length >= 6 },
    { label: "UPPERCASE LETTER", pass: /[A-Z]/.test(pwd) },
    { label: "NUMBER INCLUDED", pass: /[0-9]/.test(pwd) },
    { label: "PASSWORDS MATCH", pass: pwd && pwd === formik.values.confirmPassword },
  ];

  return (
    <AuthLayout title="REGISTER">
      <Motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center gap-2 border-2 border-black px-3 py-2 mb-5" style={{ background: "#f0fdf4" }}>
          <FaShieldAlt className="text-green-600 text-xs" />
          <span className="text-xs tracking-widest text-green-700 font-bold">SECURE_REGISTRATION</span>
          <span className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        <Field name="name" type="text" placeholder="John Doe" icon={<FaUser />} formik={formik} />
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

        <Field
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          placeholder="••••••••"
          icon={<FaLock />}
          formik={formik}
          toggleShow={() => setShowConfirm(!showConfirm)}
          showPassword={showConfirm}
        />

        {pwd && (
          <Motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="border-2 border-black p-3 mb-4 -mt-2" style={{ background: "#fafafa" }}>
            <p className="text-xs tracking-widest text-gray-400 mb-2">PWD_REQUIREMENTS</p>
            {checks.map((c) => (
              <div key={c.label} className="flex items-center gap-2 mb-1">
                <span
                  className="w-4 h-4 border border-black flex items-center justify-center flex-shrink-0"
                  style={{ background: c.pass ? "#16a34a" : "transparent", fontSize: "0.5rem", color: "white" }}
                >
                  {c.pass ? "✓" : ""}
                </span>
                <span className="text-xs tracking-widest" style={{ color: c.pass ? "#16a34a" : "#9ca3af" }}>
                  {c.label}
                </span>
              </div>
            ))}
          </Motion.div>
        )}

        <button
          type="button"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
          className="w-full flex items-center justify-between border-2 border-black px-5 py-3 font-bold text-sm tracking-widest hover:bg-black hover:text-white transition-all group"
          style={{ background: "var(--pink)" }}
        >
          <span>{formik.isSubmitting ? "CREATING..." : "CREATE_ACCOUNT"}</span>
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 border-t border-black" />
          <span className="text-xs tracking-widest text-gray-400">OR_SIGN_UP_WITH</span>
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
          HAVE ACCOUNT?{" "}
          <Link to="/login" className="font-bold text-black hover:underline">
            LOGIN.EXE
          </Link>
        </p>
      </Motion.div>
    </AuthLayout>
  );
}
