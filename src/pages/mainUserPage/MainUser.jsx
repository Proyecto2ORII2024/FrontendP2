import styles from './styles';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { useEffect, useState } from 'react';

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

function MainUser({ lastPasswordChange = "2023-11-01T00:00:00Z" }) { // Valor por defecto para pruebas :v
  const navigate = useNavigate();
  const [showReminder, setShowReminder] = useState(false);
  const [dates, setDates] = useState({});

  useEffect(() => {
    if (lastPasswordChange) {
      const { showReminder, currentDate, lastChange, threeMonthsLater } = shouldShowPasswordReminder(lastPasswordChange);
      setShowReminder(showReminder);
      setDates({ currentDate, lastChange, threeMonthsLater });
    } else {
      console.warn("Fecha de último cambio de contraseña no proporcionada");
    }
  }, [lastPasswordChange]);

  return (
    <AdminLayout>
      <div className={styles.mainContainer}>
        {showReminder && (
          <div className={styles.reminderMessage}>
            <p>Recuerda cambiar tu contraseña; han pasado más de tres meses desde tu último cambio.</p>
          </div>
        )}
        <h2 className="w-full p-5 text-lg text-center">
          Bienvenido. A continuación, te presentamos las opciones disponibles, 
          las cuales también están siempre accesibles en el menú de la izquierda.
        </h2>

        {/* Imprimir valores de fecha en pantalla para depuración */}
        <div className={styles.debugInfo}>
          {dates.currentDate ? (
            <>
              <p><strong>Fecha actual:</strong> {dates.currentDate.toLocaleString()}</p>
              <p><strong>Fecha de último cambio de contraseña:</strong> {dates.lastChange.toLocaleString()}</p>
              <p><strong>Fecha de recordatorio (3 meses después):</strong> {dates.threeMonthsLater.toLocaleString()}</p>
            </>
          ) : (
            <p><strong>No se ha proporcionado una fecha de último cambio de contraseña.</strong></p>
          )}
        </div>

        <div className={styles.optionsContainer}>
          <div
            className={styles.optionCard}
            onClick={() => navigate('/admin/agreement/')} 
          >
            <img src="/convenios.svg" alt="Icono Convenios" className={styles.icon} />
            <p style={{ color: '#000066', fontWeight: 'bold' }}>Convenios</p>
          </div>
          <div className={styles.optionCard}
            onClick={() => navigate('/admin/movilidad')} 
          >
            <img src="/formularios.svg" alt="Icono Formularios" className={styles.icon} />
            <p style={{ color: '#000066', fontWeight: 'bold' }}>Formularios</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default MainUser;
