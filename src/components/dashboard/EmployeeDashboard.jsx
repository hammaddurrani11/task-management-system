import React, { useEffect } from 'react'
import Header from '../layouts/Header'
import TaskListNumber from '../layouts/TaskListNumber'
import Tasklist from '../tasklist/Tasklist'
import { useNavigate } from 'react-router-dom'

const EmployeeDashboard = (props) => {
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
          navigate('/employee');
        }
      })
      .catch(() => navigate('/login'));
  }, [])
  return (
    <>
      <Header username={props.username}/>
      <TaskListNumber data={props.data} />
      <Tasklist data={props.data} />
    </>
  )
}

export default EmployeeDashboard