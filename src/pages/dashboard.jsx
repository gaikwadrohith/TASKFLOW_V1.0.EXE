import Header from "../components/layout/Header";
import TaskInput from "../components/tasks/TaskInput";
import TaskList from "../components/tasks/TaskList";
import TaskFilter from "../components/tasks/TaskFilter";
import { motion as Motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaClock, FaFire, FaListUl } from "react-icons/fa";

export default function Dashboard({ setAuth }) {
  const { tasks } = useSelector((state) => state.tasks);
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;
  const high = tasks.filter((t) => t.priority === "high" && !t.completed).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "GOOD_MORNING" : hour < 18 ? "GOOD_AFTERNOON" : "GOOD_EVENING";

  const stats = [
    { icon: <FaListUl />,      label: "TOTAL",     value: total,     accent: "#0a0a0a", bg: "#fafafa" },
    { icon: <FaClock />,       label: "REMAINING", value: remaining, accent: "#2563eb", bg: "#eff6ff" },
    { icon: <FaCheckCircle />, label: "DONE",      value: completed, accent: "#16a34a", bg: "#f0fdf4" },
    { icon: <FaFire />,        label: "URGENT",    value: high,      accent: "#dc2626", bg: "#fff1f2" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font)" }}>
      <Header setAuth={setAuth} />

      <div className="flex-1 w-full max-w-3xl mx-auto px-5 mt-8 pb-16">

        {/* Title */}
        <Motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-xs tracking-widest text-gray-400 mb-1">// {greeting}</p>
          <h1
            className="text-5xl font-bold"
            style={{ fontStyle: "italic", letterSpacing: "-0.03em" }}
          >
            {user?.name ? `${user.name.toUpperCase()}_TASKS` : "MY_TASKS"}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div
              className="inline-flex items-center gap-1 border-2 border-black px-2 py-0.5"
              style={{ background: "var(--pink)" }}
            >
              <span className="text-xs font-bold tracking-widest">{remaining} REMAINING_JOBS</span>
            </div>
          </div>
        </Motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {stats.map((s, i) => (
            <Motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="border-2 border-black p-3 relative overflow-hidden"
              style={{ background: s.bg }}
            >
              <div
                className="w-7 h-7 border-2 border-black flex items-center justify-center mb-2"
                style={{ color: s.accent, fontSize: "0.7rem" }}
              >
                {s.icon}
              </div>
              <p className="text-3xl font-bold" style={{ color: s.accent, letterSpacing: "-0.04em" }}>
                {s.value}
              </p>
              <p className="text-xs tracking-widest text-gray-400 mt-1">{s.label}</p>
              <div className="absolute bottom-0 right-0 w-6 h-6 opacity-10" style={{ background: s.accent }} />
            </Motion.div>
          ))}
        </div>

        {/* Progress */}
        {total > 0 && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-2 border-black p-4 mb-6"
            style={{ background: "var(--white)" }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs tracking-widest text-gray-400">TASK_PROGRESS</span>
              <span className="text-xs font-bold tracking-widest">{progress}%_COMPLETE</span>
            </div>
            <div className="w-full h-3 border-2 border-black" style={{ background: "#f0f0f0" }}>
              <Motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="h-full"
                style={{
                  background: progress === 100
                    ? "#16a34a"
                    : progress > 50
                    ? "var(--pink-dark)"
                    : "var(--pink)",
                }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">0%</span>
              <span className="text-xs text-gray-400">100%</span>
            </div>
          </Motion.div>
        )}

        {/* Task Input */}
        <Motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <p className="text-xs tracking-widest text-gray-400 mb-2">// ADD_NEW_TASK</p>
          <TaskInput />
        </Motion.div>

        {/* Task List */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs tracking-widest text-gray-400 mt-7 mb-2">// TASK_LIST</p>
          <TaskList />
        </Motion.div>

        <TaskFilter />
      </div>

      {/* Footer */}
      <footer
        className="w-full border-t-2 border-black px-5 py-2 flex justify-between"
        style={{ background: "var(--black)", fontFamily: "var(--font)" }}
      >
        <div className="flex gap-4">
          {["PRIVACY", "TERMS", "CONTACT"].map((l) => (
            <span key={l} className="text-xs tracking-widest cursor-pointer hover:underline" style={{ color: "var(--pink)" }}>
              {l}
            </span>
          ))}
        </div>
        <span className="text-xs tracking-widest" style={{ color: "#555" }}>
          SYS.VERSION.2024.0 (C) TASKFLOW_INTL
        </span>
      </footer>
    </div>
  );
}