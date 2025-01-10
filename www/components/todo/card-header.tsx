"use client"
import React, { useState } from 'react';
import Modal from './modal';

interface DateProps {
  date: string;
  day: string;
  month: string;
  year: string;
  onAddTask: (title: string, description: string, priority: string) => void;
}

export default function CardHeader({
  date,
  day,
  month,
  year,
  onAddTask,
}: DateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (title: string, description: string, priority: string) => {
    onAddTask(title, description, priority);
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center gap-40">
      {/* today date */}
      <div className="flex items-center">
        <h1 className="text-4xl font-medium">{date}</h1>
        <div className="flex flex-col pl-3">
          <p className="text-gray-500 text-sm">{day}</p>
          <p className="text-gray-500 text-sm">
            {month} {year}
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* new task button */}
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
        <span className="text-black uppercase text-sm font-bold">New Task</span>
      </div>
    </div>
  );
}