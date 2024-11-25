import PropTypes from "prop-types";

/**
 * MainButton component renders a customizable button.
 *
 * @param {Object} props - The properties object.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} props.bgColor - The background color of the button.
 * @param {string} props.hoverBg - The background color of the button when hovered.
 * @param {string} props.textColor - The text color of the button.
 * @param {string} props.text - The text to display inside the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {string} [props.type="button"] - The type attribute of the button.
 *
 * @returns {JSX.Element} The rendered button component.
 */
function MainButton({onClick, bgColor, hoverBg, textColor, text, className, type}) {
    return (
        <button
            onClick={onClick}
            type={type || "button"}
            className={`px-[20px] py-[11px] text-[14px] rounded-full bg-${bgColor} font-semibold text-${textColor} hover:bg-${hoverBg} duration-200 ${className || ""}`}

        >
            {text}
        </button>
    );

}

MainButton.propTypes = {
    onClick: PropTypes.func,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    text: PropTypes.string,
    hoverBg: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string
};

export default MainButton;