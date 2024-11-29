import styles from './styles';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import { useEffect, useState, useContext } from 'react';
import MainButton from '../../components/buttons/MainButton';

import NotificationBox from '../../components/notificationBox/NotificationBox';

import { AuthContext } from "../../context/LoginContext";

// Función para calcular la diferencia de 3 meses
const shouldShowPasswordReminder = (lastChangeDate) => {
  const currentDate = new Date();
  const lastChange = new Date(lastChangeDate);

  // Calcular si han pasado 3 meses
  const threeMonthsLater = new Date(lastChange);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

  return {
    showReminder: currentDate >= threeMonthsLater,
    currentDate,  // Fecha actual
    lastChange, // Fecha de último cambio
    threeMonthsLater // Fecha de recordatorio (3 meses después)
  };
};

function MainUser() { // Valor por defecto para pruebas :v
  const navigate = useNavigate();
  const [showReminder, setShowReminder] = useState(false);

  const { user } = useContext(AuthContext);

  const lastPasswordChange = user?.lastPasswordChange;

  useEffect(() => {
    if (lastPasswordChange) {
      const { showReminder } = shouldShowPasswordReminder(lastPasswordChange);
      setShowReminder(showReminder);
    } else {
      console.warn("Fecha de último cambio de contraseña no proporcionada");
    }
  }, [lastPasswordChange]);

  return (
    <UserLayout>
      <div className={styles.mainContainer}>
      <NotificationBox
          type="info"
          title="Recordatorio de cambio de contraseña"
          open={showReminder}
          setOpen={setShowReminder}
        >
          <p>
            Hace más de 3 meses que no cambias tu contraseña. Por tu seguridad,
            te recomendamos cambiarla ahora.
          </p>
        </NotificationBox>

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
              La sección de Convenios contiene listas completas de los eventos, intercambios y oportunidades de colaboración académica disponibles.
               Esto incluye acuerdos con instituciones tanto nacionales como internacionales, que permiten a los estudiantes y docentes participar en una 
               amplia variedad de actividades y programas, enriqueciendo la experiencia académica y fomentando el desarrollo profesional y personal.
              </p>
              <MainButton
                type="button"
                text="Ir a Convenios"
                bgColor="primary"
                hoverBg="primary-light"
                textColor="white"
                onClick={() => navigate("/user/agreement/")}
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
                Movilidad
              </p>
            </section>
            <section className={styles.descriptionSection}>
              <p>
              La sección de Movilidad en la Universidad del Cauca abarca la creación de los formularios relacionados con los movimientos de los 
              Estudiantes ,Profesores y Administrativos. Esto permite un control detallado de los intercambios académicos de movilidad estudiantil, 
              proporcionando acceso a la documentación necesaria para cada movilización y asegurando que los procesos sean eficientes y transparentes.
              </p>
              <MainButton
                type="button"
                text="Ir a Movilidad"
                bgColor="primary"
                hoverBg="primary-light"
                textColor="white"
                onClick={() => navigate("/form/")}
              />
            </section>
          </div>
          </div>
      </div>
    </UserLayout>
  );
}

export default MainUser;
