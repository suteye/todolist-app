// import { create } from "zustand";

import { create } from "zustand";


// // Zustand store to manage tasks
// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   priority: "normal" | "medium" | "high" | "done";
//   completed: boolean;
// }

// interface TaskStore {
//   tasks: Task[];
//   addTask: (newTask: Task) => void;
//   setTasks: (tasks: Task[]) => void;
// }

// export const useTaskStore = create<TaskStore>((set) => ({
//   tasks: [],
//   addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
//   setTasks: (tasks) => set({ tasks }),
// }));


interface Task {
    id: number;
    title: string;
    description: string;
    priority: "normal" | "medium" | "high" | "done";
    completed: boolean;
  }
  
  interface TaskStore {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    setTasks: (tasks: Task[]) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: number) => void;
  }
  
  export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
    setTasks: (tasks) => set({ tasks }),
    updateTask: (updatedTask) => set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
    deleteTask: (id) => set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  }));