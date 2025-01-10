import Card, { TaskProps } from "./card";

interface TaskListProps {
  tasks: TaskProps[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <div>
      {tasks.map((task) => (
        <Card
          key={task.id}
          {...task}
          onEdit={() => onEdit(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
}