import React, { useEffect, useState } from 'react'
import ArtistLayout from '../../pages/Artist/ArtistLayout'
import { deleteSong, getMyTracks } from '../../Api/ArtistApi';
import DropdownMenu from './DrpDwn';
import { toast } from 'react-hot-toast';

function MySongs() {
  const[data,setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const invoke = async () => {
        const result = await getMyTracks();
        if (result.success) {
          setData(result.songs)
        }
      };
    invoke();
  }, [isModalOpen]);

  const handleDelete = async (id) => {
    const result = await deleteSong(id);
    if (result.success) {
     toast.success(result.message)
     setData()
     setIsModalOpen(false)
    }
  };
  const handleToggle =()=>{
    setIsModalOpen(!isModalOpen)
  }
  return (
    <ArtistLayout>
    <div className="px-6 h-screen hide-scrollbar flex xl:flex-row flex-col-reverse">
    <div className="mt-8 flex-1 h-50  ">


  <div className="text-center border-b pb-5 flex items-center justify-center">
<h3 className="text-white ml-15 text-4xl ">My Songs</h3>

</div>


 <div className="mt-9 w-4/5 overflow-y-hidden mx-auto">
 {data ? data && <div className="mt-2 overflow-x-auto" >
                <table className="w-[94%] text-sm text-left text-gray-500 dark:text-gray-400">
                  {data.map((song) => (
                    <tbody>
                      <tr className=" bg-white/5 bg-opacity-80 hover:bg-white/10">
                        <th scope="row" className="flex z-10 items-center px-4 py-3 sm:px-6 sm:py-4 text-base text-gray-900 dark:text-white">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={song.imgURL}
                            alt="Jese image"
                          />
                          <div className="pl-2">
                            <div className="text-white font-normal text-lg">{song.name}</div>
                      
                          </div>
                          
                        </th>
                        <td className="px-4 py-3 text-teal-500 sm:px-6 sm:py-4">
                          <h4>{song.views} plays</h4>
                        </td>
                       {/* <PlayPause
                       isPlaying={isPlaying}
                       activeSong={activeSong}
                       song={data}
                       />
                         */}
                      <DropdownMenu
                       handleToggle={handleToggle}
                      />
                      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-md max-h-full mx-auto my-8">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={closeModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this song?
                  </h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full md:w-auto flex items-center justify-center gap-2 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Cancel
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-full md:w-auto flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={()=>handleDelete(song._id)}
                  >
                    Delete
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.714 5.71A1.998 1.998 0 0117.002 8v8a2 2 0 01-2 2H5.002a2 2 0 01-2-2V8a1.998 1.998 0 012.286-2.29l.714.715V8a1 1 0 102 0V5.425l.707-.707a1 1 0 011.414 0zM7 7v7a1 1 0 102 0V7a1 1 0 10-2 0zm4 0v7a1 1 0 11-2 0V7a1 1 0 112 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
                      </tr>
                      &nbsp;
                    </tbody>
                    
                    
                  ))}
                </table>
              </div> : "You have not added a song yet"}
              
    </div>
    </div>
    </div>
 </ArtistLayout>
  )
}

export default MySongs