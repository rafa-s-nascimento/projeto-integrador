const express = require("express");
const router = express.Router();

const { authenticationMiddleware } = require("../middleware/auth");

const {
    setProduct,
    getAddProductPage,
} = require("../controllers/productsControllers");

// rota protegida
router.get("/", authenticationMiddleware, getAddProductPage);

router.post("/", [authenticationMiddleware, setProduct]);

module.exports = router;
