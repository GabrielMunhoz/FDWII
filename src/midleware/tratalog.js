exports.trataLog = (req, res, next) => {
  console.log(req.method);
  console.log(req.originalUrl);
  if (req.originalUrl.includes("/api/products")) next();
  else res.status(404).json({ Erro: "Não encontrado." });
};
