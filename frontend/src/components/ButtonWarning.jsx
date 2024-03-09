import React from "react";
import { Link } from "react-router-dom"; 

export function ButtonWarning({ label, buttonText, to }) {
    return (
        <div className="flex justify-center mt-4 text-center text-sm text-gray-500 ">
            <div>{label}</div>
            <Link className="pointer pl-1 cursor-pointer font-semibold leading-6 text-blue-500 hover:underline hover:text-blue-500" to={to}>{buttonText}</Link>
        </div>
    )
}