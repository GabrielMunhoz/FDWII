const router = require("express").Router();

const UsersController = require("../controllers/playerController");

router.post("/", UsersController.sigin);

module.exports = router;
