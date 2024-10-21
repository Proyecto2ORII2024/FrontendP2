import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import checkIcon from "../../assets/icons/checkIcon.svg";
import search from "../../assets/icons/searchIcon.svg";
import MainButton from "../../components/buttons/MainButton.jsx";
import { useNavigate } from "react-router-dom";

import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import EditUser from "../../components/editUser/EditUser.jsx";

import { useState } from "react";

import { styles } from "./styles.js";

function UsersListPage() {
    const [openEdit, setOpenEdit] = useState(false);
    const [notification, setNotification] = useState("");
    const [isEditing, setIsEditing] = useState({ state: false, index: -1 });
    const [values, setValues] = useState({ correo: "Test", rol: "Usuario" });
    const [isSearching, setIsSearching] = useState(false);
    const [searchStudent, setSearchStudent] = useState([]);
    const [wasUpdated, setwasUpdated] = useState("");
    const [userSelected, setUserSelected] = useState({})
    const [estudiantes, setEstudiantes] = useState([
        {
            Id: 1,
            Correo: "ORI@UNICAUCA.EDU.CO",
            Rol: "Admin",
            Password: "123"
        },
        {
            Id: 2,
            Correo: "INGENIERIA@UNICAUCA.EDU.CO",
            Rol: "Usuario",
            Password: "123"
        },
        {
            Id: 3,
            Correo: "jsotelop@UNICAUCA.EDU.CO",
            Rol: "Usuario",
            Password: "123"
        },
        {
            Id: 4,
            Correo: "cgarcias@UNICAUCA.EDU.CO",
            Rol: "Usuario",
            Password: "123"
        },
        {
            Id: 5,
            Correo: "jorejuelam@UNICAUCA.EDU.CO",
            Rol: "Usuario",
            Password: "123"
        },
        {
            Id: 6,
            Correo: "jorgevelasco@UNICAUCA.EDU.CO",
            Rol: "Admin",
            Password: "123"
        }
    ]);

    const navigate = useNavigate();

    const role = [
        'Admin',
        'Usuario'
    ];

    const esCorreoValido = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo); // Retorna true si el correo es válido, false si no lo es
    }

    const handleEditClick = (e) => {
        const id = parseInt(e.target.id);

        if (isEditing.state === false, isEditing.index === -1) {
            estudiantes.map(estudiante => estudiante.Id === id ? setValues({ correo: estudiante.Correo, rol: estudiante.Rol }) : null);
            setIsEditing({ state: true, index: id });
        } else {
            setNotification("alert");

        }
    };

    const updateData = (id, data) => {
        console.log(id, data)
        setEstudiantes(estudiantes.map(estudiante => estudiante.Id === id ? { ...estudiante, Rol: data.rol, Password: data.password } : estudiante));
        setSearchStudent(searchStudent.map(estudiante => estudiante.Id === id ? { ...estudiante, Rol: data.rol, Password: data.password } : estudiante));
        setNotification("success");
    };

    const updatePassword = (id, data) => {
        console.log(id, data)
        setEstudiantes(estudiantes.map(estudiante => estudiante.Id === id ? { ...estudiante, Password: data.password } : estudiante));
        setSearchStudent(searchStudent.map(estudiante => estudiante.Id === id ? { ...estudiante, Password: data.password } : estudiante));
        setNotification("success");
    }

    const updateRol = (id, data) => {
        console.log(id, data)
        setEstudiantes(estudiantes.map(estudiante => estudiante.Id === id ? { ...estudiante, Rol: data.rol } : estudiante));
        setSearchStudent(searchStudent.map(estudiante => estudiante.Id === id ? { ...estudiante, Rol: data.rol } : estudiante));
        setNotification("success");
    }

    const handleInputChange = (e) => {
        setValues({ correo: e.target.value, rol: values.rol });
    };

    const handleSelectChange = (e) => {
        setValues({ correo: values.correo, rol: e.target.value });
    };

    const handleDelete = (idToDelete) => {
        const id = parseInt(idToDelete);
        setEstudiantes(estudiantes.filter(estudiante => estudiante.Id !== id));
        setNotification("info");
    };


    const handleSearch = (e) => {
        if (e.target.value === "") {
            setIsSearching(false);
        } else {
            setIsSearching(true);
            setSearchStudent(
                estudiantes.filter(
                    (estudiante) =>
                        estudiante.Correo
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase()) ||
                        estudiante.Rol
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                )
            );
        }
    };
    /*
        const handleCheckboxChange = (e) => {
            const id = parseInt(e.target.id);
            setEstudiantes(estudiantes.map(estudiante => estudiante.Id === id ? { ...estudiante, Active: !estudiante.Active } : estudiante));
        }
    
        
                                            <th className={`${styles.thIn} w-[100px]`}>Habilitar</th>
                                            
                                                <td className={styles.tdOut}>
    
                                                    <div className="flex content-center justify-center space-x-1">
                                                        <span className="md:hidden font-bold">Habilitar: </span>
                                                        <input id={estudiante.Id} className="h-[25px] w-[25px]" type="checkbox" checked={estudiante.Active} onChange={(e) => handleCheckboxChange(e)} />
                                                    </div>
    
                                                </td>
    
                                                
                                            <th className={`${styles.thIn} w-[100px]`}>Habilitar</th>
                                                <td className={styles.tdOut}>
                                                    <span className="md:hidden font-bold">Habilitar: </span>
                                                    <input className="h-[25px] w-[25px]" type="checkbox" />
                                                </td>
        
        */
    return (
        <AdminLayout>
            <main>
                <EditUser
                    open={openEdit}
                    setOpen={setOpenEdit}
                    user={userSelected}
                    setUpdated={setwasUpdated}
                    updateData={updateData}
                    updatePassword={updatePassword}
                    updateRol={updateRol}
                />
                <NotificationBox
                    type={notification}
                    title={notification === "success" ? "Datos actualizados" : notification === "error" ? "Datos invalidos" : notification === "alert" ? "Accion invalida" : "Datos Eliminados"}
                    open={wasUpdated === "success" || wasUpdated === "error" || wasUpdated === "alert" || wasUpdated === "info"}
                    setOpen={() => { setwasUpdated("") }}
                >
                    {notification === "success" ? (
                        <p>Los datos han sido actualizados con exito.</p>
                    ) : (
                        notification === "error" ? (
                            <p>Los datos ingresados no son validos.</p>
                        ) : (
                            notification === "alert" ? (
                                <p>Debes terminar la accion en curso.</p>
                            ) : (
                                <p>Los datos han sido eliminados.</p>
                            )
                        )
                    )}
                </NotificationBox>
                <section className="flex justify-between items-center flex-col md:flex-row">
                    <section className="w-full flex gap-3 md:gap-0 mb-3 md:m-5 flex-col justify-between items-center">
                        <h2 className="w-full md:m-5 px-5 pt-3 md:pt-0 text-lg text-center">
                            A continuación se presenta una tabla con los usuarios registrados
                            actualmente..
                        </h2>
                        <MainButton
                            onClick={() => navigate("/user/register")}
                            text="Registrar usuario"
                            bgColor="primary"
                            hoverBg="primary-light"
                            textColor="white"
                            className=""
                        />
                    </section>
                    <section className="w-full flex gap-3 md:gap-0 mb-3 md:m-5 flex-col md:flex-row justify-between items-center">
                        <article className="bg-grays w-[350px] rounded-full py-2 px-5 border-2 border-gray-500 flex items-center justify-between xl:mr-48 lg:mr-32 md:mr-20 m-auto">
                            <input
                                id="search"
                                type="text"
                                placeholder="Ingresa la información que deseas buscar"
                                className="w-[90%] outline-none bg-transparent"
                                onChange={(e) => handleSearch(e)}
                            />
                            <img src={search} alt="search icon" />
                        </article>
                    </section>
                </section>
                {!isSearching ? (
                    <>
                        <section className="w-full flex justify-center px-20 mb-5">
                            <table className="w-full text-left table-auto border-collapse md:table">
                                <thead className="hidden md:table-header-group">
                                    <tr className="bg-[#928F9A]">
                                        <th className={`${styles.thIn} w-[200px]`}>Correo</th>
                                        <th className={`${styles.thIn} w-[100px]`}>Rol</th>
                                        <th className={`${styles.thIn} w-[150px]`}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estudiantes.map((estudiante, index) => (

                                        console.log(index, index % 2),
                                        <tr className={`${index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"} flex flex-col md:table-row border-b`} key={estudiante.Correo}>
                                            <td className={`${styles.tdIn}`}>
                                                <span className="md:hidden font-bold">
                                                    Correo:
                                                </span>
                                                {estudiante.Correo + " " + estudiante.Password}
                                            </td>
                                            <td className={styles.tdIn}>
                                                <span className="md:hidden font-bold">
                                                    Rol:
                                                </span>
                                                {isEditing.state && isEditing.index === estudiante.Id ? (
                                                    <select
                                                        className="bg-grays rounded-full w-[90%] outline-none border pl-4 p-2"
                                                        placeholder=""
                                                        onChange={(e) => handleSelectChange(e)}
                                                        value={values.rol}
                                                    >
                                                        {role.map((option) => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    estudiante.Rol
                                                )}
                                            </td>
                                            <td className={styles.tdIn}><span className="md:hidden font-bold">Acciones: </span>
                                                <div className="flex justify-center space-x-4 md:justify-around px-15 md:px-5">
                                                    <button className=""
                                                        onClick={() => {
                                                            setOpenEdit(true);
                                                            setUserSelected(estudiante);
                                                        }}>
                                                        <img className={styles.buttonAction} src={editIcon} id={estudiante.Id} alt="editIcom" />
                                                    </button>
                                                    <button>
                                                        <img className={styles.buttonAction} src={deleteIcon} id={estudiante.Id} onClick={(e) => handleDelete(e.target.id)} alt="deleteIcon" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </>
                ) : (
                    <>
                        <section className="w-full flex justify-center px-20 mb-5">
                            <table className="w-full text-left table-auto border-collapse md:table">
                                <thead className="hidden md:table-header-group">
                                    <tr className="bg-[#928F9A]">
                                        <th className={`${styles.thIn} w-[200px]`}>Correo</th>
                                        <th className={`${styles.thIn} w-[100px]`}>Rol</th>
                                        <th className={`${styles.thIn} w-[150px]`}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchStudent.map((estudiante, index) => (

                                        console.log(index, index % 2),
                                        <tr className={`${index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"} flex flex-col md:table-row border-b`} key={estudiante.Correo}>
                                            <td className={`${styles.tdIn}`}>
                                                <span className="md:hidden font-bold">
                                                    Correo:
                                                </span>
                                                {estudiante.Correo + " " + estudiante.Password}
                                            </td>
                                            <td className={styles.tdIn}>
                                                <span className="md:hidden font-bold">
                                                    Rol:
                                                </span>
                                                {isEditing.state && isEditing.index === estudiante.Id ? (
                                                    <select
                                                        className="bg-grays rounded-full w-[90%] outline-none border pl-4 p-2"
                                                        placeholder=""
                                                        onChange={(e) => handleSelectChange(e)}
                                                        value={values.rol}
                                                    >
                                                        {role.map((option) => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    estudiante.Rol
                                                )}
                                            </td>
                                            <td className={styles.tdIn}><span className="md:hidden font-bold">Acciones: </span>
                                                <div className="flex justify-center space-x-4 md:justify-around px-15 md:px-5">
                                                    <button className=""
                                                        onClick={() => {
                                                            setOpenEdit(true);
                                                            setUserSelected(estudiante);
                                                        }}>
                                                        <img className={styles.buttonAction} src={editIcon} id={estudiante.Id} alt="editIcom" />
                                                    </button>
                                                    <button>
                                                        <img className={styles.buttonAction} src={deleteIcon} id={estudiante.Id} onClick={(e) => handleDelete(e.target.id)} alt="deleteIcon" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </>
                )}

            </main>
        </AdminLayout>
    );

}
export default UsersListPage;