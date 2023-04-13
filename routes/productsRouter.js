const express = require("express");
const router = express.Router();

const {
    getProducts,
    getSingleProduct,
} = require("../controllers/productsControllers");

const {
    getInfoProposta,
    setInfoProposta,
} = require("../controllers/proposalControllers");

const { authenticationMiddleware } = require("../middleware/auth");

router.get("/:id", getSingleProduct);
router.get("/", getProducts);

// rotas protegidas
router.get("/proposta/:productID", getInfoProposta);
router.post("/proposta/:productID", setInfoProposta);

module.exports = router;
