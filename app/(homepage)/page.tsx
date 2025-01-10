"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import TaskList from "@/components/todo/task-list";
import { getAllTasks } from "../actions/todos/get-task";
import Modal from "@/components/todo/modal";
import { useTaskStore } from "@/lib/store/task-store";
import Navbar from "@/components/navbar";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "normal" | "medium" | "high" | "done";
  completed: boolean;
}

export default function Home() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);

  if (!session) {
    redirect("/login");
  }

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = await getAllTasks();
      setTasks(
        fetchedTasks.map((task) => ({
          id: task.id,
          title: task.title,
          description: task.task_des,
          priority: task.task_priority as "normal" | "medium" | "high" | "done",
          completed: task.is_completed,
        }))
      );
    }
    fetchTasks();
  }, [setTasks]);

  const handleEditTask = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTaskToEdit(task);
      setIsModalOpen(true);
    }
  };

  const todoTasks = tasks.filter((task) => !task.completed);
  const doneTasks = tasks.filter((task) => task.completed);

  return (
    <main>
      <Navbar />

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="max-w-sm mx-auto mt-10 p-5 bg-white shadow">
            <div className="flex justify-between items-center gap-20">
              {/* Today Date */}
              <div className="flex items-center">
                <h1 className="text-4xl font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    day: "numeric",
                  })}
                </h1>
                <div className="flex flex-col pl-3">
                  <p className="text-gray-500 text-sm">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Modal for adding/editing a task */}
              <Modal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setTaskToEdit(null);
                }}
                task={taskToEdit ?? undefined}
              />

              {/* New task button */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center w-6 h-6 bg-[#E03DEB] text-white rounded-full"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </button>
                <span className="text-black uppercase text-sm font-bold">
                  New Task
                </span>
              </div>
            </div>

            <div className="w-full mt-5 border-t border-gray-300 border-dashed" />

            {/* Task Lists */}
            <div className="flex flex-col items-center mt-5">
              <h3 className="text-lg uppercase font-medium">todo tasks</h3>
              {todoTasks.length > 0 ? (
                <TaskList
                  tasks={todoTasks.map((task) => ({
                    ...task,
                    onEdit: () => handleEditTask(task.id),
                    onDelete: () => {},
                  }))}
                  onEdit={handleEditTask}
                  onDelete={() => {}}
                />
              ) : (
                <p className="text-gray-500">No tasks today</p>
              )}
            </div>

            <div className="w-full mt-5 border-t border-gray-300 border-dashed" />

            <div className="flex flex-col items-center mt-5">
              <h3 className="text-lg uppercase font-medium">done tasks</h3>
              {doneTasks.length > 0 ? (
                <TaskList
                  tasks={doneTasks.map((task) => ({
                    ...task,
                    onEdit: () => handleEditTask(task.id),
                    onDelete: () => {},
                  }))}
                  onEdit={handleEditTask}
                  onDelete={() => {}}
                />
              ) : (
                <p className="text-gray-500">No tasks completed</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
