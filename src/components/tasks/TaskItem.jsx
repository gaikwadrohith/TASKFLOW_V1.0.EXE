import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../../features/tasks/taskSlice";
import { FaTrash, FaCheck } from "react-icons/fa";
import { motion as Motion } from "framer-motion";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();

  const priorityStyles = {
    low:    { bg: "#f0fdf4", color: "#16a34a", label: "LOW_PRIORITY" },
    medium: { bg: "#fefce8", color: "#ca8a04", label: "MED_PRIORITY" },
    high:   { bg: "#fff1f2", color: "#dc2626", label: "! HIGH PRIORITY" },
  };

  const ps = priorityStyles[task.priority] || priorityStyles.low;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }}
      layout
      className="flex items-center gap-3 border-2 border-black p-3 mb-2 group"
      style={{
        background: task.completed ? "#f9f9f9" : "var(--white)",
        borderLeft: task.completed ? "4px solid #16a34a" : "4px solid var(--pink)",
        fontFamily: "var(--font)",
      }}
    >
      {/* Checkbox */}
      <button
        onClick={() => dispatch(toggleTask(task.id))}
        className="w-6 h-6 border-2 border-black flex items-center justify-center flex-shrink-0 transition"
        style={{ background: task.completed ? "var(--black)" : "transparent" }}
      >
        {task.completed && (
          <FaCheck style={{ color: "white", fontSize: "0.55rem" }} />
        )}
      </button>

      {/* Text */}
      <span
        className="flex-1 text-sm font-bold tracking-wide"
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "#aaa" : "var(--black)",
          fontFamily: "var(--font)",
        }}
      >
        {task.text.toUpperCase()}
      </span>

      {/* Priority */}
      {task.priority && (
        <span
          className="text-xs px-2 py-0.5 border border-black font-bold tracking-widest flex-shrink-0"
          style={{ background: ps.bg, color: ps.color }}
        >
          {ps.label}
        </span>
      )}

      {/* Delete */}
      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className="w-7 h-7 border border-transparent flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-300 transition flex-shrink-0"
      >
        <FaTrash style={{ fontSize: "0.65rem" }} />
      </button>
    </Motion.div>
  );
}