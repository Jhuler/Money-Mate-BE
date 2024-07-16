import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

export const Cuenta = sequelize.define('cuentas', {
    id: {type:DataTypes.STRING, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    nombre: {type:DataTypes.STRING},
    moneda: {type:DataTypes.STRING},
    icon: {type:DataTypes.STRING},
    info: {type:DataTypes.STRING},

    createdBy: {type:DataTypes.STRING},
    updatedBy: {type:DataTypes.STRING}
})