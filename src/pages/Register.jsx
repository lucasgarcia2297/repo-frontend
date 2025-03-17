import { useReducer, useState } from "react";
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

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  cuil: "",
  iup: "",
  phone_personal: "",
  phone_int: "",
  sector: "",
  typeEmployee: ""
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
}

export default function Register() {
  const { data: sectors, loading: loadingSectors } = useFetchData(process.env.API_SECTORS, SECTORS);
  const { data: typeEmployees, loading: loadingTypes } = useFetchData(process.env.API_EMPLOYEE_TYPES, TYPE_EMPLOYEES);
  const { data: ips, loading: loadingIps } = useFetchData(
    `${process.env.API_IPS}?state.name=Libre&pagination=false`,
    IPS.filter(ip => ip.state.name === "Libre")
  );

  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [selectedIPs, setSelectedIPs] = useState([]);
  const [loading, setLoading] = useState(false);

  if (loadingSectors || loadingTypes || loadingIps) {
    return <p>Cargando datos...</p>;
  }

  const handleInputChange = (e) => {
    dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (
      !formState.firstName ||
      !formState.lastName ||
      !formState.email
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    setLoading(true);
    try {
      const employeePayload = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        phone: formState.phone_personal,
        iup: formState.iup,
        cuil: formState.cuil,
        email: formState.email,
        type: `${process.env.API_EMPLOYEE_TYPES}/${formState.typeEmployee}`,
        sector: `${process.env.API_SECTORS}/${formState.sector}`,
        ips: selectedIPs.map(ip => `${process.env.API_IPS}/${ip.id}`)
      };
      
      const employeeResponse = await fetch(process.env.API_EMPLOYEES, {
        method: "POST",
        headers: { "Content-Type": "application/ld+json",
            'Accept': 'application/ld+json'
         },
        body: JSON.stringify(employeePayload)
      });
      const responseData = await employeeResponse.json();

      if (!employeeResponse.ok) {
        console.log("Error en la respuesta:", responseData );       
        throw new Error("Error al crear el empleado");
      }
  console.log("Respuesta JSON:", responseData);
      alert("Empleado creado y IPs asociadas correctamente.");
      dispatch({ type: "RESET" });
      setSelectedIPs([]);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al enviar los datos.");
    }
    setLoading(false);
  };

  return (
    <form className="mx-4" onSubmit={handlerSubmit}>
      <h2 className="text-center text-3xl text-sky-800 p-2 font-bold">Alta de persona</h2>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />
      <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
        <Input
          label="Nombre:"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Lucas Enedín"
          value={formState.firstName}
          onChange={handleInputChange}
        />
        <Input
          label="Apellido:"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="García"
          value={formState.lastName}
          onChange={handleInputChange}
        />
      </section>
      <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
        <Input
          label="Email:"
          type="email"
          id="email"
          name="email"
          placeholder="correo@correo.com"
          value={formState.email}
          onChange={handleInputChange}
        />
        <div className="md:w-1/2 flex gap-2 w-full min-w-10">
          <Input
            label="CUIL:"
            type="text"
            id="cuil"
            name="cuil"
            placeholder="20-12345678-9"
            value={formState.cuil}
            onChange={handleInputChange}
          />
          <Input
            label="IUP:"
            type="text"
            id="iup"
            name="iup"
            placeholder="legarcia"
            value={formState.iup}
            onChange={handleInputChange}
          />
        </div>
      </section>
      <section className="flex justify-between gap-2 flex-nowrap md:flex-nowrap">
        <Input
          label="Teléfono Personal:"
          type="text"
          id="phone_personal"
          name="phone_personal"
          placeholder="351-12345678"
          value={formState.phone_personal}
          onChange={handleInputChange}
        />
        <Input
          label="Teléfono Interno:"
          type="text"
          id="phone_int"
          name="phone_int"
          placeholder="341444"
          value={formState.phone_int}
          onChange={handleInputChange}
        />
      </section>
      <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
        <div className="md:w-1/2 w-full min-w-10">
          <label htmlFor="sector">Sector:</label>
          <select
            id="sector"
            name="sector"
            className="rounded-md border w-full p-1 border-sky-950 focus:outline-none focus:border-sky-500"
            onChange={handleInputChange}
            value={formState.sector}
          >
            <option disabled value="">
              Seleccione un sector
            </option>
            {sectors?.map((sector, index) => (
              <option key={index} value={sector.id}>
                {sector?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/2 w-full min-w-10">
          <label htmlFor="typeEmployee">Tipo de Empleado:</label>
          <select
            id="typeEmployee"
            name="typeEmployee"
            className="rounded-md border w-full p-1 border-sky-950 focus:outline-none focus:border-sky-500"
            onChange={handleInputChange}
            value={formState.typeEmployee}
          >
            <option disabled value="">
              Seleccione un tipo
            </option>
            {typeEmployees?.map((typeEmployee, index) => (
              <option key={index} value={typeEmployee.id}>
                {typeEmployee.name}
              </option>
            ))}
          </select>
        </div>
      </section>
      <br />
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />
      <h4 className="text-start text-lg text-sky-950 font-bold">IPs asociadas</h4>
      <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap"></section>
      <div className="md:w-1/2 w-full min-w-10">
        <SelectorIP ips={ips} onSelectedIPsChange={setSelectedIPs} />
      </div>
      <br />
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />
      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
