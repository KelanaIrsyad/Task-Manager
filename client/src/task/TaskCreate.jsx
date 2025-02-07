import { useState } from "react";
import { useNavigate } from "react-router";

function TaskCreate() {
    const [task, setTask] = useState({
      title: "",
      description: "",
      category: "Work",
      status: "Pending",
      dueDate: "",
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setTask({
        ...task,
        [e.target.name]: e.target.value,
      });
      console.log("Updated task:", task);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
  
      setLoading(true);
      setError(null);
  
      try {
        const res = await fetch("http://localhost:3000/api/task/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
          body: JSON.stringify(task),
        });
        if(!res.ok){
            throw Error("Gagal create task")
        }
        navigate("/home")
  
        const result = await res.json();
        console.log(result)
        // Reset the form after successful submission
        setTask({
          title: "",
          description: "",
          category: "Work",
          status: "Pending",
          dueDate: "",
        });
  
        alert("Task created successfully!"); // Or use a better notification system
      } catch (err) {
        setError(err.message);
        console.error("Error creating task:", err); // Log the full error object
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h1>Create Task</h1>
        <form onSubmit={handleSubmit}>
        <label className="block font-semibold">Title</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Task title" className="w-full p-2 border rounded mb-2" />

        <label className="block font-semibold">Description</label>
        <textarea name="description" value={task.description} onChange={handleChange} placeholder="Task description" className="w-full p-2 border rounded mb-2"></textarea>

        <label className="block font-semibold">Due Date</label>
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} className="w-full p-2 border rounded mb-2" />

        <label className="block font-semibold">Category</label>
        <select name="category" value={task.category} onChange={handleChange} className="w-full p-2 border rounded mb-2">
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
        </select>

        <label className="block font-semibold">Status</label>
        <select name="status" value={task.status} onChange={handleChange} className="w-full p-2 border rounded mb-2">
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
          <button type="submit" disabled={loading}>
            Create Task
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default TaskCreate;
