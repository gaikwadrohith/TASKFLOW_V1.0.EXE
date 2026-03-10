import { motion as Motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTerminal, FaGithub, FaLinkedin, FaInstagram,
  FaEnvelope, FaHeart, FaCode, FaArrowUp
} from "react-icons/fa";

const NAV_LINKS = [
  { label: "DASHBOARD", path: "/dashboard" },
  { label: "TASKS",     path: "/tasks" },
  { label: "ABOUT",     path: "/about" },
  { label: "SETTINGS",  path: "/settings" },
];

const SOCIAL_LINKS = [
  { icon: <FaGithub />,    href: "https://github.com/gaikwadrohith",           label: "GITHUB" },
  { icon: <FaLinkedin />,  href: "https://www.linkedin.com/in/gaikwad-rohith/", label: "LINKEDIN" },
  { icon: <FaInstagram />, href: "https://instagram.com/rohittt._gaikwad",      label: "INSTAGRAM" },
  { icon: <FaEnvelope />,  href: "mailto:gaikwadrohith53@gmail.com",            label: "EMAIL" },
];

const STACK = ["REACT 18", "REDUX 5", "VITE 5", "TAILWIND", "FRAMER"];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (["/", "/login", "/register"].includes(location.pathname)) return null;

  return (
    <Motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full border-t-2 border-black mt-auto overflow-hidden"
      style={{ background: "var(--black)", fontFamily: "var(--font)" }}
    >
      {/* ── Top accent bar ── */}
      <div className="flex h-1">
        {["var(--pink)", "var(--pink-dark)", "var(--pink)", "var(--pink-light)", "var(--pink-dark)"].map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Col 1 — Brand */}
          <div className="md:col-span-1">
            <div
              className="flex items-center gap-2 border-2 border-pink-400 px-3 py-2 mb-4 w-fit cursor-pointer hover:bg-pink-400 hover:text-black transition"
              onClick={() => navigate("/dashboard")}
              style={{ borderColor: "var(--pink)" }}
            >
              <FaTerminal style={{ color: "var(--pink)", fontSize: "0.75rem" }} />
              <span className="text-xs font-bold tracking-widest" style={{ color: "var(--pink)" }}>
                TASKFLOW.EXE
              </span>
            </div>

            <p className="text-xs leading-relaxed mb-4" style={{ color: "#777", fontSize: "0.6rem" }}>
              YOUR MINIMAL TASK OPERATING SYSTEM. BUILT TO HELP YOU SHIP MORE AND STRESS LESS.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-7 h-7 border flex items-center justify-center transition hover:border-pink-400 group"
                  style={{ borderColor: "#333", background: "transparent", textDecoration: "none" }}
                >
                  <span className="text-xs transition group-hover:text-pink-400" style={{ color: "#555", fontSize: "0.7rem" }}>
                    {s.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <p className="text-xs font-bold tracking-widest mb-4 pb-2 border-b" style={{ color: "var(--pink)", borderColor: "#222" }}>
              // NAVIGATE
            </p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="text-left text-xs tracking-widest flex items-center gap-2 transition hover:text-pink-400 group w-fit"
                    style={{ color: isActive ? "var(--pink)" : "#666", fontFamily: "var(--font)" }}
                  >
                    <span className="text-xs transition" style={{ color: isActive ? "var(--pink)" : "#333", fontSize: "0.5rem" }}>
                      {isActive ? "●" : "○"}
                    </span>
                    {link.label}
                    {isActive && (
                      <span className="text-xs border px-1" style={{ borderColor: "var(--pink)", color: "var(--pink)", fontSize: "0.45rem" }}>
                        ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Col 3 — Stack */}
          <div>
            <p className="text-xs font-bold tracking-widest mb-4 pb-2 border-b" style={{ color: "var(--pink)", borderColor: "#222" }}>
              // BUILT_WITH
            </p>
            <div className="flex flex-col gap-2">
              {STACK.map((s, i) => (
                <Motion.div
                  key={s}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <span style={{ color: "#333", fontSize: "0.5rem" }}>▶</span>
                  <span className="text-xs tracking-widest" style={{ color: "#666", fontSize: "0.6rem" }}>{s}</span>
                </Motion.div>
              ))}
            </div>

            {/* Mini progress bar decoration */}
            <div className="mt-4">
              <p className="text-xs mb-2" style={{ color: "#444", fontSize: "0.5rem" }}>BUILD_HEALTH</p>
              <div className="w-full h-1.5 border border-gray-700" style={{ background: "#111" }}>
                <Motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "98%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full"
                  style={{ background: "var(--pink)" }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--pink)", fontSize: "0.5rem" }}>98% — ALL SYSTEMS OK</p>
            </div>
          </div>

          {/* Col 4 — Status + Scroll up */}
          <div>
            <p className="text-xs font-bold tracking-widest mb-4 pb-2 border-b" style={{ color: "var(--pink)", borderColor: "#222" }}>
              // SYS_STATUS
            </p>

            <div className="flex flex-col gap-2 mb-5">
              {[
                { label: "AUTH_MODULE",   status: "ONLINE",  ok: true },
                { label: "TASK_ENGINE",   status: "ONLINE",  ok: true },
                { label: "DATA_PERSIST",  status: "ACTIVE",  ok: true },
                { label: "THEME_ENGINE",  status: "RUNNING", ok: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs tracking-widest" style={{ color: "#555", fontSize: "0.52rem" }}>{item.label}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: item.ok ? "#4ade80" : "#dc2626" }} />
                    <span className="text-xs font-bold" style={{ color: item.ok ? "#4ade80" : "#dc2626", fontSize: "0.5rem" }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-2 border py-2 transition hover:border-pink-400 group"
              style={{ borderColor: "#333", background: "transparent" }}
            >
              <FaArrowUp className="text-xs transition group-hover:text-pink-400" style={{ color: "#555" }} />
              <span className="text-xs tracking-widest transition group-hover:text-pink-400" style={{ color: "#555", fontFamily: "var(--font)", fontSize: "0.55rem" }}>
                BACK_TO_TOP
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom status bar ── */}
      <div
        className="border-t px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{ borderColor: "#1a1a1a" }}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs tracking-widest" style={{ color: "#555", fontSize: "0.52rem" }}>SYS.OPERATIONAL</span>
          </div>
          <span className="text-xs tracking-widest" style={{ color: "#333", fontSize: "0.52rem" }}>|</span>
          <span className="text-xs tracking-widest" style={{ color: "#555", fontSize: "0.52rem" }}>
            © {new Date().getFullYear()} TASKFLOW_SYSTEMS
          </span>
        </div>

        {/* Centre — made with love */}
        <div className="flex items-center gap-1.5">
          <FaCode style={{ color: "#444", fontSize: "0.6rem" }} />
          <span className="text-xs tracking-widest" style={{ color: "#444", fontSize: "0.52rem" }}>CRAFTED WITH</span>
          <Motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaHeart style={{ color: "var(--pink)", fontSize: "0.6rem" }} />
          </Motion.span>
          <span className="text-xs tracking-widest" style={{ color: "#444", fontSize: "0.52rem" }}>BY ROHIT_GAIKWAD</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {["PRIVACY", "TERMS", "SUPPORT"].map((l) => (
            <span
              key={l}
              className="text-xs tracking-widest cursor-pointer hover:underline transition"
              style={{ color: "#444", fontSize: "0.52rem" }}
            >
              {l}
            </span>
          ))}
          <span className="text-xs tracking-widest" style={{ color: "#333", fontSize: "0.52rem" }}>
            v1.0.0
          </span>
        </div>
      </div>
    </Motion.footer>
  );
}
