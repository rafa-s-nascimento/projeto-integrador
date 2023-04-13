const { sequelize, DataTypes } = require("../db/connect");

const Produto = sequelize.define(
    "produto",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        intencao_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        condicao_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        visivel: {
            type: DataTypes.BOOLEAN,
        },
    },
    { tableName: "produto" }
);

// cria a tabela se ela não existe
// Produto.sync();

module.exports = Produto;
