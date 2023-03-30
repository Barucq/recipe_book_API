const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    difficult: {
        type: String,
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = (connection) => connection.model("Recipe", RecipeSchema);