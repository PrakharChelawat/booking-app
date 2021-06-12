import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import Registerform from '../components/Registerform'
import { register } from '../actions/auth'
const Register = ({ history })=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const onhandlesubmit = async (e)=>{
        // console.log("prakhar")
        e.preventDefault();
        // this will not reload the page on clicking submit button
        // console.table({name,email,password})
        try{
            const responsefromfrontend = await register({

                name,
                email,
                password
    
            })
        
        console.log(responsefromfrontend);
        toast.success('Register SuccessFully, Please Login')
        history.push("/login")
        } catch(err){
            console.log(err);
            if(err.response.status ===400)toast.error(err.response.data)
        }
    }
    return(
        <>
        <div className="conatiner-fluid h1 p-5 text-center">
            <h1>Register</h1>
        
        </div>
        
        <div className="container mb-2">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <Registerform 
                    onhandlesubmit={onhandlesubmit} 
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    />
                </div>
            </div>
        </div>
        </>

    );
};
export default Register;