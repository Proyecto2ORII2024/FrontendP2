import PropTypes from "prop-types";
import NavbarAdmin from "../components/navbarAdmin/NavbarAdmin";

function AdminLayout({ children }) {
  return (
    <>
      <NavbarAdmin />
      {children}
    </>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
