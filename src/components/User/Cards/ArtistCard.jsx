import React, { useEffect, useState } from "react";
import { RiUserAddLine,RiUserFollowLine} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FollowArtist, UnfollowArtist, isFollowing } from "../../../Api/Api";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast'

const ArtistCard = ({ data}) => {
  const [following, setFollowing] = useState(false);
  const {id} = useSelector((state)=>state.user)
  const navigate = useNavigate()

  console.log(id, data.username, 'Ids');
  const handleFollow = async () => {
    const result = await FollowArtist(id,data._id);
    console.log(result);
    if (result.success) {
      console.log('success');
      setFollowing(true);
      toast.success(`followed ${data.username}`)
      console.log(result.message)
    }
  };
  const handleUnFollow = async () => {
    const result = await UnfollowArtist(id, data._id);
    console.log(result);
    if (result.success) {
      setFollowing(false);
      setToasting(result.message);
    }
  };
  useEffect(() => {
    const invoke = async () => {
      const result = await isFollowing(id, data._id);
      if (result.success) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    };
    invoke();
  }, []);


  return (
    <div
      className="flex flex-col w-[210px] h-auto p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    
    >
      <div className="relative w-full h-50 group">
      <Link to={"/show-artist"} state={data}>
        <div className="absolute  inset-0 justify-center items-center hover:bg-black/50 bg-opacity-50"></div>
        <img className="hover:scale-100" src={data.imgURL}></img>
        </Link>
      </div>
      <div className="mt-4 flex flex-col">
     
        <div className="flex justify-between items-center text-md">
        <p className="font-semibold text-md text-white truncate">
          <Link>{data.username}</Link>
        </p>
        {!following?<button onClick={handleFollow}><RiUserAddLine className="text-xl" /></button>:<RiUserFollowLine onClick={handleUnFollow} className="text-xl" />}
          
        </div>
      </div>
    </div>
  );
  
};


export default ArtistCard;
