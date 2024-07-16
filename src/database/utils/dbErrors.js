// const dbErrors = {
//     sqlite: {
//         duplicated: 19,
//         hasData: 1451,
//     },
//     mysql(err){
//         let msg
//         if (err.errors) {
//             msg = err.errors[0].message
//         }
//         else {
//             msg = err.parent.sqlMessage
//         }

//         return msg
//     },
//     postgresql: {
//         duplicated: 1062,
//         hasData: 1451,
//     }
// }

import dbOptions from '../dbOptions.js'

function dbErrors(err) {
    let msg = ''
    
    if (dbOptions.dialect == 'mysql') {
        if (err.errors) {
            msg = err.errors[0].message
        }
        else {
            msg = err.parent.sqlMessage
        }
    }

    if (dbOptions.dialect == 'postgres') {
        console.log(1)
        if (err.errors) {
            console.log(2)
            msg = err.errors[0].message
        }
        else {
            console.log(3)
            msg = err.parent.details || err.parent.detail
        }
    }

    return msg
}

export default dbErrors