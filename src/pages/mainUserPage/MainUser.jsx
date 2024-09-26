import React from 'react';
import styles from './styles';

function MainUser() {
  return (
    <div className={styles.mainContainer}>
      <h2 className="w-full p-5 text-lg text-center">
        Bienvenido. A continuación, te presentamos las opciones disponibles, 
        las cuales también están siempre accesibles en el menú de la izquierda.
      </h2>
      <div className={styles.optionsContainer}>
        <div className={styles.optionCard}>
          <img src="./icons/users.svg" alt="Convenios" />
          <p>Convenios</p>
        </div>
        <div className={styles.optionCard}>
          <img src="./icons/forms.svg" alt="Formularios" />
          <p>Formularios</p>
        </div>
        <div className={styles.optionCard}>
          <img src="./icons/stats.svg" alt="Estadísticas" />
          <p>Estadísticas</p>
        </div>
      </div>
    </div>
  );
}

export default MainUser;