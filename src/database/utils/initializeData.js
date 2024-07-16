import { Cuenta } from '../models/Cuenta.js'
import { Categoria } from '../models/Categoria.js'

async function initializeData() {
    try {
        await Cuenta.bulkCreate([
            {nombre:'Bcp', moneda:'PEN'},
            {nombre:'Efectivo', moneda:'PEN'},
            {nombre:'Interbank', moneda:'PEN'},
            {nombre:'Pichincha', moneda:'PEN'},
            {nombre:'Scotiabank', moneda:'PEN'},
        ])

        await Categoria.bulkCreate([
            {nombre:'Interés', tipo:1, icon:null, color:'#aeecaf'},
            // {nombre:'Inversión', tipo:1, icon:null},
            {nombre:'Premio', tipo:1, icon:null},
            {nombre:'Regalo', tipo:1, icon:null},
            {nombre:'Salario', tipo:1, icon:null},
            {nombre:'Otro', tipo:1, icon:null},
            {nombre:'Alimento', tipo:2, icon:null},
            {nombre:'Cuidado personal', tipo:2, icon:null},
            {nombre:'Deporte', tipo:2, icon:null},
            {nombre:'Donación', tipo:2, icon:null},
            {nombre:'Educación', tipo:2, icon:null},
            {nombre:'Electrodoméstico', tipo:2, icon:null},
            {nombre:'Equipos tecnología', tipo:2, icon:null},
            {nombre:'Familia', tipo:2, icon:null},
            {nombre:'Gusto', tipo:2, icon:null},
            {nombre:'Hogar', tipo:2, icon:null},
            {nombre:'Iglesia', tipo:2, icon:null},
            {nombre:'Impuesto', tipo:2, icon:null},
            {nombre:'Mobilidad', tipo:2, icon:null},
            {nombre:'Mueble', tipo:2, icon:null},
            {nombre:'Regalo', tipo:2, icon:null},
            {nombre:'Salud', tipo:2, icon:null},
            {nombre:'Servicio', tipo:2, icon:null},
            {nombre:'Vestimenta', tipo:2, icon:null},
            {nombre:'Otros', tipo:2, icon:null},
            {nombre:'Inversión', tipo:2, icon:null},
        ])

        console.log('Datos iniciales creados con éxito.')
    }
    catch (error) {
        console.error('Error al inicializar datos:', error)
        throw error
    }
}

export default initializeData