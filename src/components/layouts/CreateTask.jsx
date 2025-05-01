import React, { useState } from 'react'

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskAssign, setTaskAssign] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/createtask', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskTitle: taskTitle,
                taskDate: taskDate,
                taskAssign: taskAssign,
                taskCategory: taskCategory,
                taskDescription: taskDescription
            })
        })

        const json = response.json();

        if (!response.ok) {
            return alert(json.error);
        }

        setTaskTitle('');
        setTaskDate('');
        setTaskAssign('');
        setTaskCategory('');
        setTaskDescription('');
    }
    return (
        <div className='mx-8 my-2 p-5 bg-[#1c1c1c] rounded'>
            <form onSubmit={handleSubmit} className='flex items-center flex-wrap justify-between'>
                <div className='w-1/2'>
                    <div>
                        <h4 className='text-sm mb-1 text-gray-200'>Task Title</h4>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className='border-gray-400 outline-0 text-white border-[1px] h-[40px] w-4/5 rounded text-sm px-2 py-1'
                            type="text"
                            placeholder='Make a Design...'
                            required />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-sm mb-1 text-gray-200'>Date</h4>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className='border-gray-400 outline-0 text-white border-[1px] h-[40px] rounded text-sm w-4/5 px-2 py-1'
                            type="date"
                            required />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-sm mb-1 text-gray-200'>Assign to</h4>
                        <input
                            value={taskAssign}
                            onChange={(e) => setTaskAssign(e.target.value)}
                            placeholder='Employee Name'
                            className='border-gray-400 outline-0 text-white border-[1px] h-[40px] w-4/5 rounded text-sm px-2 py-1'
                            type="text"
                            required />
                    </div>
                    <div className='mt-5'>
                        <h4 className='text-sm mb-1 text-gray-200'>Category</h4>
                        <input
                            value={taskCategory}
                            onChange={(e) => setTaskCategory(e.target.value)}
                            placeholder='Design, Dev, etc'
                            className='border-gray-400 outline-0 text-white border-[1px] h-[40px] w-4/5 rounded text-sm px-2 py-1'
                            type="text"
                            required />
                    </div>
                </div>
                <div className='w-1/2'>
                    <h4 className='text-sm mb-1 text-gray-200'>Task Description</h4>
                    <textarea cols="30" rows="10"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className='w-full outline-0 text-white p-2 text-sm border-gray-400 border-[1px] rounded'></textarea>
                    <button className='bg-green-500 hover:bg-green-700 cursor-pointer w-full py-3 rounded mt-3'>Create Task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask