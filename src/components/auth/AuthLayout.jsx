import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTerminal, FaLock, FaShieldAlt, FaCode, FaDatabase, FaWifi, FaBolt, FaCrosshairs } from "react-icons/fa";

// ── Left decorative panel ──────────────────────────────────────────────────
function LeftPanel() {
  const lines = [
    { text: "INITIALIZING...",     color: "#aaa",          delay: 0 },
    { text: "LOADING AUTH...",     color: "#aaa",          delay: 0.3 },
    { text: "[OK] ENCRYPTION",     color: "#4ade80",       delay: 0.6 },
    { text: "[OK] FIREWALL",       color: "#4ade80",       delay: 0.9 },
    { text: "[OK] SESSION",        color: "#4ade80",       delay: 1.2 },
    { text: "[OK] DATABASE",       color: "#4ade80",       delay: 1.5 },
    { text: "READY FOR INPUT_",    color: "var(--pink)",   delay: 1.8 },
  ];

  const stats = [
    { icon: <FaShieldAlt />, label: "ENCRYPTION",  value: "AES-256",  color: "#4ade80" },
    { icon: <FaDatabase />,  label: "DATABASE",    value: "SECURE",   color: "#60a5fa" },
    { icon: <FaWifi />,      label: "CONNECTION",  value: "ACTIVE",   color: "#4ade80" },
    { icon: <FaLock />,      label: "AUTH",        value: "2FA_READY",color: "var(--pink)" },
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="hidden lg:flex flex-col gap-4 w-56 flex-shrink-0"
      style={{ fontFamily: "var(--font)" }}
    >
      {/* Terminal boot log */}
      <div className="border-2 border-black overflow-hidden" style={{ background: "var(--black)" }}>
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="text-xs ml-2 tracking-widest" style={{ color: "#555", fontSize: "0.5rem" }}>BOOT_LOG.SYS</span>
        </div>
        <div className="p-4">
          {lines.map((line) => (
            <Motion.p
              key={line.text}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: line.delay, duration: 0.3 }}
              className="text-xs mb-1 font-bold tracking-widest"
              style={{ color: line.color, fontSize: "0.58rem" }}
            >
              {line.text}
            </Motion.p>
          ))}
          <Motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-xs font-bold"
            style={{ color: "var(--pink)", fontSize: "0.58rem" }}
          >
            █
          </Motion.span>
        </div>
      </div>

      {/* System status cards */}
      <div className="border-2 border-black" style={{ background: "var(--white)" }}>
        <div className="px-3 py-2 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
          SYS_STATUS.EXE
        </div>
        <div className="p-3 flex flex-col gap-2">
          {stats.map((s, i) => (
            <Motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-2 border border-black px-2 py-1.5"
              style={{ background: "#fafafa" }}
            >
              <span style={{ color: s.color, fontSize: "0.65rem" }}>{s.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs tracking-widest" style={{ fontSize: "0.48rem", color: "var(--gray)" }}>{s.label}</p>
                <p className="text-xs font-bold tracking-widest" style={{ fontSize: "0.55rem", color: s.color }}>{s.value}</p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: s.color }} />
            </Motion.div>
          ))}
        </div>
      </div>

      {/* ASCII art decoration */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="border-2 border-black p-4"
        style={{ background: "var(--black)" }}
      >
        <pre className="text-xs leading-tight text-center" style={{ color: "var(--pink)", fontSize: "0.5rem" }}>
{`╔═══════════╗
║ TASKFLOW  ║
║  v1.0.EXE ║
║           ║
║  ███████  ║
║  █ SYS █  ║
║  ███████  ║
╚═══════════╝`}
        </pre>
      </Motion.div>

      {/* Dot matrix pattern */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="border-2 border-black p-3"
        style={{ background: "var(--white)" }}
      >
        <p className="text-xs tracking-widest mb-2" style={{ color: "var(--gray)", fontSize: "0.5rem" }}>AUTH_MATRIX</p>
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(8, 1fr)" }}>
          {Array.from({ length: 40 }).map((_, i) => {
            const seed = ((i * 1664525 + 1013904223) >>> 0) % 100;
            return (
              <Motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4 + i * 0.02 }}
                className="aspect-square border border-black"
                style={{
                  background: seed > 75 ? "var(--pink)" : seed > 50 ? "var(--pink-light)" : seed > 25 ? "var(--black)" : "transparent",
                }}
              />
            );
          })}
        </div>
      </Motion.div>
    </Motion.div>
  );
}

// ── Right decorative panel ─────────────────────────────────────────────────
function RightPanel() {
  const features = [
    { icon: <FaLock />,       title: "ENCRYPTED", desc: "ALL DATA STORED SECURELY" },
    { icon: <FaBolt />,       title: "FAST",       desc: "INSTANT TASK SYNC" },
    { icon: <FaCrosshairs />, title: "FOCUSED",    desc: "DISTRACTION-FREE UI" },
    { icon: <FaDatabase />,   title: "PERSISTED",  desc: "NEVER LOSE YOUR TASKS" },
  ];

  const tips = [
    "USE STRONG PASSWORDS",
    "ENABLE REMEMBER ME",
    "KEEP EMAIL UPDATED",
    "LOGOUT WHEN DONE",
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="hidden lg:flex flex-col gap-4 w-56 flex-shrink-0"
      style={{ fontFamily: "var(--font)" }}
    >
      {/* App features */}
      <div className="border-2 border-black" style={{ background: "var(--white)" }}>
        <div className="px-3 py-2 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
          FEATURES.TXT
        </div>
        <div className="p-3 flex flex-col gap-2">
          {features.map((f, i) => (
            <Motion.div
              key={f.title}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className="flex items-start gap-2 border border-black px-2 py-2"
              style={{ background: "#fafafa" }}
            >
              <span className="text-sm flex-shrink-0">{f.icon}</span>
              <div>
                <p className="text-xs font-bold tracking-widest" style={{ fontSize: "0.55rem", color: "var(--black)" }}>{f.title}</p>
                <p className="text-xs" style={{ fontSize: "0.48rem", color: "var(--gray)" }}>{f.desc}</p>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>

      {/* Security tips */}
      <div className="border-2 border-black" style={{ background: "var(--black)" }}>
        <div className="px-3 py-2 border-b border-gray-700 text-xs font-bold tracking-widest" style={{ color: "var(--pink)" }}>
          SEC_TIPS.LOG
        </div>
        <div className="p-3">
          {tips.map((tip, i) => (
            <Motion.div
              key={tip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="flex items-center gap-2 mb-2 last:mb-0"
            >
              <span className="text-xs flex-shrink-0" style={{ color: "#4ade80", fontSize: "0.55rem" }}>▶</span>
              <span className="text-xs tracking-widest" style={{ color: "#aaa", fontSize: "0.52rem" }}>{tip}</span>
            </Motion.div>
          ))}
        </div>
      </div>

      {/* Waveform / activity decoration */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="border-2 border-black p-3"
        style={{ background: "var(--white)" }}
      >
        <p className="text-xs tracking-widest mb-3" style={{ color: "var(--gray)", fontSize: "0.5rem" }}>ACTIVITY_WAVE</p>
        <div className="flex items-end gap-0.5 h-10">
          {[4, 7, 3, 9, 5, 8, 2, 6, 10, 4, 7, 3, 8, 5, 9, 3, 6, 8, 4, 7].map((h, i) => (
            <Motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h * 10}%` }}
              transition={{ delay: 1.0 + i * 0.05, duration: 0.4, ease: "easeOut" }}
              className="flex-1 border border-black"
              style={{ background: i % 3 === 0 ? "var(--pink)" : i % 5 === 0 ? "var(--black)" : "var(--pink-light)" }}
            />
          ))}
        </div>
        <p className="text-xs mt-2 text-center" style={{ color: "var(--gray)", fontSize: "0.48rem" }}>LIVE_SESSIONS</p>
      </Motion.div>

      {/* Version info */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="border-2 border-black p-3"
        style={{ background: "var(--pink)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <FaCode style={{ fontSize: "0.75rem" }} />
          <span className="text-xs font-bold tracking-widest" style={{ fontSize: "0.6rem" }}>TASKFLOW_V1.0</span>
        </div>
        <p className="text-xs tracking-widest leading-relaxed" style={{ color: "var(--black)", fontSize: "0.5rem", opacity: 0.7 }}>
          YOUR MINIMAL TASK OPERATING SYSTEM. BUILT WITH REACT + REDUX.
        </p>
        <div className="mt-2 flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold tracking-widest" style={{ fontSize: "0.48rem" }}>ALL SYSTEMS OPERATIONAL</span>
        </div>
      </Motion.div>
    </Motion.div>
  );
}

// ── Main AuthLayout ────────────────────────────────────────────────────────
export default function AuthLayout({ title, subtitle, children }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ fontFamily: "var(--font)" }}
    >
      {/* Three-column: left panel | form | right panel */}
      <div className="flex items-center gap-8 w-full max-w-5xl">

        <LeftPanel />

        {/* Centre — the actual auth form */}
        <Motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md flex-shrink-0 mx-auto"
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
            {/* Window buttons */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
              <span className="w-3 h-3 rounded-full bg-green-400 border border-black" />
              <button
                onClick={() => navigate("/")}
                className="w-5 h-5 rounded-full bg-red-400 border border-black flex items-center justify-center text-xs font-bold hover:bg-red-600 transition"
                style={{ fontSize: "0.45rem" }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div
            className="border-2 border-b-0 px-8 py-8"
            style={{ background: "var(--white)", borderColor: "var(--black)" }}
          >
            {/* Icon + heading */}
            <div className="flex flex-col items-center mb-6">
              <Motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-14 h-14 border-2 border-black flex items-center justify-center mb-3"
                style={{ background: "var(--pink)" }}
              >
                <FaTerminal className="text-xl" />
              </Motion.div>
              <h2 className="text-xl font-bold tracking-tight" style={{ fontStyle: "italic", color: "var(--black)" }}>
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
            className="border-2 border-t px-4 py-1.5 flex justify-between items-center"
            style={{ background: "var(--black)", borderColor: "var(--black)" }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs tracking-widest" style={{ color: "var(--pink)", fontSize: "0.6rem" }}>
                AWAITING_INPUT
              </span>
            </div>
            <span className="text-xs tracking-widest" style={{ color: "var(--gray)", fontSize: "0.6rem" }}>
              TASKFLOW_AUTH_v1.0
            </span>
          </div>
        </Motion.div>

        <RightPanel />
      </div>
    </div>
  );
}
