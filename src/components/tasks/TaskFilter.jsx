import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearCompleted } from "../../features/tasks/taskSlice";
import { motion as Motion } from "framer-motion";
import { FaBroom } from "react-icons/fa";

export default function TaskFilter() {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.tasks);
  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row items-center justify-between gap-3 mt-5 border-t-2 border-black pt-4"
      style={{ fontFamily: "var(--font)" }}
    >
      <div className="flex gap-2">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => dispatch(setFilter(f))}
            className="px-3 py-1.5 border-2 border-black text-xs font-bold tracking-widest transition hover:bg-black hover:text-white"
            style={{
              background: filter === f ? "var(--black)" : "transparent",
              color: filter === f ? "var(--white)" : "var(--black)",
            }}
          >
            {f === "all" ? "ALL" : f === "active" ? "ACTIVE" : "DONE"}
          </button>
        ))}
      </div>

      <span className="text-xs tracking-widest text-gray-400">{remaining} ITEMS_LEFT</span>

      <button
        onClick={() => dispatch(clearCompleted())}
        className="flex items-center gap-2 border-2 border-black px-3 py-1.5 text-xs font-bold tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition"
      >
        <FaBroom className="text-xs" />
        CLEAR_DONE
      </button>
    </Motion.div>
  );
}