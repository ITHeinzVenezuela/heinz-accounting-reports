import { Sequelize } from "sequelize"
import config from "../config"
import tedious from "tedious"

const { dbUser, dbPassword, dbHost, dbName, dbInstance } = config

console.log("dbHost", dbHost);
console.log("dbName", dbName);
console.log("dbUser", dbUser);
console.log("dbPassword", dbPassword);

const MINUTE = 60 * 1000

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: 1433,
  dialect: "mssql",
  dialectModule: tedious,
  dialectOptions: {
    options: {
      instanceName: dbInstance,
      trustServerCertificate: true, // change to true for local dev / self-signed certs,
      encrypt: false,
      connectTimeout: MINUTE / 2,
      requestTimeout: 5 * MINUTE,
    }
  }
})

export default sequelize;

// "mssql://[Server_Name[:Portno]]/[Database_Instance_Name]/[Database_Name]?FailoverPartner=[Partner_Server_Name]&InboundId=[Inbound_ID] "