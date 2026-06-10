import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import CreateTaskForm from "../components/Taskform";
import TaskCard from "../components/TaskCard";

import { backendUrl } from "../config";
import { getAuthConfig } from "../utils/auth"; //now no need to do all like extract token then pass in autorization....

export default function Dashboard() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    // our all to-do is in array like things state.
    const [tasks, setTasks] = useState([]);

    //----------check is dashboard is protected or not i.e who is accessing have tokenor not?-----------
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        getTasks();
    }, []);



    // 1. get tasks
    const getTasks = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${backendUrl}/api/task/get`,
                getAuthConfig()
            );

            setTasks(response.data.Task);

        } catch (error) {
            toast.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };



    // 2. create task
    const handleCreateTask = async (taskData) => {
        try {

            const payload = {
                title: taskData.title.trim(),
                description: taskData.description.trim(),
            };

            if (!payload.title) {
                return toast.error("Title is required");
            }

            await axios.post(
                `${backendUrl}/api/task/create`,
                payload,
                getAuthConfig()
            );

            toast.success("Task created");

            getTasks();

        } catch (error) {
            toast.error("Failed to create task");
        }
    };



    // 3. delete task
    const handleDeleteTask = async (id) => {
        try {

            await axios.delete(
                `${backendUrl}/api/task/delete/${id}`,
                getAuthConfig()
            );

            toast.success("Task deleted");

            getTasks();

        } catch (error) {
            toast.error("Failed to delete task");
        }
    };



    // 4. patch task
    const handleToggleStatus = async (id) => {
        try {

            await axios.patch(
                `${backendUrl}/api/task/${id}/status`,
                {},
                getAuthConfig()
            );

            toast.success("Status updated");

            getTasks();

        } catch (error) {
            toast.error("Failed to update status");
        }
    };


    //5. update task --
    const handleUpdateTask = async (
        id,
        updatedData
        ) => {
        try {
            const payload = {
            title: updatedData.title.trim(),
            description:
                updatedData.description.trim(),
            };

            await axios.put(
            `${backendUrl}/api/task/update/${id}`,
            payload,
            getAuthConfig()
            );

            toast.success("Task updated");

            getTasks();
        } catch (error) {
            toast.error("Failed to update task");
        }
        };



    return (
        <>
            <Navbar />

            <div className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Side */}
                    <div>
                        <CreateTaskForm
                            handleCreateTask={handleCreateTask}
                        />
                    </div>

                    {/* Right Side */}
                    <div className="lg:col-span-2">

                        <h2 className="text-2xl font-semibold mb-6">
                            Your Tasks
                        </h2>

                        {loading ? (
                            <p>Loading...</p>
                        ) : tasks.length === 0 ? (
                            <div className="border rounded-xl p-8 text-center">
                                No tasks found
                            </div>
                        ) : (
                            <div className="space-y-4">

                                {tasks.map((task) => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        handleDeleteTask={handleDeleteTask}
                                        handleToggleStatus={handleToggleStatus}
                                        handleUpdateTask ={handleUpdateTask }
                                    />
                                ))}

                            </div>
                        )}

                    </div>

                </div>
            </div>
        </>
    );
}

