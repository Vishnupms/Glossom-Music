
import { Navigate } from 'react-router-dom'
import AdminInstance from './src/Axios/AdminInstance'

const ProtectedAdmin = ({ children }) => {
    const token = localStorage.getItem("admintoken")
    if (token) {
        AdminInstance.get("/admin/verifyAdmin")
            .then((response) => {
                if (response.admin) {
                    return children
                }

            })
    } else {

        return <Navigate to={"/admin/login"} replace={true}></Navigate>
    }
    return children
}

export default ProtectedAdmin