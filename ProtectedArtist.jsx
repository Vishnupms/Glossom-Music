
import { Navigate } from 'react-router-dom'
import ArtistInstance from './src/Axios/ArtistInstance'

const ProtectedArtist =({children})=>{
    const token = localStorage.getItem("artisttoken")
    if(token){
        ArtistInstance.get("/artist/verifyArtist")
        .then((response)=>{
            const artist = response.data.artist
            if(artist.isBanned == true){
                localStorage.clear()
                window.location.reload()
                return <Navigate to = {"/artist/login"} replace = {true}></Navigate>
            }else{
                return children
              }
        })
    }else{

        return <Navigate to = {"/artist/login"} replace = {true}></Navigate>
    }
    return children
}

export default ProtectedArtist