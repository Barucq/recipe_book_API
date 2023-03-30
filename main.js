const express = require("express");
const bodyParser = require("body-parser");
const http = require("node:http");

const app = express();
app.use(bodyParser.json());

const loginRoute = require("./routes/loginRoute");
const recipeRoute = require("./routes/recipeRoute");
const registerRoute = require("./routes/registerRoute");
const userRoute = require("./routes/userRoute");
const authenticator = require("./auth");

app.use("/login", loginRoute);
app.use("/recipe", authenticator, recipeRoute);
app.use("/register", registerRoute);
app.use("/user", userRoute);

const server = http.createServer(app);

server.listen(9000, () => {
  console.log("Ready");
});