const { roles } = require("../Roles/RolePermission");
const jwt = require("jsonwebtoken");

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      //Extrair a role do token
      const token = req.headers["x-access-token"];
      if (!token)
        res
          .status(401)
          .json({ auth: false, message: "Não foi fornecido token" });

      let role = '';
      jwt.verify(token, "Sen@crs", (err, decoded) => {
        if (err) res.status(401).json({ auth: false, message: "Falha ao autenticar o token" });
        role = decoded.role
      });

      if (!role) res.status(401).json({ auth: false, message: "Falha ao verificar a permissão" });

      const permission = roles.can(role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "Você não tem permissão para executar está ação",
        });
      }
      next();
    } catch (error) {
      res.status(401).json("Algo deu errado na role");
    }
  };
};
