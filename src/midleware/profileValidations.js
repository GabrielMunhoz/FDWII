const { roles } = require("../Roles/RolePermission");
const jwt = require("jsonwebtoken");

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      //Extrair a role do token
      const token = req.headers["x-access-token"];
      if (!token)
        res
          .status(400)
          .json({ auth: false, message: "Não foi fornecido token" });

      let role = '';
      jwt.verify(token, "Sen@crs", (err, decoded) => {
        if (err) res.status(400).json({ auth: false, message: "Falha ao autenticar o token" });
        role = decoded.role
      });

      if (!role) res.status(400).json({ auth: false, message: "Falha ao verificar a permissao" });

      const permission = roles.can(role)[action](resource);
      if (!permission.granted) {
        return res.status(403).json({
          message: "Voce nao tem permissao para executar esta acao",
        });
      }
      next();
    } catch (error) {
      res.status(500).json({message: "Algo deu errado na role"});
    }
  };
};
