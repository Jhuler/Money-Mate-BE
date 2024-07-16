import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

export const Prestamo = sequelize.define('prestamos', {
    id: {type:DataTypes.STRING, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    tipo: {type:DataTypes.INTEGER},
    persona: {type:DataTypes.STRING},
    motivo: {type:DataTypes.STRING},

    createdBy: {type:DataTypes.STRING},
    updatedBy: {type:DataTypes.STRING}
})