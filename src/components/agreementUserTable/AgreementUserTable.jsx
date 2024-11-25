import styles from "../../pages/agreementAdminPage/styles";
import PropTypes from "prop-types";

/**
 * AgreementUserTable component renders a table displaying a list of agreements.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.agreements - An array of agreement objects to be displayed in the table.
 * @param {string} props.agreements[].agreementId - The unique identifier for the agreement.
 * @param {string} props.agreements[].country - The country associated with the agreement.
 * @param {string} props.agreements[].institution - The institution associated with the agreement.
 * @param {string} props.agreements[].agreementNumber - The code or number of the agreement.
 * @param {string} props.agreements[].description - A brief description of the agreement.
 * @param {string} props.agreements[].startDate - The start date of the agreement.
 *
 * @returns {JSX.Element} A table element displaying the agreements.
 */
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
