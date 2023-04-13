const path = require("path");

// após a autenticação, esse controler será reponsável por enviar todos os dados do usuario
// produtos cadastrados, propostas feitas, propostas recebidas.

const gerenciar = (req, res) => {
    // console.log("se chegou aqui é porque foi autenticado");

    res.status(200).json({ msg: "ok", success: true, data: {} });
};

const gerenciarPage = (req, res) => {
    // console.log("se chegou aqui é porque foi autenticado");

    const pathFile = path.join(__dirname, "../private/gerenciar.html");

    res.status(302).sendFile(pathFile);
};

module.exports = { gerenciar, gerenciarPage };
