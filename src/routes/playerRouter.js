const router = require("express").Router();

const PlayerController = require("../controllers/playerController");

router.get("/", PlayerController.getAll);
router.post("/", PlayerController.post);
router.get("/search", PlayerController.getbySearch);
router.get("/:id", PlayerController.getById);
router.put("/:id", PlayerController.put);
router.delete("/:id", PlayerController.delete);

module.exports = router;
