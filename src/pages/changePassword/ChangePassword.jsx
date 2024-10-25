import LoginImage from "../../assets/Images/Login.webp";
import ORIIIcon from "../../assets/Images/ORII.webp";
import MainButton from "../../components/buttons/MainButton.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function ChangePassword() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    const handleRegister = (data) => {
        navigate("/user/list")
        console.log(data)
    };

    return (
        <div
            className="h-screen w-full bg-slate-400 bg-cover bg-center flex justify-center items-center text-white"
            style={{ backgroundImage: `url(${LoginImage})` }}
        >
            <form className="flex flex-col items-center bg-primary/50 rounded-3xl gap-3 w-[90%] md:w-[50%] lg:w-[25%] md:py-10 py-5 justify-center" onSubmit={handleSubmit(handleRegister)}
            >
                <img src={ORIIIcon} alt="ORIIIcon" className="w-[300px]" />
                <h1 className="bg-transparent text-4xl font-bold text-center">Cambiar contraseña</h1>
                <div className="flex flex-col gap-y-2 bg-primary/75 rounded-3xl p-3 py-4 items-start w-[60%]">
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="text-x">Nueva Contraseña</label>
                        <input
                            htmlFor=""
                            className="bg-primary-light w-[100%]"
                            type="password"
                            {...register("password", { required: true })} />
                        {errors.password && <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-2">
                            {errors.password.message || "Este campo es requerido"}
                        </span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="text-x">Confirmar Contraseña</label>
                        <input
                            htmlFor=""
                            className="bg-primary-light w-[100%]"
                            type="password"
                            {...register("password", { required: true })} />
                        {errors.password && <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-2">
                            {errors.password.message || "Este campo es requerido"}
                        </span>}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <MainButton
                        type="submit"
                        text="Cambiar"
                        bgColor="primary"
                        hoverBg="primary-light"
                        textColor="white"
                        className=""
                    />
                    <MainButton
                        type="submit"
                        text="Cancelar"
                        bgColor="primary"
                        hoverBg="primary-light"
                        textColor="white"
                        className=""
                    />
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;
