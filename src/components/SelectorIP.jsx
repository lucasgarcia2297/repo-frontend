import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import ipsJSON from "../mocks/ips.json";

export function SelectorIP({ ips }) {
    const [selectedIPs, setSelectedIPs] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [filteredIps, setFilteredIps] = useState([])
    const dropdownRef = useRef(null)
    const inputRef = useRef(null)

    const ipOptions = ips ;
    // const ipOptions = ips ?? ipsJSON.member;

    useEffect(() => {
        const filterIps = ipOptions.filter(
            (ip) => !selectedIPs.includes(ip) && (ip.address.includes(searchValue.toLowerCase()) || ip.state.name.toLowerCase().includes(searchValue.toLowerCase()))
        )
        setFilteredIps(filterIps)
    }, [selectedIPs, searchValue, ipOptions])

    const handleRemoveIP = (ip) => {
        setSelectedIPs(selectedIPs.filter((selectedIP) => selectedIP.address !== ip.address));
    }

    const handleSelectIP = (ip) => {
        console.log(ip);
        console.log(selectedIPs);
        if (!selectedIPs.includes(ip)) {
            setSelectedIPs((prevSelectedIPs) => [...prevSelectedIPs, ip]);
            setSearchValue("");
            inputRef.current?.focus();
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
            <div ref={dropdownRef} className="relative w-full p-1 border-sky-950 focus:outline-none focus:border-sky-500 border rounded-md shadow-sm">
                <div
                    className="min-h-10 p-1 flex flex-wrap items-center gap-1 cursor-text"
                    onClick={() => {
                        setIsOpen(true)
                        inputRef.current?.focus()
                    }}
                >
                    {selectedIPs.map((ip) => (
                        <div key={ip.id} className="flex items-center bg-gray-200 border border-gray-300 text-gray-800 text-sm rounded px-2 py-1">
                            <span>{ip.address}</span>
                            <button
                                type="button"
                                className="ml-1 text-gray-500 hover:text-gray-800"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveIP(ip)
                                }}
                            >
                                <FontAwesomeIcon icon={faXmark} className="border-gray-300 border-l pl-1" />
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
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                    )}
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredIps.length > 0 ? (
                            filteredIps.map((ip) => (
                                <div
                                    key={ip.id}
                                    className="px-3 py-2 flex justify-between border-b border-gray-300 text-sm hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectIP(ip)}
                                >
                                    <p>{ip.address}</p>
                                    <span className="ml-2 px-1 rounded" style={{ width: "100px", textAlign: "center", backgroundColor: ip.state.color, color: "black" }}>{ip.state.name}</span>
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