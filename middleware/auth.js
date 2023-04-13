const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
    if (!req.headers) {
        return res.status(401).redirect("/login");
    }
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("entrando no not autenticado");
        return res
            .status(401)
            .json({ success: false, msg: "não autenticado." });

        throw new UnauthenticatedError("No valid token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, nome } = decoded;
        req.user = { id, nome };
        next();
    } catch (error) {
        throw new UnauthenticatedError(
            "Not authorized to access this route",
            401
        );
    }
};

module.exports = { authenticationMiddleware };
