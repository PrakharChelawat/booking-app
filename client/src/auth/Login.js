import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify';
import  Loginform  from '../components/Loginform'
import { login } from '../actions/auth'
import { useDispatch } from 'react-redux'
const Login = ({history}) =>{
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const dispatch = useDispatch()
    const onHandleSubmitLogin=async (e)=>{
        e.preventDefault();
        // console.log({email,password})
        try{
            const res= await login({
                email,
                password,
            });
            // console.log(res);
            // save user and token to localstorage
            window.localStorage.setItem('auth',JSON.stringify(res.data))
            // save user and token to redux
            dispatch({
                type:"LOGGED_IN_USER",
                payload:res.data,

            })
            history.push("/dashboard")

            if(res.data){
                console.log("save user res in redux state and then in local storage")
                console.log(res.data)
            }
        }catch(err){
            if(err.response.status === 400) toast.error(err.response.data)
            console.log(err)
        }
        // console.log("test")
        
        // console.table({email,password});
    }
    return (
        <>
        <div className="conatiner-fluid h1 p-5 text-center">
            <h1>login</h1>
        </div>
        <div className="container mb-2">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <Loginform
                    onHandleSubmitLogin={onHandleSubmitLogin} 
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    />
                </div>
            </div>
        </div>
        


        </>
    )
}
export default Login;