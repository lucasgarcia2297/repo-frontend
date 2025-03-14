import {  useState } from "react";
import { Input } from "../components/Input";
import { SelectorIP } from "../components/SelectorIP";
import employee_typesJSON from "../mocks/employee_types.json";
import sectorsJSON from "../mocks/sectors.json";
import ipsJSON from "../mocks/ips.json";
import { useFetchData } from "../hooks/useFetchData";
import Button from "../components/Button";

const SECTORS = sectorsJSON.member;
const TYPE_EMPLOYEES = employee_typesJSON.member;
const IPS = ipsJSON.member;

export default function Register() {
    const { data: sectors, loading: loadingSectors, error: errorSectors } = useFetchData(process.env.API_SECTORS, SECTORS);
    const { data: typeEmployees, loading: loadingTypes, error: errorTypes } = useFetchData(process.env.API_EMPLOYEE_TYPES, TYPE_EMPLOYEES);
    const { data: ips, loading: loadingIps, error: errorIps } = useFetchData(`${process.env.API_IPS}?state.name=Libre&pagination=false`, ipsJSON.member.filter(ip => ip.state.name === "Libre"));
    

    if (loadingSectors || loadingTypes || loadingIps) {
        return <p>Cargando datos...</p>;
    }

    const handlerSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log(data);
    }
    return (
        <form className="mx-4" onSubmit={handlerSubmit}>
            <h2 className="text-center text-3xl text-sky-800 p-2 font-bold">Alta de persona</h2>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300"></hr>
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
                <Input label="Nombre:" type="text" id="firstName" name="firstName" placeholder="Lucas Enedín" />
                <Input label="Apellido:" type="text" id="lastName" name="lastName" placeholder="García" />
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
                    <select id="sector" name="sector"  className="rounded-md border w-full p-1 border-sky-950 focus:outline-none focus:border-sky-500" >
                        <option disabled selected value="" >Seleccione un sector</option>  
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
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />
            <h4 className="text-start text-lg text-sky-950 font-bold">IPs asociadas</h4>
            <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
            </section>
            <div className="md:w-1/2 w-full min-w-10">
                <SelectorIP ips={ips} />
            </div>
            <br />
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />
            <Button type="submit" >Guardar</Button>
        </form >
    );
}