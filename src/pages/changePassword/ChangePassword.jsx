import MainButton from "../../components/buttons/MainButton.jsx";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import UserLayout from "../../layouts/UserLayout.jsx";
import passwordIcon from "../../assets/icons/password.svg";
import visibility from "../../assets/icons/visibility.svg";
import visibilityOff from "../../assets/icons/visibility_off.svg";
import { updatePassword } from "../../services/password.service.js";
import { AuthContext } from "../../context/LoginContext.jsx";
import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";

function ChangePassword() {
  const [matchPassword, setMatchPassword] = useState(true);
  const [wasCreated, setWasCreated] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);

  const Layout = user.role === "ADMIN" ? AdminLayout : UserLayout;

  const changePassword = async (data) => {
    console.log(user);

    console.log(data);

    const dataToSend = {
      userId: user.userId,
      actualPassword: data.actualPassword,
      newPassword: data.newPassword,
    };

    try {
      const res = await updatePassword(dataToSend);
      if (res.status === 200) {
        setWasCreated("success");
        reset();
      }else {
        setWasCreated("error");
      }
    } catch (error) {
      console.error(error);
        setWasCreated("error");
    }
  };

  const onSubmit = async (data) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      setMatchPassword(false);
      setTimeout(() => {
        setMatchPassword(true);
      }, 5000);
      return;
    }

    await changePassword(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <NotificationBox
        type={wasCreated}
        title={
          wasCreated === "success"
            ? "Contraseña actualizada"
            : "Error al actualizar contraseña"
        }
        open={wasCreated === "success" || wasCreated === "error"}
        setOpen={() => setWasCreated("")}
      >
        {wasCreated === "success" ? (
          <p>La contraseña se actualizó correctamente</p>
        ) : (
          <p>
            Ocurrió un error al actualizar la contraseña.
          </p>
        )}
      </NotificationBox>
      <div className="bg-gray-100 p-8 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg w-96">
          <div className="mb-10">
            <h1 className="text-2xl uppercase font-bold text-center">
              Actualizar contraseña
            </h1>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <article className="flex w-full border bg-grays items-center">
                <img src={passwordIcon} alt="password" className="ml-2 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border bg-grays outline-none py-2 px-9 rounded-lg"
                  placeholder="Contraseña actual"
                  {...register("actualPassword", {
                    required: {
                      value: true,
                      message: "La contraseña actual es obligatoria",
                    },
                  })}
                />
                {showPassword ? (
                  <img
                    src={visibilityOff}
                    alt="password visibility"
                    onClick={handleShowPassword}
                    className="mr-2 h-5 hover:cursor-pointer"
                  />
                ) : (
                  <img
                    src={visibility}
                    alt="password visibility"
                    onClick={handleShowPassword}
                    className="mr-2 h-5 hover:cursor-pointer"
                  />
                )}
              </article>
              {errors.actualPassword && (
                <span className="text-sm text-red-400">
                  {errors.actualPassword.message}
                </span>
              )}
            </div>
            <div className="relative">
              <article className="flex w-full border bg-grays items-center">
                <img src={passwordIcon} alt="password" className="ml-2 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border bg-grays outline-none py-2 px-9 rounded-lg"
                  placeholder="Nueva contraseña"
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "La contraseña actual es obligatoria",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!&])[A-Za-z\d@$!&]{8,16}$/,
                      message:
                        "La nueva contraseña debe tener entre 8 y 16 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@, $, ! o &).",
                    },
                  })}
                />
                {showPassword ? (
                  <img
                    src={visibilityOff}
                    alt="password visibility"
                    onClick={handleShowPassword}
                    className="mr-2 h-5 hover:cursor-pointer"
                  />
                ) : (
                  <img
                    src={visibility}
                    alt="password visibility"
                    onClick={handleShowPassword}
                    className="mr-2 h-5 hover:cursor-pointer"
                  />
                )}
              </article>
              {errors.newPassword && (
                <span className="text-sm text-red-400">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            {!matchPassword && (
              <p className="text-red-500 text-sm font-semibold">
                Las contraseñas no coinciden
              </p>
            )}
            <div className="relative">
              <article className="flex w-full border bg-grays items-center">
                <img src={passwordIcon} alt="password" className="ml-2 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border bg-grays outline-none py-2 px-9 rounded-lg"
                  placeholder="Confirmar nueva contraseña"
                  {...register("newPasswordConfirm", {
                    required: {
                      value: true,
                      message: "La contraseña actual es obligatoria",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!&])[A-Za-z\d@$!&]{8,16}$/,
                      message:
                        "La nueva contraseña debe tener entre 8 y 16 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@, $, ! o &).",
                    },
                  })}
                />
                {showPassword ? (
                  <img
                    src={visibilityOff}
                    alt="password visibility"
                    onClick={handleShowPassword}
                    className="mr-2 h-5 hover:cursor-pointer"
                  />
                ) : (
                  <img
                    src={visibility}
                    alt="password visibility"
                    onClick={handleShowPassword}
                    className="mr-2 h-5 hover:cursor-pointer"
                  />
                )}
              </article>
              {errors.newPasswordConfirm && (
                <span className="text-sm text-red-400">
                  {errors.newPasswordConfirm.message}
                </span>
              )}
            </div>
            <div>
              <MainButton
                bgColor="primary"
                type="submit"
                hoverBg="primary-light"
                textColor="white"
                text="Reestablecer contraseña"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;
