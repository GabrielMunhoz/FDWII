const router = require("express").Router();

const gameCategoryController = require("../controllers/gameCategorycontroller");

router.get("/", gameCategoryController.get);
router.get("/:id", gameCategoryController.getById);
router.post("/", gameCategoryController.post);
router.put("/:id", gameCategoryController.put);
router.delete("/:id", gameCategoryController.delete);

module.exports = router;
