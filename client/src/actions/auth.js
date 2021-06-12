import axios from 'axios'



export const register = async(user)=> 
    await axios.post(`/register`,user);


export const login = async(user) =>
        await axios.post(`/login`,user);