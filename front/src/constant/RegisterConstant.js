export const RegisterConstant = {
  en: {
    titleRegister: "New Patient Registration",
    /* STEP 1 */
    titleFirstStep: "Your personal information",
    subtitleFirstStep:
      "This information will be visible to patients. You can edit this at any time",
    /* STEP 2 */

    titleSecondStep: "Your professional information",
    subtitleSecondStep:
      "This information will be visible to patients. You can edit this at any time",
    inputRegister: {
      nurse: {
        step_1: {
          inputs: {
            name: "First name",
            lastName: "Last name",
            birthDay: "Date of birth",
            genero: "Gender",
            phone: "Phone number",
            email: "Email address",
            password: "Choose password",
          },
        },
        step_2: {
          inputs: {
            numberLicence: "Medical license number ",
            clinicAddress: "Clinic address",
            city: "City",
            postalCode: "Zip code",
            timeZone: "Time zone",
          },
        },
      },
      patient: {},
      name: "First name",
      lastName: "Last name",
      birthDay: "Date of birth",
      genero: "Gender",
      phone: "Phone number",
      email: "Email address",
      password: "",
    },
    selectOption: {
      doc: "Register doctor",
      pat: "Registrer patient",
    },
    stepper: {
      first: "Information person",
      two: "Information professional",
      three: "Information tax",
    },
  },
  es: {
    titleRegister: "Registro nuevo paciente",
    titleFirstStep: "Tu información personal",
    subtitleFirstStep:
      "Esta información será visible para los pacientes. Puede modificarla en cualquier momento",
    titleSecondStep: "Tu información profesional",
    subtitleSecondStep:
    "Esta información será visible para los pacientes. Puede modificarla en cualquier momento",
    inputRegister: {
      nurse: {
        step_1: {
          inputs: {
            name: "Primer nombre",
            lastName: "Segundo nombre",
            birthDay: "Fecha de nacimiento",
            genero: "Genero",
            phone: "Numero de telefono",
            email: "Direccion de email",
            password: "Ingrese un password",
          },
        },
        step_2: {
          inputs: {
            numberLicence: "Numero de licencia medica",
            clinicAddress: "Dirección de la clinica",
            city: "Ciudad",
            postalCode: "Codigo postal",
            timeZone: "Zona horaria",
          },
        },
      },
      patient: {},
    },
    selectOption: {
      doc: "Registrar como doctor",
      pat: "Registrar como paciente",
    },
    stepper: {
      first: "Informacion personal",
      two: "Información profesional",
      three: "Informacion fiscal",
    },
  },
};
