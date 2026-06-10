import { useState } from "react";

export default function CreateTaskForm({
  handleCreateTask,
}) {
  const [taskData, setTaskData] =
    useState({
      title: "",
      description: "",
    });

  const handleChange = (e) => {
    setTaskData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreateTask(taskData);

    setTaskData({
      title: "",
      description: "",
    });
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-5">
        Add New Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Task title"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Task description"
          rows="5"
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}