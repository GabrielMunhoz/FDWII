exports.trataLog = (req, res, next) => {
  if (req.originalUrl.includes("/api/products")) next();
  else res.status(404).json({ Erro: "Não encontrado." });
};
