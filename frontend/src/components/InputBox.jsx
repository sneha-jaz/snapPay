export function InputBox ({ label, placeholder }) {
    return (
    <div>
        <div className="block text-sm font-medium text-left mb-2">
            {label} 
        </div>
        <input className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" 
            placeholder={placeholder} />
    </div>
    )
};
