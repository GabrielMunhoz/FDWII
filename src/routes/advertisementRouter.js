const router = require("express").Router();

const advertisementController = require("../controllers/advertisementController");
const { grantAccess } = require("../midleware/profileValidations");

router.get("/", grantAccess("readAny", "advertisements"), advertisementController.get);
router.get("/:id", grantAccess("readAny", "advertisements"), advertisementController.getById);
router.post("/", grantAccess("createOwn", "advertisements"), advertisementController.post);
router.put("/:id", grantAccess("updateOwn", "advertisements"),  advertisementController.put);
router.delete("/:id", grantAccess("deleteOwn", "advertisements"), advertisementController.delete);

module.exports = router;
