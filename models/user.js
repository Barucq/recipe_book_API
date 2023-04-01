const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema ({
    name: {
        first: String,
        middle: String,
        last: String
    },
    email: {
        type: String,
        lowercase: true,
        index: true,
        required: true,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} is not valid email address`
            }
        },
    password: {
        type: String,
        required: true 
    },
    img: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = (connection) => connection.model("User", UserSchema);
