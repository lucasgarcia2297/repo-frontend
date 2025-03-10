import React from 'react';

const SideBar = () => {
    return (
        <aside className="h-full w-56 flex flex-col bg-sky-950 text-white">
            <section className='w-full'>
                <a href="https://www.santafe.gov.ar">
                    <img className='w-full p-4' src='https://www.santafe.gob.ar/assets/standard/images/gob-santafe.png' alt='logo Santa Fe' />
                </a>
            </section>
            <hr className='border-gray-500 opacity-20' />
            <section className='w-full'>
                <ul>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Inicio</li>
                </ul>
            </section>
            <hr className='border-gray-500 opacity-20' />
            <section className=''>
                <h3 className="py-2 text-1xl text-center font-bold">ACCIONES</h3>
                <ul>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Reportes</li>
                </ul>
            </section>
            <hr className='border-gray-500 opacity-20' />
            <section className=''>
                <h3 className="py-2 text-1xl text-center font-bold">ADMINISTRACIÓN</h3>
                <ul>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Dispositivos</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Redes</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">IPs</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Escaneo de IPs</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Personas</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Tipos de personas</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Sectores</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Oficinas</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Ubicaciones</li>
                </ul>
            </section>
            <hr className='border-gray-500 opacity-20' />
            <section className=''>
                <h3 className="py-2 text-1xl text-center font-bold">SISTEMA</h3>
                <ul>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Parámetros</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Usuarios</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Localidades</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Reportes dinámicos</li>
                    <li className="py-1 px-4 hover:bg-gray-700 cursor-pointer">Explorador de archivos</li>
                </ul>
            </section>
        </aside>
    );
};

export default SideBar;