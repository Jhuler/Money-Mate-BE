import { Sequelize } from 'sequelize'
import { Usuario } from '../database/models/Usuario.js'
import { Cuenta } from '../database/models/Cuenta.js'
import { Categoria } from '../database/models/Categoria.js'
import { Movement } from '../database/models/Movement.js'
import { Prestamo } from '../database/models/Prestamo.js'
import { Signin } from '../database/models/Signin.js'
import dbErrors from '../database/utils/dbErrors.js'

import bcrypt from 'bcrypt'

// INCLUDES
// const signins1 = {model:Signin, as:'signins'}
const include = []
// const attributes = ['id','usuario','nombres','apellidos','correo','celular','cargo','permisos','activo','lastSignin','createdBy','updatedBy','createdAt','updatedAt']
const attributes = {exclude:['contrasena']}

// const find = async (req, res) => {
//     try {
//         const {id} = req.query
//         let data

//         if (id) {
//             data = await Usuario.findByPk(id, {include, attributes})
//         }
//         else {
//             data = await Usuario.findAll({include, attributes})
//         }

//         res.status(200).json({code:0, data})
//     }
//     catch (error) {
//         res.status(500).json({code:-1, msg:error.message, error})
//     }
// }

const create = async (req, res) => {
    try {
        const {id,usuario,contrasena,nombres,apellidos,correo,celular,activo,lastSignin} = req.body

        const contrasena1 = await bcrypt.hash(contrasena, 10)
        
        const u = await Usuario.create({id,usuario,contrasena:contrasena1,nombres,apellidos,correo,celular,activo,lastSignin})

        const data = await Usuario.findByPk(u.id, {include, attributes})

        res.status(200).json({code:0, data})
    }
    catch (error) {
        // if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})
        
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const {nombres,apellidos} = req.body
        const updatedBy = req.userId

        await Usuario.update({nombres,apellidos,updatedBy}, {where:{id}})

        const data = await Usuario.findByPk(id, {include, attributes})
        
        res.status(200).json({code:0, data})
    }
    catch (error) {
        if(error.parent) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

// const delet = async (req, res) => {
//     try {
//         const {id} = req.params
//         const {userId} = req

//         if (id == userId) return res.json({code:1, msg:'No puedes eliminar tu usuario'})

//         await Usuario.destroy({where:{id}})

//         res.status(200).json({code:0})
//     }
//     catch (error) {
//         if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})

//         res.status(500).json({code:-1, msg:error.message, error})
//     }
// }

const login = async (req, res) => {
    try {
        const id = req.userId
        
        const u = await Usuario.findByPk(id, {attributes})
        if (u == null) return res.json({code:1, msg:'Sesión terminada'})
        
        await Usuario.update({lastSignin:Sequelize.literal('current_timestamp')}, {where:{id}})

        const data = await Usuario.findByPk(id, {include, attributes})
        
        res.status(200).json({code:0, data})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const logout = async (req, res) => {
    try {
        const user = req.userId
        const {token} = req.body

        await Signin.destroy({where:{user,token}})
        
        res.status(200).json({code:0})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const dispositivosConectados = async (req, res) => {
    try {
        const id = req.userId
        
        const data = await Signin.findAll({where:{user:id}})
        
        res.status(200).json({code:0, data})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const eliminarCuenta = async (req, res) => {
    try {
        const createdBy = req.userId
        
        await Movement.destroy({where:{createdBy}})
        await Cuenta.destroy({where:{createdBy}})
        await Categoria.destroy({where:{createdBy}})
        await Prestamo.destroy({where:{createdBy}})
        await Signin.destroy({where:{user:createdBy}})
        await Usuario.destroy({where:{id:createdBy}})
        
        res.status(200).json({code:0})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const validarContrasena = async (req, res) => {
    try {
        const {contrasena} = req.body
        const id = req.userId

        const u = await Usuario.findByPk(id)

        const correct = await bcrypt.compare(contrasena, u.contrasena)
        if (!correct) return res.json({code:1, msg:'Validación incorrecta'})

        res.status(200).json({code:0})
    }
    catch (error) {
        // if(error.parent) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const cambiarContrasena = async (req, res) => {
    try {
        const {contrasena} = req.body
        const id = req.userId

        const contrasena1 = await bcrypt.hash(contrasena, 10)
        await Usuario.update({contrasena:contrasena1, lastUpdatePassword:Sequelize.literal('current_timestamp')}, {where:{id}})
        
        const data = await Usuario.findByPk(id, {include, attributes})
        
        res.status(200).json({code:0, data})
    }
    catch (error) {
        if(error.parent) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const cambiarCorreo = async (req, res) => {
    try {
        const {correo} = req.body
        const id = req.userId

        await Usuario.update({correo, lastUpdateCorreo:Sequelize.literal('current_timestamp')}, {where:{id}})
        
        const data = await Usuario.findByPk(id, {include, attributes})
        
        res.status(200).json({code:0, data})
    }
    catch (error) {
        if(error.parent) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

export default {
    // find,
    create,
    update,
    // delet,
    login,
    dispositivosConectados,
    logout,
    eliminarCuenta,
    validarContrasena,
    cambiarContrasena,
    cambiarCorreo,
}