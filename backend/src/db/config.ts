import { Dialect, Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
import path from 'path'
import 'dotenv/config';
dotenv.config({ path: path.join(__dirname,'../../.env') });
const dbName =  process.env.CONNECTION as string
console.log(dbName)
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD
const dbConfig = {
  host: dbHost,
  dialect:dbDriver,
 // sync:{ force: true },
  logging:false,
}

// const connection = mysql.createConnection({ dbHost, 3000, dbUser, dbPassword });
// connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);


const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, dbConfig)

/// On to alter the table
sequelizeConnection.sync({alter:true})

//sequelizeConnection.sync()
export default sequelizeConnection