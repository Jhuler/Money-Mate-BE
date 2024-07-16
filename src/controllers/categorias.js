import { Op } from 'sequelize'
import { Categoria } from '../database/models/Categoria.js'
import { Cuenta } from '../database/models/Cuenta.js'
import { Prestamo } from '../database/models/Prestamo.js'
// import { createdBy1, updatedBy1 } from '../database/relations/includeColumns.js'
import { Movement } from '../database/models/Movement.js'
import dbErrors from '../database/utils/dbErrors.js'

// INCLUDES
const include = []

const find = async (req, res) => {
    try {
        const {id, f1, f2} = req.query
        const createdBy = req.userId
        let data

        if (id) {
            data = await Categoria.findByPk(id, {include})
        }
        else if (f1) {
            const movements = {model:Movement, as:'movements', required:false,
                where: {
                    fecha: {
                        [Op.between]: [new Date(f1), new Date(f2)]
                    }
                }
            }

            data = await Categoria.findAll({where:{createdBy}, include:[movements], order:[['nombre', 'ASC']]})
        }
        else {
            data = await Categoria.findAll({where:{createdBy}, include, order:[['nombre', 'ASC']]})
        }

        res.status(200).json({code:0, data})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

// const findTipo = async (req, res) => {
//     try {
//         const {id} = req.params

//         data = await Categoria.findAll({where:{tipo:id}, include})

//         res.status(200).json({code:0, data})
//     }
//     catch (error) {
//         res.status(500).json({code:-1, msg:error.message, error})
//     }
// }

const create = async (req, res) => {
    try {
        const {nombre,tipo,icon,color} = req.body
        const createdBy = req.userId

        const newCategoria = await Categoria.create({nombre,tipo,icon,color,createdBy})

        const data = await Categoria.findByPk(newCategoria.id, {include})

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
        const {nombre,tipo,icon,color} = req.body
        // const updatedBy = req.userId

        await Categoria.update({nombre,tipo,icon,color}, {where:{id}})

        const data = await Categoria.findByPk(id, {include})
        
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

        await Categoria.destroy({where:{id}})

        res.status(200).json({code:0})
    }
    catch (error) {
        if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const getMovimientos = async (req, res) => {
    try {
        const {id,f1,f2} = req.query
        const createdBy = req.userId

        const cuenta1 = {model:Cuenta, as:'cuenta1', attributes:['id', 'nombre', 'moneda']}
        const cuentab1 = {model:Cuenta, as:'cuentab1', attributes:['id', 'nombre', 'moneda']}
        const categoria1 = {model:Categoria, as:'categoria1', attributes:['id', 'nombre', 'color', 'icon']}
        const prestamo1 = {model:Prestamo, as:'prestamo1', attributes:['id', 'tipo', 'persona', 'motivo']}
        const include1 = [cuenta1, cuentab1, categoria1, prestamo1]

        const movements = {model:Movement, as:'movements', required:false,
            where: {
                fecha: {
                    [Op.between]: [new Date(f1), new Date(f2)]
                }
            },
            include: include1
        }

        const data = await Categoria.findOne({where:{id,createdBy}, include:[movements], order:[['nombre', 'ASC']]})

        res.status(200).json({code:0, data})
    }
    catch (error) {
        // if(error.name && error.name.toLowerCase().includes('sequelize')) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const createMany = async (req, res) => {
    try {
        await Categoria.bulkCreate()

        res.status(200).json({code:0, msg:'Datos creados con éxito'})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

export default {
    find,
    // findTipo,
    create,
    update,
    delet,
    getMovimientos,
    createMany
}