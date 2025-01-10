"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { addTask as addTaskToServer } from '../../app/actions/todos/add-task';
import { updateTask as updateTaskToServer } from '../../app/actions/todos/update-task';
import { useTaskStore } from '../../lib/store/task-store';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: {
    id: number;
    title: string;
    description: string;
    priority: "normal" | "medium" | "high" | "done";
    completed: boolean;
  };
}

export default function Modal({ isOpen, onClose, task }: ModalProps) {
  const { data: session } = useSession();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || '');
  const [isClient, setIsClient] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTaskInStore = useTaskStore((state) => state.updateTask);

  // Ensures the code only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  if (!isClient || !isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (session?.user?.id) {
        if (task) {
          // Update existing task
          const updatedTask = await updateTaskToServer({ id: task.id, title, description, priority, is_completed: task.completed });
          updateTaskInStore({
            id: updatedTask.id,
            title: updatedTask.title,
            description: updatedTask.task_des,
            priority: updatedTask.task_priority as "normal" | "medium" | "high" | "done",
            completed: updatedTask.is_completed,
          });
        } else {
          // Add new task
          const res = await addTaskToServer({ title, description, priority, user_id: session.user.id });
          if (res) {
            addTask({
              id: res.id,
              title: res.title,
              description: res.task_des,
              priority: res.task_priority as "normal" | "medium" | "high" | "done",
              completed: res.is_completed,
            });
          }
        }

        // Clear form and close modal
        setTitle('');
        setDescription('');
        setPriority('');
        onClose();
      } else {
        console.error("Session user id is missing");
      }
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div tabIndex={-1} className="bg-white p-6 rounded shadow-lg w-96 z-60">
        <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {task ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}