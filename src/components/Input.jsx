export function Input({ label, type, id, name, placeholder, onChange, value, required }) {
    return (
        <div className="md:w-1/2 w-full min-w-10 my-1  justify-start items-center">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                required={required}
                className="rounded-md border w-full p-1 border-sky-950 focus:outline-none focus:border-sky-500"
            />
        </div>
    );
}