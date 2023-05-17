import React, { useEffect, useState } from "react";
import { blockUser, getAllArtist } from "../../Api/AdminApi";
import AdminLayout from "../../pages/Admin/AdminLayout";
import Action from "./Action";
import { toast } from "react-hot-toast";
import { verifyArtist } from "../../Api/AdminApi";

function ArtistTables() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function invoke() {
      const data = await getAllArtist();
      setData(data);

    }
    invoke();
  }, [isModalOpen]);

  const searchData = (artist) => {
    return search === ""
      ? artist
      : artist.username.toLowerCase().includes(search) ||
      artist.phone.includes(search);
  };

  

  const ArtistVerify = async (id) => {
    const shouldVerify = window.confirm("Are you sure you want to verify this artist?");
    if (shouldVerify) {
    try {
      const data = await verifyArtist(id);
      if (data.status === "success") {
        toast.success(data.message);
        setIsModalOpen(false);
      }
    } catch (error) {
    }
  }
  };
  const handleToggle = (id) => {
    ArtistVerify(id)
  };
  return (
    <>
      <AdminLayout>
        <div className="px-6 h-screen hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="mt-8 flex-1 h-50  ">
            <div className="text-center border-b pb-5 flex items-center justify-center">
              <h3 className="text-white ml-15 text-4xl ">Artists</h3>
            </div>
            <div className="mt-2 flex items-center justify-center pb-2 bg-transparent dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  onChange={(e) => {
                    let searchValue = e.target.value.toLocaleLowerCase();
                    setSearch(searchValue);
                  }}
                  type="text"
                  id="table-search"
                  className="block p-2 pl-8 text-sm text-white rounded-lg w-full bg-white/10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-base"
                  placeholder="Search for Artist"
                />
              </div>
            </div>

            <div className="w-4/5 overflow-y-hidden mx-auto">

              
              {data && (
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {data.filter(searchData).map((user) => (
                  


                      <tbody>
                        <tr className=" bg-white/5 bg-opacity-80  hover:bg-white/10">
                          <th
                            scope="row"
                            className="flex items-center px-4 py-3 sm:px-6 sm:py-4 text-base text-gray-900 dark:text-white"
                          >
                            <img
                              className="w-10 h-10 rounded-full"
                              src={user.imgURL}
                              alt="Jese image"
                            />
                            <div className="pl-2">
                              <div className="text-white font-normal text-base">
                                {user.username}
                              </div>
                            </div>
                          </th>
                          <td className="px-4 py-3 text-slate-400 sm:px-6 sm:py-4">
                            {user.email}
                          </td>
                          <td className="px-4 py-3  sm:px-6 sm:py-4">
                            {user.phone}
                          </td>

                          <Action handleToggle={handleToggle} id={user._id} />
                        </tr>
                        &nbsp;
                      </tbody>
                    ))}
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default ArtistTables;
