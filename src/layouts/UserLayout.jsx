import PropTypes from "prop-types";
import NavbarUser from "../components/navbarUser/NavbarUser";
import InsideFooter from "../components/insideFooter/InsideFooter";

function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarUser />
      <main className="flex-grow">{children}</main>
      <InsideFooter />
    </div>
  );
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserLayout;
