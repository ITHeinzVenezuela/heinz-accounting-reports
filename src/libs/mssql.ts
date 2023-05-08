import { Sequelize } from "sequelize"
import config from "../config"
import tedious from "tedious"

const { dbUser, dbPassword, dbHost, dbName } = config

console.log("dbHost", dbHost);
console.log("dbName", dbName);
console.log("dbUser", dbUser);
console.log("dbPassword", dbPassword);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: 1433,
  dialect: "mssql",
  dialectModule: tedious,
})

export default sequelize;

// "mssql://[Server_Name[:Portno]]/[Database_Instance_Name]/[Database_Name]?FailoverPartner=[Partner_Server_Name]&InboundId=[Inbound_ID] "