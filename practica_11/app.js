const express = require("express");

const app = express();

app.set("view engine","jade");

app.get("/", (req,res) => {
    res.render("index");
});

app.post("/", (req,res) => {
    res.render("form");
});

app.get("/:id", (req,res) => {
    res.send("La variable mandada es:"+ req.params.id);
});


app.listen(process.env.PORT, process.env.IP);