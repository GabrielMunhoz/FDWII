const router = require("express").Router();

const gameCategoryController = require("../controllers/gameCategorycontroller");
const { grantAccess } = require("../midleware/profileValidations");

router.get("/", grantAccess("readAny", "gameCategory"), gameCategoryController.get);
router.get("/:id", grantAccess("readAny", "gameCategory"), gameCategoryController.getById);
router.post("/", grantAccess("createAny", "gameCategory"), gameCategoryController.post);
router.put("/:id", grantAccess("updateAny", "gameCategory"), gameCategoryController.put);
router.delete("/:id", grantAccess("deleteAny", "gameCategory"), gameCategoryController.delete);

module.exports = router;
