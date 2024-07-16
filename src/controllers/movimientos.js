import Sequelize from 'sequelize'
import { Movement } from '../database/models/Movement.js'
// import sequelize from '../database/sequelize.js'
import { Op } from 'sequelize'
// import { createdBy1, updatedBy1 } from '../database/relations/includeColumns.js'
import { Cuenta } from '../database/models/Cuenta.js'
import { Categoria } from '../database/models/Categoria.js'
import { Prestamo } from '../database/models/Prestamo.js'
import dbErrors from '../database/utils/dbErrors.js'

// INCLUDES
const cuenta1 = {model:Cuenta, as:'cuenta1', attributes:['id', 'nombre', 'moneda']}
const cuentab1 = {model:Cuenta, as:'cuentab1', attributes:['id', 'nombre', 'moneda']}
const categoria1 = {model:Categoria, as:'categoria1', attributes:['id', 'nombre', 'color', 'icon']}
const prestamo1 = {model:Prestamo, as:'prestamo1', attributes:['id', 'tipo', 'persona', 'motivo']}
const include = [cuenta1, cuentab1, categoria1, prestamo1]

let data

const find = async (req, res) => {
    try {
        const {id, f1, f2} = req.query
        const createdBy = req.userId

        if (id) {
            data = await Movement.findByPk(id, {include})
        }
        else if (f1) {
            data = await Movement.findAll({
                where: {
                    createdBy,
                    fecha: {
                        [Op.between]: [new Date(f1), new Date(f2)]
                    }
                },
                include,
                order: [['createdAt', 'ASC']]
            })
        }
        else {
            data = await Movement.findAll({where:{createdBy}, include, order:[['createdAt', 'ASC']]})
        }

        res.status(200).json({code:0, data})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const filter = async (req, res) => {
    try {
        const createdBy = req.userId
        let {filtros} = req.query

        filtros = JSON.parse(filtros)

        const where = {createdBy}

        if (filtros.f1 && filtros.f2) {
            where.fecha = {
                [Op.between]: [new Date(filtros.f1), new Date(filtros.f2)]
            }
        }
        else if (filtros.f1) {
            // Si solo se proporciona la fecha de inicio, aplicar el filtro para fechas después de la fecha de inicio
            where.fecha = {
                [Op.gte]: new Date(filtros.f1)
            }
        }
        else if (filtros.f2) {
            // Si solo se proporciona la fecha de fin, aplicar el filtro para fechas antes de la fecha de fin
            where.fecha = {
                [Op.lte]: new Date(filtros.f2)
            }
        }

        if (filtros.tipo.length > 0) {
            where.tipo = {
                [Op.in]: filtros.tipo
            }
        }

        if (filtros.cuenta.length > 0) {
            where[Op.or] = [
                {cuenta: {[Op.in]: filtros.cuenta}},
                {cuentab: {[Op.in]: filtros.cuenta}}
            ]
        }

        if (filtros.categoria.length > 0) {
            where.categoria = {
                [Op.in]: filtros.categoria
            }
        }

        if (filtros.detalle.trim() !== '') {
            where.detalle = {
                [Op.iLike]: `%${filtros.detalle}%`
            }
        }

        if (filtros.monto !== null) {
            where.monto = filtros.monto
        }

        const data = await Movement.findAll({ where, include, order:[['createdAt', 'ASC']]})

        res.status(200).json({code:0, data})
    }
    catch (error) {
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const create = async (req, res) => {
    try {
        const {fecha,tipo,cuenta,cuentab,categoria,prestamo,detalle,monto} = req.body
        const createdBy = req.userId

        data = await Movement.create({fecha,tipo,cuenta,cuentab,categoria,prestamo,detalle,monto,createdBy})

        data = await Movement.findByPk(data.id, {include})

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
        const {fecha,tipo,cuenta,cuentab,categoria,prestamo,detalle,monto} = req.body
        // const updatedBy = req.userId

        await Movement.update({fecha,tipo,cuenta,cuentab,categoria,prestamo,detalle,monto}, {where:{id}})

        data = await Movement.findByPk(id, {include})
        
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

        await Movement.destroy({where:{id}})

        res.status(200).json({code:0})
    }
    catch (error) {
        if(error.parent) return res.json({code:1, msg:dbErrors(error)})

        res.status(500).json({code:-1, msg:error.message, error})
    }
}

const createMany = async (req, res) => {
    try {
        await Movement.bulkCreate()

        res.status(200).json({code:0, msg:'Datos creados con éxito'})
    }
    catch (error) {
        // console.error('Error al inicializar datos:', error)
        res.status(500).json({code:-1, msg:error.message, error})
    }
}

export default {
    find, create, update, delet,
    filter, createMany
}