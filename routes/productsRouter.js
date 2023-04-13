const express = require("express");
const router = express.Router();

const {
    getProducts,
    getSingleProduct,
    setProduct,
} = require("../controllers/productsControllers");

const {
    getInfoProposta,
    setInfoProposta,
} = require("../controllers/proposalControllers");

const { uploadImage } = require("../controllers/uploadsControllers");

const {
    checkAuthentication,
    authenticationMiddleware,
} = require("../middleware/auth");

// rotas que buscam um produto ou mais
// router.post(
//     "/uploadImage",
//     checkAuthentication,
//     authenticationMiddleware,
//     uploadImage,
//     setProduct
// );
router.get("/:id", getSingleProduct);
router.get("/", getProducts);
router.post("/", setProduct);

// rotas protegidas
router.get("/proposta/:productID", getInfoProposta);
router.post("/proposta/:productID", setInfoProposta);

module.exports = router;
