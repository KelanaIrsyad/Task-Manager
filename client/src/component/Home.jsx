import { useState } from "react";
import Card from "./Card";
import Header from "./Header";
import { IoMdAdd } from "react-icons/io";
import TaskList from "../Task/TaskList";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="text-white">
      <Header />

      <TaskList />

      <div className="fixed bottom-2 right-5">
        <button
          className="bg-blue-500 text-4xl text-white rounded-full p-3 shadow-lg"
          onClick={toggleOpen}
        >
          <IoMdAdd />
        </button>
        {isOpen && (
          <div className="relative">
            <div className="absolute bottom-20 right-0 flex flex-col space-y-2">
              <button className="bg-green-500 text-white rounded-full p-3 shadow-lg">
                Add
              </button>
              <button className="bg-yellow-500 text-white rounded-full p-3 shadow-lg">
                History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
