import { useState, useEffect } from "react";
import Card from "../component/Card";
import Swal from "sweetalert2";

function TaskList() {
  const [tasks, setTasks] = useState([]); // Gunakan array untuk menampung banyak task
  const [loading, setLoading] = useState(true); // Tambahkan state untuk loading
  const [error, setError] = useState(null); // Tambahkan state untuk error

  useEffect(() => {
    // Gunakan useEffect untuk fetch data setelah render pertama
    const fetchTaskList = async () => {
      setLoading(true); // Set loading ke true sebelum fetch
      setError(null); // Reset error

      try {
        const res = await fetch("http://localhost:3000/api/task", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });

        if (!res.ok) {
          // Cek status dengan res.ok (lebih baik dari !== 200)
          throw new Error(
            `Fetch task list failed with status ${res.status} ${res.message}`
          );
        }

        const result = await res.json();
        setTasks(result.data); // Update state dengan array task
        console.log(result.data);
      } catch (err) {
        setError(err.message); // Set error message
        console.error(err); // Gunakan console.error untuk error
      } finally {
        setLoading(false); // Set loading ke false setelah fetch selesai (baik sukses maupun gagal)
      }
    };

    fetchTaskList(); // Panggil fungsi fetch di dalam useEffect
  }, []); // [] memastikan useEffect hanya dijalankan sekali saat komponen di-mount

  if (loading) {
    return <div>Loading tasks...</div>; // Tampilkan pesan loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Tampilkan pesan error
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus tugas ini?",
      text: "Anda tidak akan bisa mengembalikannya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Tidak, batalkan",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/api/task/${id}`, {
            // Ganti dengan URL API Anda
            method: "DELETE",
            headers: {
              Authorization: localStorage.getItem("token"), // Jika menggunakan otentikasi
            },
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
              errorData.message || `HTTP error! status: ${res.status}`
            );
          }
          setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire("Gagal!", error.message, "error");
        }
      }
    });
  };

  const handleUpdate = (task) => {
    Swal.fire({
      title: "Update Task",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${
          task.title
        }">
        <textarea id="description" class="swal2-textarea" placeholder="Description">${
          task.description
        }</textarea>
        <select id="status" class="swal2-select">
          <option value="Pending" ${
            task.status === "Pending" ? "selected" : ""
          }>Pending</option>
          <option value="In Progress" ${
            task.status === "In Progress" ? "selected" : ""
          }>In Progress</option>
          <option value="Completed" ${
            task.status === "Completed" ? "selected" : ""
          }>Completed</option>
        </select>
      `,
      confirmButtonText: "Update",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        try {
          const title = Swal.getPopup().querySelector("#title").value.trim();
          const description = Swal.getPopup()
            .querySelector("#description")
            .value.trim();
          const status = Swal.getPopup().querySelector("#status").value;

          if (!title || !description) {
            Swal.showValidationMessage("Title and Description are required");
            return false;
          }

          return { title, description, status };
        } catch (error) {
          console.error("Error in preConfirm:", error);
          Swal.showValidationMessage("Unexpected error occurred");
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("User not authenticated. Please log in again.");
          }

          const updatedTask = { ...task, ...result.value };

          const res = await fetch(`http://localhost:3000/api/task/${task._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(updatedTask),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
              errorData.message || `HTTP error! status: ${res.status}`
            );
          }

          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === task.id ? { ...t, ...result.value } : t))
          );

          Swal.fire("Success!", "Task updated successfully.", "success");
        } catch (error) {
          console.error("Error updating task:", error);
          Swal.fire("Failed!", error.message, "error");
        }
      }
    });
  };

  return (
    <>
      {tasks.map((task) => (
        <Card
          key={task._id}
          task={task}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </>
  );
}

export default TaskList;
