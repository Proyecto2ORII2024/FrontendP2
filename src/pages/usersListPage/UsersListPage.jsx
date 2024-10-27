import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import checkIcon from "../../assets/icons/checkIcon.svg";
import search from "../../assets/icons/searchIcon.svg";
import MainButton from "../../components/buttons/MainButton.jsx";
import { useNavigate } from "react-router-dom";

import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import EditUser from "../../components/editUser/EditUser.jsx";
import DeleteUser from "../../components/deleteUser/DeleteUser.jsx";

import { useState } from "react";

import { styles } from "./styles.js";

function UsersListPage() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userID, setUserId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchStudent, setSearchStudent] = useState([]);
  const [wasDeleted, setWasDeleted] = useState("");
  const [wasUpdated, setwasUpdated] = useState("");
  const [userSelected, setUserSelected] = useState({});
  const [estudiantes, setEstudiantes] = useState([
    {
      Id: 1,
      Correo: "ORI@UNICAUCA.EDU.CO",
      Rol: "Admin",
      Password: "123",
    },
    {
      Id: 2,
      Correo: "INGENIERIA@UNICAUCA.EDU.CO",
      Rol: "Usuario",
      Password: "123",
    },
    {
      Id: 3,
      Correo: "jsotelop@UNICAUCA.EDU.CO",
      Rol: "Usuario",
      Password: "123",
    },
    {
      Id: 4,
      Correo: "cgarcias@UNICAUCA.EDU.CO",
      Rol: "Usuario",
      Password: "123",
    },
    {
      Id: 5,
      Correo: "jorejuelam@UNICAUCA.EDU.CO",
      Rol: "Usuario",
      Password: "123",
    },
    {
      Id: 6,
      Correo: "jorgevelasco@UNICAUCA.EDU.CO",
      Rol: "Admin",
      Password: "123",
    },
  ]);

  const navigate = useNavigate();

  const role = ["Admin", "Usuario"];

  const updateData = (id, data) => {
    console.log(id, data);
    setEstudiantes(
      estudiantes.map((estudiante) =>
        estudiante.Id === id
          ? { ...estudiante, Rol: data.rol, Password: data.password }
          : estudiante
      )
    );
    setSearchStudent(
      searchStudent.map((estudiante) =>
        estudiante.Id === id
          ? { ...estudiante, Rol: data.rol, Password: data.password }
          : estudiante
      )
    );
    setwasUpdated("success");
  };

  const updatePassword = (id, data) => {
    console.log(id, data);
    setEstudiantes(
      estudiantes.map((estudiante) =>
        estudiante.Id === id
          ? { ...estudiante, Password: data.password }
          : estudiante
      )
    );
    setSearchStudent(
      searchStudent.map((estudiante) =>
        estudiante.Id === id
          ? { ...estudiante, Password: data.password }
          : estudiante
      )
    );
    setwasUpdated("success");
  };

  const updateRol = (id, data) => {
    console.log(id, data);
    setEstudiantes(
      estudiantes.map((estudiante) =>
        estudiante.Id === id ? { ...estudiante, Rol: data.rol } : estudiante
      )
    );
    setSearchStudent(
      searchStudent.map((estudiante) =>
        estudiante.Id === id ? { ...estudiante, Rol: data.rol } : estudiante
      )
    );
    setwasUpdated("success");
  };

  const handleDelete = (idToDelete) => {
    console.log("idtodelete", idToDelete);
    let id;
    if (typeof idToDelete === "string") {
      id = parseInt(idToDelete);
    } else {
      id = idToDelete;
    }
    setEstudiantes(estudiantes.filter((estudiante) => estudiante.Id !== id));
    setWasDeleted("success");
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      setSearchStudent(
        estudiantes.filter(
          (estudiante) =>
            estudiante.Correo.toLowerCase().includes(
              e.target.value.toLowerCase()
            ) ||
            estudiante.Rol.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };
  return (
    <AdminLayout>
      <main>
        <EditUser
          open={openEdit}
          setOpen={setOpenEdit}
          user={userSelected}
          setUpdated={setwasUpdated}
          updateData={updateData}
          updatePassword={updatePassword}
          updateRol={updateRol}
        />
        <DeleteUser
          open={openDelete}
          setOpen={setOpenDelete}
          userId={userID}
          setDeleted={setWasDeleted}
          handleDelete={handleDelete}
        />
        <NotificationBox
          type={wasDeleted}
          title={
            wasDeleted === "success"
              ? "Usuario eliminado"
              : "Error al eliminar usuario"
          }
          open={wasDeleted === "success" || wasDeleted === "error"}
          setOpen={() => setWasDeleted("")}
        >
          {wasDeleted === "success" ? (
            <p>El usuario ha sido eliminado exitosamente</p>
          ) : (
            <p>
              Ha ocurrido un error al eliminar el usuario, por favor intente de
              nuevo
            </p>
          )}
        </NotificationBox>
        <NotificationBox
          type={wasUpdated}
          title={
            wasUpdated === "success"
              ? "Usuario editado"
              : "Error al editar usuario"
          }
          open={wasUpdated === "success" || wasUpdated === "error"}
          setOpen={() => setwasUpdated("")}
        >
          {wasUpdated === "success" ? (
            <p>El usuario ha sido editado exitosamente</p>
          ) : (
            <p>
              Ha ocurrido un error al editar el usuario, por favor intente de
              nuevo
            </p>
          )}
        </NotificationBox>
        <section className="flex justify-between items-center flex-col md:flex-row">
          <section className="w-full flex gap-3 md:gap-0 mb-3 md:m-5 flex-col justify-between items-center">
            <h2 className="w-full md:m-5 px-5 pt-3 md:pt-0 text-lg text-center">
              A continuación se presenta una tabla con los usuarios registrados
              actualmente..
            </h2>
            <MainButton
              onClick={() => navigate("/user/register")}
              text="Registrar usuario"
              bgColor="primary"
              hoverBg="primary-light"
              textColor="white"
              className=""
            />
          </section>
          <section className="w-full flex gap-3 md:gap-0 mb-3 md:m-5 flex-col md:flex-row justify-between items-center">
            <article className="bg-grays w-[350px] rounded-full py-2 px-5 border-2 border-gray-500 flex items-center justify-between xl:mr-48 lg:mr-32 md:mr-20 m-auto">
              <input
                id="search"
                type="text"
                placeholder="Ingresa la información que deseas buscar"
                className="w-[90%] outline-none bg-transparent"
                onChange={(e) => handleSearch(e)}
              />
              <img src={search} alt="search icon" />
            </article>
          </section>
        </section>
        {!isSearching ? (
          <>
            <section className="w-full flex justify-center px-20 mb-5 ">
              <table className="w-full text-left table-auto border-collapse text-primary-dark md:table">
                <thead className="hidden md:table-header-group bg-neutral">
                  <tr className="bg-azulClaro bg-opacity-20">
                    <th className={`${styles.thIn} rounded-tl-xl`}>Correo</th>
                    <th className={`${styles.thIn}`}>Rol</th>
                    <th className={`${styles.thIn} rounded-tr-xl`}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantes.map(
                    (estudiante) => (
                      (
                        <tr
                          className={"flex flex-col md:table-row border-b"}
                          key={estudiante.Correo}
                        >
                          <td className={`${styles.tdIn}`}>
                            <span className="md:hidden font-bold">Correo:</span>
                            {estudiante.Correo + " " + estudiante.Password}
                          </td>
                          <td className={styles.tdIn}>
                            <span className="md:hidden font-bold">Rol:</span>
                            {estudiante.Rol}
                          </td>
                          <td className={styles.tdIn}>
                            <span className="md:hidden font-bold">
                              Acciones:
                            </span>
                            <div className="flex justify-center gap-[10%]">
                              <button
                              title="Editar usuario"
                                className=""
                                onClick={() => {
                                  setOpenEdit(true);
                                  setUserSelected(estudiante);
                                }}
                              >
                                <img
                                  className={styles.buttonAction}
                                  src={editIcon}
                                  alt="editIcom"
                                />
                              </button>
                              <button
                              title="Eliminar usuario"
                                id={estudiante.Id}
                                onClick={() => {
                                  setOpenDelete(true);
                                  setUserId(estudiante.Id.toString());
                                }}
                              >
                                <img
                                  className={styles.buttonAction}
                                  src={deleteIcon}
                                  alt="deleteIcon"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </section>
          </>
        ) : (
          <>
            <section className="w-full flex justify-center px-20 mb-5">
              <table className="w-full text-left table-auto border-collapse md:table">
                <thead className="hidden md:table-header-group">
                  <tr className="bg-[#928F9A]">
                    <th className={`${styles.thIn} w-[200px]`}>Correo</th>
                    <th className={`${styles.thIn} w-[100px]`}>Rol</th>
                    <th className={`${styles.thIn} w-[150px]`}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {searchStudent.map(
                    (estudiante, index) => (
                      console.log(index, index % 2),
                      (
                        <tr
                          className={`${
                            index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"
                          } flex flex-col md:table-row border-b`}
                          key={estudiante.Correo}
                        >
                          <td className={`${styles.tdIn}`}>
                            <span className="md:hidden font-bold">Correo:</span>
                            {estudiante.Correo + " " + estudiante.Password}
                          </td>
                          <td className={styles.tdIn}>
                            <span className="md:hidden font-bold">Rol:</span>
                            estudiante.Rol
                          </td>
                          <td className={styles.tdIn}>
                            <span className="md:hidden font-bold">
                              Acciones:{" "}
                            </span>
                            <div className="flex justify-center space-x-4 md:justify-around px-15 md:px-5">
                              <button
                                className=""
                                onClick={() => {
                                  setOpenEdit(true);
                                  setUserSelected(estudiante);
                                }}
                              >
                                <img
                                  className={styles.buttonAction}
                                  src={editIcon}
                                  id={estudiante.Id}
                                  alt="editIcom"
                                />
                              </button>
                              <button>
                                <img
                                  className={styles.buttonAction}
                                  src={deleteIcon}
                                  id={estudiante.Id}
                                  onClick={(e) => handleDelete(e.target.id)}
                                  alt="deleteIcon"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </AdminLayout>
  );
}
export default UsersListPage;
