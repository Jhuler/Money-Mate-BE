import { Usuario } from '../models/Usuario.js'

const createdBy1 = {
    model: Usuario,
    as: 'createdBy1',
    attributes: ['id', 'nombres', 'apellidos']
}

// const updatedBy1 = {
//     model: Usuario,
//     as: 'updatedBy1',
//     attributes: ['id', 'nombres', 'apellidos']
// }

export {
    createdBy1,
    // updatedBy1
}