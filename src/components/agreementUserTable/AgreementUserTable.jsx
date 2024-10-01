import styles from "../../pages/agreementAdminPage/styles";
import PropTypes from "prop-types";

function AgreementUserTable({ agreements }) {
  return (
    <table className="w-full text-left table-auto border-collapse md:table">
      <thead className="hidden md:table-header-group">
        <tr className="bg-grays-dark">
          <th className={`${styles.thIn} w-[150px]`}>Pais</th>
          <th className={`${styles.thIn} w-[300px]`}>Institución</th>
          <th className={`${styles.thIn} w-[200px]`}>Codigo</th>
          <th className={`${styles.thIn} w-[350px]`}>Descripción</th>
          <th className={`${styles.thIn} w-[200px]`}>Fecha de inicio</th>
        </tr>
      </thead>
      <tbody>
        {agreements.map((agreement, index) => (
          <tr
            className={`${
              index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"
            } flex flex-col md:table-row border-b`}
            key={agreement.id}
          >
            <td className={styles.tdIn}>
              <span className="md:hidden font-bold">Pais: </span>
              {agreement.country}
            </td>
            <td className={styles.tdIn}>
              <span className="md:hidden font-bold">Instiución: </span>
              {agreement.institution}
            </td>
            <td className={styles.tdIn}>
              <span className="md:hidden font-bold">Cosido: </span>
              {agreement.agreementNumber}
            </td>
            <td className={styles.tdIn}>
              <span className="md:hidden font-bold">Descripción: </span>
              {agreement.description}
            </td>
            <td className={styles.tdIn}>
              <span className="md:hidden font-bold">Fecha de inicio: </span>
              {agreement.startDate}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

AgreementUserTable.propTypes = {
    agreements: PropTypes.array.isRequired,
    };

export default AgreementUserTable;
