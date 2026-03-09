import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function TaskList() {
  const { tasks, filter } = useSelector((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-2 border-black p-12 text-center"
        style={{ background: "var(--white)", fontFamily: "var(--font)" }}
      >
        <p className="text-3xl mb-3">🚀</p>
        <p className="text-xs tracking-widest text-gray-400">
          NO_TASKS_FOUND — ADD ONE ABOVE
        </p>
      </Motion.div>
    );
  }

  return (
    <div>
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </div>
  );
}