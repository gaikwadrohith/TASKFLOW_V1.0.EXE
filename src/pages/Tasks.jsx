import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask, clearCompleted, setFilter } from "../features/tasks/taskSlice";
import Header from "../components/layout/Header";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaCheck, FaFire, FaClock, FaListUl, FaCheckCircle, FaSearch, FaBroom, FaRocket } from "react-icons/fa";

// Decorative left panel — unique to Tasks page
function TasksSidePanel() {
  const { tasks } = useSelector((s) => s.tasks);
  const priorities = ["high", "medium", "low"];
  const counts = priorities.map((p) => ({
    p,
    n: tasks.filter((t) => t.priority === p && !t.completed).length,
  }));
  const labels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <>
      {/* LEFT PANEL */}
      <div className="hidden xl:flex flex-col gap-4 w-44 flex-shrink-0 pt-10" style={{ fontFamily: "var(--font)" }}>
        {/* Priority meter */}
        <div className="border-2 border-black overflow-hidden" style={{ background: "var(--white)" }}>
          <div className="px-3 py-1.5 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            PRIORITY_MAP
          </div>
          <div className="p-3 flex flex-col gap-2">
            {counts.map(({ p, n }) => {
              const colors = { high: "#dc2626", medium: "#ca8a04", low: "#16a34a" };
              return (
                <div key={p}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs tracking-widest uppercase" style={{ color: colors[p], fontSize: "0.6rem" }}>
                      {p}
                    </span>
                    <span className="text-xs font-bold" style={{ color: colors[p] }}>
                      {n}
                    </span>
                  </div>
                  <div className="w-full h-1.5 border border-black" style={{ background: "#f0f0f0" }}>
                    <div className="h-full" style={{ width: `${Math.min(n * 20, 100)}%`, background: colors[p] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Week grid */}
        <div className="border-2 border-black overflow-hidden" style={{ background: "var(--white)" }}>
          <div className="px-3 py-1.5 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            THIS_WEEK
          </div>
          <div className="p-3 grid grid-cols-7 gap-0.5">
            {labels.map((d, i) => {
              const today = new Date().getDay();
              const isToday = i === (today === 0 ? 6 : today - 1);
              return (
                <div key={d} className="flex flex-col items-center gap-0.5">
                  <span className="text-xs" style={{ fontSize: "0.45rem", color: "var(--gray)" }}>
                    {d}
                  </span>
                  <div
                    className="w-4 h-4 border border-black flex items-center justify-center"
                    style={{
                      background: isToday ? "var(--black)" : "transparent",
                      fontSize: "0.45rem",
                      color: isToday ? "var(--white)" : "transparent",
                    }}
                  >
                    ●
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decorative ASCII */}
        <div className="border-2 border-black p-3" style={{ background: "var(--white)" }}>
          <pre className="text-xs leading-tight" style={{ color: "var(--pink-dark)", fontSize: "0.5rem" }}>
            {`┌─────────┐
│ TASK    │
│ MANAGER │
│ v1.0    │
└─────────┘`}
          </pre>
          <p className="text-xs tracking-widest mt-2" style={{ color: "var(--gray)", fontSize: "0.5rem" }}>
            SYS_STATUS: OK
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="hidden xl:flex flex-col gap-4 w-44 flex-shrink-0 pt-10" style={{ fontFamily: "var(--font)" }}>
        {/* Quick tips */}
        <div className="border-2 border-black overflow-hidden" style={{ background: "var(--white)" }}>
          <div className="px-3 py-1.5 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            SHORTCUTS
          </div>
          <div className="p-3 flex flex-col gap-2">
            {[
              ["ENTER", "ADD TASK"],
              ["CLICK ✓", "COMPLETE"],
              ["DEL", "DELETE"],
              ["FILTER", "SORT LIST"],
            ].map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="border border-black px-1.5 py-0.5 text-xs font-bold" style={{ background: "var(--pink-light)", fontSize: "0.55rem" }}>
                  {key}
                </span>
                <span className="text-xs" style={{ color: "var(--gray)", fontSize: "0.55rem" }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational ticker */}
        <div className="border-2 border-black overflow-hidden" style={{ background: "var(--black)" }}>
          <div className="px-3 py-1.5 border-b-2 border-pink-400 text-xs font-bold tracking-widest" style={{ color: "var(--pink)" }}>
            MOTIVATION.LOG
          </div>
          <div className="p-3">
            {["SHIP IT.", "STAY FOCUSED.", "DONE > PERFECT.", "GRIND MODE."].map((line, i) => (
              <Motion.p
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.3 }}
                className="text-xs font-bold tracking-widest mb-1"
                style={{ color: "var(--pink)", fontSize: "0.55rem" }}
              >
                &gt; {line}
              </Motion.p>
            ))}
          </div>
        </div>

        {/* Decorative border pattern */}
        <div className="border-2 border-black p-3" style={{ background: "var(--white)" }}>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="aspect-square border border-black" style={{ background: i % 3 === 0 ? "var(--pink)" : i % 5 === 0 ? "var(--black)" : "transparent" }} />
            ))}
          </div>
          <p className="text-xs tracking-widest mt-2 text-center" style={{ color: "var(--gray)", fontSize: "0.5rem" }}>
            TASK_MATRIX
          </p>
        </div>
      </div>
    </>
  );
}

export default function Tasks({ setAuth }) {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.tasks);
  const [search, setSearch] = useState("");

  const priorityConfig = {
    low: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", label: "LOW" },
    medium: { bg: "#fefce8", color: "#ca8a04", border: "#fde68a", label: "MED" },
    high: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", label: "HIGH" },
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) => task.text.toLowerCase().includes(search.toLowerCase()));

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;
  const high = tasks.filter((t) => t.priority === "high" && !t.completed).length;

  const stats = [
    { icon: <FaListUl />, label: "TOTAL", value: total, accent: "var(--black)", bg: "var(--white)" },
    { icon: <FaClock />, label: "REMAINING", value: remaining, accent: "#6366f1", bg: "#eef2ff" },
    { icon: <FaCheckCircle />, label: "DONE", value: completed, accent: "#16a34a", bg: "#f0fdf4" },
    { icon: <FaFire />, label: "URGENT", value: high, accent: "#dc2626", bg: "#fef2f2" },
  ];

  const filters = [
    { key: "all", label: "ALL" },
    { key: "active", label: "ACTIVE" },
    { key: "completed", label: "DONE" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font)" }}>
      <Header setAuth={setAuth} />

      <div className="flex-1 flex gap-6 w-full max-w-7xl mx-auto px-6 pb-16">
        <TasksSidePanel />

        {/* Main Content */}
        <div className="flex-1 mt-10 min-w-0">
          {/* Page Title */}
          <Motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">// TASKFLOW / ALL TASKS</p>
            <h1 className="text-5xl font-black tracking-tight leading-none" style={{ letterSpacing: "-0.03em", color: "var(--black)" }}>
              ALL_TASKS
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="h-px flex-1" style={{ background: "var(--black)" }} />
              <span className="text-xs tracking-widest" style={{ color: "var(--gray)" }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }).toUpperCase()}
              </span>
            </div>
          </Motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {stats.map((stat, i) => (
              <Motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="border-2 border-black p-4 flex flex-col gap-3 relative overflow-hidden"
                style={{ background: stat.bg }}
              >
                <div className="w-8 h-8 flex items-center justify-center border-2" style={{ borderColor: stat.accent, color: stat.accent, fontSize: "0.85rem" }}>
                  {stat.icon}
                </div>
                <p className="text-4xl font-black leading-none" style={{ color: stat.accent, letterSpacing: "-0.04em" }}>
                  {stat.value}
                </p>
                <p className="text-xs tracking-widest" style={{ color: "var(--gray)" }}>
                  {stat.label}
                </p>
                <div className="absolute bottom-0 right-0 w-8 h-8 opacity-10" style={{ background: stat.accent }} />
              </Motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          {total > 0 && (
            <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8 border-2 border-black p-4" style={{ background: "var(--white)" }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs tracking-widest" style={{ color: "var(--gray)" }}>
                  PROGRESS
                </span>
                <span className="text-xs font-bold tracking-widest" style={{ color: "var(--black)" }}>
                  {Math.round((completed / total) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 border-2 border-black" style={{ background: "#f0f0f0" }}>
                <Motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completed / total) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="h-full"
                  style={{ background: "var(--black)" }}
                />
              </div>
            </Motion.div>
          )}

          {/* Search Bar */}
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 border-2 border-black px-4 py-3 mb-4"
            style={{ background: "var(--white)" }}
          >
            <FaSearch style={{ color: "var(--gray)", fontSize: "0.75rem" }} />
            <input
              type="text"
              placeholder="SEARCH TASKS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm bg-transparent"
              style={{ fontFamily: "var(--font)", letterSpacing: "0.05em", color: "var(--black)" }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-xs font-bold transition hover:opacity-60" style={{ color: "var(--gray)" }}>
                ✕
              </button>
            )}
          </Motion.div>

          {/* Filter + Clear Row */}
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex items-center gap-2 mb-6 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => dispatch(setFilter(f.key))}
                className="flex items-center gap-2 px-3 py-1.5 border-2 border-black text-xs font-bold tracking-widest transition hover:opacity-80"
                style={{
                  fontFamily: "var(--font)",
                  background: filter === f.key ? "var(--black)" : "transparent",
                  color: filter === f.key ? "var(--white)" : "var(--black)",
                }}
              >
                {f.label}
              </button>
            ))}

            <button
              onClick={() => dispatch(clearCompleted())}
              className="ml-auto flex items-center gap-2 px-3 py-1.5 border-2 border-black text-xs font-bold tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition"
              style={{ fontFamily: "var(--font)" }}
            >
              <FaBroom className="text-xs" />
              CLEAR_DONE
            </button>
          </Motion.div>

          {/* Section Label */}
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--gray)" }}>
            — {filteredTasks.length} TASK{filteredTasks.length !== 1 ? "S" : ""} FOUND
          </p>

          {/* Task List */}
          {filteredTasks.length === 0 ? (
            <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-2 border-black p-16 text-center" style={{ background: "var(--white)" }}>
              <FaRocket style={{ fontSize: "2.5rem", color: "var(--pink)", marginBottom: "1rem", margin: "0 auto 1rem" }} />
              <p className="text-xs tracking-widest" style={{ color: "var(--gray)" }}>
                NO_TASKS_FOUND
              </p>
            </Motion.div>
          ) : (
            <AnimatePresence>
              {filteredTasks.map((task, i) => {
                const pc = priorityConfig[task.priority] || priorityConfig.low;
                return (
                  <Motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.04 }}
                    layout
                    className="flex items-center justify-between border-2 border-black p-4 mb-2 group"
                    style={{
                      background: "var(--white)",
                      borderLeft: task.completed ? "4px solid #16a34a" : "4px solid var(--pink)",
                    }}
                  >
                    <div className="flex items-center gap-4 flex-1 flex-wrap">
                      {/* Checkbox */}
                      <button
                        onClick={() => dispatch(toggleTask(task.id))}
                        className="w-6 h-6 border-2 flex items-center justify-center flex-shrink-0 transition"
                        style={{
                          borderColor: "var(--black)",
                          background: task.completed ? "var(--black)" : "transparent",
                        }}
                      >
                        {task.completed && <FaCheck style={{ color: "var(--white)", fontSize: "0.6rem" }} />}
                      </button>

                      {/* Task Number */}
                      <span className="text-xs flex-shrink-0" style={{ color: "var(--gray)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Task Text */}
                      <span
                        className="text-sm flex-1"
                        style={{
                          textDecoration: task.completed ? "line-through" : "none",
                          color: task.completed ? "var(--gray)" : "var(--black)",
                          fontFamily: "var(--font)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {task.text}
                      </span>

                      {/* Priority Badge */}
                      {task.priority && (
                        <span
                          className="text-xs px-2 py-0.5 border flex-shrink-0"
                          style={{
                            background: pc.bg,
                            color: pc.color,
                            borderColor: pc.border,
                            fontFamily: "var(--font)",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {task.priority === "high" && <FaFire className="inline mr-1" style={{ fontSize: "0.6rem" }} />}
                          {pc.label}
                        </span>
                      )}
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => dispatch(deleteTask(task.id))}
                      className="ml-4 w-7 h-7 border border-transparent flex items-center justify-center transition flex-shrink-0 hover:border-red-300 hover:text-red-500"
                      style={{ color: "var(--gray)", fontSize: "0.7rem" }}
                    >
                      <FaTrash />
                    </button>
                  </Motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
