import React, { useContext } from 'react'
import NewTask from './NewTask';
import CompletedTask from './CompletedTask';
import FailedTask from './FailedTask';
import { DataContext } from '../../context/employeeContext';

const Tasklist = (props) => {
    const { employeeData } = useContext(DataContext);
    return (
        <>
            <div className='mx-5 py-5 mt-10 flex items-center flex-nowrap justify-start overflow-x-auto'>
                {props.data &&
                    <div className='flex items-center shrink-0'>
                        {Object.entries(employeeData.assignedTasks).map(([key, tasks], index) => {
                            if (!tasks || tasks.length === 0) return null;
                            if (key === 'newTask') {
                                return (
                                    <div key={index} className='flex items-center shrink-0'>
                                        {tasks.map((elem, idx) => (
                                            <NewTask data={elem} key={idx} />
                                        ))}
                                    </div>
                                )
                            }
                            if (key === 'completed') {
                                return (
                                    <div key={index} className='flex items-center shrink-0'>
                                        {tasks.map((elem, idx) => (
                                            <CompletedTask data={elem} key={idx} />
                                        ))}
                                    </div>
                                )
                            }
                            if (key === 'failed') {
                                return (
                                    <div key={index} className='flex items-center shrink-0'>
                                        {tasks.map((elem, idx) => (
                                            <FailedTask data={elem} key={idx} />
                                        ))}
                                    </div>
                                )
                            }
                            return null
                        })
                        }
                    </div>}
            </div>
        </>
    )
}

export default Tasklist