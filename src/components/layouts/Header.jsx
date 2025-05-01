import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();
    const logOutButton = async () => {
        const res = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include',
        });

        const data = await res.json();
        console.log(data.message);

        navigate('/login');
    }
    return (
        <div className='flex items-center justify-between p-8'>
            <div>
                <h2 className='text-white text-2xl'>Hello <span className='text-3xl font-semibold block'>{props.username} 👋</span></h2>
            </div>
            <button onClick={logOutButton} className='bg-red-500 text-white rounded-sm px-5 hover:bg-red-700 py-2 text-xl cursor-pointer'>Logout</button>
        </div>
    )
}

export default Header