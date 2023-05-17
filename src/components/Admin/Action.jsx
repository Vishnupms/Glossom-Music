import { useState } from 'react';

function Action({handleToggle,name,id}) {
  const [isOpen, setIsOpen] = useState(false);



  return (
    <div className="relative">
      <button
        id="dropdownMenuIconButton"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-4 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdownDots"
          className="fixed left-auto z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconButton"
          >
            <li>
              <a
                onClick={()=>handleToggle(id)}
                className="block px-4 py-2 hover:bg-red-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {name==="user"?"Ban":"Verify "}
              </a>
            </li>
    
          </ul>
    
        </div>
      )}
    
    </div>
  );
}

export default Action