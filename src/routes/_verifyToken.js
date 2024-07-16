import jat from "../store/jat.js"
import config from "../config.js"

import { Signin } from "../database/models/Signin.js"

async function verifyToken(req, res, next){
    const device = req.headers['user-agent']
    // const place = req.headers['place']
    const authorization = req.headers['authorization']

    if (!authorization) return res.status(401).json({code:1000, msg:'Token faltante'})

    if (!authorization.toLowerCase().startsWith('bearer')) return res.status(401).json({code:1000, msg:'Token no válido'})

    const token = authorization.substring(7)

    const result = await Signin.findOne({where:{token,device}})

    if (result == null) {
        await Signin.destroy({where:{token}})
        res.json({code:1000, msg:'Sesión terminada'})
        return
    }

    req.userId = (jat.decrypt(token, config.tokenmyapi)).id
    next()
}

export default verifyToken