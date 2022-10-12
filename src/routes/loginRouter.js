const router = require("express").Router();

const playerController = require("../controllers/playerController");

router.post("/", playerController.sigin);
router.post("/Create/", playerController.post);

module.exports = router;
