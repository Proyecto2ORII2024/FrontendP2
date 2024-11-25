import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { colors, styles } from './BoxStyles.js';

/**
 * Component that displays a notification box with a dynamic style and an automatic close timer.
 * 
 * @component
 * @param {Object} props - The component's properties.
 * @param {'success'|'error'|'info'|'alert'|''} props.type - The notification type that defines the color styles.
 * @param {string} props.title - The title displayed in the notification.
 * @param {React.ReactNode} props.children - Additional content to display inside the notification box.
 * @param {boolean} props.open - State that controls whether the notification is visible.
 * @param {Function} props.setOpen - Function to update the `open` state.
 * @returns {JSX.Element} A JSX element representing the notification.
 */
const NotificationBox = ({type, title, children, open, setOpen}) => {

    //Timer
    useEffect(() => {
        let timer;
        if (open) {
            timer = setTimeout(() => {
                setOpen(false);
            }, 10000);
        }

        return () => clearTimeout(timer);
    }, [open, setOpen]);

    const color = colors[type || 'info'];

    return(
        <article className={`${color.bgLight} ${styles.mainContainer} ${open === true ? 'translate-x-0 ml-6': '-translate-x-full'}`}>
            <div className={`${color.bgDark} ${styles.border}`}></div>
            <section className={`${color.text} ${styles.textContainer}`}>
                <h1 className={`${color.txtDark} font-bold text-base`}>{title}</h1>
                {children}
            </section>
            <button className={`${styles.button}`} onClick={() => setOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px" className={`text-${color.dark} fill-current`}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
        </article>
    );
}

export default NotificationBox;

NotificationBox.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'info', 'alert', '']).isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}