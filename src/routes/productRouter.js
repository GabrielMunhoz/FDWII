const router = require("express").Router();

const productController = require("../controllers/product.Controller");

router.get("/", productController.get);
router.get("/:id", productController.getById);
router.post("/", productController.post);
router.put("/:id", productController.put);
router.delete("/:id", productController.delete);

module.exports = router;
