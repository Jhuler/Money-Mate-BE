import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

export const Usuario = sequelize.define('usuarios', {
    id: {type:DataTypes.STRING, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    usuario: {type:DataTypes.STRING, unique:true},
    contrasena: {type:DataTypes.STRING},
    nombres: {type:DataTypes.STRING},
    apellidos: {type:DataTypes.STRING},
    correo: {type:DataTypes.STRING, unique:true},
    celular: {type:DataTypes.STRING},
    activo: {type:DataTypes.BOOLEAN},
    lastSignin: {type:DataTypes.DATE},
    lastUpdatePassword: {type:DataTypes.DATE},
    lastUpdateCorreo: {type:DataTypes.DATE},
})