import React from 'react'

const Tasklist = (props) => {
    return (
        <>
            {props.data?.assignedTasks?.map((elem, idx) => {
                return <div key={idx} className='mx-5 py-5 mt-10 flex items-center flex-nowrap justify-start gap-3 overflow-x-auto'>
                    <div className='bg-yellow-500 shrink-0 w-[300px] h-[200px] rounded p-3'>
                        <div className='flex items-center justify-between'>
                            <h4 className='bg-red-500 p-1 rounded text-sm'>{elem.taskCategory}</h4>
                            <h4 className='text-sm'>{elem.taskDate}</h4>
                        </div>
                        <h2 className='text-xl font-semibold mt-5'>{elem.taskTitle}</h2>
                        <p className='text-sm font-medium'>{elem.taskDescription}</p>
                    </div>
                </div>
            })}
        </>
    )
}

export default Tasklist