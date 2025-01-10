import { updateTask as updateTaskToServer } from '../../app/actions/todos/update-task';
import { deleteTask as deleteTaskToServer } from '../../app/actions/todos/delete-task';
import { useTaskStore } from '../../lib/store/task-store';

export interface TaskProps {
  id: number;
  title: string;
  description: string;
  priority: "normal" | "medium" | "high" | "done";
  completed: boolean;
  onEdit: (task: TaskProps) => void;
  onDelete?: () => void;
}

export default function Card({
  id,
  title,
  description,
  priority,
  completed,
  onEdit,
  onDelete,
}: TaskProps) {
  const updateTaskInStore = useTaskStore((state) => state.updateTask);
  const deleteTaskInStore = useTaskStore((state) => state.deleteTask);

  const handleCheckboxChange = async () => {
    try {
      const updatedTask = await updateTaskToServer({ id, title, description, priority, is_completed: !completed });
      updateTaskInStore({
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.task_des,
        priority: updatedTask.task_priority as "normal" | "medium" | "high" | "done",
        completed: updatedTask.is_completed,
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTaskToServer(id);
      deleteTaskInStore(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const priorityColor = {
    normal: "bg-[#3E9AEB]",
    medium: "bg-[#F7C948]",
    high: "bg-[#FC6E3E]",
    done: "bg-[#08B037]",
  };

  const priorityText = {
    normal: "normal priority",
    medium: "medium priority",
    high: "high priority",
    done: "done",
  };

  const color = completed
    ? priorityColor.done
    : priorityColor[priority.toLowerCase() as keyof typeof priorityColor];

  const priorityTextValue = completed
    ? priorityText.done
    : priorityText[priority.toLowerCase() as keyof typeof priorityText];

  return (
    <div
      className={`flex items-center justify-between p-4 mt-4 w-[350px] max-w-md rounded-md shadow-md ${color} text-white`}
    >
      {/* Left Section: Priority, Title, and Description */}
      <div className="flex-1">
        <p className="text-[10px] text-white uppercase">{priorityTextValue}</p>
        <h2 className="text-lg font-semibold truncate">{title}</h2>
        <p className="text-[10px] text-gray-200 truncate">{description}</p>
      </div>

      {/* Middle Section: Action Buttons */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onEdit({ id, title, description, priority, completed, onEdit, onDelete })}
          className="px-3 py-1 text-sm font-medium text-blue-500 transition-all duration-200 transform bg-white rounded-md shadow hover:bg-blue-100 hover:shadow-md"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm font-medium text-red-500 transition-all duration-200 transform bg-white rounded-md shadow hover:bg-red-100 hover:shadow-md"
        >
          Delete
        </button>
      </div>

      {/* Right Section: Checkbox */}
      <label className="ml-4 flex items-center cursor-pointer relative">
        <input
          defaultChecked={completed}
          type="checkbox"
          onChange={handleCheckboxChange}
          className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300 checked:border-slate-800"
        />
        <span className="absolute text-[#08B037] opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
    </div>
  );
}