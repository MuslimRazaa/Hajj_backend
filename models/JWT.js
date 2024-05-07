const {sign, verify} = require("jsonwebtoken");

const createToken =(user)=>{
    const accessToken = sign({email: user.email, id: user.id}, "jwtsecretplschange");
    return accessToken;
};

module.exports = { createToken };