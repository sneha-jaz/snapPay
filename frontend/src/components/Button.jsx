import React from 'react';
import { Link } from 'react-router-dom';

export function Button({ buttonText, to }) {
    return (
        <div className="flex justify-center mt-4 text-center text-sm">
            <Link className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500" to={to}>{buttonText}</Link>
        </div>
    )
}