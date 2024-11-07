import LoginImage from "../../assets/Images/Login.webp";
import ORIIIcon from "../../assets/Images/ORII.webp";
import MainButton from "../../components/buttons/MainButton.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import passwordIcon from "../../assets/icons/password.svg"
import visibility from "../../assets/icons/visibility.svg"
import visibilityOff from "../../assets/icons/visibility_off.svg"
function ChangePassword() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword =() => {
        setShowPassword(!showPassword);
    }
    return (
        <AdminLayout>
            <div className="bg-gray-100 p-8 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg w-96">
                    <div className="mb-10">
                        <h1 className="text-2xl uppercase font-bold text-center">Actualizar contraseña</h1>
                    </div>
                    <form className="flex flex-col gap-4">
                        <div className="relative">
                            <img src={passwordIcon} alt="password" className="absolute left-2 top-1/2 -translate-y-1/2 h-5"/>
                            <input type={showPassword ? "text" : "password"} 
                                className="w-full border bg-grays outline-none py-2 px-9 rounded-lg" 
                                placeholder="Contraseña"
                            />
                            {showPassword ? (
                                <img src={visibilityOff} alt="password visibility" onClick={handleShowPassword} className="absolute right-2 top-1/2 -translate-y-1/2 h-5 hover:cursor-pointer"/>
                            ) : (
                                <img src={visibility} alt="password visibility" onClick={handleShowPassword} className="absolute right-2 top-1/2 -translate-y-1/2 h-5 hover:cursor-pointer"/>
                            )}
                        </div>
                        <div className="relative">
                            <img src={passwordIcon} alt="password" className="absolute left-2 top-1/2 -translate-y-1/2 h-5"/>
                            <input type={showPassword ? "text" : "password"}  
                                className="w-full border bg-grays outline-none py-2 px-9 rounded-lg" 
                                placeholder="Confirmar Contraseña"
                            />
                            {showPassword ? (
                                <img src={visibilityOff} alt="password visibility" onClick={handleShowPassword} className="absolute right-2 top-1/2 -translate-y-1/2 h-5 hover:cursor-pointer"/>
                            ) : (
                                <img src={visibility} alt="password visibility" onClick={handleShowPassword} className="absolute right-2 top-1/2 -translate-y-1/2 h-5 hover:cursor-pointer"/>
                            )}
                        </div>
                        <div>
                        <MainButton
                            bgColor="primary"
                            hoverBg="primary-light"
                            textColor="white"
                            text="Reestablecer contraseña"
                            className="w-full"
                        />
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default ChangePassword;
