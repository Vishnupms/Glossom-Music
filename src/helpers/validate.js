import { toast } from "react-hot-toast";


export  async function siginupValidation(values){
    let error = {}

    if(!values.username){
       return error.username =toast.error('Name Required....🤔!');
    }else if(!values.email){
        return  error.email =toast.error('Email Required....😒!');
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values.email)){
       return error.email =toast.error('Invalid email....!');
    }else if(!values.phone){
        return error.phone =toast.error('phone Required....🙌!');
    }else if(values.phone.length<9){
        return  error.phone =toast.error('phone number error...!📞')
    }else if(!values.password){
       return error.password =toast.error('password Required....🙌!');
    }else if(values.password.length<4){
       return error.password = toast.error('password must be more than 4! characters')
    }else if(values.password != values.cnfpswd){
        return error.password = toast.error('password should be same')
    }
    

}
export  async function loginValidation(values){
    let error= {}
    if(!values.email){
        return error.email =toast.error('Email Required....😒!');
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values.email)){
        return  error.email =toast.error('Invalid email....!');

    }
}
