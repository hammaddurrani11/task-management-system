import React, { useEffect, useContext } from 'react'
import Header from '../layouts/Header'
import CreateTask from '../layouts/CreateTask'
import AllTasks from '../layouts/AllTasks'
import { useNavigate } from 'react-router-dom';
import CreateUser from '../layouts/CreateUser';
import { DataContext } from '../../context/employeeContext'

const AdminDashboard = () => {
    const { fetchAuthAndEmployeeData, user } = useContext(DataContext);
    console.log(user);

    const navigate = useNavigate();
    const adminCheck = () => {
        if (user.role === "employee") {
            navigate('/employee');
        }
    }

    useEffect(() => {
        fetchAuthAndEmployeeData();
    }, [])

    useEffect(() => {
        if (user) {
            adminCheck();
        }
    }, [user])


    return (
        <>
            <Header username={!user ? "Null" : user.username} />
            <CreateTask />
            <CreateUser />
            <AllTasks />
        </>
    )
}

export default AdminDashboard