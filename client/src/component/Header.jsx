import { CiSearch } from 'react-icons/ci';
import { IoIosLogOut } from "react-icons/io";
import { useContext, useState } from "react";
import AuthContext from "../contex/AuthContex";
import { useNavigate } from "react-router";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/")
  }

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header>
      <div className="flex justify-between items-center"> {/* Tambahkan items-center */}
        <p className="m-3 text-white">Hallo user</p> {/* Tambahkan text-white agar terlihat di background biru */}
        <div className="flex items-center"> {/* Bungkus ikon dan input dalam div */}
          <CiSearch
            className="text-2xl m-3 text-white cursor-pointer"  // Tambahkan cursor-pointer dan text-white
            onClick={handleSearchIconClick}
          />
          {isSearchVisible && ( // Tampilkan input hanya jika isSearchVisible true
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md p-2 mr-3 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        )}
        <IoIosLogOut className="text-white text-2xl mr-2 cursor-pointer" onClick={handleLogout}/>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-center p-8 text-white"> {/* Tambahkan text-white */}
        Welcome to the Home Page
      </h1>
    </header>
  );
};

export default Header;