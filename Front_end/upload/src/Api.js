import axios from 'axios';
import { data } from 'react-router';



const Api_Url='http://127.0.0.1:8000';
export const rejesterUser=(data)=>axios.post(`${Api_Url}/api/register`,data);
export const loginUser=(data)=>axios.post(`${Api_Url}/api/login`,data);
export const uploadImage=(data,token)=>axios.post(`${Api_Url}/api/images/upload`,data,{
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
});


export const getImage=(token)=>axios.get(`${Api_Url}/api/images`,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
});







