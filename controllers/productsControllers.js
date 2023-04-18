const path = require("path");

// models
const ImagensProduto = require("../models/imagensProdutoModels");
const ProductModel = require("../models/productModel");
const ValoresInput = require("../models/valoresInputModels");
const Usuario = require("../models/usuarioModel");
const Password = require("../models/passwordModel");
const Avatar = require("../models/avatarModels");

const selectID = (arr, atributo, valor) => {
    return arr.find((obj) => obj[atributo] == valor)["id"];
};

const testarRelacionamentos = async () => {
    // busca por associação.

    // lazy loading
    const usuario = await Usuario.findByPk(1);
    const password = await usuario.getUsuario_password();

    // Eager loading
    const usuario2 = await Usuario.findByPk(1, { include: [Password, Avatar] });
    const password2 = usuario2.usuario_password.senha;

    console.log(usuario2);
};

// testarRelacionamentos();

// retorna todos os produtos
const getProducts = async (req, res) => {
    const params = req.params;
    const url = req.url;
    const search = req.query;
    // console.log(req.headers);

    // o productModel.findAll pega a model de determinada tabela e faz um "SELECT * FROM product"
    // ele pode receber um objeto com alguns parametros para modificar o select
    // o atributo raw é importante para que assim possa ser retornado um array simples de objetos.

    // const selectProducts = await productModel.findAll({ raw: true });

    // res.status(200).json({ data: {} });

    res.status(200).json({ data: {} });
};

// retorna um produto em específico
const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    const url = req.url;
    const search = req.query;

    // console.log(params);
    // console.log(url);
    // console.log(search);

    // o productModel.findOne pega a model de determinada tabela e faz um "SELECT * FROM product"
    // ele pode receber um objeto com alguns parametros para modificar o select
    // o atributo raw é importante para que assim possa ser retornado um array simples de objetos.
    // nesse caso atributo where faz com que seja buscado o id que é passado como parametro na hora da requisição
    // 'select * from product where id = <id passado como parametro>
    const singleProduct = await ProductModel.findOne({
        where: { id: id },
        raw: true,
    });

    if (singleProduct) {
        return res.status(200).json({
            msg: "success",
            data: singleProduct,
        });
    }

    return res.status(201).json({ msg: "not found", data: {} });
};

const getAddProductPage = (req, res) => {
    const pathFile = path.join(__dirname, "../private/cadastrar-produto.html");

    res.status(302).sendFile(pathFile);
};

// essa será a rota de confimação para adiconar um produto POST
const setProduct = async (req, res) => {
    const inputs = req.body;
    const imgPath = req.imagePath; //o caminho vira num array de um ou mais itens

    const { nome, intencao, categoria, tipo, condicao, visivel } = inputs;
    const { id: user_id } = req.user;

    // console.log(inputs);
    // console.log(req.user);
    // console.log(imgPath);

    if (nome == "") {
        return res
            .status(401)
            .json({ success: false, msg: "Falha ao cadastrar" });
    }

    const inputValuesBD = await ValoresInput.findAll({ raw: true });

    const produto = await ProductModel.create({
        usuario_id: user_id,
        nome: nome,
        intencao_id: selectID(inputValuesBD, "valor", intencao),
        categoria_id: selectID(inputValuesBD, "valor", categoria),
        tipo_id: selectID(inputValuesBD, "valor", tipo),
        condicao_id: selectID(inputValuesBD, "valor", condicao),
        visivel: visivel,
    });

    const { id } = produto;

    for (let i = 0; i < imgPath.length; i++) {
        await ImagensProduto.create({
            produto_id: id,
            img_path: imgPath[i],
        });
    }

    return res.status(201).json({ success: true, msg: "Produto cadastrado" });
};

module.exports = {
    getProducts,
    getSingleProduct,
    setProduct,
    getAddProductPage,
};
