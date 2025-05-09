import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '../utils/apiHelper';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/register/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })

        const data = await res.json();

        if (!res.ok) {
            handleError(res, data);
        }
        else {
            console.log("Admin Registered", data);
            navigate('/login');
        }

    }
    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen bg-[#1c1c1c]'>
                <div className='border-green-500 border-[5px] rounded-md px-10 py-20'>
                    <form onSubmit={handleSubmit} className='flex items-center justify-center gap-5 flex-col w-90'>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="text"
                            placeholder='Enter Username'
                            required />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="email"
                            placeholder='Enter Email'
                            required />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="password"
                            placeholder='Enter Password'
                            required />
                        <Link className='text-gray-400 text-sm' to="/login">Already have an account? <span className='font-medium underline'>Sign In</span></Link>
                        <button
                            className='bg-green-500 py-3 px-5 hover:bg-green-700 cursor-pointer rounded w-50 text-white'>Create User</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register