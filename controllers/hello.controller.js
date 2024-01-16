const { request, response } = require("express");

// Returns a JSON with "$HELLO_MSG $HELLO_TARGET" result.
const get_msg = async (req = request, res = response) => {
    // Send request
    try {
        const msg_target = process.env.HELLO_TARGET ? process.env.HELLO_TARGET : 'World';
        msg = process.env.MSG ? process.env.MSG : 'Hello ' + msg_target + '!';

        res.json({
            result : msg
        });  
    } catch (error) {
        next(error); 
    }
}

module.exports = {
    get_msg
}