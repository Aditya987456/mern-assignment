import {
  Trash2,
  CheckCircle,
  Pencil,
} from "lucide-react";

export default function TaskCard({
  task,
  handleDeleteTask,
  handleToggleStatus,
  handleUpdateTask,
}) {
  return (
    <div className="border rounded-xl p-5 flex justify-between items-center">
      
      {/* Task Info */}
      <div>
        <h3 className="font-semibold text-xl">
          {task.title}
        </h3>

        <p className="text-gray-500">
          {task.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>

        {/* Toggle Status */}
        <button
          onClick={() =>
            handleToggleStatus(task._id)
          }
          className="border p-2 rounded-lg hover:bg-gray-100"
        >
          <CheckCircle size={18} />
        </button>

        {/* Update Task */}
        <button
          onClick={() => {
            const title = prompt(
              "Enter new title",
              task.title
            );

            if (!title) return;

            const description = prompt(
              "Enter new description",
              task.description
            );

            if (!description) return;

            handleUpdateTask(task._id, {
              title,
              description,
            });
          }}
          className="border p-2 rounded-lg text-blue-500 hover:bg-blue-50"
        >
          <Pencil size={18} />
        </button>

        {/* Delete Task */}
        <button
          onClick={() =>
            handleDeleteTask(task._id)
          }
          className="border p-2 rounded-lg text-red-500 hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}