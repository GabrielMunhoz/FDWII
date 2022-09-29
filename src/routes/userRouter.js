const router = require("express").Router();

const UsersController = require("../controllers/userController");

router.get("/", UsersController.getAll);
router.post("/", UsersController.post);
router.get("/search", UsersController.getbySearch);
router.get("/:id", UsersController.getById);
router.put("/:id", UsersController.put);
router.delete("/:id", UsersController.delete);

module.exports = router;
