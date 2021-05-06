//Soportorá la funcionalidad para el registro de los usuarios participantes
//Autores. Aguayo Nuñez Sandra Noelia, Ramírez Bolaños Benjamín, Sandoval Rodríguez Lendy Joanna
//16 de marzo del 2021

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    'cveUsuario': { type: mongoose.Types.ObjectId },
    'estado': {
        type: Boolean,
        default: false
    }, //Cuenta activada=true o no=false
    'nombre': {
        type: String,
        required: [true, 'El Nombre de usuario es requerido'],
        minLength: [3, 'El mínimo de carácteres requeridos son 3'],
        maxLength: [100, 'El máximo de carácteres requeridos son 100'],
        lowercase: true
    },
    'appPaterno': {
        type: String,
        required: [true, 'El apellido Paterno es requerido'],
        minLength: [3, 'El mínimo de carácteres requeridos son 3'],
        maxLength: [100, 'El máximo de carácteres requeridos son 100'],
        lowercase: true,
        index: true
    },
    'appMaterno': {
        type: String,
        required: [true, 'El apellido Materno es requerido'],
        minLength: [3, 'El mínimo de carácteres requeridos son 3'],
        maxLength: [100, 'El máximo de carácteres requeridos son 100'],
        lowercase: true
    },
    'rutaFoto': {
        type: String,
        default: ''
    },
    'email': {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        match: /.+\@.+\..+/,
        unique: true,
        index: true
    },
    'contrasena': {
        type: String
    },
    //'nivelEducativo': {
     //   type: String,
       // required: [true, 'El Nivel Educativo es requerido']
    //},
    //'institucion': {
      //  type: String,
       // required: [true, 'La Institución es requerida']
    //},
    'especialidad': {
        type: String,
        default: 'Programacion',
        enum: ['Administración de Recursos Humanos',
            'Contabilidad', 'Electricidad', 'Lógistica',
            'Mecánica', 'Programacion', 'Soporte y Mantenimiento a equipo de cómputo'
        ],
        required: [true, 'La Especialidad es requerida'],
        index: true
    },
  //  'semestre': {
      //  type: Number,
       // min: [1, 'El mínimo aceptado es 1'],
        //max: [6, 'El máximo aceptado es 6'],
        //required: [true, 'El Semestre es requerido'],
        //index: true
    //},
    //'turno': {
      //  type: String,
        //default: 'matutino',
        //enum: ['matutino', 'vespertino', 'diurno'],
        //required: [true, 'El turno escolar es requerido'],
        //index: true
    //},
    'fechaIngreso': {
        type: Date,
        default: Date.now
    },
    'token': {
        type: String
    },
    'tokenExpiracion': { type: String, default: '' },
    'confirmar': {
        type: String,
        default: 'No',
        enum: ['Si', 'Expirado', 'No']
    }, //Si=token confirmado, Expirado=token vencido, No= Sin confirmación
    role: {
        type: String,
        default: 'estudiante',
        enum: ["estudiante", "docente", "admin"]
    },
    resetPasswordToken: {
        type: String, required: false,
    },
    resetPasswordExperies: {
        type: Date, required: false,
    },
    'cvGrupo':{type:mongoose.Types.ObjectId,ref:'Grupo'}
});

/*
usuarioSchema.pre('save', function capitalizeName(next) {
    this.nombre = lowercase(this.nombre);
    this.appPaterno = lowercase(this.appPaterno);
    this.appMaterno = lowercase(this.appMaterno);
    next();
});
*/
module.exports = mongoose.model('Usuario', usuarioSchema);