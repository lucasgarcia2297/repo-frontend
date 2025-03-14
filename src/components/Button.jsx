export default function Button({ children, ...props }) {
  return (
    <button {...props} 
        className="bg-sky-800 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded border focus:border-sky-950 border-blue-400 toggle-button"
        >
        {children}
    </button>
  )
}