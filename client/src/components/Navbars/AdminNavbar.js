import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Adjust as necessary
    };

    return (
        <nav>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default AdminNavbar;
