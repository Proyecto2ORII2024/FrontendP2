import styles from "../../pages/agreementAdminPage/styles";
import PropTypes from "prop-types";

import editIcon from "../../assets/icons/editIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

function AgreementTable({
  setOpen,
  setAgreementId,
  setOpenDelete,
  agreements,
  setAgreementSelected,
}) {
  return (
    <table className="w-full text-left table-auto border-collapse md:table">
      <thead className="hidden md:table-header-group">
        <tr className="bg-neutral">
          <th className={`${styles.th} rounded-tl-xl`}>Pais</th>
          <th className={`${styles.th}`}>Institución</th>
          <th className={`${styles.th}`}>Codigo</th>
          <th className={`${styles.th}`}>Descripción</th>
          <th className={`${styles.th}`}>Fecha de inicio</th>
          <th className={`${styles.th} rounded-tr-xl`}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {agreements.map((agreement) => (
          <tr
            className={` flex flex-col md:table-row border-b`}
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
              <span className="md:hidden font-bold">Codigo: </span>
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
            <td className={styles.tdOut}>
              <div className="flex md:justify-center items-center">
                <span className="md:hidden font-bold">Acciones:</span>
                <div className="flex md:gap-0 justify-around w-[80%]">
                  <button
                  title="Editar convenio"
                    onClick={() => {
                      setOpen(true);
                      setAgreementSelected(agreement);
                    }}
                  >
                    <img
                      className={styles.buttonAction}
                      src={editIcon}
                      alt="editIcom"
                    />
                  </button>
                  <button
                    title="Eliminar convenio"
                    onClick={() => {
                      setOpenDelete(true);
                      setAgreementId(agreement.agreementId.toString());
                    }}
                  >
                    <img
                      className={styles.buttonAction}
                      src={deleteIcon}
                      alt="deleteIcon"
                    />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

AgreementTable.propTypes = {
  agreements: PropTypes.array,
  setOpen: PropTypes.func,
  setAgreementId: PropTypes.func,
  setOpenDelete: PropTypes.func,
  setAgreementSelected: PropTypes.func,
};

export default AgreementTable;
