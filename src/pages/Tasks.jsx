import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask, clearCompleted, setFilter } from "../features/tasks/taskSlice";
import Header from "../components/layout/Header";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaCheck, FaFire, FaClock, FaListUl, FaCheckCircle, FaSearch, FaBroom } from "react-icons/fa";

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
    { icon: <FaListUl />, label: "TOTAL", value: total, accent: "#000", bg: "#f9f9f9" },
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header setAuth={setAuth} />

      <div className="flex-1 w-full max-w-3xl mx-auto px-6 mt-10 pb-16">
        {/* Page Title */}
        <Motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
          <p className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-1" style={{ fontFamily: "monospace" }}>
            TASKFLOW / ALL TASKS
          </p>

          <h1 className="text-5xl font-black tracking-tight leading-none" style={{ letterSpacing: "-0.03em" }}>
            ALL TASKS
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="h-px flex-1 bg-black" />
            <span className="text-xs tracking-widest text-gray-400" style={{ fontFamily: "monospace" }}>
              {new Date()
                .toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
                .toUpperCase()}
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
              className="border border-black p-4 flex flex-col gap-3 relative overflow-hidden"
              style={{ background: stat.bg }}
            >
              <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: stat.accent, color: stat.accent, fontSize: "0.85rem" }}>
                {stat.icon}
              </div>

              <p className="text-4xl font-black leading-none" style={{ color: stat.accent, letterSpacing: "-0.04em" }}>
                {stat.value}
              </p>

              <p className="text-xs tracking-widest text-gray-500" style={{ fontFamily: "monospace" }}>
                {stat.label}
              </p>

              <div className="absolute bottom-0 right-0 w-8 h-8 opacity-10" style={{ background: stat.accent }} />
            </Motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        {total > 0 && (
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs tracking-widest text-gray-400" style={{ fontFamily: "monospace" }}>
                PROGRESS
              </span>
              <span className="text-xs tracking-widest text-gray-400" style={{ fontFamily: "monospace" }}>
                {Math.round((completed / total) * 100)}%
              </span>
            </div>
            <div className="w-full h-1 bg-gray-200 border border-black">
              <Motion.div initial={{ width: 0 }} animate={{ width: `${(completed / total) * 100}%` }} transition={{ duration: 0.6, delay: 0.4 }} className="h-full bg-black" />
            </div>
          </Motion.div>
        )}

        {/* Search Bar */}
        <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 border border-black bg-white px-4 py-3 mb-4">
          <FaSearch className="text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="SEARCH TASKS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm bg-transparent"
            style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-gray-400 hover:text-black transition text-xs">
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
              className="flex items-center gap-2 px-3 py-1 border border-black text-xs font-medium tracking-widest transition hover:bg-black hover:text-white"
              style={{
                fontFamily: "monospace",
                background: filter === f.key ? "#000" : "transparent",
                color: filter === f.key ? "#fff" : "#000",
              }}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={() => dispatch(clearCompleted())}
            className="ml-auto flex items-center gap-2 px-3 py-1 border border-black text-xs tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            style={{ fontFamily: "monospace" }}
          >
            <FaBroom className="text-xs" />
            CLEAR DONE
          </button>
        </Motion.div>

        {/* Section Label */}
        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-3" style={{ fontFamily: "monospace" }}>
          — {filteredTasks.length} TASK{filteredTasks.length !== 1 ? "S" : ""} FOUND
        </p>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-black bg-white p-16 text-center">
            <p className="text-4xl mb-4">🚀</p>
            <p className="text-xs tracking-widest text-gray-400" style={{ fontFamily: "monospace" }}>
              NO TASKS FOUND
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
                  className="flex items-center justify-between border border-black bg-white p-4 mb-2 group"
                >
                  <div className="flex items-center gap-4 flex-1 flex-wrap">
                    {/* Custom Checkbox */}
                    <button
                      onClick={() => dispatch(toggleTask(task.id))}
                      className="w-6 h-6 border border-black flex items-center justify-center flex-shrink-0 transition"
                      style={{
                        background: task.completed ? "#000" : "transparent",
                      }}
                    >
                      {task.completed && <FaCheck className="text-white" style={{ fontSize: "0.6rem" }} />}
                    </button>

                    {/* Task Number */}
                    <span className="text-xs text-gray-300 flex-shrink-0" style={{ fontFamily: "monospace" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Task Text */}
                    <span
                      className="text-sm flex-1"
                      style={{
                        textDecoration: task.completed ? "line-through" : "none",
                        color: task.completed ? "#9ca3af" : "#000",
                        fontFamily: "monospace",
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
                          fontFamily: "monospace",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {task.priority === "high" && <FaFire className="inline mr-1" style={{ fontSize: "0.6rem" }} />}
                        {pc.label}
                      </span>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="ml-4 w-7 h-7 border border-transparent flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-300 transition flex-shrink-0"
                  >
                    <FaTrash style={{ fontSize: "0.7rem" }} />
                  </button>
                </Motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-black px-6 py-3 text-center text-xs text-gray-400 tracking-widest" style={{ fontFamily: "monospace" }}>
        © {new Date().getFullYear()} TASKFLOW
      </footer>
    </div>
  );
}
