const express = require("express");
const { Router } = express;
const mongoose = require("mongoose");
const UserModelCreator = require("../models/user");
const routes = Router();
const dburl = "mongodb://127.0.0.1:27017/recipe_book";
const jwt = require("jsonwebtoken");
const jwt_token = "TOKEN";

routes.post("/", async(req, res) => {
    const connection = await mongoose.createConnection(dburl);
    try{
        const UserModel = UserModelCreator(connection);
        const { email, password } = req.body;
        let user = await UserModel.findOne({ "email": email });
        
        if(!(email && password)) {
            res.status(400).send("All inputs is required");
        } 
        if (password === user.password) {
            const token = jwt.sign(
                { _id: user._id, email },
                jwt_token,
                { expiresIn: "2h" } 
            );
            user = { token };
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    }
    catch(error){
        console.log(error);
    }
});

module.exports = routes;