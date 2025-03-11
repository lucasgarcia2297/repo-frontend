import { use, useEffect, useState } from "react";

export default function Register() {
    const [sectors, setSectors] = useState([]);
    const [typeEmployees, setTypeEmployees] = useState([]);

    useEffect(() => {
        fetch('http://10.7.6.92:8000/api/sectors')
            .then(response => response.json())
            .then(data => {
                console.log(data.member);
                setSectors(data.member)
            });
        fetch('http://10.7.6.92:8000/api/employee_types')
            .then(response => response.json())
            .then(data => setTypeEmployees(data.member));
    }, []);

    return (
        <form className="mx-4">
            <h2 className="text-center text-3xl text-sky-800 p-2 font-bold">Alta de persona</h2>
            <hr />
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
                <div className="md:w-1/2 w-full min-w-10">
                    <label htmlFor="firstName">Nombre:</label>
                    <input type="text" id="firstName" placeholder="Lucas Enedín " name="firstName" className="rounded-md border w-full p-1 border-sky-950" />
                </div>
                <div className="md:w-1/2 w-full min-w-10">
                    <label htmlFor="lastName">Apellido:</label>
                    <input type="text" id="lastName" placeholder="García" name="lastName" className="rounded-md border w-full p-1 border-sky-950" />
                </div>
            </section>
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
                <div className="md:w-1/2 w-full min-w-10">
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="correo@correo.com" id="email" name="email" className="rounded-md border w-full p-1 border-sky-950" />
                </div>
                <div className="md:w-1/2 flex gap-2 w-full min-w-10">
                    <div className="md:w-1/2 w-full min-w-10">
                        <label htmlFor="cuil">CUIL:</label>
                        <input type="text" id="cuil" name="cuil" className="rounded-md border w-full p-1 border-sky-950" />
                    </div>
                    <div className="md:w-1/2 w-full min-w-10">
                        <label htmlFor="iup">IUP:</label>
                        <input type="text" id="iup" name="iup" className="rounded-md border w-full p-1 border-sky-950" />
                    </div>
                </div>
            </section>
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
                <div className="md:w-1/2 w-full min-w-10">
                    <label htmlFor="phone_personal">Teléfono Personal:</label>
                    <input type="text" id="phone_personal" name="phone_personal" className="rounded-md border w-full p-1 border-sky-950" />
                </div>
                <div className="md:w-1/2 w-full min-w-10">
                    <label htmlFor="phone_int">Teléfono Interno:</label>
                    <input type="text" id="phone_int" name="phone_int" className="rounded-md border w-full p-1 border-sky-950" />
                </div>
            </section>
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
                <div className="md:w-1/2 w-full min-w-10">
                    <label htmlFor="sector">Sector:</label>
                    <select id="sector" name="sector" className="rounded-md border w-full p-1 border-sky-950">
                        {sectors?.map((sector, index) => (
                            <option key={index} value={sector?.name}>
                                {sector?.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:w-1/2 w-full min-w-10">
                    <label htmlFor="typeEmployee">Tipo de Empleado:</label>
                    <select id="typeEmployee" name="typeEmployee" className="rounded-md border w-full p-1 border-sky-950">
                        {typeEmployees?.map((typeEmployee, index) => (
                            <option key={index} value={typeEmployee?.name}>
                                {typeEmployee?.name}
                            </option>
                        ))}
                    </select>
                </div>
            </section>
            <br />
            <hr />
            <h4 className="text-start text-lg text-sky-950 font-bold">IPs Asociadas</h4>
            <button type="submit">Guardar</button>
        </form>
    );
}