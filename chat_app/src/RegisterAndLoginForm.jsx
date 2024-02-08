import axios from 'axios';
import React, { useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './UserContext';

export default function RegisterAndLoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setUser,setUserId} = useContext(UserContext);
    const [isLoginORegister, setIsLoginOrRegister] = useState('register');
    
    async function handleSubmit(ev){
        ev.preventDefault();
        const url= isLoginORegister === 'register' ? '/register' : '/login';
    try {
        const {data} = await axios.post(url, { username, password }, { timeout: 5000 }); 
        setUser(username);
        setPassword(data.id);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    }
    
    
    return (
        <div className="bg-blue-50 h-screen flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold mb-8">
        {isLoginORegister === 'register' ? 'Register' : 'Login'}
    </h1>
    <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input value={username} onChange={ev => setUsername(ev.target.value)} type="text" placeholder="username" className="block w-full rounded-sm p-2 mb-2 border" />
        <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 border" />
        <button className="bg-blue-500 text-white w-full block rounded-sm p-2">
            {isLoginORegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className='text-center mt-2'>
            {isLoginORegister === 'register' && (
                <div>
                    Already a member? 
                    <button onClick={() => setIsLoginOrRegister('login')} className="ml-1 text-blue-500">Login here</button>
                </div>
            )}
            {isLoginORegister === 'login' && (
                <div>
                    Not a member? 
                    <button onClick={() => setIsLoginOrRegister('register')} className="ml-1 text-blue-500">Register here</button>
                </div>
            )}
        </div>
    </form>
</div>

    )
}
