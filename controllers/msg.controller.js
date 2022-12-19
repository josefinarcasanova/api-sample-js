const { request, response } = require("express");

// Displays "$HELLO_MSG $HELLO_TARGET"
const get_msg = async (req = request, res = response) => {
    // Send request
    try {
        const msg_target = process.env.HELLO_TARGET ? process.env.HELLO_TARGET : 'World';
        msg = process.env.MSG ? process.env.MSG : 'Hello ' + msg_target + '!\n';

        res.send(msg);  
    } catch (error) {
        next(error); 
    }
}

module.exports = {
    get_msg
}