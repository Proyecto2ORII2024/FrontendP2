import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { colors, styles } from './BoxStyles.js';

const NotificationBox = ({type, title, children, open, setOpen}) => {

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
                <h1 className={`${color.txtDark} font-bold text-base sm:text-lg`}>{title}</h1>
                {children}
            </section>
            <button className={`${styles.button}`} onClick={() => setOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px" className={`${color.txtDark} fill-current`}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
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