import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <ul className="flex">
            <li className="mr-6">
                <Link className="text-blue-500 hover:text-blue-800" to="/">
                    Home
                </Link>
            </li>
            <li className="mr-6">
                <Link className="text-blue-500 hover:text-blue-800" to="/about">
                    About
                </Link>
            </li>
            <li className="mr-6">
                <Link
                    className="text-blue-500 hover:text-blue-800"
                    to="/register"
                >
                    SignUp
                </Link>
            </li>
        </ul>
    );
};

export default Navbar;
