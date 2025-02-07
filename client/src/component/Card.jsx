
function Card({ onDelete, onUpdate, task  }) {
    

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-blue-100 p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-black font-bold">{task?.title || "Loading..."}</span>
          <span className="text-sm text-gray-500">{task?.dueDate || "Loading..."}</span>
        </div>
        <p className="text-gray-700">{task?.category || "Loading..."}</p>
        <p className="text-gray-700">{task?.status || "Loading..."}</p>
        <p className="text-gray-600">{task?.description || "Loading..."}</p>
        <div className="mt-2 flex space-x-2">
          <button onClick={() => onUpdate(task)}
          className="bg-yellow-500 text-white px-2 py-1 rounded">
            Edit
          </button>
          <button onClick={() => onDelete(task?._id)}
          className="bg-red-500 text-white px-2 py-1 rounded">
            Delete
          </button>
          {/* <button
          className="bg-green-500 text-white px-2 py-1 rounded">
            Update Status
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
