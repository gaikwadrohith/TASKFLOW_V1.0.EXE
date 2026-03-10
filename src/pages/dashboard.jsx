import Header from "../components/layout/Header";
import TaskInput from "../components/tasks/TaskInput";
import TaskList from "../components/tasks/TaskList";
import TaskFilter from "../components/tasks/TaskFilter";
import { motion as Motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaClock, FaFire, FaListUl } from "react-icons/fa";

// Decorative side panel — unique dashboard style: activity feed + clock
function DashboardSidePanels({ tasks }) {
  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase();

  return (
    <>
      {/* LEFT */}
      <div className="hidden xl:flex flex-col gap-4 w-44 flex-shrink-0 pt-10" style={{ fontFamily: "var(--font)" }}>
        {/* Clock widget */}
        <div className="border-2 border-black overflow-hidden" style={{ background: "var(--white)" }}>
          <div className="px-3 py-1.5 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            SYS_CLOCK
          </div>
          <div className="p-4 text-center">
            <p className="text-3xl font-bold" style={{ letterSpacing: "-0.03em", color: "var(--black)" }}>{timeStr}</p>
            <p className="text-xs tracking-widest mt-1" style={{ color: "var(--gray)", fontSize: "0.55rem" }}>{dateStr}</p>
            <div className="mt-3 w-full h-1 border border-black" style={{ background: "#f0f0f0" }}>
              <Motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(now.getHours() / 24) * 100}%` }}
                className="h-full"
                style={{ background: "var(--black)" }}
              />
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--gray)", fontSize: "0.5rem" }}>DAY_PROGRESS</p>
          </div>
        </div>

        {/* Progress donut-like */}
        <div className="border-2 border-black overflow-hidden" style={{ background: "var(--white)" }}>
          <div className="px-3 py-1.5 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            COMPLETION
          </div>
          <div className="p-4 text-center">
            <p className="text-4xl font-black" style={{ color: "var(--black)", letterSpacing: "-0.04em" }}>{progress}%</p>
            <p className="text-xs tracking-widest mb-2" style={{ color: "var(--gray)", fontSize: "0.55rem" }}>TASKS_DONE</p>
            <div className="w-full h-2 border-2 border-black" style={{ background: "#f0f0f0" }}>
              <Motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
                className="h-full"
                style={{ background: progress === 100 ? "#16a34a" : "var(--pink-dark)" }}
              />
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="border-2 border-black overflow-hidden" style={{ background: "var(--black)" }}>
          <div className="px-3 py-1.5 border-b-2 border-pink-400 text-xs font-bold tracking-widest" style={{ color: "var(--pink)" }}>
            ACTIVITY
          </div>
          <div className="p-3">
            {tasks.slice(-4).reverse().map((t) => (
              <div key={t.id} className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.completed ? "#16a34a" : "var(--pink)" }} />
                <span className="text-xs truncate" style={{ color: "#aaa", fontSize: "0.5rem", fontFamily: "var(--font)" }}>
                  {t.text.toUpperCase().slice(0, 16)}
                </span>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-xs" style={{ color: "#555", fontSize: "0.5rem" }}>NO_ACTIVITY_YET</p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden xl:flex flex-col gap-4 w-44 flex-shrink-0 pt-10" style={{ fontFamily: "var(--font)" }}>
        {/* System info */}
        <div className="border-2 border-black overflow-hidden" style={{ background: "var(--white)" }}>
          <div className="px-3 py-1.5 border-b-2 border-black text-xs font-bold tracking-widest" style={{ background: "var(--pink)" }}>
            SYS_INFO
          </div>
          <div className="p-3">
            {[
              ["APP", "TASKFLOW"],
              ["VER", "V1.0.EXE"],
              ["MODE", "PRO"],
              ["STATUS", "ONLINE"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                <span className="text-xs" style={{ color: "var(--gray)", fontSize: "0.55rem" }}>{k}</span>
                <span className="text-xs font-bold" style={{ fontSize: "0.55rem", color: "var(--black)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational quote */}
        <div className="border-2 border-black p-4" style={{ background: "var(--pink)" }}>
          <p className="text-xs font-bold tracking-widest leading-relaxed" style={{ color: "var(--black)", fontSize: "0.6rem" }}>
            "THE SECRET OF GETTING AHEAD IS GETTING STARTED."
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--black)", fontSize: "0.5rem", opacity: 0.6 }}>
            — MARK TWAIN
          </p>
        </div>

        {/* Mini pixel art decoration */}
        <div className="border-2 border-black p-3" style={{ background: "var(--white)" }}>
          <p className="text-xs tracking-widest mb-2" style={{ color: "var(--gray)", fontSize: "0.5rem" }}>TASK_GRID</p>
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }).map((_, i) => {
              const task = tasks[i];
              return (
                <div
                  key={i}
                  className="aspect-square border border-black"
                  style={{
                    background: task
                      ? task.completed
                        ? "#16a34a"
                        : task.priority === "high"
                        ? "#dc2626"
                        : "var(--pink)"
                      : "#f0f0f0",
                  }}
                />
              );
            })}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--gray)", fontSize: "0.5rem" }}>
            {total} TOTAL TASKS
          </p>
        </div>
      </div>
    </>
  );
}

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
    { icon: <FaListUl />,      label: "TOTAL",     value: total,     accent: "var(--black)", bg: "var(--white)" },
    { icon: <FaClock />,       label: "REMAINING", value: remaining, accent: "#2563eb",      bg: "#eff6ff" },
    { icon: <FaCheckCircle />, label: "DONE",      value: completed, accent: "#16a34a",      bg: "#f0fdf4" },
    { icon: <FaFire />,        label: "URGENT",    value: high,      accent: "#dc2626",      bg: "#fff1f2" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font)" }}>
      <Header setAuth={setAuth} />

      <div className="flex-1 flex gap-6 w-full max-w-7xl mx-auto px-6 pb-16">

        <DashboardSidePanels tasks={tasks} />

        {/* Main */}
        <div className="flex-1 mt-8 min-w-0">

          {/* Title */}
          <Motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="text-xs tracking-widest mb-1" style={{ color: "var(--gray)" }}>// {greeting}</p>
            <h1 className="text-5xl font-bold" style={{ fontStyle: "italic", letterSpacing: "-0.03em", color: "var(--black)" }}>
              {user?.name ? `${user.name.toUpperCase()}_TASKS` : "MY_TASKS"}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="inline-flex items-center gap-1 border-2 border-black px-2 py-0.5" style={{ background: "var(--pink)" }}>
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
                <div className="w-7 h-7 border-2 border-black flex items-center justify-center mb-2" style={{ color: s.accent, fontSize: "0.7rem" }}>
                  {s.icon}
                </div>
                <p className="text-3xl font-bold" style={{ color: s.accent, letterSpacing: "-0.04em" }}>{s.value}</p>
                <p className="text-xs tracking-widest mt-1" style={{ color: "var(--gray)" }}>{s.label}</p>
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
                <span className="text-xs tracking-widest" style={{ color: "var(--gray)" }}>TASK_PROGRESS</span>
                <span className="text-xs font-bold tracking-widest" style={{ color: "var(--black)" }}>{progress}%_COMPLETE</span>
              </div>
              <div className="w-full h-3 border-2 border-black" style={{ background: "#f0f0f0" }}>
                <Motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="h-full"
                  style={{ background: progress === 100 ? "#16a34a" : progress > 50 ? "var(--pink-dark)" : "var(--pink)" }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs" style={{ color: "var(--gray)" }}>0%</span>
                <span className="text-xs" style={{ color: "var(--gray)" }}>100%</span>
              </div>
            </Motion.div>
          )}

          {/* Task Input */}
          <Motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <p className="text-xs tracking-widest mb-2" style={{ color: "var(--gray)" }}>// ADD_NEW_TASK</p>
            <TaskInput />
          </Motion.div>

          {/* Task List */}
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <p className="text-xs tracking-widest mt-7 mb-2" style={{ color: "var(--gray)" }}>// TASK_LIST</p>
            <TaskList />
          </Motion.div>

          <TaskFilter />
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
