import { useState } from 'react';
import FloatingContainer from '../floatingContainer/FloatingContainer';
import PropTypes from 'prop-types';

function InfoBubble ({ info }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFloating, setIsFloating] = useState(false);

    return(
        <div className='relative inline-block items-center group'>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 -960 960 960"  
                fill="#fff" 
                className='bg-primary-dark hover:bg-primary-light rounded-full w-5 cursor-pointer duration-150'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <path d="M480-680q-33 0-56.5-23.5T400-760q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760q0 33-23.5 56.5T480-680Zm-60 560v-480h120v480H420Z"/>
            </svg>
            <div className={`absolute flex flex-col items-center top-full p-2 w-64 bg-white border-2 border-primary-dark rounded-2xl z-10 transition-all ${isHovered ? 'visible opacity-100': 'invisible opacity-0'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <h1 className='font-semibold text-center text-sm' >
                    {info.title}
                </h1>
                {info.shortInfo &&(
                    <p className='text-xs break-words'>
                        {info.shortInfo}
                    </p>
                )}
                {info.longInfo && (
                    <article className='flex flex-col items-center'>
                        <p className='text-xs my-2'>Da clic en el botón para ver más información</p>
                        <button className='bg-primary-dark px-3 py-1 rounded-full text-white text-sm mt-1' onClick={() => setIsFloating(true)}>
                            Ver más
                        </button>
                    </article>
                )}
            </div>
            <FloatingContainer open={isFloating} setOpen={setIsFloating}>
                <p>Hola</p>
            </FloatingContainer>
        </div>
    )
}

InfoBubble.propTypes = {
    info: PropTypes.shape({
        title: PropTypes.string.isRequired,
        shortInfo: PropTypes.string,
        longInfo: PropTypes.string,
    }).isRequired,
};

export default InfoBubble;
