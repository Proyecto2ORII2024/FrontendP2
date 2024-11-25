/**
 * Objeto que define las clases de colores utilizadas en el sistema para diferentes estados (éxito, error, información, alerta).
 * Se incluye tanto en sus variantes claras como oscuras para adaptarse a diferentes temas de color.
 * 
 * @namespace colors
 */
export const colors = {
    success: {
        bgLight: 'bg-success-light',
        txtLight: 'text-error-light',
        text: 'text-success-text',
        bgDark: 'bg-success-dark',
        txtDark: 'text-success-dark'
    },
    error: {
        bgLight: 'bg-error-light',
        txtLight: 'text-error-light',
        text: 'text-error-text',
        bgDark: 'bg-error-dark',
        txtDark: 'text-error-dark'
    },
    info: {
        bgLight: 'bg-info-light',
        txtLight: 'text-info-light',
        text: 'text-info-text',
        bgDark: 'bg-info-dark',
        txtDark: 'text-info-dark'
    },
    alert: {
        bgLight: 'bg-alert-light',
        txtLight: 'bg-alert-light',
        text: 'text-alert-text',
        bgDark: 'bg-alert-dark',
        txtDark: 'text-alert-dark'
    }
}

/**
 * Objeto que contiene las clases CSS para el estilo y la disposición de los elementos de la interfaz de usuario.
 * Se incluyen estilos de contenedor principal, bordes, texto y botones.
 * 
 * @namespace styles
 */
export const styles = {
    mainContainer: 'fixed bottom-8 left-0 flex justify-between gap-2 md:gap-5 rounded-lg shadow-md w-10/12 sm:w-80 min-h-16 transition-all duration-150 z-50',
    border: 'w-2.5 rounded-l',
    textContainer: 'w-3/4 text-sm font-medium flex flex-col my-auto py-3',
    button: 'self-start mt-2 mr-2'
}