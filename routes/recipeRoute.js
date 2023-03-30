const express = require("express");
const { Router } = express;
const mongoose = require("mongoose");
const RecipeModelCreator = require("../models/recipe")
const routes = Router();
const dburl = "mongodb://127.0.0.1:27017/recipe_book"

routes.get("/", async(req, res) => {
    const connection = await mongoose.createConnection(dburl);
    try{
        const RecipeModel = RecipeModelCreator(connection);
        const data = await RecipeModel.find();
        res.json(data);
        connection.close();
    } catch(error){
        connection.close();
        res.status(500);
        res.json({message: "error", error:error});
    }
});

routes.post("/", async(req, res) => {
    const connection = await mongoose.createConnection(dburl);
    try{
        const RecipeModel = RecipeModelCreator(connection);
        const recipe = new RecipeModel(req.body);
        const data = await recipe.save();
        console.log(data);
        res.status(200);
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
        const RecipeModel = RecipeModelCreator(connection);
        const data = await RecipeModel.deleteOne({"_id": req.params.id});
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
        const RecipeModel = RecipeModelCreator(connection);
        const data = await RecipeModel.updateOne({"_id": req.params.id}, req.body);
        res.json(data);
        connection.close();
    } catch (error){
        connection.close();
        res.status(500);
        res.json({message: "error", errpr:error});
    }
});

module.exports = routes;