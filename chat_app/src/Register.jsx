import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    async function register(ev){
        ev.preventDefault();
        try {
            const response = await axios.post('/register', { username, password }, { timeout: 5000 }); 
            console.log(response.data);
            toast.success("You have registered successfully!");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while registering. Please try again later");
        }
    }
    
    
    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={register}>
                <input value={username} onChange={ev => setUsername(ev.target.value)} type="text" placeholder="username" className="block w-full rounded-sm p-2 mb-2 border" />
                <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 border" />
                <button className="bg-blue-500 text-white w-full block rounded-sm p-2">Register</button>
            </form>
            <ToastContainer />
        </div>
    )
}
