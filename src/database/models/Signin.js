import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'
import { Usuario } from './Usuario.js'

export const Signin = sequelize.define('signins', {
    id: {type:DataTypes.STRING, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    user: {type:DataTypes.STRING},
    token: {type:DataTypes.STRING},
    device: {type:DataTypes.STRING},
    place: {type:DataTypes.STRING},
})

Usuario.hasMany(Signin, {foreignKey:'user', onDelete:'RESTRICT'})
Signin.belongsTo(Usuario, {foreignKey:'user', as:'user1'})