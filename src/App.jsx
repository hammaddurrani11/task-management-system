import './App.css'
import { Routes, Route, useNavigate } from "react-router";
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AdminDashboard from './components/dashboard/AdminDashboard'
import EmployeeDashboard from './components/dashboard/EmployeeDashboard'
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({})
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/auth/check', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          if (data.user.role === 'admin') {
            setUserName(data.user.username);
            console.log(data.user.username);
            navigate('/')
          } else if (data.user.role === 'employee') {
            setUserName(data.user.username)
            navigate('/employee');
            const employeeData = fetch('http://localhost:3000/fetch-loggedin-user', {
              credentials: 'include'
            })
              .then(res => res.json())
              .then(employeeData => {
                if (!employeeData || employeeData.error) {
                  console.log('User Not Found');
                } else {
                  setUserData(employeeData);
                }
              })
          }
        }
      })
  }, [])


  return (
    <>
      <Routes>
        <Route exact path='/' element={<AdminDashboard username={userName} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/employee" element={<EmployeeDashboard data={userData} username={userName} />} />
      </Routes>
    </>
  )
}

export default App
