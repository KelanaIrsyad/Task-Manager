const { TaskModel } = require("./task.model");

async function CreateTask(req, res) {
  try {
    const newTask = new TaskModel({
      ...req.body,
      userId: req.user.userId,
    });
    const result = await newTask.save();
    return res
      .status(201)
      .json({ message: "Task berhasil ditambahkan", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menambahkan task", error: error.message });
  }
}

async function UpdateTask(req, res) {
  try {
    const task = await TaskModel.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.category = req.body.category || task.category;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.updatedAt = Date.now();

    await task.save();
    res.status(200).json({ message: "Task berhasil diupdate", data: task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengupdate task", error: error.message });
  }
}

async function GetTask(req, res) {
  try {
    const tasks = await TaskModel.find({ userId: req.user.userId });
    return res
      .status(200)
      .json({ message: "Berhasil mendapatkan task", data: tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mendapatkan task", error: error.message });
  }
}

async function GetTaskById(req, res) {
  try {
    const task = await TaskModel.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task berhasil didapatkan", data: task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mendapatkan task", error: error.message });
  }
}

async function DeleteTask(req, res) {
    try {
        const task = await TaskModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        })
        if(!task) return res.status(404).json({ message: "Task not found" })
        res.status(201).json({ message: "Task berhasil dihapus", data: task })
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus task", error: error.message })
    }
}

module.exports = {
  CreateTask,
  UpdateTask,
  GetTask,
  GetTaskById,
  DeleteTask
};
