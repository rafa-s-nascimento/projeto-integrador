const CustomAPIError = require("../errors/custom-error");
const path = require("path");

const usuarioModel = require("../models/usuarioModel");
const passwordModel = require("../models/passwordModel");
const avatarModel = require("../models/avatarModels");

// const { setUsuario, getUsuario, usuarios } = require("../data");

// instanciando o jason web token
const jwt = require("jsonwebtoken");

// esse middle é responsável por retornar o html da página de login
const login = async (req, res) => {
    const filePath = path.join(__dirname, "../public/login.html");
    // console.log(filePath);
    // console.log(__dirname + "/static/login.html");

    res.sendFile(filePath);
};

// esse middle é reponsável por validar um login
const logar = async (req, res) => {
    const { email, password } = req.body;

    const singleUser = await usuarioModel.findOne({
        where: { email: email },
        raw: true,
    });

    if (!singleUser) {
        return res.status(401).send("Usuario ou senha incorretos");
    }

    const { id, nome, img_id } = singleUser;

    const { senha } = await passwordModel.findOne({
        where: { usuario_id: id },
        raw: true,
    });

    if (senha !== password) {
        return res.status(401).send("Usuario ou senha incorretos");
    }

    const { img_path } = await avatarModel.findOne({
        where: { id: img_id },
        raw: true,
    });

    // jwt.sing é responsável por criar o token para enviar ao usuario
    // ele recebe como parametros:
    // payload: conteúdo util, usado para identificar o usuario,
    // secret: o segredo que fica guardado no servidor
    // opicionais: objeto com opcionais
    const token = jwt.sign({ id: id, nome: nome }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });

    res.cookie("Bearer " + token);

    res.status(200).json({
        msg: "acesso consedido",
        token: `Bearer ${token}`,
        user_data: { id, nome, img_path },
    });
};

// esse middle é responsável por retorna o html da página de cadastro
const cadastro = async (req, res) => {
    const filePath = path.join(__dirname, "../public/cadastro.html");
    res.sendFile(filePath);
};

// esse middle é responsável por fazer o cadastro
const cadastrar = async (req, res) => {
    const { nome, email, password } = req.body;

    console.log(nome, email, password);

    // console.log(usuario);

    const singleUser = await usuarioModel.findOne({
        where: { email: email },
        raw: true,
    });

    if (singleUser) {
        return res.status(201).send("Usuario já cadastrado!");
    }

    await usuarioModel.create({
        nome: nome,
        email: email,
        img_id: Math.ceil(Math.random() * 15),
    });

    const { id } = await usuarioModel.findOne({
        where: { email: email },
        raw: true,
    });

    await passwordModel.create({ usuario_id: id, senha: password });

    // console.log(checkUsuario);

    // if (checkUsuario) {
    //     res.status(401).send("usuario já existe!!!");
    //     return;

    //     throw new CustomAPIError("user already exists!!!", 400);
    // }

    // setUsuario(usuario);
    return res.status(201).send("success");
};

module.exports = { login, logar, cadastro, cadastrar };
