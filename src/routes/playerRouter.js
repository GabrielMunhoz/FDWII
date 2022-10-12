const router = require("express").Router();

const PlayerController = require("../controllers/playerController");
const { grantAccess } = require("../midleware/profileValidations");

router.get("/", grantAccess("readAny", "player"), PlayerController.getAll);
router.get("/search", grantAccess("readAny", "player"), PlayerController.getbySearch);
router.get("/:id", grantAccess("readOwn", "player"), PlayerController.getById);
router.put("/:id",grantAccess("readOwn", "player"), PlayerController.put);
router.delete("/:id", grantAccess("readOwn", "player"), PlayerController.delete);

module.exports = router;
