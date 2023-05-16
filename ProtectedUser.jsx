
import { Navigate } from 'react-router-dom'
import Instance from './src/Axios/Instance'

const protectedUser =({children})=>{
    const token = localStorage.getItem("token")
    if(token){
        Instance.get("/user/verifyUser")
        .then((response)=>{
            const user = response.data.user

            if(user.isBanned == true){
                localStorage.clear()
                window.location.reload()
                return <Navigate to = {"/login"} replace = {true}></Navigate>
            }else{
                return children
              }
        })
    }else{

        return <Navigate to = {"/login"} replace = {true}></Navigate>
    }
    return children
}

export default protectedUser