import LoginImage from "../../assets/Images/Login.webp";
import ORIIIcon from "../../assets/Images/ORII.webp";
import MainButton from "../../components/buttons/MainButton.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./styles.js";
import { login } from "../../services/login.service.js";
import { AuthContext } from "../../context/LoginContext.jsx";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

function Login() {

  const navigate = useNavigate();

  const {setUser} = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    login(data).then(
      res => {
        console.log(res.data)
        setUser(jwtDecode(res.data.accessToken))
        console.log(jwtDecode(res.data.accessToken))
      });
    //navigate("/admin")
    console.log("data",data)
  };

  return (
    <div
      className="h-screen w-full bg-slate-400 bg-cover bg-center flex justify-center items-center text-white"
      style={{ backgroundImage: `url(${LoginImage})` }}
    >
      <div className="flex flex-col items-center bg-primary/50 rounded-3xl gap-3 w-[90%] md:w-[50%] lg:w-[25%] md:py-10 py-5 justify-center">
        <img src={ORIIIcon} alt="ORIIIcon" className="w-[300px]" />
        <h1 className="bg-transparent text-4xl font-bold text-center">Bienvenido</h1>
        <form className="flex flex-col items-center gap-y-2" onSubmit={handleSubmit(handleLogin)}>
          <label htmlFor="" className="text-xl">Ingresa con tu correo y contraseña</label>
          <div className="flex flex-col gap-y-2 bg-primary/75 rounded-3xl p-3 py-4 items-start w-[90%]">
            <div className="flex flex-col w-full">
              <label htmlFor="" className="text-xl">Correo</label>
              <input
                htmlFor=""
                className="bg-primary-light w-[100%]"
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
              <label htmlFor="" className="text-xl">Contraseña</label>
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
          <MainButton
            type="submit"
            text="Iniciar Sesion"
            bgColor="primary"
            hoverBg="primary-light"
            textColor="white"
            className=""
          />
        </form>
        <p onClick={()=>{navigate("/passwordRecovery")}} style={styles}>Recuperar contraseña</p>
      </div>
    </div>
  );
}

export default Login;
