//Imports
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let models = require('../models');

module.exports ={
    isAdmin:function(user){
        return true
    }
}