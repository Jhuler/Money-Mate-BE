import { Usuario } from "../models/Usuario.js"

import { Categoria } from '../models/Categoria.js'
import { Cuenta } from '../models/Cuenta.js'
import { Movement } from '../models/Movement.js'
import { Prestamo } from '../models/Prestamo.js'
import { Verificacion } from "../models/Verificacion.js"
import { Signin } from "../models/Signin.js"

Usuario.hasMany(Categoria, {foreignKey:'createdBy', onDelete:'RESTRICT'})
Categoria.belongsTo(Usuario, {foreignKey:'createdBy', as:'createdBy1'})

Usuario.hasMany(Cuenta, {foreignKey:'createdBy', onDelete:'RESTRICT'})
Cuenta.belongsTo(Usuario, {foreignKey:'createdBy', as:'createdBy1'})

Usuario.hasMany(Movement, {foreignKey:'createdBy', onDelete:'RESTRICT'})
Movement.belongsTo(Usuario, {foreignKey:'createdBy', as:'createdBy1'})

Usuario.hasMany(Prestamo, {foreignKey:'createdBy', onDelete:'RESTRICT'})
Prestamo.belongsTo(Usuario, {foreignKey:'createdBy', as:'createdBy1'})