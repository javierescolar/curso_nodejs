const express = require("express");

const app = express();


app.get("/", (req,res) => {
    res.send("hola mundo con express");
});

app.listen(process.env.PORT, process.env.IP);