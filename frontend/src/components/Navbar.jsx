import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => setMenuActive((prev) => !prev);

  return (
    <nav className="bg-gray-800 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="flex justify-between items-center ">
        <h1 className="text-white text-sm font-bold text-center sm:text-left sm:text-2xl overflow-hidden">
          Task Management
        </h1>
        <button className="text-gray-300 sm:hidden" onClick={toggleMenu}>
          {menuActive ? <X size={36} /> : <Menu size={36} />}
        </button>
      </div>
      <div
        className={`flex-col gap-4 mt-4 sm:mt-0 sm:flex sm:flex-row sm:gap-6 ${
          menuActive ? "flex" : "hidden"
        }`}
      >
        <Link to="/" className="text-gray-300 hover:text-white">
          Home
        </Link>
        <Link to="/register" className="text-gray-300 hover:text-white">
          Register
        </Link>
        <Link to="/login" className="text-gray-300 hover:text-white">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
