const path = require("path");
const { produtos } = require("../data");

// models
const imagensProduto = require("../models/imagensProdutoModels");
const productModel = require("../models/productModel");
const valoresInput = require("../models/valoresInputModels");

const selectID = (arr, atributo, valor) => {
    return arr.find((obj) => obj[atributo] == valor)["id"];
};

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

    res.send("okok");
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
    const singleProduct = await productModel.findOne({
        where: { id: id },
        raw: true,
    });

    if (singleProduct) {
        return res
            .status(200)
            .json({ data: singleProduct, user: { name: "", id: "" } });
    }

    return res
        .status(201)
        .json({ msg: "not found", data: {}, user: { name: "", id: "" } });
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

    console.log(inputs);
    console.log(req.user);
    console.log(imgPath);

    if (nome == "") {
        return res
            .status(401)
            .json({ success: false, msg: "Falha ao cadastrar" });
    }

    const inputValuesBD = await valoresInput.findAll({ raw: true });

    await productModel.create({
        usuario_id: user_id,
        nome: nome,
        intencao_id: selectID(inputValuesBD, "valor", intencao),
        categoria_id: selectID(inputValuesBD, "valor", categoria),
        tipo_id: selectID(inputValuesBD, "valor", tipo),
        condicao_id: selectID(inputValuesBD, "valor", condicao),
        visivel: visivel,
    });

    const { id } = await productModel.findOne({
        order: [["createdAt", "DESC"]],
        limit: 1,
        raw: true,
    });

    for (let i = 0; i < imgPath.length; i++) {
        await imagensProduto.create({
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
