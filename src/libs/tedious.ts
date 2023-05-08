import { Connection } from "tedious";

const config = {
  server: "sampghvedbv001\heinz",
  authentication: {
    type: "default",
    options: {
      userName: "OrlandoM",
      password: "Denario123*",
    }
  },
  options: {
    port: 1433,
    database: "TESTVNZ",
    trustServerCertificate: true,
  }
}

const connection = new Connection(config)

const executeStatement = () => {
  console.log("Conectado a la base de datos");
}

connection.on("connect", (error) => {
  if (error) {
    console.log("Error al conectarse a la base de datos")
  } else {
    executeStatement()
  }
})