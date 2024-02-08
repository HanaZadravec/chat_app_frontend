import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [username, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        axios.get('/profile').then(response =>{
            setUserId(response.data.userId);
            setUser(response.data.username);
        })
    }, []);
    return (
        <UserContext.Provider value={{username, setUser, userId,setUserId}}>
            {children}
        </UserContext.Provider>
    )
}