const jwt = require("jsonwebtoken");

module.exports = {
  verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) res.status(401).json({ auth: false, message: "Não foi fornecido token" });

    jwt.verify(token, "Sen@crs", (err, decoded) => {
      if (err) res.status(401).json({ auth: false, message: "Falha ao autenticar o token" });
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  },
};
