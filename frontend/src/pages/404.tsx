import React from 'react';
import { Link } from 'react-router-dom';
import { FaBan } from 'react-icons/fa';

export const NotFound = () => (
    <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mb-3">
            <FaBan className="mr-2" />
            <h2 className="font-semibold text-2xl">Page Not Found.</h2>
        </div>
        <h4 className="font-medium text-xl mb-5">The page you are looking for does not exist or has been moved. </h4>
        <Link to="/" className="hover:underline text-lime-500 text-lg">Go back home &rarr;</Link>
    </div>
);
