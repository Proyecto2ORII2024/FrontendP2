import React from 'react';
import styles from './styles';
import { useNavigate } from 'react-router-dom';

function MainUser() {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <h2 className="w-full p-5 text-lg text-center">
        Bienvenido. A continuación, te presentamos las opciones disponibles, 
        las cuales también están siempre accesibles en el menú de la izquierda.
      </h2>
      <div className={styles.optionsContainer}>
        <div
          className={styles.optionCard}
          onClick={() => navigate('/admin/convenio/')} 
        >
          <img src="/convenios.svg" alt="Icono Convenios" className={styles.icon} />
          <p style={{ color: '#000066', fontWeight: 'bold' }}>Convenios</p>
        </div>
        <div className={styles.optionCard}
          onClick={() => navigate('/form')} 
        >
          <img src="/formularios.svg" alt="Icono Formularios" className={styles.icon} />
          <p style={{ color: '#000066', fontWeight: 'bold' }}>Formularios</p>
        </div>
        <div className={styles.optionCard}>
          <img src="/estadisticas.svg" alt="Icono Estadísticas" className={styles.icon} />
          <p style={{ color: '#000066', fontWeight: 'bold' }}>Estadísticas</p>
        </div>
      </div>
    </div>
  );
}

export default MainUser;
