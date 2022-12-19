const { Router } = require("express");
const { get_author } = require("../controllers/author.controller");

const router = Router();

// Get info about author
router.get('/', get_author);

module.exports = router;