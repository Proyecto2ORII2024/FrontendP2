import { useState, useEffect, useRef } from "react";

import logoutNav from "../../assets/logoutNav.svg";
import changePassword from "../../assets/changePasswordNav.svg";
import agreementsNav from "../../assets/agreementsNav.svg";

import PropTypes from "prop-types";

const USerDropdown = ({ onChangePassword, onLogOut }) => {
  const [isAccountOptOpen, setIsAccountOptOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleAccOpt = () => {
    setIsAccountOptOpen(!isAccountOptOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountOptOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const accountButtons = [
    {
      label: "Cambiar contraseña",
      hoverProps: "hover:text-primary-light ",
      icon: changePassword,
      onClick: onChangePassword,
    },
    {
      label: "Cerrar sesión",
      hoverProps: "hover:text-primary-light",
      icon: logoutNav,
      onClick: onLogOut,
    },
  ];

  const buttonStyle2 =
    "text-unicoop-black font-semibold bg-unicoop-white w-[100%] h-10 transition-colors hover:text-unicoop-white";

  return (
    <div
      className="hidden  mt-5 md:my-auto md:mx-0 text-white lg:inline-block"
      ref={dropdownRef}
      style={{ zIndex: 100 }}
    >
      <button
        className="text-3xl text-unicoop-white my-auto mx-auto md:mr-8 transition-colors duration-100 ease-in hover:text-buttons-list-blue cursor-pointer"
        onClick={handleAccOpt}
      >
        <div className="flex items-center gap-2">
          <img src={agreementsNav} alt="Profile" className="w-7"/>
          <p className="text-[15px]">Usuario</p>
        </div>
      </button>
      {isAccountOptOpen && (
        <ul className="absolute right-0 mt-2 py-2 w-48 bg-primary-dark shadow-lg rounded-md z-40">
          {accountButtons.map((data, i) => (
            <div key={i} className="flex justify-center gap-2">
              <img src={data.icon} alt="some" className="w-5" />
              <li>
                <button
                  className={`${buttonStyle2} ${data.hoverProps}`}
                  onClick={data.onClick}
                >
                  {data.label}
                </button>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

USerDropdown.propTypes = {
  onChangePassword: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
};

export default USerDropdown;
