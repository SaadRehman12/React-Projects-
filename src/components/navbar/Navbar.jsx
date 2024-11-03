import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Signout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.authSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(Signout());
    navigate('/SignIn');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-2xl"> {/* Adjusted to text-2xl */}
          <a href="/">Collaborative Study</a>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-white font-semibold text-lg"> {/* Adjusted to text-lg */}
          <a href="#home" className="hover:text-gray-200 transition duration-200">Home</a>
          <a href="#about" className="hover:text-gray-200 transition duration-200">About</a>
          <a href="#services" className="hover:text-gray-200 transition duration-200">Services</a>
          <a href="#contact" className="hover:text-gray-200 transition duration-200">Contact</a>
        </div>

        <div className="hidden md:block relative text-gray-600">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white h-10 px-4 pr-10 rounded-full text-lg focus:outline-none"  
          />
          <button type="submit" className="absolute right-0 top-0 mt-2 mr-3">
            <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-500" />  {/* Adjusted icon size */}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-white">
          <img src={user.profileImageUrl} className="w-14 h-14 rounded-full mr-4 border-2" alt="Profile" />
          <button onClick={handleClick} className="hover:text-gray-200 text-lg transition duration-200">Logout</button> {/* Adjusted to text-lg */}
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* Adjusted icon size */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 text-white font-semibold text-lg"> {/* Adjusted to text-lg */}
          <a href="#home" className="block px-4 py-2 hover:bg-indigo-600 rounded transition duration-200">Home</a>
          <a href="#about" className="block px-4 py-2 hover:bg-indigo-600 rounded transition duration-200">About</a>
          <a href="#services" className="block px-4 py-2 hover:bg-indigo-600 rounded transition duration-200">Services</a>
          <a href="#contact" className="block px-4 py-2 hover:bg-indigo-600 rounded transition duration-200">Contact</a>

          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white h-10 px-4 w-full rounded-full text-lg focus:outline-none" 
            />
          </div>

          <div className="flex flex-col px-4 space-y-2">
            <button className="w-full text-left bg-blue-500 hover:bg-indigo-600 rounded transition duration-200 px-4 py-2 text-lg">Profile</button> {/* Adjusted to text-lg */}
            <button onClick={handleClick} className="w-full text-left hover:bg-indigo-600 rounded transition duration-200 px-4 py-2 text-lg">Logout</button> {/* Adjusted to text-lg */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
