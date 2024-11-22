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
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      if (data.faculty === null || data.faculty === "") {
        delete data.faculty;
      }
      const result = await createUser(data);
      if(result.status === 201){
        setWasCreated("success");
        reset();
      }else {
        setWasCreated("error");
      }
    } catch (error) {
      console.log(error);
      setWasCreated("error");
    }
  };

  const options = [
    { value: null, label: "" },
    { value: "ADMIN", label: "Admin" },
    { value: "USER", label: "Usuario" },
  ];
  const faculties = [   
    { value: null, label: "" },
    { value: "FIET", label: "Ingeniería Electrónica y Telecomunicaciones" },
    { value: "FIC", label: "Ingeniería Civil" },
    { value: "FCS", label: "Ciencias de la Salud" },
    { value: "FDCPS", label: "Derecho y Ciencias Políticas y Sociales" },
    {
      value: "FACNED",
      label: "Facultad de Ciencias Naturales, Exactas y de la Educación",
    },
    { value: "FCH", label: "Ciencias Humanas" },
    { value: "FA", label: "Artes" },
    { value: "FCA", label: "Ciencias Agropecuarias" },
    {
      value: "FCCEA",
      label: "Ciencias Contables, Económicas y Administrativas",
    },
  ];

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

  const returnList = () => {
    navigate("/user/list");
  };

  return (
    <AdminLayout>
      <NotificationBox
        type={wasCreated}
        title={
          wasCreated === "success"
            ? "Usuario registrado"
            : "Error al registrar usuario"
        }
        open={wasCreated === "success" || wasCreated === "error"}
        setOpen={() => setWasCreated("")}
      >
        {wasCreated === "success" ? (
          <p>El usuario ha sido registrado exitosamente</p>
        ) : (
          <p>
            Ha ocurrido un error al registrar el usuario, puede ya estar creado
          </p>
        )}
      </NotificationBox>
      <div className="h-screen w-full bg-gray-100 bg-cover bg-center flex justify-center items-center text-black">
        <form
          className="flex flex-col items-center bg-white rounded-3xl gap-3 w-[90%] md:w-[50%] lg:w-[25%] md:py-10 py-5 justify-center"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="flex justify-start w-[90%]">
            <button className="flex bg-grays w-10 h-10 justify-center items-center rounded-3xl">
              <img src={BackIcon} alt="BackIcon" onClick={returnList} />
            </button>
          </div>
          <h1 className="bg-transparent text-4xl font-bold text-center">
            Registro
          </h1>
          <div className="flex flex-col gap-y-2 bg-white rounded-3xl p-3 py-4 items-start w-[80%]">
            <div className="flex flex-col w-full">
              <label htmlFor="" className="text-xl">
                Correo
              </label>
              <input
                htmlFor=""
                className="bg-grays w-[100%] h-8"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo no valido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-2">
                  {errors.email.message || "Este campo es requerido"}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="" className="text-xl">
                Rol
              </label>
              <select
                className="bg-grays w-[100%] h-8"
                placeholder=""
                {...register("role", {
                  required: true,
                })}
                onChange={handleRolChange}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-2">
                  {errors.role.message || "Seleccione un rol"}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="" className="text-xl">
                Facultad
              </label>
              <select
                className="bg-grays w-[100%] h-8 outline-none border-none"
                placeholder=""
                disabled={isFacultadDisabled}
                {...register("faculty", {
                  required: !isFacultadDisabled,
                })}
              >
                {faculties.map((faculty) => (
                  <option key={faculty.value} value={faculty.value}>
                    {faculty.label}
                  </option>
                ))}
              </select>
              {errors.faculty && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-2">
                  {errors.faculty.message || "Seleccione una facultad"}
                </span>
              )}
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
