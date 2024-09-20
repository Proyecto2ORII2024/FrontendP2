import PropTypes from 'prop-types';
import MainButton from '../buttons/MainButton';

function FloatingContainer({open, setOpen, children}){
    return(
        <div className={`fixed inset-0 bg-black bg-opacity-30 h-screen flex flex-col justify-center items-center transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{zIndex:120}}>
          <div className={`bg-white shadow-md mt-5 border border-primary-dark p-5 rounded-[20px] mx-auto w-4/5 md:w-2/3 transition-transform duration-300 transform overflow-auto ${open ? 'scale-100 translate-y-0' : 'scale-95 -translate-y-10'}`}>
            {children}
          </div>
          <MainButton text={'Entendido'} bgColor={'primary-dark'} hoverBg={'primary-light'} textColor={'white'} onClick={() => setOpen(false)} className={'my-3'} type={'button'}/>
        </div>
    );
}

export default FloatingContainer;

FloatingContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

