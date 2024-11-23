import BackIcon from "../../assets/icons/BackArrow.svg";
import MainButton from "../../components/buttons/MainButton.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createUser } from "../../services/user.service.js";
import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";

import AdminLayout from "../../layouts/AdminLayout.jsx";

function RegistrarUsuarioPage() {

    const navigate = useNavigate();
    const [isFacultadDisabled, setIsFacultadDisabled] = useState(false);
    const [wasCreated, setWasCreated] = useState("");

    const {
        register,
        setValue,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm();

    /**
     * Funcion para crear un usuario
     * @param {object} data - La informacion del usuario a registrar
     */
    const handleRegister = async(data) => {
        //navigate("/user/list")
        try {
            if (data.faculty === null || data.faculty === '') {
                delete data.faculty;
            }
            console.log(await createUser(data))
            console.log(data)
            setWasCreated("success")
        } catch (error) {
            console.log(error);
            setWasCreated("error")
        }
        
    };

    const options = [
        { value: null, label: '' },
        { value: 'ADMIN', label: 'Admin' },
        { value: 'USER', label: 'Usuario' }
    ];
    const faculties = [
        { value: null, label: '' },
        { value: 'FIET', label: 'FIET' },
        { value: 'FIC', label: 'FIC' },
        { value: 'FACNED', label: 'FACNED' }
    ]

    /**
     * Funcion que maneja cuando se cambia el rol del usuario(por cuestiones de requerimientos)
     * @param {object} e - Evento dado en el objeto en el que se utiliza la funcion 
     */
    const handleRolChange = (e) => {
        const value = e.target.value;
        if (value === "ADMIN") {
            setIsFacultadDisabled(true);
            setValue("faculty", ""); // Limpia el valor de facultad
            clearErrors("faculty"); // Limpia cualquier error previo
        } else {
            setIsFacultadDisabled(false);
        }
    };

    /**
     * Devuelve al usuario a la lista de usuarios
     */
    const returnList = () => {
        navigate("/user/list")
    }

    return (
        <AdminLayout>
            <NotificationBox
                type={wasCreated}
                title={
                    wasCreated === "success"
                        ? "Usuario eliminado"
                        : "Error al eliminar usuario"
                }
                open={wasCreated === "success" || wasCreated === "error"}
                setOpen={() => setWasCreated("")}
            >
                {wasCreated === "success" ? (
                    <p>El usuario ha sido eliminado exitosamente</p>
                ) : (
                    <p>
                        Ha ocurrido un error al eliminar el usuario, por favor intente de
                        nuevo
                    </p>
                )}
            </NotificationBox>
            <div
                className="h-screen w-full bg-gray-100 bg-cover bg-center flex justify-center items-center text-black"
            >
                <form className="flex flex-col items-center bg-white rounded-3xl gap-3 w-[90%] md:w-[50%] lg:w-[25%] md:py-10 py-5 justify-center" onSubmit={handleSubmit(handleRegister)}
                >
                    <div className="flex justify-start w-[90%]">
                        <button className="flex bg-grays w-10 h-10 justify-center items-center rounded-3xl"><img src={BackIcon} alt="BackIcon" onClick={returnList} /></button>
                    </div>
                    <h1 className="bg-transparent text-4xl font-bold text-center">Registro</h1>
                    <div className="flex flex-col gap-y-2 bg-white rounded-3xl p-3 py-4 items-start w-[80%]">
                        <div className="flex flex-col w-full">
                            <label htmlFor="" className="text-xl">Correo</label>
                            <input
                                htmlFor=""
                                className="bg-grays w-[100%] h-8"
                                type="email"
                                {...register("email", {
                                    required: true, pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Correo no valido",
                                    },
                                })}
                            />
                            {errors.email && <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-2">
                                {errors.email.message || "Este campo es requerido"}
                            </span>}
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="" className="text-xl">Rol</label>
                            <select
                                className="bg-grays w-[100%] h-8"
                                placeholder=""
                                {...register("role", {
                                    required: true
                                })}
                                onChange={handleRolChange}
                            >
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-2">
                                {errors.role.message || "Seleccione un rol"}
                            </span>}
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="" className="text-xl">Facultad</label>
                            <select
                                className="bg-grays w-[100%] h-8 outline-none border-none"
                                placeholder=""
                                disabled={isFacultadDisabled}
                                {...register("faculty", {
                                    required: !isFacultadDisabled
                                })}
                            >
                                {faculties.map((faculty) => (
                                    <option key={faculty.value} value={faculty.value}>
                                        {faculty.label}
                                    </option>
                                ))}
                            </select>
                            {errors.faculty && <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-2">
                                {errors.faculty.message || "Seleccione una facultad"}
                            </span>}
                        </div>
                    </div>
                    <MainButton
                        type="submit"
                        text="Registrar"
                        bgColor="primary"
                        hoverBg="primary-light"
                        textColor="white"
                        className=""
                    />
                </form>
            </div>
        </AdminLayout>
    );
}

export default RegistrarUsuarioPage;
