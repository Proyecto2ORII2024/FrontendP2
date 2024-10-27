export const Info = {
    sentido: {
        title: 'Sentido',
        shortInfo: 'Seleccione entre (SALIENTE PRESENCIAL, ENTRANTE PRESENCIAL, SALIENTE VIRTUAL, ENTRANTE VIRTUAL)',
        longInfo: {
            text: ['Seleccione uno de los siguientes items:'],
            list: {
                'SALIENTE PRESENCIAL': 'Cuando el estudiante, funcionario administrativo o profesor, realiza movilidad presencial en otras instituciones o universidades del país o del exterior',

                'ENTRANTE PRESENCIAL': 'Cuando llegan estudiantes para realizar intercambio o estancias de investigación o para participar en seminarios, congresos, talleres; o, cuando llegan los expertos extranjeros invitados a orientar actividades académicas, investigativas, culturales, en forma presencial en Universidad del Cauca.',

                'SALIENTE VIRTUAL': 'Cuando llegan estudiantes para realizar intercambio o estancias de investigación o para participar en seminarios, congresos, talleres; o, cuando llegan los expertos extranjeros invitados a orientar actividades académicas, investigativas, culturales, en forma presencial en Universidad del Cauca.',

                'ENTRANTE VIRTUAL': 'Cuando los estudiantes realizan intercambio o participan en seminarios, congresos, talleres; o, cuando los expertos extranjeros invitados orientan actividades académicas, investigativas, culturales, a través de TICs, en Universidad del Cauca.'
            }
        }
    },
    tipo: {
        title: 'Tipo',
        longInfo: {
            text: ['Seleccione uno de los siguientes items:'],
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
            text: ['Seleccione una de las letras que se indican a continuación:'],
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
        shortInfo: 'Escriba en forma correcta el número del documento sin puntos ni comas'
    },
    nombre:{
        title: 'Nombre(s)',
        shortInfo: 'Escriba el o los nombres de la persona, conforme está escrito en el documento de identificación.',
    },
    apellidos:{
        title: 'Apellidos',
        shortInfo: 'Escriba los apellidos de la persona, conforme está escrito en el documento de identificación.'
    },
    genero:{
        title: 'Género',
        shortInfo: 'Escoja el género de la persona.'
    },
    fechaSalida:{
        title: 'Fecha de salida',
        shortInfo: 'Seleccione en el calendario o escriba la fecha de salida.'
    },
    fechaEntrada:{
        title: 'Fecha de entrada',
        shortInfo: 'Seleccione en el calendario o escriba la fecha de entrada.'
    },
    diasEstancia: {
        title: 'Número de días de estancia',
        shortInfo: 'Este campo se llena automáticamente una vez se haya ingresado la fecha de entrada y la de salida.'
    },
    anio:{
        title: 'Año (Preguntar por automatización)',
        shortInfo: 'Se refiere al año en el que se reporta la movilidad. Este campo se llena automáticamente.'
    },
    uniOrigen:{
        title: 'Universidad de Origen',
        shortInfo: 'Cuando se trate de Movilidad académica entrante, presencial o virtual, escriba el nombre correcto y completo de la institución o universidad de donde proviene el ciudadano nacional o extranjero invitado o el estudiante que realiza movilidad en la Universidad del Cauca.'
    },
    uniDestino:{
        title: 'Universidad de Destino',
        shortInfo: 'Cuando se trate de Movilidad académica saliente, presencial o virtual, escriba el nombre correcto y completo de la institución o universidad en la cual, el profesor, funcionario administrativo o estudiante de la Universidad del Cauca, realiza la movilidad.'
    },
    convenio:{
        title: '¿Existe convenio con universidad o institución de origen o de destino?',
        shortInfo: 'Puede verificar si existe convenio, en el apartado CONVENIOS de la página.'
    },
    numConvenio: {
        title: 'Número de convenio',
        longInfo:{
            text:[
                'Si existe convenio con la institución de procedencia del experto invitado, o del estudiante que realiza movilidad entrante; o con la universidad de destino en la cual realizan movilidad los profesores, funcionarios administrativos o estudiantes de la Universidad del Cauca, seleccione el número del convenio.',
                'En el apartado CONVENIOS en la barra de navegación puede consultar los convenios existentes',
                'Si existe convenio, pero no tiene número, comuníquese con la ORII: relacionesinter@unicauca.edu.co.'
            ]
        }
    },
    tipoEvento:{
        title: 'Tipo de evento',
        longInfo:{
            text:['Seleccione uno de los siguientes ítems y descríbelo en el campo "Descripción de evento" con la información que se indica.'],
            list:{
                'ASISTENCIA A EVENTOS': 'Puede ser congreso, taller, seminario, simposio. Agrega el nombre del evento.',

                'MISIÓN':  'Agrega una descripción resumida.',

                'CURSO CORTO': 'Agrega una descripción resumida.',

                'ESTANCIA DE INVESTIGACIÓN': 'Agrega una descripción resumida.',

                'SEMESTRE ACADÉMICO DE INTERCAMBIO': 'Semestre de intercambio, Opción trabajo de grado en la modalidad profundización, Internado Rotatorio, debe especificar.',

                'DOBLE TITULACIÓN': 'Agrega una descripción resumida.',

                'PASANTÍA o PRÁCTICA':'Agrega una descripción resumida.',

                'ROTACIÓN MÉDICA': 'Nombre de la Rotación',

                'PROFESOR VISITANTE': 'Agrega una breve descripción de las actividades que orientará o realizará.',

                'PROFESOR DE PROGRAMA DE PREGRADO': 'Indica el nombre del programa y agrega una breve descripción',

                'PROFESOR DE PROGRAMA DE ESPECIALIZACIÓN': 'Indica el nombre del programa y agrega una breve descripción',

                'PROFESOR DE PROGRAMA DE MAESTRÍA': 'Indica el nombre del programa y agrega una breve descripción',

                'PROFESOR DE PROGRAMA DE DOCTORADO': 'Indica el nombre del programa y agrega una breve descripción',

                'PROFESOR DE PROGRAMA DE POSTDOCTORADO': 'Indica el nombre del programa y agrega una breve descripción',

                'ESTUDIOS DE MAESTRÍA': 'Indica el nombre del programa y agrega una breve descripción',

                'ESTUDIOS DE DOCTORADO': 'Indica el nombre del programa y agrega una breve descripción',

                'ESTUDIOS DE POSTDOCTORADO': 'Indica el nombre del programa y agrega una breve descripción',

                'INTERNACIONALIZACIÓN EN CASA': 'Agrega una descripción resumida.',

                'VOLUNTARIADO': 'Descripción de las actividades a desarrollar durante el tiempo autorizado para el Voluntariado'
            }
        }
    },
    descEvento:{
        title: 'Descripción del evento',
        shortInfo: 'En base al evento escogido en el campo "Tipo de evento", agrega lo solicitado para el tipo de evento'
    },
    programaOrigen:{
        title: 'Programa de origen',
        shortInfo: 'Ingrese el nombre del programa del que es originario la persona.'
    },
    programaAcogida:{
        title: 'Programa de acogida',
        shortInfo: 'Ingrese el nombre del programa que va a acoger a la personas estudiante durante su estancia.'
    },
    ciudad:{
        title: 'Ciudad',
        longInfo: {
            text: [
                'Cuando se trate de Movilidad académica entrante, presencial o a través de TICs, escriba el nombre de la ciudad de procedencia.',

                'Cuando se trate de Movilidad académica saliente, presencial o a través de TICs, escriba el nombre de la ciudad en donde realiza la movilidad.'
            ]
        }
    },
    pais:{
        title: 'País',
        longInfo: {
            text: [
                'Cuando se trate de Movilidad académica entrante, presencial o a través de TICs, escriba el nombre del país de procedencia.',

                'Cuando se trate de Movilidad académica saliente, presencial o a través de TICs, escriba el nombre del país en donde realiza la movilidad.'
            ]
        }
    },
    profPres:{
        title: 'Profesor presenta',
        shortInfo: 'Este campo únicamente se habilita cuando se trate de estudiantes en Movilidad académica ENTRANTE (pasantía o estancia de investigación o intercambio), escriba el nombre del profesor que ejerce como Tutor o Coordinador de dicha movilidad.'
    },
    facultad:{
        title: 'Facultad',
        longInfo: {
            text: [
                'Cuando se trate de Movilidad académica entrante, presencial o a través de TICs, escriba el nombre correcto y completo de la Facultad que recibe al estudiante nacional o extranjero aceptado, o al experto nacional o extranjero invitado.',

                'Cuando se trate de Movilidad académica saliente, presencial o a través de TICs, escriba el nombre correcto y completo de la Facultad a la cual pertenece el estudiante o profesor de la Universidad del Cauca que realiza movilidad saliente.'
            ]
        }
    },
    financiacion:{
        title: 'Valor de la financiación en pesos',
        longInfo: {
            text: [
                'Si el estudiante, funcionario administrativo o profesor que realiza movilidad saliente, recibe apoyo económico de la Universidad del Cauca y/o de otra institución, escriba el valor en pesos colombianos, sin signo pesos, ni puntos ni comas.',

                'Si el invitado nacional o extranjero recibe remuneración de la Universidad del Cauca y/o de otra institución, escriba el valor en pesos colombianos, sin signo pesos, ni puntos ni comas.',

                'Si el estudiante en movilidad entrante es becario, escriba el valor en pesos colombianos, sin signo pesos, ni puntos ni comas.'
            ]
        }
    },
    fuenteFinanciacion:{
        title: 'Fuente de la financiación',
        shortInfo: 'Escriba aquí el nombre de la dependencia de la Universidad del Cauca y/o de otra institución que otorgó la financiación o la beca.'
    }
}

export const inputInfo = {
    sentido:{
        id:'direction',
        text: 'Sentido',
        required: true,
        options: [
            {value: 'OUTGOING_IN_PERSON', text: 'Saliente presencial'},
            {value: 'INCOMING_IN_PERSON', text: 'Entrante presencial'},
            {value: 'OUTGOING_VIRTUAL', text: 'Saliente virtual'},
            {value: 'INCOMING_VIRTUAL', text: 'Entrante virtual'},
        ],
    },
    tipo:{
        id:'personType',
        text: 'Tipo',
        required: true,
        options: [
            {value: 'TEACHER', text: 'Profesor'},
            {value: 'STUDENT', text: 'Estudiante'},
            {value: 'ADMIN', text: 'Administrativo'},
        ],
    },
    tipoDocumento:{
        id:'identificationType',
        text: 'Tipo de documento',
        required: true,
        options: [
            {value: 'CC', text: 'CC'},
            {value: 'PS', text: 'PS'},
            {value: 'CE', text: 'CE'},
            {value: 'DE', text: 'DE'},
            {value: 'V', text: 'V'},
        ],
    },
    numID:{
        id: 'personId',
        text: 'Número de identificación',
        type: 'number',
        required: true,
        pattern: /^[0-9]+$/,
        message: 'El número de identificación no puede ser negativo'
    },
    nombre:{
        id: 'firstName',
        text: 'Nombre(s)',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    apellidos:{
        id: 'lastName',
        text: 'Apellidos',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    genero:{
      id: 'gender',
      text: 'Género',
      required: true,
      options: [
        {value: 'F', text: 'Femenino'},
        {value: 'M', text: 'Masculino'},
        {value: 'O', text: 'Otro'},
      ],  
    },
    uniOrigen:{
        id: 'origin',
        text: 'Universidad de origen',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    uniDestino:{
        id: 'destination',
        text: 'Universidad de destino',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    convenio:{
        id: 'hasAgreement',
        text: '¿Existe convenio?',
        required: false,
        options: [
            {value: 'Y', text: 'Sí'},
            {value: 'N', text: 'No'},
        ],
    },
    numConvenio:{
        id: 'agreementId',
        text: 'Número de convenio',
        type: 'text',
        required: true
    },
    tipoEvento:{
        id: 'eventType',
        text: 'Tipo de evento',
        required: true,
        options: [
            {value: 1, text: 'Asistencia a evento'},
            {value: 2, text: 'Misión'},
            {value: 3, text: 'Curso corto'},
            {value: 4, text: 'Estancia de investigación'},
            {value: 5, text: 'Semestre académico de intercambio'},
            {value: 6, text: 'Doble titulación'},
            {value: 7, text: 'Pasantía o práctica'},
            {value: 8, text: 'Rotación médica'},
            {value: 9, text: 'Profesor visitante'},
            {value: 10, text: 'Profesor de programa de pregrado'},
            {value: 11, text: 'Profesor de programa de especialización'},
            {value: 12, text: 'Profesor de programa de maestría'},
            {value: 13, text: 'Profesor de programa de doctorado'},
            {value: 14, text: 'Profesor de programa de postdoctorado'},
            {value: 15, text: 'Estudios de maestría'},
            {value: 16, text: 'Estudios de doctorado'},
            {value: 17, text: 'Estudios de postdoctorado'},
            {value: 18, text: 'Internacionalización en casa'},
            {value: 19, text: 'Voluntariado'},
        ]
    },
    descEvento:{
        id: 'eventDescription',
        text: 'Descripción de evento',
        type: 'text',
        required: true
    },
    programaOrigen:{
        id: 'originProgram',
        text: 'Programa de origen',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    programaAcogida:{
        id: 'destinationProgram',
        text: 'Programa de acogida',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    ciudad:{
        id: 'city',
        text: 'Ciudad',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    pais:{
        id: 'country',
        text: 'País',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    profPres:{
        id: 'teacher',
        text: 'Profesor presenta',
        type: 'text',
        required: false,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    facultad:{
        id: 'faculty',
        text: 'Facultad',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'Este campo sólo acepta letras'
    },
    financiacion:{
        id: 'funding',
        text: 'Financiación',
        type: 'number',
        required: true,
        pattern: /^[0-9]+$/,
        message: 'La financiación no puede ser negativa'
    },
    fuenteFinanciacion:{
        id: 'fundingSource',
        text: 'Fuente de la financiación',
        type: 'text',
        required: true,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ_\-\s]+$/,
        message: 'El nombre de la fuente de financiación solo puede contener letras y espacios'
    }
}

export const createAgreementOptions = (agreements, setAgreements) => {
    const options = [];

    agreements.forEach((agreement) => {
      options.push({
        value: agreement.agreementId,
        text: agreement.agreementNumber,
      });
    });

    setAgreements(options);
};

export function calcDays(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    const diferenciaMilisegundos = fin - inicio;

    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const diferenciaDias = diferenciaMilisegundos / milisegundosPorDia;

    return Math.floor(diferenciaDias); // Redondear al número de días
}

export function checkDirection(value) {
    if (value === 'INCOMING_VIRTUAL' || value === 'INCOMING_IN_PERSON') {
        return 'IN';
    } else {
        return 'OUT';
    }
}

export function checkDates(direction, entryDate, exitDate){
    const entry = new Date(entryDate);
    const exit = new Date(exitDate);
    let aux = false;
    if (direction === 'IN') {
        aux = entry <= exit ;
    } else {
        aux = exit <=  entry ;
    }
    return aux
}