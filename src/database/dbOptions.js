import config from "../config.js"

export default {
    dialect: 'postgres',

    // seederStorage: "sequelize",
    // seederStorageTableName: "seeds",

    // migrationStorage: "sequelize",
    // migrationStorageTableName: "migrations",

    // dialectOptions: {
    //     ssl: {
    //         rejectUnauthorized: false,
    //         ca: config.db_ssl_ca,
    //     },
    // }
}

// export default {
//     dialect: 'sqlite',
//     storage: './src/database/db.sqlite',
// }