import React, { createContext, useEffect, useState } from 'react'
import { handleError } from '../components/utils/apiHelper';

export const DataContext = createContext();

const employeeContext = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/fetch-employees', {
      credentials: 'include'
    });
    const data = await res.json();
    setEmployees(data);
  }

  const fetchAuthAndEmployeeData = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/check', {
        credentials: 'include'
      });
      const data = await res.json();

      if (data.authenticated) {
        setUser(data.user);

        if (data.user.role === 'employee') {
          const empRes = await fetch('http://localhost:3000/fetch-loggedin-user', {
            credentials: 'include'
          });
          const empData = await empRes.json();
          setEmployeeData(empData);
        }
      }
    } catch (error) {
      console.error('Authentication fetch failed:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAuthAndEmployeeData();
  }, [])

  return (
    <DataContext.Provider value={{ employees, setEmployees, setUser, fetchData, user, employeeData, fetchAuthAndEmployeeData }}>
      <div>{children}</div>
    </DataContext.Provider>
  )
}

export default employeeContext