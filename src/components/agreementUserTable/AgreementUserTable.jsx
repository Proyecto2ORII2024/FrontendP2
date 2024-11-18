import styles from "../../pages/agreementAdminPage/styles";
import PropTypes from "prop-types";

function AgreementUserTable({ agreements }) {
  return (
    <table className="w-full text-left table-auto border-collapse md:table">
      <thead className="hidden md:table-header-group">
        <tr className="bg-neutral">
          <th className={`${styles.th} rounded-tl-xl`}>Pais</th>
          <th className={`${styles.th}`}>Institución</th>
          <th className={`${styles.th}`}>Codigo</th>
          <th className={`${styles.th}`}>Descripción</th>
          <th className={`${styles.th} rounded-tr-xl`}>Fecha de inicio</th>
        </tr>
      </thead>
      <tbody>
        {agreements.map((agreement) => (
          <tr
            className={`flex flex-col md:table-row border-b`}
            key={agreement.agreementId}
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
