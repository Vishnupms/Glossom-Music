
import { Navigate } from 'react-router-dom'
import Instance from './src/Axios/Instance'

const protectedRoutes =({children})=>{
    const token = localStorage.getItem("token")
    if(token){
        Instance.get("/verifyUser",
        {headers : {
            Authorization:"Bearer" + localStorage.getItem("token")
        }})
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

export default protectedRoutes