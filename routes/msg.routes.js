const { Router } = require("express");
const { get_msg } = require("../controllers/msg.controller");

const router = Router();

// Display message
router.get('/', get_msg);

module.exports = router;