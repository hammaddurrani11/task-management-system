import React, { useEffect, useContext } from 'react'
import Header from '../layouts/Header'
import TaskListNumber from '../layouts/TaskListNumber'
import { useNavigate } from 'react-router-dom'
import Tasklist from '../tasks/Tasklist'
import { DataContext } from '../../context/employeeContext'

const EmployeeDashboard = () => {
  const { user, employeeData, fetchAuthAndEmployeeData } = useContext(DataContext);
  console.log(user);
  const navigate = useNavigate();
  const adminCheck = () => {
    if (user.role === "admin") {
      navigate('/');
    }
  }

  useEffect(() => {
    fetchAuthAndEmployeeData();
  }, []);

  useEffect(() => {
    if (user) {
      adminCheck();
    }
  }, [user]);

  return (
    <>
      <Header username={!user ? "Null" : user.username} />
      <TaskListNumber data={employeeData} />
      <Tasklist data={employeeData} />
    </>
  )
}

export default EmployeeDashboard