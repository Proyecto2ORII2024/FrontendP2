import LoginImage from "../../assets/Images/Login.webp";
import GoogleIcon from "../../assets/icons/googleIcon.svg";
import loginIcon from "../../assets/icons/loginIcon.svg";
import ORIIIcon from "../../assets/Images/ORII.webp";

//
function RegistrarUsuarioPage() {

    const options = [
        { value: 'admin', label: 'Admin' },
        { value: 'usuario', label: 'Usuario' }
    ];

    return (
        <div
            className="h-screen w-full bg-slate-400 bg-cover bg-center flex justify-center items-center text-white"
            style={{ backgroundImage: `url(${LoginImage})` }}
        >
            <div className="flex flex-col items-center bg-primary/50 rounded-3xl gap-3 w-[90%] md:w-[50%] lg:w-[25%] md:py-10 py-5 justify-center">
                <img src={ORIIIcon} alt="ORIIIcon" className="w-[300px]" />
                <h1 className="bg-transparent text-4xl font-bold text-center">Registro</h1>
                <form className="flex flex-col gap-y-2 bg-primary/75 rounded-3xl p-3 py-4 items-start w-[60%]">
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="text-xl">Correo</label>
                        <input htmlFor="" className="bg-primary-light w-[100%]"></input>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="text-xl">Rol</label>
                        <select
                            className="bg-primary-light"
                            placeholder=""
                        >
                            <option value=""></option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrarUsuarioPage;