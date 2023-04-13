const path = require("path");
const { produtos } = require("../data");

// models
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
    // const singleProduct = produtos.find(
    //     (item) => item.id === Number(req.params.id)
    // );

    // if (singleProduct) {
    //     return res
    //         .status(200)
    //         .json({ data: singleProduct, user: { name: "", id: "" } });
    // }
};

const getAddProductPage = (req, res) => {
    res.status(200).json({ msg: "ok", success: true, data: {} });
};

// essa será a rota de confimação para adiconar um produto POST
const setProduct = async (req, res) => {
    const inputs = req.body;
    const imgPath = req.imagePath; //o caminho vira num array de um ou mais itens

    const { nome, intencao, categoria, tipo, condicao, visivel } = inputs;

    if (nome == "") {
        return res
            .status(401)
            .json({ success: false, msg: "Falha ao cadastrar" });
    }

    // com a imagem validada é preciso adicionar os inputs ao BD produto
    // buscar para ver qual id foi atribuido a ele e adicionar as imagens com
    // o id adicionado ao produto, uma vez que o id é uma chave estrangeira

    const inputValuesBD = await valoresInput.findAll({ raw: true });

    await productModel.create({
        usuario_id: 1, //verificar o id do token no momento do POST
        nome: nome,
        intencao_id: selectID(inputValuesBD, "valor", intencao),
        categoria_id: selectID(inputValuesBD, "valor", categoria),
        tipo_id: selectID(inputValuesBD, "valor", tipo),
        condicao_id: selectID(inputValuesBD, "valor", condicao),
        visivel: visivel,
    });

    // concertar o bug do usuario no local storage
    // a cada requisição que o token estiver presente, retornar
    // a requisição com o atributo usuario validado (true or false);
    // sempre que uma página puxar for carregada, se validado for false
    // é preciso remover o usuario do localStorage

    return res.status(201).json({ success: true, msg: "Produto cadastrado" });
};

module.exports = {
    getProducts,
    getSingleProduct,
    setProduct,
    getAddProductPage,
};
