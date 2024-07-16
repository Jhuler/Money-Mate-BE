import { Op } from 'sequelize'
import { Cuenta } from '../database/models/Cuenta.js'
// import { createdBy1, updatedBy1 } from '../database/relations/includeColumns.js'
import { Movement } from '../database/models/Movement.js'
import { Categoria } from '../database/models/Categoria.js'
import { Prestamo } from '../database/models/Prestamo.js'
import dbErrors from '../database/utils/dbErrors.js'

// INCLUDES
const include = []

const find = async (req, res) => {
    try {
        const {id, f1, f2} = req.query
        const createdBy = req.userId
        let data

        if (id) {
            data = await Cuenta.findByPk(id, {include})
        }
        else if (f1) {
            const movements = {model:Movement, as:'movements', required:false,
                where: {
                    fecha: {
                        [Op.between]: [new Date(f1), new Date(f2)]
                    }
                }
            }

            data = await Cuenta.findAll({where:{createdBy}, include:[movements], order:[['nombre', 'ASC']]})
        }
        else {
            data = await Cuenta.findAll({where:{createdBy}, include, order:[['nombre', 'ASC']]})
        }

        res.status(200).json({code:0, data})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const create = async (req, res) => {
    try {
        const {nombre,moneda,icon,info} = req.body
        const createdBy = req.userId

        const newCuenta = await Cuenta.create({nombre,moneda,icon,info,createdBy})

        const data = await Cuenta.findByPk(newCuenta.id, {include})

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
        const {nombre,moneda,icon,info} = req.body
        // const updatedBy = req.userId

        await Cuenta.update({nombre,moneda,icon,info}, {where:{id}})

        const data = await Cuenta.findByPk(id, {include})
        
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

        await Cuenta.destroy({where:{id}})

        res.status(200).json({code:0})
    }
    catch (error) {
        if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const detalle = async (req, res) => {
    try {
        const {id,f1,f2} = req.query
        const createdBy = req.userId

        const cuenta1 = {model:Cuenta, as:'cuenta1', attributes:['id', 'nombre', 'moneda']}
        const cuentab1 = {model:Cuenta, as:'cuentab1', attributes:['id', 'nombre', 'moneda']}
        const categoria1 = {model:Categoria, as:'categoria1', attributes:['id', 'nombre', 'color', 'icon']}
        const prestamo1 = {model:Prestamo, as:'prestamo1', attributes:['id', 'tipo', 'persona', 'motivo']}
        const include1 = [cuenta1, cuentab1, categoria1, prestamo1]

        const where = {
            fecha: {
                [Op.between]: [new Date(f1), new Date(f2)]
            },
            [Op.or]: [
                { cuenta: id },
                { cuentab: id }
            ]
        }

        let data
        const cuenta = await Cuenta.findOne({where:{id,createdBy}, order:[['nombre','ASC']]})

        if (cuenta) {
            data = cuenta.toJSON()

            const movs = await Movement.findAll({where, include:include1, order:[['createdAt','ASC']]})
            
            data.movements = movs
        }

        res.status(200).json({code:0, data})
    }
    catch (error) {
        // if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const createMany = async (req, res) => {
    try {
        await Cuenta.bulkCreate()

        res.status(200).json({code:0, msg:'Datos creados con éxito'})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

export default {
    find,
    create,
    update,
    delet,
    detalle,
    createMany,
}