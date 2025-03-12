import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export function SelectorIP({ ips }) {
    const [selectedIPs, setSelectedIPs] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const dropdownRef = useRef(null)
    const inputRef = useRef(null)

    const ipOptions = ips ?? [
        {address:"10.76.2.1"},
        {address:"10.76.2.2"},
        {address:"10.76.2.3"},
        {address:"10.76.2.4"},
        {address:"10.76.2.5"},
        {address:"10.76.2.6"},
        {address:"10.76.2.7"},
        {address:"10.76.2.8"},
        {address:"10.76.2.9"},
        {address:"10.76.2.10"},
        {address:"10.85.0.1"}
    ]

    const filteredOptions = ipOptions.filter(
        (ip) => !selectedIPs.includes(ip.address) && ip.address.toLowerCase().includes(searchValue.toLowerCase()),
    )

    const handleRemoveIP = (ip) => {
        setSelectedIPs(selectedIPs.filter((selectedIP) => selectedIP.address !== ip.address))
    }

    const handleSelectIP = (ip) => {
        if (!selectedIPs.includes(ip.address)) {
            setSelectedIPs([...selectedIPs, ip])
            setSearchValue("")
            inputRef.current?.focus()
        }
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="w-full max-w-lg">
            <label className="block text-sm font-medium text-gray-700 mb-1">IPs</label>
            <div ref={dropdownRef} className="relative border border-gray-300 rounded-md shadow-sm">
                <div
                    className="min-h-10 p-1 flex flex-wrap items-center gap-1 cursor-text"
                    onClick={() => {
                        setIsOpen(true)
                        inputRef.current?.focus()
                    }}
                >
                    {selectedIPs.map((ip) => (
                        <div key={ip.id} className="flex items-center bg-gray-100 text-gray-800 text-sm rounded px-2 py-1">
                            <span>{ip.address}</span>
                            <button
                                type="button"
                                className="ml-1 text-gray-500 hover:text-gray-700"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveIP(ip)
                                }}
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        </div>
                    ))}
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-grow min-w-[50px] outline-none text-sm p-1"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        placeholder={selectedIPs.length === 0 ? "Seleccionar direcciones IP" : ""}
                    />
                </div>

                <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-2 flex items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        /* ChevronUp icon SVG */
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        /* ChevronDown icon SVG */
                        <FontAwesomeIcon icon={faChevronDown} />
                    )}
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((ip) => (
                                <div
                                    key={ip.id}
                                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectIP(ip)}
                                >
                                    {ip.address}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">No hay opciones disponibles</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

