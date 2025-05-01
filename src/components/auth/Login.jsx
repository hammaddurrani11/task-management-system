import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })

        const json = await response.json();

        if (!response.ok) {
            return alert(json.error);
        }

        const checkRes = await fetch('http://localhost:3000/auth/check', {
            credentials: 'include'
        })

        const userData = await checkRes.json();

        if (userData.authenticated) {
            if (userData.user.role === 'admin') {
                navigate('/');
            } else if (userData.user.role === 'employee') {
                navigate('/employee');
            }
        }
    }
    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen bg-[#1c1c1c]'>
                <div className='border-green-500 border-[5px] rounded-md px-10 py-20'>
                    <form onSubmit={submitHandler} className='flex items-center justify-center gap-5 flex-col w-90'>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="email"
                            placeholder='Enter Your Email'
                            required />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="password"
                            placeholder='Enter Your Password'
                            required />
                        <Link to="/register"
                            className='text-gray-400 text-sm'>Dont Have an account? <span className='font-medium underline'>Signup Now</span></Link>
                        <button
                            className='bg-green-500 py-3 px-5 hover:bg-green-700 cursor-pointer rounded w-50 text-white'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login