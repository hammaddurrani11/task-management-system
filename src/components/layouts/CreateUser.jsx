import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/employeeContext'
import { handleError } from '../utils/apiHelper'

const CreateUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { fetchData } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/register/employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username: username, email: email, password: password })
        })

        const data = await res.json();

        if (!res.ok) {
            handleError(res, data);
        }
        else {
            console.log("Employee Created", data);
            setUsername('');
            setEmail('');
            setPassword('');
            fetchData();
        }

    }

    return (
        <div className='bg-[#1c1c1c] mx-8 my-5 p-5 rounded'>
            <div>
                <form className='flex' onSubmit={handleSubmit}>
                    <div className='w-1/2'>
                        <div>
                            <h3 className='text-sm mb-1 text-gray-200'>Employee Name</h3>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='border-gray-400 outline-0 text-white border-[1px] h-[40px] w-4/5 rounded text-sm px-2 py-1'
                                type="text"
                                required />
                        </div>
                        <div className='mt-5'>
                            <h3 className='text-sm mb-1 text-gray-200'>Employee Email</h3>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border-gray-400 outline-0 text-white border-[1px] h-[40px] w-4/5 rounded text-sm px-2 py-1'
                                type="email"
                                required />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div>
                            <h3 className='text-sm mb-1 text-gray-200'>Employee Password</h3>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border-gray-400 outline-0 text-white border-[1px] h-[40px] w-full rounded text-sm px-2 py-1'
                                type="password"
                                required />
                        </div>
                        <div className='mt-5'>
                            <button className='bg-green-500 w-full py-2 rounded cursor-pointer hover:bg-green-700'>Create Employee</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUser