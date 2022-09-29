const router = require("express").Router();

const UsersController = require("../controllers/userController");

router.post("/", UsersController.sigin);

module.exports = router;
