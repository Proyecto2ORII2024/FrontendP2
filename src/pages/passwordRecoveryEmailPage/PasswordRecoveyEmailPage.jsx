import LoginImage from "../../assets/Images/Login.webp";
import ORIIIcon from "../../assets/Images/ORII.webp";
import MainButton from "../../components/buttons/MainButton.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

//
function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data)
  };

  return (
    <div
      className="h-screen w-full bg-slate-400 bg-cover bg-center flex justify-center items-center text-white"
      style={{ backgroundImage: `url(${LoginImage})` }}
    >
      <div className="flex flex-col items-center bg-primary/50 rounded-3xl gap-3 w-[90%] md:w-[50%] lg:w-[25%] md:py-10 py-5 justify-center">
        <img src={ORIIIcon} alt="ORIIIcon" className="w-[300px]" />
        <form className="flex flex-col items-center gap-y-2" onSubmit={handleSubmit(handleLogin)}>
          <label htmlFor="" className="text-xl">Ingrese el correo registrado</label>
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
          </div>
          <MainButton
            type="submit"
            text="Enviar correo"
            bgColor="primary"
            hoverBg="primary-light"
            textColor="white"
            className=""
          />
        </form>
      </div>
    </div>
  );
}

export default Login;