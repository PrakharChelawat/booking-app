import axios from 'axios'



export const CreateConnectAccount = async(token)=> 
    await axios.post(`/create-connect-account`,
    {},
    {
        headers:{

        Authorization:`Bearer ${token}`,
    },
} 
    );

