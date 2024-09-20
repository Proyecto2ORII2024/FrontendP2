import PropTypes from "prop-types";

function MainButton({onClick, bgColor, hoverBg, textColor, text, className, type}) {
    return (
        <button
            onClick={onClick}
            type={type || "button"}
            className={`px-[20px] py-[11px] text-[14px] rounded-full bg-${bgColor} font-semibold text-${textColor} hover:bg-${hoverBg} duration-200 ${className}`}
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