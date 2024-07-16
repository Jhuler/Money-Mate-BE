import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

export const Verificacion = sequelize.define('verificaciones', {
    id: {type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    correo: {type:DataTypes.STRING},
    codigo: {type:DataTypes.STRING}
})