import { useState, useEffect } from "react";
import MainButton from "../../components/buttons/MainButton";
import { getForms, deleteForm } from "../../services/movilidad.service";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import facultyOptions from "../../utils/facultyOptions";

import search from "../../assets/icons/searchIcon.svg";

const Movility = () => {
  const [movilidad, setdMovilidad] = useState([]);
  const [seElimino, setseElimino] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const formsData = await getForms();
      console.log(formsData);

      if (formsData.data && formsData.data.content) {
        // Mapeamos los datos para obtener el agreementNumber y asignarlo a c_convenio
        const mappedData = formsData.data.content.map((item) => ({
          dependencia: item.faculty || "N/A", // Agrega otros campos relevantes
          c_convenio: item.agreement?.agreementNumber || "N/A", // Asigna el agreementNumber a c_convenio
          id_convenio: item.id || "N/A",
          t_documento: item.person.identificationType || "N/A",
          d_usuario: item.person.identification || "N/A",
        }));

        setdMovilidad(mappedData);
      }
    };
    fetchData();
  }, [seElimino]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "default",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();

  // Manejar búsqueda
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Manejar filtro por dependencia
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setIsFilterOpen(false);
  };

  // Función de ordenamiento
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = "default";
      }
    }
    setSortConfig({ key, direction });
  };

  const sortedMovilidad = [...movilidad]
    .filter((item) =>
      item.dependencia
        ? item.dependencia.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
    .filter((item) => (filterStatus ? item.dependencia === filterStatus : true))
    .sort((a, b) => {
      if (sortConfig.key && sortConfig.direction !== "default") {
        if (sortConfig.direction === "asc") {
          return a[sortConfig.key].localeCompare(b[sortConfig.key]);
        } else if (sortConfig.direction === "desc") {
          return b[sortConfig.key].localeCompare(a[sortConfig.key]);
        }
      }
      return 0;
    });

  const renderSortIcons = (key) => {
    const isSortedAsc =
      sortConfig.key === key && sortConfig.direction === "asc";
    const isSortedDesc =
      sortConfig.key === key && sortConfig.direction === "desc";

    return (
      <span className="inline-flex items-center ml-1 text-xs">
        {isSortedAsc ? (
          <span className="material-symbols-outlined">keyboard_arrow_up</span>
        ) : isSortedDesc ? (
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        ) : (
          <span className="material-symbols-outlined">unfold_more</span>
        )}
      </span>
    );
  };

  const Delete = (id) => {
    deleteForm(id).then((res) => {
      if (res.status == 204) {
        setseElimino(!seElimino);
      }
    });
  };

  return (
    <AdminLayout>
      <div className="p-10 overflow-x-auto">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-col justify-between w-full gap-3 mb-5 md:gap-0 md:flex-row">
            <MainButton
              onClick={() => navigate("/form")}
              bgColor="primary-dark"
              textColor="white"
              text="Crear"
              className="mx-5 xl:ml-48 lg:ml-32 md:ml-20"
            />

            <div className="bg-grays w-[350px] rounded-full py-2 px-5 border-2 border-gray-500 flex items-center justify-between xl:mr-48 lg:mr-32 md:mr-20 m-auto">
              <input
                type="text"
                placeholder="Buscar dependencia"
                value={searchTerm}
                onChange={handleSearch}
                className="bg-transparent w-[90%] outline-none"
              />
              <img src={search} alt="search icon" />
            </div>
            <div className="flex justify-end w-full gap-x-5 md:items-center md:w-fit">
              <div className="relative">
                <button
                  className="flex items-center px-4 py-2 rounded-md bg-neutral hover:bg-gray-200"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <span className="material-symbols-outlined">filter_alt</span>
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow-lg">
                    <select
                      className="block w-full px-4 py-2 text-left cursor-pointer focus:outline-none"
                      value={filterStatus}
                      onChange={handleFilterChange}
                    >
                      <option value="">Todas las dependencias</option>
                      {[
                        ...new Set(movilidad.map((item) => item.dependencia)),
                      ].map((dep, index) => (
                        <option key={index} value={dep}>
                          {dep}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <table className="w-full text-center bg-white text-primary-dark">
          <thead className="bg-neutral">
            <tr className="text-left bg-azulClaro bg-opacity-20">
              <th
                className="px-4 py-3 font-semibold text-center cursor-pointer text-azulOscuro rounded-tl-xl"
                style={{ width: "20%" }}
                onClick={() => handleSort("dependencia")}
              >
                <div className="inline-flex items-center justify-center">
                  Dependencia {renderSortIcons("dependencia")}
                </div>
              </th>
              <th
                className="px-4 py-3 font-semibold text-center cursor-pointer text-azulOscuro"
                style={{ width: "20%" }}
                onClick={() => handleSort("c_convenio")}
              >
                <div className="inline-flex items-center justify-center">
                  Codigo de Convenio {renderSortIcons("c_convenio")}
                </div>
              </th>
              <th
                className="px-4 py-3 font-semibold text-center cursor-pointer text-azulOscuro"
                style={{ width: "15%" }}
                onClick={() => handleSort("t_documento")}
              >
                <div className="inline-flex items-center justify-center">
                  Tipo de Documento {renderSortIcons("t_documento")}
                </div>
              </th>
              <th
                className="px-4 py-3 font-semibold text-center cursor-pointer text-azulOscuro"
                style={{ width: "25%" }}
                onClick={() => handleSort("d_usuario")}
              >
                <div className="inline-flex items-center justify-center">
                  Documento Usuario {renderSortIcons("d_usuario")}
                </div>
              </th>
              <th
                className="px-4 py-3 font-semibold text-center text-azulOscuro rounded-tr-xl"
                style={{ width: "20%" }}
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg text-azulOscuro">
            {sortedMovilidad.length > 0 ? (
              sortedMovilidad.map((item, index) => (
                <tr
                  key={index}
                  className="border-t even:bg-azulClaro even:bg-opacity-10"
                >
                  <td className="px-4 py-2">{facultyOptions.find(option => option.value === item.dependencia)?.text || "No disponible"}</td>
                  <td className="px-4 py-2">{item.c_convenio}</td>
                  <td className="px-4 py-2">{item.t_documento}</td>
                  <td className="px-4 py-2">{item.d_usuario}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center space-x-2">
                      <button
                        title="Ver movimiento"
                        onClick={() => navigate(`/show/${item.id_convenio}`)}
                        className="text-gray-500 hover:text-blue-500"
                      >
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                      <button
                        title="Editar movimiento"
                        onClick={() =>
                          navigate(`/form/update/${item.id_convenio}`)
                        }
                        className="text-gray-500 hover:text-green-500"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        title="Eliminar movimiento"
                        onClick={() => Delete(item.id_convenio)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <MainButton
          bgColor="primary-dark"
          textColor="white"
          text="Guardar"
          className="fixed bottom-10 right-10"
        />
      </div>
    </AdminLayout>
  );
};

export default Movility;
