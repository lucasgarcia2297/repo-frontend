import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
    return (
        <header className="w-full">
            <nav className="min-h-4 max-h-max bg-white flex justify-between items-center p-2 shadow-lg shadow-gray-500">
                <h1 className="text-sky-950 font-extrabold text-3xl">
                    <a href="/">
                        SISTEMA DE SOPORTE INFORMÁTICO
                    </a>
                </h1>
                <nav className="w-1/2">
                    <ul className="flex justify-end items-center">
                        <li className="mx-1">
                            <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-sky-950 rounded-lg bg-white hover:text-sky-700">
                                <FontAwesomeIcon icon={faBell} className="h-5" />
                                <span class="sr-only">Notifications</span>
                                <div class="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border border-white rounded-md -top-0 -end-0 dark:border-gray-900">0</div>
                            </button>
                        </li>
                        <li className="mx-1">
                            <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-sky-950 rounded-lg bg-white hover:text-sky-700">
                                <FontAwesomeIcon icon={faEnvelope} className="h-5" />
                                <span class="sr-only">Notifications</span>
                                <div class="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border border-white rounded-md -top-0 -end-0 dark:border-gray-900">0</div>
                            </button>
                        </li>
                        <li className="border-l border-gray-300 h-10 mx-1">
                            <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-sky-950 rounded-lg bg-white hover:text-sky-700">
                                <img className="rounded-full h-6" src="/image-profile-default.jpg" alt="Foto perfil" />
                            </button>
                        </li>



                    </ul>
                </nav>
            </nav>
        </header>
    );
}