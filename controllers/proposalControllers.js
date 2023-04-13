// essa seria a rota para requisitar uma proposta
// app.get("/products/proposta/:productID", (req, res) => {
//     const params = req.params;
//     const url = req.url;
//     console.log(params);
//     console.log(url);
//     console.log(req.query);
//     res.send("kmkm");
// });

// essa rota precisa ser protegida, é necessário passar o middle de auth antes
const getInfoProposta = async (req, res) => {
    const params = req.params;
    const url = req.url;
    console.log(params);
    console.log(url);
    console.log(req.query);
    res.status(200).send(
        "enviando os dados requisitados para iniciar proposta"
    );
};

// essa seria a rota para enviar uma proposta
// app.put("/products/proposta/:productID", (req, res) => {
//     const params = req.params;
//     const url = req.url;
//     console.log(params);
//     console.log(url);
//     res.status(201).json({ msg: "ok", success: true });
// });

// essa rota precisa ser protegida, é necessário passar o middle de auth antes
const setInfoProposta = async (req, res) => {
    const params = req.params;
    const url = req.url;
    console.log(params);
    console.log(url);
    res.status(201).json({
        msg: "os dados foram enviados para o servidor",
        success: true,
    });
};

module.exports = {
    getInfoProposta,
    setInfoProposta,
};
