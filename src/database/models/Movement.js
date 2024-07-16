import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'
import { Cuenta } from '../models/Cuenta.js'
import { Categoria } from '../models/Categoria.js'
import { Prestamo } from '../models/Prestamo.js'

export const Movement = sequelize.define('movements', {
    id: {type:DataTypes.STRING, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    fecha: {type:DataTypes.DATE},
    tipo: {type:DataTypes.INTEGER},
    cuenta: {type:DataTypes.STRING},
    cuentab: {type:DataTypes.STRING},
    categoria: {type:DataTypes.STRING},
    prestamo: {type:DataTypes.STRING},
    detalle: {type:DataTypes.STRING},
    monto: {type:DataTypes.DOUBLE},
    
    createdBy: {type:DataTypes.STRING},
    updatedBy: {type:DataTypes.STRING}
})

Cuenta.hasMany(Movement, {foreignKey:'cuenta', as:'movements', onDelete:'RESTRICT'})
Movement.belongsTo(Cuenta, {foreignKey:'cuenta', as:'cuenta1'})

Cuenta.hasMany(Movement, {foreignKey:'cuentab', as:'movementsb', onDelete:'RESTRICT'})
Movement.belongsTo(Cuenta, {foreignKey:'cuentab', as:'cuentab1'})

Categoria.hasMany(Movement, {foreignKey:'categoria', onDelete:'RESTRICT'})
Movement.belongsTo(Categoria, {foreignKey:'categoria', as:'categoria1'})

Prestamo.hasMany(Movement, {foreignKey:'prestamo', onDelete:'RESTRICT'})
Movement.belongsTo(Prestamo, {foreignKey:'prestamo', as:'prestamo1'})