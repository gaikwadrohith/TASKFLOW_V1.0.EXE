import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/layout/Header";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  FaCrown,
  FaBolt,
  FaLock,
  FaCheck,
  FaArrowRight,
  FaCalendarAlt,
  FaTags,
  FaListUl,
  FaEdit,
  FaGripVertical,
  FaRedo,
  FaColumns,
  FaSearch,
  FaFolder,
  FaFire,
  FaChartBar,
  FaClock,
  FaCloud,
  FaMobileAlt,
  FaStar,
  FaShieldAlt,
  FaCode,
  FaTimes,
  FaInfinity,
} from "react-icons/fa";

const FREE_FEATURES = [
  "Add tasks with priority (low / med / high)",
  "Toggle complete & delete",
  "Filter: All / Active / Done",
  "Clear completed tasks",
  "5 colour themes",
  "Export & import JSON",
  "Basic stats dashboard",
];

const PRO_FEATURES = [
  { icon: <FaCalendarAlt />, color: "#2563eb", title: "DUE_DATES", desc: "Deadlines on any task. Overdue tasks glow red.", tag: "POPULAR" },
  { icon: <FaTags />, color: "#7c3aed", title: "TAGS_&_LABELS", desc: "Custom colour tags — #work, #personal, #urgent.", tag: "NEW" },
  { icon: <FaListUl />, color: "#0d9488", title: "SUBTASKS", desc: "Nested checklists inside any task.", tag: null },
  { icon: <FaEdit />, color: "#ca8a04", title: "EDIT_TASKS", desc: "Edit text, priority, tags or due date inline.", tag: "POPULAR" },
  { icon: <FaGripVertical />, color: "#dc2626", title: "DRAG_TO_REORDER", desc: "Drag and drop to manually sort your list.", tag: null },
  { icon: <FaRedo />, color: "#16a34a", title: "RECURRING_TASKS", desc: "Daily, weekly or monthly repeat tasks.", tag: "NEW" },
  { icon: <FaColumns />, color: "#0ea5e9", title: "KANBAN_BOARD", desc: "TODO / IN PROGRESS / DONE column view.", tag: "POPULAR" },
  { icon: <FaCalendarAlt />, color: "#e11d48", title: "CALENDAR_VIEW", desc: "Tasks mapped on a calendar by due date.", tag: null },
  { icon: <FaSearch />, color: "#6d28d9", title: "GLOBAL_SEARCH", desc: "Full-text search across all tasks instantly.", tag: null },
  { icon: <FaFolder />, color: "#b45309", title: "PROJECTS", desc: "Group tasks into named projects.", tag: "NEW" },
  { icon: <FaFire />, color: "#dc2626", title: "STREAK_TRACKER", desc: "Days in a row completing tasks.", tag: null },
  { icon: <FaChartBar />, color: "#0891b2", title: "PRODUCTIVITY_CHARTS", desc: "Tasks completed per day/week as charts.", tag: "POPULAR" },
  { icon: <FaClock />, color: "#7c3aed", title: "POMODORO_TIMER", desc: "Built-in 25/5 min focus timer per task.", tag: "NEW" },
  { icon: <FaCloud />, color: "#2563eb", title: "CLOUD_SYNC", desc: "Tasks in the cloud, not just localStorage.", tag: "POPULAR" },
  { icon: <FaMobileAlt />, color: "#16a34a", title: "MULTI_DEVICE", desc: "Access from any device, changes sync in real time.", tag: null },
];

const PLANS = [
  {
    key: "FREE",
    label: "FREE",
    price: "0",
    period: "FOREVER",
    headerBg: "var(--pink-light)",
    labelColor: "var(--black)",
    features: ["5 themes", "Basic stats", "Export JSON", "100 tasks max"],
    cta: "CURRENT_PLAN",
    disabled: true,
  },
  {
    key: "PRO",
    label: "PRO",
    price: "299",
    period: "/ MONTH",
    headerBg: "var(--pink)",
    labelColor: "var(--black)",
    badge: "MOST_POPULAR",
    features: ["Everything in Free", "All 15 Pro features", "Unlimited tasks", "Priority support"],
    cta: "UPGRADE_NOW",
    disabled: false,
  },
  {
    key: "LIFETIME",
    label: "LIFETIME",
    price: "1999",
    period: "ONE_TIME",
    headerBg: "var(--black)",
    labelColor: "var(--pink)",
    features: ["Everything in Pro", "All future features", "Lifetime updates", "Early access"],
    cta: "BUY_ONCE",
    disabled: false,
  },
];

export default function Pro({ setAuth }) {
  const { tasks } = useSelector((s) => s.tasks);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const total = tasks.length;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font)" }}>
      <Header setAuth={setAuth} />

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pb-20 mt-8">
        {/* Breadcrumb */}
        <p className="text-xs tracking-widest mb-4" style={{ color: "var(--gray)" }}>
          // TASKFLOW / PRO_MODE
        </p>

        {/* ── HERO — full width dark banner ── */}
        <Motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="border-2 border-black mb-4 overflow-hidden" style={{ background: "var(--black)" }}>
          <div className="flex items-center justify-between px-5 py-2 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <FaCrown style={{ color: "var(--pink)", fontSize: "0.75rem" }} />
              <span className="text-xs font-bold tracking-widest" style={{ color: "var(--pink)" }}>
                PRO_MODE.EXE
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-gray-600" />
              <span className="w-3 h-3 rounded-full bg-green-400 border border-gray-600" />
              <span className="w-3 h-3 rounded-full bg-red-400 border border-gray-600" />
            </div>
          </div>
          <div className="px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <p className="text-xs tracking-widest mb-2" style={{ color: "#555" }}>
                UNLOCK THE FULL SYSTEM
              </p>
              <h1 className="text-7xl font-black leading-none" style={{ fontStyle: "italic", letterSpacing: "-0.04em", color: "var(--white)" }}>
                TASK
              </h1>
              <h1 className="text-7xl font-black leading-none mb-4" style={{ fontStyle: "italic", letterSpacing: "-0.04em", color: "var(--pink)" }}>
                FLOW PRO
              </h1>
              <p className="text-xs leading-relaxed max-w-lg" style={{ color: "#666", lineHeight: 1.9 }}>
                15 PREMIUM FEATURES. UNLIMITED TASKS. KANBAN. POMODORO. CLOUD SYNC. EVERYTHING YOU NEED TO SHIP MORE AND STRESS LESS.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {[
                { val: "15+", label: "PRO FEATURES", color: "var(--pink)" },
                { val: "INF", label: "TASKS", color: "#4ade80" },
                { val: "4", label: "VIEWS", color: "#60a5fa" },
                { val: "7", label: "DAY GUARANTEE", color: "#fbbf24" },
              ].map((s) => (
                <div key={s.label} className="border-2 px-6 py-4 text-center" style={{ borderColor: "#222", background: "#111" }}>
                  <p className="text-4xl font-black" style={{ color: s.color, letterSpacing: "-0.04em" }}>
                    {s.val}
                  </p>
                  <p className="text-xs tracking-widest mt-1" style={{ color: "#555", fontSize: "0.5rem" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Motion.div>

        {/* ── FREE vs PRO — two col ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Free */}
          <Motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="border-2 border-black" style={{ background: "var(--white)" }}>
            <div className="flex items-center gap-3 px-5 py-3 border-b-2 border-black" style={{ background: "var(--pink-light)" }}>
              <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs" style={{ background: "var(--white)" }}>
                <FaCheck />
              </span>
              <span className="text-xs font-bold tracking-widest">WHAT_YOU_HAVE — FREE</span>
            </div>
            <div className="p-5 grid grid-cols-1 gap-2">
              {FREE_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 border border-black px-3 py-2" style={{ background: "#f9f9f9" }}>
                  <FaCheck style={{ color: "#16a34a", fontSize: "0.55rem", flexShrink: 0 }} />
                  <span className="text-xs tracking-widest" style={{ fontSize: "0.6rem" }}>
                    {f}
                  </span>
                </div>
              ))}
              <div className="border-2 border-black px-3 py-2 mt-1" style={{ background: "#fff1f2" }}>
                <p className="text-xs font-bold tracking-widest" style={{ color: "#dc2626", fontSize: "0.58rem" }}>
                  TASK LIMIT: {total} / 100 USED
                </p>
                <div className="mt-1.5 w-full h-1.5 border border-black" style={{ background: "#f0f0f0" }}>
                  <div className="h-full" style={{ width: `${Math.min((total / 100) * 100, 100)}%`, background: total > 80 ? "#dc2626" : "var(--black)" }} />
                </div>
              </div>
            </div>
          </Motion.div>

          {/* Pro features grid */}
          <Motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="border-2 border-black" style={{ background: "var(--white)" }}>
            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-black" style={{ background: "var(--pink)" }}>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs" style={{ background: "var(--white)" }}>
                  <FaCrown />
                </span>
                <span className="text-xs font-bold tracking-widest">PRO_FEATURES — HOVER TO PEEK</span>
              </div>
              <span className="border-2 border-black px-2 py-0.5 text-xs font-bold" style={{ background: "var(--black)", color: "var(--pink)", fontSize: "0.5rem" }}>
                15
              </span>
            </div>
            <div className="p-4 grid grid-cols-1 gap-2" style={{ maxHeight: "420px", overflowY: "auto" }}>
              {PRO_FEATURES.map((f, i) => (
                <Motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.03 }}
                  className="flex items-center gap-3 border-2 border-black px-3 py-2.5 relative group overflow-hidden"
                  style={{ background: "#fafafa" }}
                >
                  {f.tag && (
                    <span className="absolute top-1 right-1 border border-black px-1 text-xs font-bold" style={{ background: "var(--pink)", fontSize: "0.42rem" }}>
                      {f.tag}
                    </span>
                  )}
                  <div className="w-8 h-8 border-2 border-black flex items-center justify-center flex-shrink-0" style={{ background: f.color, color: "#fff", fontSize: "0.7rem" }}>
                    {f.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold tracking-widest" style={{ fontSize: "0.58rem" }}>
                      {f.title}
                    </p>
                    <p className="text-xs" style={{ color: "var(--gray)", fontSize: "0.52rem" }}>
                      {f.desc}
                    </p>
                  </div>
                  <FaLock style={{ color: "#ddd", fontSize: "0.65rem", flexShrink: 0 }} />
                  {/* Hover overlay */}
                  <Motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center gap-2 border-2 border-black"
                    style={{ background: "rgba(0,0,0,0.88)" }}
                  >
                    <FaCrown style={{ color: "var(--pink)", fontSize: "0.8rem" }} />
                    <span className="text-xs font-bold tracking-widest" style={{ color: "var(--pink)", fontSize: "0.55rem" }}>
                      UPGRADE TO UNLOCK
                    </span>
                  </Motion.div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </div>

        {/* ── PLANS — 3 col full width ── */}
        <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="border-2 border-black mb-4" style={{ background: "var(--white)" }}>
          <div className="flex items-center gap-3 px-5 py-3 border-b-2 border-black" style={{ background: "var(--pink)" }}>
            <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs" style={{ background: "var(--white)" }}>
              <FaStar />
            </span>
            <span className="text-xs font-bold tracking-widest">CHOOSE_YOUR_PLAN</span>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan, i) => (
              <Motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="border-2 border-black flex flex-col relative overflow-hidden"
                style={{ background: "var(--white)" }}
              >
                {plan.badge && (
                  <div className="absolute top-0 right-0 border-l-2 border-b-2 border-black px-2 py-1" style={{ background: "var(--pink)", fontSize: "0.45rem" }}>
                    <span className="text-xs font-bold tracking-widest">{plan.badge}</span>
                  </div>
                )}
                <div className="px-5 py-5 border-b-2 border-black" style={{ background: plan.headerBg }}>
                  <p className="text-xs font-bold tracking-widest mb-2" style={{ color: plan.labelColor }}>
                    {plan.label}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-xs font-bold" style={{ color: plan.labelColor, marginBottom: "2px" }}>
                      ₹
                    </span>
                    <span className="text-5xl font-black" style={{ letterSpacing: "-0.04em", color: plan.labelColor }}>
                      {plan.price}
                    </span>
                    <span className="text-xs tracking-widest mb-1" style={{ color: plan.key === "LIFETIME" ? "#888" : "var(--gray)" }}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 mb-3 last:mb-0">
                      <div
                        className="w-4 h-4 border border-black flex items-center justify-center flex-shrink-0"
                        style={{ background: plan.key === "LIFETIME" ? "var(--pink)" : plan.key === "PRO" ? "var(--black)" : "#f0f0f0" }}
                      >
                        <FaCheck style={{ fontSize: "0.42rem", color: plan.key === "FREE" ? "#aaa" : "white" }} />
                      </div>
                      <span className="text-xs tracking-widest" style={{ fontSize: "0.6rem" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">
                  <button
                    onClick={() => {
                      if (!plan.disabled) {
                        setSelectedPlan(plan.key);
                        setShowModal(true);
                      }
                    }}
                    disabled={plan.disabled}
                    className="w-full flex items-center justify-center gap-2 border-2 border-black py-3 text-xs font-bold tracking-widest transition"
                    style={{
                      background: plan.disabled ? "#f0f0f0" : plan.key === "LIFETIME" ? "var(--pink)" : "var(--black)",
                      color: plan.disabled ? "#bbb" : plan.key === "LIFETIME" ? "var(--black)" : "var(--white)",
                      cursor: plan.disabled ? "default" : "pointer",
                    }}
                  >
                    {plan.cta}
                    {!plan.disabled && <FaArrowRight style={{ fontSize: "0.6rem" }} />}
                  </button>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* ── FAQ — 2 col full width ── */}
        <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="border-2 border-black" style={{ background: "var(--white)" }}>
          <div className="flex items-center gap-3 px-5 py-3 border-b-2 border-black" style={{ background: "var(--pink)" }}>
            <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs" style={{ background: "var(--white)" }}>
              <FaCode />
            </span>
            <span className="text-xs font-bold tracking-widest">FAQ.TXT</span>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { q: "CAN I CANCEL ANYTIME?", a: "Yes. Cancel from Settings anytime. No lock-in." },
              { q: "DOES FREE PLAN STAY FREE?", a: "100%. Free tier never expires, no credit card needed." },
              { q: "WHAT HAPPENS TO MY TASKS?", a: "All tasks are safe. Pro just unlocks more features." },
              { q: "IS LIFETIME REALLY LIFETIME?", a: "One payment, all future Pro features included forever." },
              { q: "HOW IS CLOUD SYNC DIFFERENT?", a: "Free uses localStorage. Pro syncs to real DB cross-device." },
              { q: "CAN I TRY PRO FIRST?", a: "7-day free trial on Pro plan, no charge until day 8." },
            ].map((item, i) => (
              <Motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.05 }} className="border-2 border-black p-4" style={{ background: "#fafafa" }}>
                <p className="text-xs font-bold tracking-widest mb-2" style={{ color: "var(--black)" }}>
                  {item.q}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--gray)", fontSize: "0.6rem" }}>
                  {item.a}
                </p>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={() => setShowModal(false)}
          >
            <Motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="border-2 border-black max-w-sm w-full"
              style={{ background: "var(--white)", fontFamily: "var(--font)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b-2 border-black" style={{ background: "var(--pink)" }}>
                <div className="flex items-center gap-2">
                  <FaCrown style={{ fontSize: "0.75rem" }} />
                  <span className="text-xs font-bold tracking-widest">UPGRADE_{selectedPlan}.EXE</span>
                </div>
                <button onClick={() => setShowModal(false)} className="w-6 h-6 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition">
                  <FaTimes style={{ fontSize: "0.6rem" }} />
                </button>
              </div>
              <div className="p-6 text-center">
                <Motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <FaCrown style={{ fontSize: "3rem", color: "var(--pink)", margin: "0 auto 12px" }} />
                </Motion.div>
                <p className="text-xl font-black mb-1" style={{ letterSpacing: "-0.03em" }}>
                  COMING_SOON
                </p>
                <p className="text-xs tracking-widest mb-4" style={{ color: "var(--gray)" }}>
                  {selectedPlan}_PLAN IS UNDER DEVELOPMENT
                </p>
                <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--gray)", fontSize: "0.6rem" }}>
                  DROP YOUR EMAIL FOR EARLY ACCESS AND A LAUNCH DISCOUNT.
                </p>
                <a
                  href="mailto:gaikwadrohith53@gmail.com?subject=TASKFLOW PRO EARLY ACCESS"
                  className="w-full flex items-center justify-center gap-2 border-2 border-black py-3 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition"
                  style={{ background: "var(--pink)", textDecoration: "none", color: "inherit" }}
                >
                  GET_EARLY_ACCESS <FaArrowRight style={{ fontSize: "0.6rem" }} />
                </a>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
