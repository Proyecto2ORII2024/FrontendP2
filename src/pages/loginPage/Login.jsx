import LoginImage from "../../assets/Images/Login.webp";
import GoogleIcon from "../../assets/icons/googleIcon.svg";
import loginIcon from "../../assets/icons/loginIcon.svg";
import ORIIIcon from "../../assets/Images/ORII.webp";

//
function Login() {

  return (
    <div
      className="h-screen w-full bg-slate-400 bg-cover bg-center flex justify-center items-center text-white"
      style={{ backgroundImage: `url(${LoginImage})` }}
    >
      <div className="flex flex-col items-center bg-primary/50 rounded-3xl gap-3 w-[90%] md:w-[50%] lg:w-[25%] md:py-10 py-5 justify-center">
        <img src={ORIIIcon} alt="ORIIIcon" className="w-[300px]" />
        <h1 className="bg-transparent text-4xl font-bold text-center">Bienvenido</h1>
        <form className="flex flex-col items-center gap-y-2">
          <label htmlFor="" className="text-xl">Ingresa con tu cuenta de Google</label>
          <div className="flex items-center gap-2">
            <img src={loginIcon} alt="loginIcon" className="w-[30px]" />
            <button className="bg-white rounded-full p-3 text-black flex items-center gap-2">
              <img src={GoogleIcon} alt="GoggleIcon" className="w-[30px]" />
              Conectarse con Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;