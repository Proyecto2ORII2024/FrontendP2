import BackIcon from "../../assets/icons/BackArrow.svg";
import MainButton from "../../components/buttons/MainButton.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {createUser} from "../../services/user.service.js";

function RegistrarUsuarioPage() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const handleRegister = (data) => {
        //navigate("/user/list")
        createUser(data)
        console.log(data)
        navigate("/user/list")
    };

    const options = [
        { value: '', label: '' },
        { value: 'ADMIN', label: 'Admin' },
        { value: 'USER', label: 'Usuario' }
    ];
    const faculties = [
        { value: '', label: '' },
        {value:'FIET', label:'FIET'},
        {value:'FIC', label:'FIC'},
        {value:'FACNED', label:'FACNED'}
    ]

    return (
        <div
            className="h-screen w-full bg-gray-100 bg-cover bg-center flex justify-center items-center text-black"
        >
            <form className="flex flex-col items-center bg-white rounded-3xl gap-3 w-[90%] md:w-[50%] lg:w-[25%] md:py-10 py-5 justify-center" onSubmit={handleSubmit(handleRegister)}
            >
                <div className="flex justify-start w-[90%]">
                    <button className="flex bg-grays w-10 h-10 justify-center items-center rounded-3xl"><img src={BackIcon} alt="BackIcon" onClick={navigate("/user/list")} /></button>
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
                            className="bg-grays w-[100%] h-8"
                            placeholder=""
                            {...register("faculty", {
                                required: true
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
    );
}

export default RegistrarUsuarioPage;
