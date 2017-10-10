const express = require("express");

const app = express();

app.set("view engine","jade");
app.get("/", (req,res) => {
    res.render("index",{hola:"hola Javier"});
});

app.listen(process.env.PORT, process.env.IP);