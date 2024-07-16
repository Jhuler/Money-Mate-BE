import { Sequelize } from 'sequelize'
import config from '../config.js'
import dbOptions from './dbOptions.js'
import pg from 'pg'

const conn = pg

const sequelize = new Sequelize(config.db_uri, dbOptions)

export default sequelize