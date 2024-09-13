# Ejemplo de uso del componente de la caja de Notificación

Hola muchachos, espero se encuentren muy bien, el componente NotificationBox está creado con la finalidad de que no vayamos a repetir código, entonces se creó uno genérico, ahora aquí les quiero dejar un ejemplo de cómo este funciona:

## Código de ejemplo

const [isOpen, setOpen] = useState(true); //Estados

return (
    <>
        <button onClick={() => setOpen(true)}>
            Aparecer
        </button>
        <NotificationBox title="Hola" type='alert' open={isOpen} setOpen={setOpen}>
            <p>MundoMundoMundoMundoMundoMundo <span className="font-bold">MundoMundoMundoMundo</span></p>
        </NotificationBox>
    </>
)

## Explicación

Los estados sirven para controlar si la caja de texto se va a mostrar
En los parámetros que recibe el componente se recibe:
-title: El título de la caja.
-type: El tipo de notificación, entre estas se encuentra.
 * succes
 * error
 * info
 * alert
-open: El estado para que se despliegue el componente.
-setOpen: El setter del estado.
-children: Se dejó de esta manera, pues hay veces en las que hay que destacar un texto, poniendolo en negrilla, entonces se puede poner cómo en el ejemplo, con un span.

### NOTA: Este ejemplo se va a borrar después.