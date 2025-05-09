import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '../utils/apiHelper';
import { DataContext } from '../../context/employeeContext'

const Login = () => {
    const { user } = useContext(DataContext);
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })

        const data = await res.json();

        if (!res.ok) {
            handleError(res, data);
        }
        else {
            console.log("Logged In", data);

            if (data.role === 'admin') {
                console.log(user.username);
                navigate('/');
            } else if (data.role === 'employee') {
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