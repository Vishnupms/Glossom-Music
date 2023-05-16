import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Player from "../../MusicPlayer/Player";
import { toast } from "react-hot-toast";
import {
  addSongToPlaylist,
  getPlaylist,
  getViewPlaylist,
} from "../../../Api/Api";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../../pages/User/Layout";
import TopPlay from "../ToPlay";
import Tables from "../Cards/Tables";
import Dropdown from "../Cards/DropDown";

function GetPlaylist() {
  const song = useSelector((state) => state.player.data);
  const userId = useSelector((state) => state.user.id);
  const location = useLocation();
  const listId = location?.state;

  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [playlist, setPlaylist] = useState("");
  const [addSong, setAddSong] = useState("");
  const [playId, setPlayId] = useState("");
  const [listsongs, setListSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [tempSong, setTempSong] = useState(song);
  const [change, setChange] = useState(false);
  useEffect(() => {
    async function invoke() {
      const data = await getViewPlaylist(listId);
      if (data.success === true) {
        console.log(data.data[0].songs, "songiomm");
        setListSongs(data.data[0].songs);
        console.log(listsongs, "listed");
      } else {
      }
    }
    invoke();
  }, [change]);

  const handleSave = () => {
    // Save the edited name and exit edit mod

    setEditing(false);
  };

  //search data .......................................

  const searchData = (song) => {
    return search === ""
      ? song
      : song.name.toLowerCase().includes(search) ||
          song.album.toLowerCase().includes(search);
  };

  //.............................................
  const handleCancel = () => {
    // Discard the changes and exit edit mode

    setEditing(false);
  };
  useEffect(() => {
    async function invoke() {
      const data = await getPlaylist(listId);
      if (data.success === true) {
        setPlaylist(data.playlist);
      }
    }
    invoke();
  }, []);

  let obj = {
    playid: playId,
    songid: addSong,
    Id: userId,
  };
  const handleAddPlayList = async () => {
    if (playId) {
      const data = await addSongToPlaylist(obj);
      if (data.success == true) {
        change === true ? setChange(false) : setChange(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      console.log(error, "something went wrong");
    }
  };

  return (
    <Layout>
      <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
        <div className="flex-1 h-fit pb-40">
          <div className="mt-20 relative">
            <div className="ml-20 -mt-20 w-40 h-40 absolute ">
              <label htmlFor="file-input">{/* <PlaylistCard2 /> */}</label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className=" text-center -mt-14 border-b pb-10  flex flex-col items-center">
            {editing ? (
              // Show the text field when editing is true
              <div className="flex items-center">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="mr-2 px-2 py-1  border border-gray-400 rounded"
                />
                <button
                  onClick={() => {
                    handleSave();
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Show the name and edit icon when editing is false
              <h1
                className="text-4xl font-medium text-gray-400 flex items-center"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {playlist?.title}
                {hovered && (
                  <AiOutlineEdit
                    className="ml-2 cursor-pointer"
                    onClick={() => setEditing(true)}
                  />
                )}
              </h1>
            )}
          </div>

          <div className="mt-2 overflow-y-hidden">
            <Tables data={listsongs} />
          </div>
        </div>
        <div className="xl:sticky top-2 h-fit">
        <div className="mt-2 ml-72">

<Dropdown />
  </div>
          <div className="ml-10 flex items-center justify-center pb-2 bg-transparent dark:bg-gray-900">
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
                placeholder="Search for songs"
              />
            </div>
          </div>

          {/* {TOP SONGS} */}
          <div className="xl:ml-14 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[350px] max-w-full flex flex-col">
            <div className="w-full flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-white font-bold text-xl">Top Songs</h2>
              </div>

              <div className="mt-4 flex flex-col gap-1">
                {tempSong.filter(searchData).map((song) => (
                  <div
                    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
                      song?.title ? "bg-[#4c426e]" : "bg-transparent"
                    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
                  >
                    <div className="flex-1 flex flex-row justify-between items-center">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={song?.imgURL}
                        alt={song?.title}
                      />
                      <div className="flex-1 flex flex-col justify-center mx-3">
                        <p className="text-lg font-bold text-white">
                          {song?.name}
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          {song?.artist}
                        </p>
                      </div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded-full"
                        onClick={() => {
                          setAddSong(song?._id);
                          setPlayId(playlist?._id);
                          handleAddPlayList();
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>

    //
  );
}

export default GetPlaylist;
