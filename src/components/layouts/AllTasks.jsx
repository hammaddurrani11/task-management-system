import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/employeeContext';
import { handleError } from '../utils/apiHelper';

const AllTasks = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const { employees, fetchData } = useContext(DataContext);

    const updateEmployee = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3000/update-employee/${selectedEmployee._id}`, {
            method: "put",
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
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
            console.log("Updated", data);
            closePop();
            fetchData();
        }

    }

    const deleteEmployee = async (elem) => {
        const res = await fetch(`http://localhost:3000/delete-employee/${elem._id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const data = await res.json();

        if (!res.ok) {
            handleError(res, data);
        }
        else {
            console.log('Deleted', data);
            fetchData();
        }
    }

    const showPop = (elem) => {
        const modal = document.querySelector('.pop');
        modal.style.display = 'flex'
        setUsername(elem.username);
        setEmail(elem.email);
        setSelectedEmployee(elem);
        console.log(elem._id);
    }

    const closePop = () => {
        const modal = document.querySelector('.pop');
        modal.style.display = 'none'
    }

    return (
        <div>
            <div className='m-8 p-5 bg-[#1c1c1c] rounded text-white'>
                <div className='flex items-center justify-start bg-red-400 py-2 px-5 rounded'>
                    <h3 className='w-1/4 text-md'>Employee Name</h3>
                    <h3 className='w-1/4 text-md'>New Task</h3>
                    <h3 className='w-1/4 text-md'>Completed</h3>
                    <h3 className='w-1/4 text-md'>Failed</h3>
                    <h3 className='w-1/4 text-md'>Actions</h3>
                </div>
                <div className='h-30 overflow-y-auto'>
                    {employees.map((elem, idx) => {
                        return <div key={idx} className='flex items-center mt-2 justify-start border-[1px] border-green-400 py-2 px-5 rounded'>
                            <h3 className='w-1/4 text-md'>{elem.username}</h3>
                            <h3 className='w-1/4 text-md'>{elem.assignedTasks.newTask.length}</h3>
                            <h3 className='w-1/4 text-md'>{elem.assignedTasks.completed.length}</h3>
                            <h3 className='w-1/4 text-md'>{elem.assignedTasks.failed.length}</h3>
                            <div className='flex items-center gap-5 w-1/4'>
                                <button onClick={() => showPop(elem)}><i className="fa-solid fa-pen-to-square"></i></button>
                                <button onClick={() => deleteEmployee(elem)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    })}
                </div>
                <div className='absolute pop w-full hidden items-center backdrop-blur justify-center h-screen top-20 left-0'>
                    <form onSubmit={updateEmployee} className='flex items-center justify-center gap-5 flex-col w-90 bg-[#1c1c1c] p-10 border-[3px] border-green-500 rounded'>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="text"
                            placeholder='Enter Username'
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="email"
                            placeholder='Enter Email'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="password"
                            placeholder='Enter Password'
                        />
                        <div className='flex items-center justify-center gap-2'>
                            <div onClick={closePop}
                                className='bg-green-500 py-3 px-5 hover:bg-green-700 cursor-pointer rounded text-white'>Close</div>
                            <button type='submit'
                                className='bg-green-500 py-3 px-5 hover:bg-green-700 cursor-pointer rounded text-white'>Update User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AllTasks