const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("conexão realizada com sucesso!");
    })
    .catch(() => {
        console.log("Erro ao conectar com banco de dados...");
    });

module.exports = { sequelize, DataTypes };
