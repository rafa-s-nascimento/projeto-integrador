const { sequelize, DataTypes } = require("../db/connect");

const Usuario = sequelize.define(
    "usuario",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true,
        },
        img_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { tableName: "usuario", timestamps: false }
);

module.exports = Usuario;
