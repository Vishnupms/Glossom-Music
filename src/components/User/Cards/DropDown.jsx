import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dropdown() {
    const user = useSelector((state)=>(state.user))
    console.log(user,"svss")
    const navigate = useNavigate()
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="flex items-center justify-center focus:outline-none">
                <img
                  src={user?.imgUrl}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2 mr-1 text-white font-medium">{user?.name}</span>
                <ChevronDownIcon
                  className="w-5 h-5 text-gray-600"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items
                static
                className="absolute right-0 w-52 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-700">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.email}
                  </p>
                </div>

                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={()=>navigate("/profile")}
                        className={`${
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        <span>Profile</span>
                      </a>
                    )}
                  </Menu.Item>
                </div>

                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/login"
                        onClick={()=>{localStorage.clear()}}
                        className={`${
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        <span>Logout</span>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}

export default Dropdown;
