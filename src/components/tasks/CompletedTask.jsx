import React from 'react'

const CompletedTask = ({ data }) => {
  return (
    <div className='mx-2 py-5 mt-10 flex items-center flex-nowrap justify-start gap-3 overflow-x-auto'>
      <div className='bg-green-500 shrink-0 w-[300px] h-[200px] rounded p-3'>
        <div className='flex items-center justify-between'>
          <h4 className='bg-red-500 p-1 rounded text-sm'>{data.taskCategory}</h4>
          <h4 className='text-sm'>{data.taskDate}</h4>
        </div>
        <h2 className='text-xl font-semibold mt-5'>{data.taskTitle}</h2>
        <p className='text-sm font-medium'>{data.taskDescription}</p>
        <button className='w-full bg-white py-1 rounded mt-2'>Completed</button>
      </div>
    </div>
  )
}

export default CompletedTask