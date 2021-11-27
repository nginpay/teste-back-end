"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_routes_1 = require("./routes/user.routes");
var helmet = require("helmet");
var cors = require("cors");
var categories_routes_1 = require("./routes/categories.routes");
var products_routes_1 = require("./routes/products.routes");
var app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
// register routes
app.get('/', function (req, res) {
    res.status(200).json({ msg: "server is alive" });
});
app.use(user_routes_1.default);
app.use(categories_routes_1.default);
app.use(products_routes_1.default);
var PORT = process.env.PORT || 3000;
// start express server
app.listen(PORT, function () {
    console.log("Server Started at PORT " + PORT);
});
