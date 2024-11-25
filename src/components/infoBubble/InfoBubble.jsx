import { useState } from "react";
import FloatingContainer from "../floatingContainer/FloatingContainer";
import MainButton from "../buttons/MainButton";
import PropTypes from "prop-types";

/**
 * Component that displays an interactive icon with a tooltip. On hover, 
 * an informational box with additional options, including a floating container, is revealed.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {Object} props.info - Information to be displayed in the component.
 * @param {string} props.info.title - The main title displayed in the tooltip.
 * @param {string} [props.info.shortInfo] - Brief information displayed in the pop-up box.
 * @param {Object} [props.info.longInfo] - Detailed information to be shown in the floating container.
 * @param {Array<string>} [props.info.longInfo.text] - List of texts to display in the detailed information.
 * @param {Object<string, string>} [props.info.longInfo.list] - List of key-value pairs, sorted alphabetically.
 * @returns {JSX.Element} A JSX element representing the interactive informational tooltip.
 */
function InfoBubble({ info }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  if (info.longInfo && info.longInfo.list) {
    const sortedList = Object.entries(info.longInfo.list).sort(([a], [b]) => {
      return a.localeCompare(b);
    });
    info.longInfo.list = Object.fromEntries(sortedList);
  }

  return (
    <section className="relative w-fit">
      <svg
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="#fff"
        className="duration-150 rounded-full cursor-pointer size-5 bg-primary-dark hover:bg-primary-light"
      >
        <path d="M480-680q-33 0-56.5-23.5T400-760q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760q0 33-23.5 56.5T480-680Zm-60 560v-480h120v480H420Z" />
      </svg>
      {isHovered && (
        <article
          className={`absolute flex flex-col items-center top-full p-2 border-2 bg-white border-primary-dark rounded-2xl z-20 w-64 transition-opacity duration-150`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="text-sm font-semibold text-center">{info.title}</h1>
          {info.shortInfo && (
            <p className="mb-2 text-xs break-words">{info.shortInfo}</p>
          )}
          {info.longInfo && (
            <>
            <MainButton text="Mas información" bgColor="primary" textColor="white" hoverBg="primary-light" onClick={() => setIsFloating(true)} />
            </>
          )}
        </article>
      )}
      {isFloating && info.longInfo && (
        <FloatingContainer
          open={isFloating}
          setOpen={setIsFloating}
          bttType={1}
        >
          <h1 className="text-2xl font-bold text-center">{info.title}</h1>
          {info.longInfo.text && (
            <ul
              className={`${
                info.longInfo.text.length > 1 ? "list-disc list-inside" : ""
              } flex flex-col gap-2`}
            >
              {info.longInfo.text.map((txt, index) => (
                <li key={index} className="text-sm">
                  {txt}
                </li>
              ))}
            </ul>
          )}
          {info.longInfo.list && (
            <ul className="list-disc list-inside">
              {Object.entries(info.longInfo.list).map(([key, value], index) => (
                <li key={index} className="text-sm">
                  <span className="font-bold">{key}</span>: {value}
                </li>
              ))}
            </ul>
          )}
        </FloatingContainer>
      )}
    </section>
  );
}

InfoBubble.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string.isRequired,
    shortInfo: PropTypes.string,
    longInfo: PropTypes.shape({
      text: PropTypes.array,
      list: PropTypes.object,
    }),
  }).isRequired,
};

export default InfoBubble;
