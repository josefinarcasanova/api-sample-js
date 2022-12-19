const { request, response } = require("express");

//Get object by id
const get_author = async (req = request, res = response) => {
    // Send request
    try {
        let msg = "Josefina R. Casanova \n| Associate Tech Project Lead (SSA & MX) \n| IBM Build Labs";

        res.send(msg);  
    } catch (error) {
        next(error); 
    }
}

module.exports = {
    get_author
}