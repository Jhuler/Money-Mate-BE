import { Prestamo } from '../database/models/Prestamo.js'
// import sequelize from '../database/sequelize.js'
import { Op } from 'sequelize'
// import { createdBy1, updatedBy1 } from '../database/relations/includeColumns.js'
import { Cuenta } from '../database/models/Cuenta.js'
import { Movement } from '../database/models/Movement.js'
import dbErrors from '../database/utils/dbErrors.js'

// INCLUDES
const cuenta1 = {model:Cuenta, as:'cuenta1', attributes:['id', 'nombre', 'moneda']}
const movements = {model:Movement, as:'movements', include:[cuenta1], order:[['fecha', 'ASC']]}
const include = [movements]

const find = async (req, res) => {
    try {
        const {id, f1, f2} = req.query
        const createdBy = req.userId
        let data

        if (id) {
            data = await Prestamo.findByPk(id, {include})
        }
        else if (f1) {
            data = await Prestamo.findAll({
                where: {
                    createdBy,
                    fecha: {
                        [Op.between]: [new Date(f1), new Date(f2)]
                    }
                },
                include
            })
        }
        else {
            data = await Prestamo.findAll({where:{createdBy}, include})
        }

        res.status(200).json({code:0, data})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const create = async (req, res) => {
    try {
        const {tipo,persona,motivo,movimiento} = req.body
        const createdBy = req.userId

        const prest = await Prestamo.create({tipo,persona,motivo,createdBy})
        
        movimiento.prestamo = prest.id
        movimiento.createdBy = createdBy
        
        await Movement.create(movimiento)

        const data = await Prestamo.findByPk(prest.id, {include})

        res.status(200).json({code:0, data})
    }
    catch (error) {
        if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const {tipo,persona,motivo} = req.body
        // const updatedBy = req.userId

        await Prestamo.update({tipo,persona,motivo}, {where:{id}})

        const data = await Prestamo.findByPk(id, {include})
        
        res.status(200).json({code:0, data})
    }
    catch (error) {
        if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const delet = async (req, res) => {
    try {
        const {id} = req.params

        await Prestamo.destroy({where:{id}})

        res.status(200).json({code:0})
    }
    catch (error) {
        if(error.parent) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const createMany = async (req, res) => {
    try {
        await Prestamo.bulkCreate()

        res.status(200).json({code:0, msg:'Datos creados con éxito'})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

export default {
    find, create, update, delet,
    createMany,
}