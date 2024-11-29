import PropTypes from "prop-types";
import NavbarAdmin from "../components/navbarAdmin/NavbarAdmin";
import InsideFooter from "../components/insideFooter/InsideFooter";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <main className="flex-grow">{children}</main>
      <InsideFooter />
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
