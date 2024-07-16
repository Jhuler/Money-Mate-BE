import { Router } from "express"

import { Usuario } from '../database/models/Usuario.js'
import { Signin } from "../database/models/Signin.js"

import jat from "../store/jat.js"
import config from "../config.js"

import bcrypt from 'bcrypt'

const router = Router()

// const signin = async (req, res) => {
//     try {
//         const {correo, contrasena} = req.body
//         const device = req.headers['user-agent']
//         // const place = req.headers['place']
        
//         const data = await Usuario.findOne({where:{correo}, attributes:['id','contrasena']})
//         if (data == null) return res.json({code:1, msg:'Correo o contraseña invalidos'})

//         const correct = await bcrypt.compare(contrasena, data.contrasena)
//         if (!correct) return res.json({code:1, msg:'Correo o contraseña invalidos'})

//         const token = jat.encrypt({id:data.id}, config.tokenmyapi)
        
//         await Signin.create({user:data.id,token,device})

//         res.status(200).json({code:0, token})
//     }
//     catch (error) {
//         res.status(500).send({code:-1, msg:error.message, error})
//     }
// }

const signin = async (req, res) => {
    try {
        const {correo, contrasena} = req.body
        const device = req.headers['user-agent']
        // const place = req.headers['place']
        
        const data = await Usuario.findOne({where:{correo}, attributes:['id','contrasena']})
        if (data == null) return res.json({code:1, msg:'Correo o contraseña invalidos'})

        const correct = await bcrypt.compare(contrasena, data.contrasena)
        if (!correct) return res.json({code:1, msg:'Correo o contraseña invalidos'})

        const token = jat.encrypt({id:data.id}, config.tokenmyapi)
        
        await Signin.destroy({where:{user:data.id,device}})

        await Signin.create({user:data.id,token,device})

        res
            // .cookie('access-token', token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'None'
            // })
            .status(200)
            .json({code:0, token})
    }
    catch (error) {
        res.status(500).send({code:-1, msg:error.message, error})
    }
}

router.post('/', signin)

export default router