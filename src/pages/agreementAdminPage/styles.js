/**
 * An object containing CSS class definitions for various elements.
 * 
 * @property {string} blueButton - Styles for a blue button with padding, rounded corners, background color, font properties, and hover effect.
 * @property {string} th - Styles for table header cells with padding, text color, font properties, text alignment, and cursor pointer.
 * @property {string} tdIn - Styles for table data cells with padding, text alignment, border properties, and right border.
 * @property {string} tdOut - Styles for table data cells with padding, text alignment, and border properties.
 * @property {string} buttonAction - Styles for action buttons with height, width, hover effect, and transition duration.
 */
const styles = {
  blueButton:
    "px-5 py-1 rounded-[20px] bg-primary font-semibold text-white text-lg hover:bg-primary-light duration-200",
  th: "px-4 py-3 text-azulOscuro font-semibold text-center cursor-pointer",
  tdIn: "text-start md:text-center border-white p-2 border-r-2",
  tdOut: "text-start md:text-center border-white p-2",
  buttonAction: "h-[30px] w-[30px] hover:scale-105 duration-200",
};
export default styles;
