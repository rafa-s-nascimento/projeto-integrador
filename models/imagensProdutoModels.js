const { sequelize, DataTypes } = require("../db/connect");

const ImagensProduto = sequelize.define(
    "imagens_produto",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        produto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        img_path: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
    },
    { tableName: "imagens_produto", timestamps: false }
);

module.exports = ImagensProduto;
