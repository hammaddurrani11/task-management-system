import React, { useEffect } from 'react'
import Header from '../layouts/Header'
import CreateTask from '../layouts/CreateTask'
import AllTasks from '../layouts/AllTasks'
import { useNavigate } from 'react-router-dom';
import CreateUser from '../layouts/CreateUser';

const AdminDashboard = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3000/auth/check', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    navigate('/login');
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (data?.authenticated) {
                    navigate('/');
                }
            })
            .catch(() => navigate('/login'));
    }, [])

    return (
        <>
            <Header username={props.username} />
            <CreateTask />
            <CreateUser />
            <AllTasks />
        </>
    )
}

export default AdminDashboard