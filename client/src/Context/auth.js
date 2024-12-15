import {useState,useContext,createContext, useEffect} from 'react';
import axios from 'axios';
import React from 'react';


const AuthContext = createContext();


const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        user:null,
        token:""
    })
    //default axios
    //auth milta hai token ko fulfill karo
    axios.defaults.headers.common['Authorization'] = auth?.token
    useEffect(()=>{
        const data = localStorage.getItem('auth');
        if (data)
        {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
        //eslint -disable next lines
    },[])
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
//custom hook
const useAuth = () => useContext(AuthContext)

export {useAuth,AuthProvider};