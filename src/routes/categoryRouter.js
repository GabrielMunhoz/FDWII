const router = require("express").Router();

const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.get);
router.get("/:id", categoryController.getById);
router.post("/", categoryController.post);
router.put("/:id", categoryController.put);
router.delete("/:id", categoryController.delete);

module.exports = router;
