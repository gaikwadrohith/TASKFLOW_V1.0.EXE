import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/tasks/taskSlice";
import { FaPlus } from "react-icons/fa";
import { motion as Motion } from "framer-motion";

export default function TaskInput() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("low");

  const handleAddTask = () => {
    if (!text.trim()) return;
    dispatch(addTask({ id: Date.now(), text: text.trim(), completed: false, priority }));
    setText("");
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2 border-2 border-black p-2"
      style={{ background: "var(--white)", fontFamily: "var(--font)" }}
    >
      <input
        type="text"
        placeholder="WHAT NEEDS TO BE DONE?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        className="flex-1 px-3 py-2 outline-none text-sm bg-transparent"
        style={{ fontFamily: "var(--font)" }}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border-2 border-black px-2 py-1 text-xs font-bold tracking-widest outline-none"
        style={{ background: "var(--pink-light)", fontFamily: "var(--font)" }}
      >
        <option value="low">LOW</option>
        <option value="medium">MED</option>
        <option value="high">HIGH</option>
      </select>

      <button
        onClick={handleAddTask}
        className="border-2 border-black px-4 py-2 flex items-center gap-2 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition"
        style={{ background: "var(--pink)" }}
      >
        <FaPlus className="text-xs" />
        <span className="hidden sm:block">ADD_TASK</span>
      </button>
    </Motion.div>
  );
}