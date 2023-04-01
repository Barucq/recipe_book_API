const express = require("express");
const { Router } = express;
const mongoose = require("mongoose");
const UserModelCreator = require("../models/user")
const routes = Router();
const dburl = "mongodb://127.0.0.1:27017/recipe_book"

routes.get("/", async(req, res) => {
    const connection = await mongoose.createConnection(dburl);
    try{
        const UserModel = UserModelCreator(connection);
        const data = await UserModel.find();
        res.json(data);
        connection.close();
    } catch(error){
        connection.close();
        res.status(500);
        res.json({message: "error", error:error});
    }
});

routes.get("/:id", async(req, res)=> {
    const connection = await mongoose.createConnection(dburl);
    try{
        const UserModel = UserModelCreator(connection);
        const data = await UserModel.findOne({"_id":req.params.id});
        res.json(data);
        connection.close();
    }catch(error){
        connection.close();
        res.status(500);
        res.json({message: "error", error:error});
    }
});

routes.post("/", async(req, res) => {
    const connection = await mongoose.createConnection(dburl);
    try{
        const UserModel = UserModelCreator(connection);
        const recipe = new UserModel(req.body);
        const data = await recipe.save();
        res.json(data);
        connection.close();
    } catch(error){
        connection.close();
        res.status(500);
        res.json({message: "error", error:error});
    }
});

routes.delete("/:id", async(req, res) => {
    const connection = await mongoose.createConnection(dburl);
    try{
        const UserModel = UserModelCreator(connection);
        const data = await UserModel.deleteOne({"/id": req.params.id});
        res.json(data);
        connection.close();
    } catch(error){
        connection.close();
        res.status(500);
        res.json({message: "error", error:error});
    }
});

routes.put("/:id", async(req, res) => {
    const connection = await mongoose.createConnection(dburl);
    try{
        const UserModel = UserModelCreator(connection);
        const data = await UserModel.updateOne({"/id": req.params.id}, req.body);
        res.json(data);
        connection.close();
    } catch (error){
        connection.close();
        res.status(500);
        res.json({message: "error", errpr:error});
    }
});

module.exports = routes;
