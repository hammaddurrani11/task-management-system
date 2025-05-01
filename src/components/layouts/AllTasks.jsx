import React, { useContext } from 'react'
import { DataContext } from '../../context/employeeContext'

const AllTasks = () => {
    const { employees } = useContext(DataContext);

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
                            <h3 className='w-1/4 text-md'>{elem.newTask}</h3>
                            <h3 className='w-1/4 text-md'>{elem.completed}</h3>
                            <h3 className='w-1/4 text-md'>{elem.failed}</h3>
                            <div className='flex items-center gap-5 w-1/4'>
                                <button><i className="fa-solid fa-pen-to-square"></i></button>
                                <button><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllTasks