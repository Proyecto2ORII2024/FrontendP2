import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import search from "../../assets/icons/searchIcon.svg";
import MainButton from "../../components/buttons/MainButton.jsx";
import { useNavigate } from "react-router-dom";

import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import EditUser from "../../components/editUser/EditUser.jsx";
import DeleteUser from "../../components/deleteUser/DeleteUser.jsx";
import { getUsers, updateUser, deleteUser } from "../../services/user.service.js"

import { useState, useEffect } from "react";

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
      userId: 1,
      email: "ORI@UNICAUCA.EDU.CO",
      role: "Admin"
    },
    {
      userId: 2,
      email: "INGENIERIA@UNICAUCA.EDU.CO",
      role: "Usuario"
    }
  ]);

  /**
   * Recibe los usuarios desde el backend
   */
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setEstudiantes(data.data);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  /**
   * Funcion que actualiza un usuario
   * @param {int} idToUpdate - La id del usuario que se quiere actualizar
   * @param {object} data - informacion del usuario que se quiere actualizar
   */
  const updateData = async (idToUpdate, data) => {
    try {

      let id;
      if (typeof idToUpdate === "string") {
        id = parseInt(idToUpdate);
      } else {
        id = idToUpdate;
      }

      var userUpt = userSelected;

      userUpt.role = data.role;
      userUpt.faculty = data.faculty;
      if(userUpt.faculty === null || userUpt.faculty === '' ){
        delete userUpt.faculty
      }
      await updateUser(id, userUpt)

      setEstudiantes(
        estudiantes.map((estudiante) =>
          estudiante.userId === id
            ? { ...estudiante, Rol: data.role, Password: data.password }
            : estudiante
        )
      );
      setSearchStudent(
        searchStudent.map((estudiante) =>
          estudiante.userId === id
            ? { ...estudiante, Rol: data.role, Password: data.password }
            : estudiante
        )
      );
      setwasUpdated("success");
    } catch (error) {
      setwasUpdated("error");
      console.log(error);
    }

  };

  /**
   * Funcion para eliminar un usuario
   * @param {int} idToDelete - La id del usuario a eliminar
   */
  const handleDelete = async (idToDelete) => {
    try {
      console.log("idtodelete", idToDelete);
    let id;
    if (typeof idToDelete === "string") {
      id = parseInt(idToDelete);
    } else {
      id = idToDelete;
    }
    console.log(await deleteUser(id));
    setEstudiantes(estudiantes.filter((estudiante) => estudiante.userId !== id));
    setWasDeleted("success");
    } catch (error) {
      setWasDeleted("error");
      console.log(error);
    }
    
  };

  /**
   * Funcion que controla la busqueda de usuarios
   * @param {object} e - evento del componente que contiene la informacion de busqueda
   */
  const handleSearch = (e) => {
    if (e.target.value === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      setSearchStudent(
        estudiantes.filter(
          (estudiante) =>
            estudiante.email.toLowerCase().includes(
              e.target.value.toLowerCase()
            ) ||
            estudiante.role.toLowerCase().includes(e.target.value.toLowerCase())
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
          <section className="w-full flex gap-3 md:gap-0 mb-3 md:m-5 flex-col justify-between md:items-center">
            <h2 className="w-full md:m-5 px-5 pt-3 md:pt-0 text-lg text-center">
              A continuación se presenta una tabla con los usuarios registrados
              actualmente..
            </h2>
            <div className="w-fit ml-3 md:ml-0">
            <MainButton
              onClick={() => navigate("/user/register")}
              text="Registrar usuario"
              bgColor="primary"
              hoverBg="primary-light"
              textColor="white"
              className=""
            />
            </div>
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
                    <th className={`${styles.thIn}`}>Facultad</th>
                    <th className={`${styles.thIn} rounded-tr-xl`}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantes.map(
                    (estudiante) => (
                      (
                        <tr
                          className={"flex flex-col md:table-row border-b"}
                          key={estudiante.email}
                        >
                          <td className={`${styles.tdIn}`}>
                            <span className="md:hidden font-bold">Correo:</span>
                            {estudiante.email}
                          </td>
                          <td className={styles.tdIn}>
                            <span className="md:hidden font-bold">Rol:</span>
                            {estudiante.role}
                          </td>
                          <td className={styles.tdIn}>
                            <span className="md:hidden font-bold">
                              Facultad:
                            </span>
                            {estudiante.faculty}
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
                                id={estudiante.userId}
                                onClick={() => {
                                  setOpenDelete(true);
                                  setUserId(estudiante.userId.toString());
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
            <section className="w-full flex justify-center px-20 mb-5 ">
              <table className="w-full text-left table-auto border-collapse text-primary-dark md:table">
                <thead className="hidden md:table-header-group bg-neutral">
                  <tr className="bg-azulClaro bg-opacity-20">
                    <th className={`${styles.thIn} rounded-tl-xl`}>Correo</th>
                    <th className={`${styles.thIn}`}>Rol</th>
                    <th className={`${styles.thIn}`}>Facultad</th>
                    <th className={`${styles.thIn} rounded-tr-xl`}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {searchStudent.map(
                    (estudiante) => (
                      (
                        <tr
                          className={"flex flex-col md:table-row border-b"}
                          key={estudiante.email}
                        >
                          <td className={`${styles.tdIn}`}>
                            <span className="md:hidden font-bold">Correo:</span>
                            {estudiante.email}
                          </td>
                          <td className={styles.tdIn}>
                            <span className="md:hidden font-bold">Rol:</span>
                            {estudiante.role}
                          </td>
                          <td className={styles.tdIn}>
                            <span className="md:hidden font-bold">
                              Facultad:
                            </span>
                            {estudiante.faculty}
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
                                id={estudiante.userId}
                                onClick={() => {
                                  setOpenDelete(true);
                                  setUserId(estudiante.userId.toString());
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
        )}
      </main>
    </AdminLayout>
  );
}
export default UsersListPage;
