const router = require("express").Router();

const advertisementController = require("../controllers/advertisementController");

router.get("/", advertisementController.get);
router.get("/:id", advertisementController.getById);
router.post("/", advertisementController.post);
router.put("/:id", advertisementController.put);
router.delete("/:id", advertisementController.delete);

module.exports = router;
