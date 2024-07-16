import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

export const Categoria = sequelize.define('categorias', {
    id: {type:DataTypes.STRING, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    nombre: {type:DataTypes.STRING},
    tipo: {type:DataTypes.INTEGER},
    icon: {type:DataTypes.STRING},
    color: {type:DataTypes.STRING},
    presupuesto: {type:DataTypes.DOUBLE},

    createdBy: {type:DataTypes.STRING},
    updatedBy: {type:DataTypes.STRING}
})