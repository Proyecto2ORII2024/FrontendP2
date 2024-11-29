/**
 * Detailed information about the data displayed after creating a mobility entry.
 * Each field has a title, short or long information, and options ready to be displayed.
 */

export const MoveInfo = {
    sentido: {
        title: 'Tipo de movilidad',
        longInfo: {
            list: {
                'SALIENTE PRESENCIAL': 'Cuando el estudiante, funcionario administrativo o profesor, realizó movilidad presencial en otras instituciones o universidades del país o del exterior',

                'ENTRANTE PRESENCIAL': 'Cuando llegan estudiantes para realizar intercambio o estancias de investigación o para participar en seminarios, congresos, talleres; o, cuando llegan los expertos extranjeros invitados a orientar actividades académicas, investigativas, culturales, en forma presencial en Universidad del Cauca.',

                'SALIENTE VIRTUAL': 'Si el universitario, estudiante, funcionario administrativo o profesor, realizó movilidad a través de TICs, en otras instituciones o universidades del país o del exterior.',

                'ENTRANTE VIRTUAL': 'Cuando los estudiantes realizan intercambio o participan en seminarios, congresos, talleres; o, cuando los expertos extranjeros invitados orientan actividades académicas, investigativas, culturales, a través de TICs, en Universidad del Cauca.'
            }
        }
    },
    tipo: {
        title: 'Rol en la movilidad',
        longInfo: {
            list: {
                'PROFESOR': 'Cuando se trate de un profesor de la Universidad del Cauca.  También debe seleccionar PROFESOR, cuando se trate de un profesor extranjero invitado.',

                'ESTUDIANTE': 'Cuando se trate de un estudiante de la Universidad del Cauca.  También debe seleccionar ESTUDIANTE, cuando se trate de un estudiante extranjero.',

                'ADMINISTRATIVO': 'Cuando un funcionario administrativo de la Universidad del Cauca, sea autorizado para realizar movilidad académica.',
            }
        }
    },
    tipoDocumento: {
        title: 'Tipo de Documento',
        longInfo: {
            list: {
                'CC': 'Cédula de Ciudadanía',

                'PASAPORTE': 'Pasaporte',

                'CE': 'Cédula de Extranjería',

                'DE': 'documento extranjero (puede ser el número de la tarjeta andina, o del documento de identificación del ciudadano extranjero en su país, siempre y cuando sea permitido desarrollar actividades en la Universidad del Cauca, con dichos documentos)',

                'V': 'Visa'
            }
        }
    },
    numID: {
        title: 'Número de Identificación',
        shortInfo: 'Número del documento de la persona. Sin puntos ni comas.'
    },
    nombre:{
        title: 'Nombre',
        shortInfo: 'Nombre de la persona, conforme está escrito en el documento de identificación.'
    },
    apellidos:{
        title: 'Apellidos',
        shortInfo: 'Apellidos de la persona, conforme está escrito en el documento de identificación.'
    },
    genero:{
        title: 'Género',
        shortInfo: 'Género de la persona.'
    },
    fechaSalida:{
        title: 'Fecha de salida',
        shortInfo: 'Fecha de salida.'
    },
    fechaEntrada:{
        title: 'Fecha de entrada',
        shortInfo: 'Fecha de entrada.'
    },
    diasEstancia: {
        title: 'Número de días de estancia',
        shortInfo: 'Cantidad de días de duración de la estancia'
    },
    anio:{
        title: 'Año',
        shortInfo: 'Se refiere al año en el que se reportó la movilidad.'
    },
    uniOrigen:{
        title: 'Universidad de Origen',
        shortInfo: 'Nombre completo de la institución o universidad de la cual proviene el ciudadano nacional o extranjero invitado, o el estudiante que realiza la movilidad en la Universidad del Cauca.'
    },
    uniDestino:{
        title: 'Universidad de Destino',
        shortInfo: 'Nombre completo de la institución o universidad en la que el profesor, funcionario administrativo o estudiante de la Universidad del Cauca realizó la movilidad.'
    },
    numConvenio: {
        title: 'Número de convenio',
        longInfo:{
            text:[
                'Si existe un convenio con la institución de procedencia del experto invitado o estudiante en movilidad entrante, o con la universidad de destino para profesores, funcionarios administrativos o estudiantes de la Universidad del Cauca, se mostrará el número del convenio, preferentemente el número del convenio específico. Si no hay un convenio específico, se mostrará el número del convenio marco.']
        }
    },
    tipoEvento:{
        title: 'Tipo de evento',
        longInfo:{
            list:{
                'ASISTENCIA A EVENTOS': 'Puede ser congreso, taller, seminario, simposio. Agrega el nombre del evento.',

                'MISIÓN':  'Descripción resumida.',

                'CURSO CORTO': 'Descripción resumida.',

                'ESTANCIA DE INVESTIGACIÓN': 'Descripción resumida.',

                'SEMESTRE ACADÉMICO DE INTERCAMBIO': 'Semestre de intercambio, Opción trabajo de grado en la modalidad profundización, Internado Rotatorio, debe especificar.',

                'DOBLE TITULACIÓN': 'Descripción resumida.',

                'PASANTÍA o PRÁCTICA':'Descripción resumida.',

                'ROTACIÓN MÉDICA': 'Nombre de la rotación.',

                'PROFESOR VISITANTE': 'Breve descripción de las actividades que orientará o realizará.',

                'PROFESOR DE PROGRAMA DE PREGRADO': 'Nombre del programa y breve descripción.',

                'PROFESOR DE PROGRAMA DE ESPECIALIZACIÓN': 'Nombre del programa y breve descripción.',

                'PROFESOR DE PROGRAMA DE MAESTRÍA': 'Nombre del programa y breve descripción.',

                'PROFESOR DE PROGRAMA DE DOCTORADO': 'Nombre del programa y breve descripción.',

                'PROFESOR DE PROGRAMA DE POSTDOCTORADO': 'Nombre del programa y breve descripción.',

                'ESTUDIOS DE MAESTRÍA': 'Nombre del programa y breve descripción.',

                'ESTUDIOS DE DOCTORADO': 'Nombre del programa y breve descripción.',

                'ESTUDIOS DE POSTDOCTORADO': 'Nombre del programa y breve descripción.',

                'INTERNACIONALIZACIÓN EN CASA': 'Descripción resumida.',

                'VOLUNTARIADO': 'Descripción de las actividades a desarrollar durante el tiempo autorizado para el Voluntariado'
            }
        }
    },
    descEvento:{
        title: 'Descripción del evento',
        shortInfo: 'Información corta solicitada correspondiente al tipo de evento'
    },
    programaOrigen:{
        title: 'Programa de origen',
        shortInfo: 'Nombre del programa del que es originaria la persona.'
    },
    programaAcogida:{
        title: 'Programa de acogida',
        shortInfo: 'Nombre del programa que va a acoger a la persona estudiante durante su estancia.'
    },
    ciudad:{
        title: 'Ciudad',
        longInfo: {
            text: [ 'En caso de ..., se refiera a ...', ],
            list:{
                'Movilidad académica entrante, presencial o a través de TICs' : 'Nombre de la ciudad de procedencia.',
                'Movilidad académica saliente, presencial o a través de TICs' : 'Nombre de la ciudad en donde realiza la movilidad.'
            }
        }
    },
    pais:{
        title: 'País',
        longInfo: {
            text: [ 'En caso de ..., se refiera a ...'],
            list: {
                'Movilidad académica entrante, presencial o a través de TICs': 'Nombre del país de procedencia.',
                'Movilidad académica saliente, presencial o a través de TICs': 'Nombre del país donde se realiza la movilidad.'
            }
        }
    },
    profPres:{
        title: 'Profesor presenta',
        shortInfo: 'Nombre del profesor que ejerce como Tutor o Coordinador de la movilidad, únicamente cuando se trate de estudiantes en movilidad académica entrante (pasantía, estancia de investigación o intercambio)'
    },
    facultad:{
        title: 'Facultad',
        longInfo: {
            text: [ 'En caso de ..., se refiera a ...'],
            list: {
                'Movilidad académica entrante, presencial o a través de TICs': 'Nombre completo de la Facultad que recibe al estudiante nacional o extranjero aceptado, o al experto nacional o extranjero invitado.',
                'Movilidad académica saliente, presencial o a través de TICs': 'Nombre completo de la Facultad a la cual pertenece el estudiante o profesor de la Universidad del Cauca que realiza movilidad saliente.'
            }
        }
    },
    financiacion:{
        title: 'Valor de la financiación en pesos',
        longInfo: {
            text: [
                'Si el estudiante, funcionario administrativo o profesor que realiza movilidad saliente recibe apoyo económico de la Universidad del Cauca y/o de otra institución, indique el valor en pesos colombianos (sin signo pesos, ni puntos ni comas).',

                'Asimismo, si el invitado nacional o extranjero recibe remuneración de la Universidad del Cauca y/o de otra institución, indique el valor en pesos colombianos (sin signo pesos, ni puntos ni comas).',
                'Por último, si el estudiante en movilidad entrante es becario, indique el valor en pesos colombianos (sin signo pesos, ni puntos ni comas).'
            ]
        }
    },
    fuenteFinanciacion:{
        title: 'Fuente de la financiación',
        shortInfo: 'Nombre de la dependencia de la Universidad del Cauca y/o de otra institución que otorgó la financiación o la beca.'
    }
}