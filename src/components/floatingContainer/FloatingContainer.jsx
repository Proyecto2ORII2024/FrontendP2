import PropTypes from "prop-types";
import MainButton from "../buttons/MainButton";

/**
 * Floating container component that acts as a modal with appearance animations and close options.
 * 
 * @component
 * @param {Object} props - The component's properties.
 * @param {boolean} props.open - Indicates whether the modal is open or closed.
 * @param {function} props.setOpen - Function to update the modal's open/close state.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {number} [props.bttType=0] - The type of button used to close the modal. 
 * - `0`: Close button in the top-right corner.
 * - `1`: Main "Got it" button at the bottom of the modal.
 * @returns {JSX.Element} A JSX element representing the floating container.
 */
function FloatingContainer({ open, setOpen, children, bttType = 0 }) {
  const XBtt = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000"
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-30 h-screen flex flex-col justify-center items-center transition-opacity duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ zIndex: 150 }}
    >
      <div
        className={`bg-white shadow-md mt-5 border border-primary-dark p-8 rounded-md mx-auto w-11/12 md:w-fit md:max-w-[66%] transition-transform duration-300 transform overflow-auto max-h-[75vh] scrollbar-webkit outline-none ${
          open ? "scale-100 translate-y-0" : "scale-95 -translate-y-10"
        }`}
      >
        {bttType === 0 && (
          <button
            className="absolute top-3 right-5"
            type="button"
            onClick={() => setOpen(false)}
          >
            {XBtt}
          </button>
        )}
        {children}
      </div>
      {bttType === 1 && (
        <MainButton
          text={"Entendido"}
          bgColor={"primary-dark"}
          hoverBg={"primary-light"}
          textColor={"white"}
          onClick={() => {
            setOpen(false);
          }}
          className={"my-3"}
        />
      )}
    </div>
  );
}

export default FloatingContainer;

FloatingContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  bttType: PropTypes.number,
};
