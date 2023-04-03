import React,{ useState } from "react"; 
function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
  
      <div className="container flex justify-between items-center mx-auto">
        {/* Logo */}

        {/* Search bar */}
        <div className="relative">
          <input type="text" className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:shadow-outline" placeholder="Search..." />
          <div className="absolute top-0 left-0 flex items-center h-full ml-4">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.5 15.5l5.5 5.5"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 17a7 7 0 1 1 5.2-2.3"></path>
            </svg>
          </div>
        </div>

        {/* Dropdown menu */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center text-white focus:outline-none">
            <span className="hidden md:inline">User</span>
            <svg className="w-4 h-4 fill-current ml-2" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M3 6a3 3 0 116 0 3 3 0 01-6 0zm9-3a3 3 0 100 6 3 3 0 000-6z"></path>
            </svg>
          </button>

          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 py-2 bg-gray-800 rounded-md shadow-lg z-10">
              <li><a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Profile</a></li>
              <li><a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Settings</a></li>
              <li><a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Logout</a></li>
            </ul>
          )}
        </div>
      </div>
  
  );
}

export default Header;