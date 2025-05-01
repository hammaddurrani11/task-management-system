import React, { createContext, useEffect, useState } from 'react'

export const DataContext = createContext();

const employeeContext = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    const fetchData = async () => {
        const res = await fetch('http://localhost:3000/fetch-employees', {
            credentials: 'include'
        });
        const data = await res.json();
        setEmployees(data);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <DataContext.Provider value={{ employees, setEmployees, fetchData }}>
            <div>{children}</div>
        </DataContext.Provider>
    )
}

export default employeeContext