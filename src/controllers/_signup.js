import { Usuario } from '../database/models/Usuario.js'
import { Verificacion } from "../database/models/Verificacion.js"
import { Cuenta } from "../database/models/Cuenta.js"
import { Categoria } from "../database/models/Categoria.js"
import { Movement } from "../database/models/Movement.js"
import { Prestamo } from "../database/models/Prestamo.js"
import dbErrors from '../database/utils/dbErrors.js'

import { generarCodigo6 } from "../store/utils.js"
import connMail from "../conexiones/email.js"
import config from "../config.js"
import setLayoutCodigoVerificacion from "../layouts/codigoVerificación.js"

import bcrypt from 'bcrypt'

const include = []
const attributes = {exclude:['contrasena']}

const correoExiste = async (req, res) => {
    try {
        const {correo} = req.body

        const data = await Usuario.findOne({where:{correo}})

        if (data == null) return res.status(200).json({code:0})

        res.status(200).json({code:1, msg:'El correo está asociado a otra cuenta'})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const sendCodigo = async (req, res) => {
    try {
        const {correo} = req.body
        const codigo = generarCodigo6()

        await Verificacion.destroy({where:{correo}})
        await Verificacion.create({correo,codigo})

        const conMail = connMail()
        const send = await conMail.sendMail({
            from: `${config.app_name} <${config.email}>`,
            to: correo,
            subject: 'Código de verificación',
            html: setLayoutCodigoVerificacion(codigo)
        })

        res.status(200).json({code:0})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const verifyCodigo = async (req, res) => {
    try {
        const {correo, codigo} = req.body

        const data = await Verificacion.findOne({where:{correo,codigo}})

        if (data == null) return res.status(200).json({code:1, msg:'Código ingresado no válido'})

        await Verificacion.destroy({where:{correo}})

        res.status(200).json({code:0})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const crearUsuario = async (req, res) => {
    try {
        const {usuario,contrasena,nombres,apellidos,correo,celular,activo} = req.body

        const contrasena1 = await bcrypt.hash(contrasena, 10)
        
        let data = await Usuario.create({usuario,contrasena:contrasena1,nombres,apellidos,correo,celular,activo})

        data = await Usuario.findByPk(data.id, {include, attributes})

        res.status(200).json({code:0, data})
    }
    catch (error) {
        if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})
        
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const addDatos = async (req, res) => {
    try {
        const {cuentas, categorias, movimientos, prestamos} = req.body
        
        await Cuenta.bulkCreate(cuentas)
        await Categoria.bulkCreate(categorias)
        if (movimientos.length > 0) await Movement.bulkCreate(movimientos)
        if (prestamos.length > 0) await Prestamo.bulkCreate(prestamos)

        res.status(200).json({code:0})
    }
    catch (error) {
        // if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})
        
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const cambiarContrasena = async (req, res) => {
    try {
        const {correo,contrasena} = req.body

        const contrasena1 = await bcrypt.hash(contrasena, 10)
        
        await Usuario.update({contrasena:contrasena1}, {where:{correo}})

        res.status(200).json({code:0})
    }
    catch (error) {
        // if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})
        
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

export default {
    correoExiste,
    sendCodigo,
    verifyCodigo,
    crearUsuario,
    addDatos,
    cambiarContrasena,
}