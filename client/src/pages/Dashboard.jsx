import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async (page = 1) => {
    try {
      const res = await API.get(
        `/tasks?page=${page}&limit=5&status=${statusFilter}&search=${search}`,
      );

      setTasks(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    await API.post("/tasks", form);

    setForm({
      title: "",
      description: "",
      status: "pending",
    });

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks(currentPage);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks(currentPage);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 p-6">
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Task Management Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Create Task Section */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Create New Task
        </h2>

        <form
          onSubmit={createTask}
          className="grid md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Description"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            className="border rounded-lg p-2"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-lg flex-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={() => fetchTasks()}
          className="bg-gray-800 text-white px-4 rounded-lg"
        >
          Apply
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks available
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border rounded-xl p-5 shadow-sm flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h3>
                <p className="text-gray-500">
                  {task.description}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                    task.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <select
                  className="border p-2 rounded-lg"
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">
                    In Progress
                  </option>
                  <option value="completed">
                    Completed
                  </option>
                </select>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => fetchTasks(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  </div>
);
};

export default Dashboard;
