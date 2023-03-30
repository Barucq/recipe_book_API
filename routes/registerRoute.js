const express = require("express");
const { Router } = express;
const mongoose = require("mongoose");
const UserModelCreator = require("../models/user")
const routes = Router();
const dburl = "mongodb://127.0.0.1:27017/recipe_book"
const jwt = require("jsonwebtoken");
const jwt_token = "TOKEN";

routes.post("/", async(req, res) => {
    const connection = await mongoose.createConnection(dburl);
    try{
        const UserModel = UserModelCreator(connection);
        const { name, email, password, active } = req.body;

        if(!(name && email && password && active)) {
            res.status(400).send("All inputs are required");
        }
        let data = await UserModel.findOne({"email": req.body.email});

        if(data) {
            req.status(400).send("User already exist. Please login");
        } else {
            let user = new UserModel(req.body);
            data = await user.save();
            const token = jwt.sign(
                { _id: user._id, email },
                jwt_token,
                { expiresIn: "2h"}
            );
            user = { ...user.doc, token};
            res.json(user);
            connection.close();
        }
    } catch(error){
        connection.close();
        res.status(500);
        res.json({message: "error", error:error});
    }
});

module.exports = routes