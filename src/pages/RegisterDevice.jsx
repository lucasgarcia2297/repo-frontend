import { useReducer, useState } from "react";
import { Input } from "../components/Input";
import { SelectorIP } from "../components/SelectorIP";
import devices_typesJSON from "../mocks/device_types.json";
import sectorsJSON from "../mocks/sectors.json";
import ipsJSON from "../mocks/ips.json";
import { useFetchData } from "../hooks/useFetchData";
import Button from "../components/Button";

const SECTORS = sectorsJSON.member;
const TYPE_DEVICES = devices_typesJSON.member;
const IPS = ipsJSON.member;

const initialFormState = {
  typeDevice: "",
  model: "",
  mac: "",
  code: "",
  serial: "",
  brand: "",
  sector: "",
  isRented: false
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

export default function RegisterDevice() {
  const { data: sectors, loading: loadingSectors } = useFetchData(process.env.API_SECTORS, SECTORS);
  const { data: typeDevices, loading: loadingTypes } = useFetchData(process.env.API_DEVICE_TYPES, TYPE_DEVICES);
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
      !formState.typeDevice ||
      !formState.isRented
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    setLoading(true);
    try {
      const devicePayload = {
        mac: formState.mac,
        code: formState.code,
        brand: formState.brand,
        serial: formState.serial,
        model: formState.model,
        typeDevice: `${process.env.API_DEVICE_TYPES}/${formState.typeDevice}`,
        sector: `${process.env.API_SECTORS}/${formState.sector}`,
        ips: selectedIPs.map(ip => `${process.env.API_IPS}/${ip.id}`),
        isRented: formState.isRented
      };

      const employeeResponse = await fetch(process.env.API_EMPLOYEES, {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
          'Accept': 'application/ld+json'
        },
        body: JSON.stringify(devicePayload)
      });
      const responseData = await employeeResponse.json();

      if (!employeeResponse.ok) {
        console.log("Error en la respuesta:", responseData);
        throw new Error("Error al crear el dispositivo");
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
      <h2 className="text-center text-3xl text-sky-800 p-2 font-bold">Alta de dispositivo</h2>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />
      <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
        <Input
          label="Mac:"
          type="text"
          id="mac"
          name="mac"
          placeholder="a2:23:23:ef:20"
          value={formState.mac}
          onChange={handleInputChange}
        />
        <Input
          label="Código:"
          type="text"
          id="code"
          name="code"
          placeholder=""
          value={formState.code}
          onChange={handleInputChange}
        />
      </section>
      <section className="flex justify-between gap-2 flex-wrap md:flex-nowrap">
        <div className="md:w-1/2 flex gap-2 w-full min-w-10">
          <Input
            label="Marca:"
            type="text"
            id="brand"
            name="brand"
            placeholder=""
            brand={formState.brand}
            onChange={handleInputChange}
          />
          <Input
            label="Model:"
            type="text"
            id="model"
            name="model"
            placeholder=""
            value={formState.model}
            onChange={handleInputChange}
          />
        </div>
        <Input
          label="Serial:"
          type="text"
          id="serial"
          name="serial"
          placeholder=""
          value={formState.serial}
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
          <label htmlFor="typeDevice">Tipo de Dispositivo:</label>
          <select
            id="typeDevice"
            name="typeDevice"
            className="rounded-md border w-full p-1 border-sky-950 focus:outline-none focus:border-sky-500"
            onChange={handleInputChange}
            value={formState.typeDevice}
          >
            <option disabled value="">
              Seleccione un tipo
            </option>
            {typeDevices?.map((typeDevice, index) => (
              <option key={index} value={typeDevice.id}>
                {typeDevice.name}
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
