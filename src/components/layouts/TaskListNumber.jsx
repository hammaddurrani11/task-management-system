import React from 'react'

const TaskListNumber = (props) => {
    // console.log(props.data);
    return (
        <div className='flex items-center gap-5 m-5'>
            <div className='bg-blue-500 rounded w-[45%] py-10 px-5 flex items-center justify-between'>
                <h3 className='text-2xl font-medium'>New Task</h3>
                <h2 className='text-4xl font-semibold'>{props.data.newTask}</h2>
            </div>
            <div className='bg-green-500 rounded w-[45%] py-10 px-5 flex items-center justify-between'>
                <h3 className='text-2xl font-medium'>Completed</h3>
                <h2 className='text-4xl font-semibold'>{props.data.completed}</h2>
            </div>
            <div className='bg-red-500 rounded w-[45%] py-10 px-5 flex items-center justify-between'>
                <h3 className='text-2xl font-medium'>Failed</h3>
                <h2 className='text-4xl font-semibold'>{props.data.failed}</h2>
            </div>
        </div>
    )
}

export default TaskListNumber