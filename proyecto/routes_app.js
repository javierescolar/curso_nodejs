const express = require("express");

var router = express.Router();

router.get("/", (req,res) => {
    //Busco el usuario
    res.render("app/home");
});

module.exports = router;