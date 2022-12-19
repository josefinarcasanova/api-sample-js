const { Router } = require("express");
const { get_index } = require("../controllers/index.controller");

const router = Router();

//Get index page
router.get('/', get_index);

//Get object by id
//router.get('/:id', contentGetByID);

//Get child objects of id
//router.get('/:id/items', contentGetChild);

module.exports = router ;