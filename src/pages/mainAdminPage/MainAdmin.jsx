import styles from "./styles";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import MainButton from "../../components/buttons/MainButton";

function MainAdmin() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className={styles.mainContainer}>
        <h2 className="w-full p-5 text-lg text-center">
          Bienvenido. A continuación, te presentamos las opciones disponibles,
          las cuales también están siempre accesibles en el menú de navegación
          en la parte superior.
        </h2>
        <div className={styles.optionsContainer}>
          <div className={styles.optionCard}>
            <section className={styles.iconSection}>
              <img
                src="/convenios.svg"
                alt="Icono Convenios"
                className={styles.icon}
              />
              <p style={{ color: "#000066", fontWeight: "bold" }}>Convenios</p>
            </section>
            <section className={styles.descriptionSection}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
                esse ullam ab, velit repudiandae, dicta sequi id quis eius nobis
                quas veritatis provident. Voluptates provident nisi sequi minus
                illum. Delectus!
              </p>
              <MainButton
                type="button"
                text="Ir a Convenios"
                bgColor="primary"
                hoverBg="primary-light"
                textColor="white"
                onClick={() => navigate("/admin/agreement/")}
              />
            </section>
          </div>
          <div className={styles.optionCard}>
            <section className={styles.iconSection}>
              <img
                src="/formularios.svg"
                alt="Icono Formularios"
                className={styles.icon}
              />
              <p style={{ color: "#000066", fontWeight: "bold" }}>
                Formularios
              </p>
            </section>
            <section className={styles.descriptionSection}>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Soluta, fuga? Quisquam facere incidunt, nemo rerum deserunt
                beatae officia, autem aliquid, nam consectetur optio non saepe
                veniam fugiat nulla culpa laborum?
              </p>
              <MainButton
                type="button"
                text="Ir a Formularios"
                bgColor="primary"
                hoverBg="primary-light"
                textColor="white"
                onClick={() => navigate("/admin/movilidad/")}
              />
            </section>
          </div>
          <div className={styles.optionCard}>
            <section className={styles.iconSection}>
              <img
                src="/estadisticas.svg"
                alt="Icono Estadísticas"
                className={styles.icon}
              />
              <p style={{ color: "#000066", fontWeight: "bold" }}>
                Estadísticas
              </p>
            </section>
            <section className={styles.descriptionSection}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                nobis ullam soluta impedit optio, consequuntur earum blanditiis!
                At vel odio dicta placeat, explicabo perferendis quos ipsam
                voluptate quaerat, ab sed.{" "}
              </p>
              <MainButton
                type="button"
                text="Ir a Estadísticas"
                bgColor="primary"
                hoverBg="primary-light"
                textColor="white"
                onClick={() => navigate("/statistics")}
              />
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default MainAdmin;
