import { createSlice } from "@reduxjs/toolkit";

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const initialState = {
  tasks: storedTasks,
  filter: "all"
};

// ✅ Bug 5 fixed — spread into plain array before stringifying
const persist = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify([...tasks]));
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    addTask: (state, action) => {
      state.tasks.push(action.payload);
      persist(state.tasks);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      persist(state.tasks);
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      persist(state.tasks);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    clearCompleted: (state) => {
      state.tasks = state.tasks.filter(task => !task.completed);
      persist(state.tasks);
    }

  }
});

export const {
  addTask,
  deleteTask,
  toggleTask,
  setFilter,
  clearCompleted
} = taskSlice.actions;

export default taskSlice.reducer;