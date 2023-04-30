import React from 'react'
import PlayPause from './PlayPause'
import { useSelector } from 'react-redux'

function Tables({data}) {
  const {activeSong,isPlaying,currentSongs} = useSelector((state)=>state.player)
  return (
    <>
       {data ? data && <div className="mt-2 overflow-x-auto" >
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {data.map((song, i) => (
                    <tbody>
                      <tr className=" bg-white/5 bg-opacity-80 backdrop-blur-sm hover:bg-white/10">
                        <th scope="row" className="flex items-center px-4 py-3 sm:px-6 sm:py-4 text-base text-gray-900 dark:text-white">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={song.imgURL}
                            alt="Jese image"
                          />
                          <div className="pl-2">
                            <div className="text-white font-normal text-lg">{song.name}</div>
                            <div className=" text-gray-500 text-sm ">
                              { }
                            </div>
                          </div>
                          
                        </th>
                        <td className="px-4 py-3  sm:px-6 sm:py-4">
                          {song.artist}
                        </td>
                       <PlayPause
                       isPlaying={isPlaying}
                       activeSong={activeSong}
                       song={data}
                       />
                        
                      </tr>
                      &nbsp;
                    </tbody>
                  ))}
                </table>
              </div> : "You have not added a song yet"}
    </>
  )
}

export default Tables