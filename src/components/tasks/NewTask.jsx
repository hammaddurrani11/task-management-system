import React, { useContext } from 'react';
import { handleError } from '../utils/apiHelper';
import { DataContext } from '../../context/employeeContext';

const NewTask = ({data}) => {

  const { fetchAuthAndEmployeeData } = useContext(DataContext);

  const updateTask = async (e) => {
    console.log(e);
    const res = await fetch(`http://localhost:3000/complete-task/${e._id}`, {
      method: 'PUT',
      credentials: 'include'
    })

    const data = await res.json();

    if (!res.ok) {
      handleError(res, data);
    }
    else {
      console.log("Task marked as completed", data);
      fetchAuthAndEmployeeData();
    }
  }

  const failedTask = async (e) => {
    const res = await fetch(`http://localhost:3000/failed-task/${e._id}`, {
      method: 'PUT',
      credentials: 'include'
    })

    const data = await res.json();

    if (!res.ok) {
      handleError(res, data);
    }
    else {
      console.log("Task Updated", data);
      fetchAuthAndEmployeeData();
    }
  }

  return (
    <>
      <div className='mx-2 py-5 mt-10 flex items-center flex-nowrap justify-start gap-3 overflow-x-auto'>
        <div className='bg-yellow-500 shrink-0 w-[300px] h-[200px] rounded p-3'>
          <div className='flex items-center justify-between'>
            <h4 className='bg-red-500 p-1 rounded text-sm'>{data.taskCategory}</h4>
            <h4 className='text-sm'>{data.taskDate}</h4>
          </div>
          <h2 className='text-xl font-semibold mt-5'>{data.taskTitle}</h2>
          <p className='text-sm font-medium'>{data.taskDescription}</p>
          <div className='flex items-center justify-center mt-5 gap-2'>
            <button onClick={() => updateTask(data)}
              className='bg-green-500 rounded text-sm px-2 py-1 text-white hover:bg-green-700 cursor-pointer'>Mark as Complete</button>
            <button onClick={() => failedTask(data)}
              className='bg-red-500 rounded text-sm px-2 py-1 text-white hover:bg-red-700 cursor-pointer'>Mark as Failed</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewTask