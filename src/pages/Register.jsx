import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { SelectorIP } from "../components/SelectorIP";


export default function Register() {
    const [sectors, setSectors] = useState([]);
    const [typeEmployees, setTypeEmployees] = useState([]);
    const [ips, setIps] = useState([]);

    const IPs = [{ address: '192.168.1.1' },
    { address: '192.168.1.2' },
    { address: '192.168.1.3' },
    { address: '192.168.1.4' }];
    const SECTORS = [
        { name: 'sector1' },
        { name: 'sector2' },
        { name: 'sector3' },
        { name: 'sector4' }];
    const TYPE_EMPLOYEES = [
        { name: 'funcionario1' },
        { name: 'funcionario2' },
        { name: 'funcionario3' },
        { name: 'funcionario4' }];

    useEffect(() => {
        fetch(process.env.API_SECTORS)
            .then(response => response.json())
            .then(data => setSectors(data.totalItems > 0 ? data.member : SECTORS));
        fetch(process.env.API_EMPLOYEE_TYPES)
            .then(response => response.json())
            .then(data => setTypeEmployees(data.totalItems > 0 ? data.member : TYPE_EMPLOYEES));
        fetch(`${process.env.API_IPS}?state.name=Libre&pagination=false`)
            .then(response => response.json())
            .then(data => setIps(data.totalItems > 0 ? data.member : IPs));
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredIps = ips.filter(ip =>
        ip.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handlerSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log(data);
    }
    return (
        <form className="mx-4" action="post" >
            <h2 className="text-center text-3xl text-sky-800 p-2 font-bold">Alta de persona</h2>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
                <Input label="Nombre:" type="text" id="firstName" name="firstName"  placeholder="Lucas Enedín" />
                <Input label="Apellido:" type="text" id="lastName" name="lastName"  placeholder="García" />
            </section>
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
                <Input label="Email:" type="email" id="email" name="email" placeholder="correo@correo.com" />
                <div className="md:w-1/2 flex gap-2 w-full min-w-10">
                    <Input label="CUIL:" type="text" id="cuil" name="cuil" placeholder="20-12345678-9" />
                    <Input label="IUP:" type="text" id="iup" name="iup" placeholder="legarcia" />
                </div>
            </section>
            <section className="flex justify-between gap-2 flex-nowrap md:flex-nowrap">
                <Input label="Teléfono Personal:" type="text" id="phone_personal" name="phone_personal" placeholder="351-12345678" />
                <Input label="Teléfono Interno:" type="text" id="phone_int" name="phone_int" placeholder="341444" />
            </section>
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
                <div className="md:w-1/2 w-full min-w-10">
                    <label htmlFor="sector">Sector:</label>
                    <select id="sector" name="sector" className="rounded-md border w-full p-1 border-sky-950 focus:outline-none focus:border-sky-500">
                        {sectors?.map((sector, index) => (
                            <option key={index} value={sector?.name}>
                                {sector?.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:w-1/2 w-full min-w-10">
                    <label htmlFor="typeEmployee">Tipo de Empleado:</label>
                    <select id="typeEmployee" name="typeEmployee" className="rounded-md border w-full p-1 border-sky-950 focus:outline-none focus:border-sky-500">
                        {typeEmployees?.map((typeEmployee, index) => (
                            <option key={index} value={typeEmployee?.name}>
                                {typeEmployee?.name}
                            </option>
                        ))}
                    </select>
                </div>
            </section>
            <br />
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"/>
            <h4 className="text-start text-lg text-sky-950 font-bold">IPs asociadas</h4>
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
            </section>
            <div className="md:w-1/2 w-full min-w-10">
                <SelectorIP ips={ips?? IPs} />
            </div>
            <br />
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />
            <button type="submit" onSubmit={handlerSubmit}>Guardar</button>
        </form >
    );
}