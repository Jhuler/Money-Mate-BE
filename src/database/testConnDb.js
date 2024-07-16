import sequelize from './sequelize.js'

import './utils/createdBy.js'
// import initializeData from './utils/initializeData.js'

async function testConnDb(){
    try {
        await sequelize.authenticate()
        console.log('Connection to database has been established successfully.')
        // await sequelize.query('PRAGMA foreign_keys = false;')
        // await sequelize.sync({alter:true})
        // await sequelize.query('PRAGMA foreign_keys = true;')
        // await sequelize.sync({force:true})
        // await initializeData()
    }
    catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export default testConnDb