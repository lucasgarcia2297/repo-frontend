import React from 'react';

const SideBar = () => {
    return (
        <div className="h-screen w-56 flex flex-col bg-sky-950 text-white">
            <section className='w-full'>
                <div className=''>
                    <img className='aspect-square w-100 p-5' src='https://www.santafe.gob.ar/assets/standard/images/gob-santafe.png' alt='logo Santa Fe' />

                </div>
            </section>
            <section className='p-4 w-full'>
                <h3 className="text-1xl font-bold">ACCIONES</h3>
                <ul>
                    <li className=" hover:bg-gray-700 cursor-pointer">Reportes</li>
                    <li className="p-1 hover:bg-gray-700 cursor-pointer">Dispositivos</li>
                    <li className="p-1 hover:bg-gray-700 cursor-pointer">Puertos</li>
                </ul>
            </section>
        </div>
    );
};

export default SideBar;