const express = require("express");
var Image = require("./models/image").Image;
var router = express.Router();

router.get("/", (req,res) => {
    //Busco el usuario
    res.render("app/home");
});

/* REST */

router.get("/imagenes/new", (req,res) => {
    res.render("app/imagenes/new");
});

router.get("/imagenes/:id/edit", (req,res) => {
    Image.findById(req.params.id,(err,imagen) => {
            res.render("app/imagenes/edit",{imagen: imagen});
        });
});

router.route("/imagenes/:id")
    .get(function(req,res){
        Image.findById(req.params.id,(err,imagen) => {
            res.render("app/imagenes/show",{imagen: imagen});
        });
        
    })
    .delete(function(req,res){
        Image.findOneAndRemove({_id: req.params.id}, function(err){
            if(!err){
                res.redirect("/app/imagenes");
            } else {
                console.log(err);
                res.redirect("/app/imagenes/"+ req.params.id);
            }
        });
    })
    .put(function(req,res){
        Image.findById(req.params.id,(err,imagen) => {
            imagen.title = req.body.title;
            imagen.save(function(err){
                if(!err){
                     res.render("app/imagenes/show",{imagen: imagen});
                } else {
                    res.redirect("/app");
                }
            })
           
        });
    });
    
router.route("/imagenes")
    .get(function(req,res){
        Image.find({},function(err,imagenes){
            if(err){
                console.log("error cargar imagenes index");
                res.redirect("/app");
            } else {
                res.render("app/imagenes/index",{imagenes: imagenes});
            }
            
        });
    })
    .post(function(req,res){
        var data = {
            title: req.body.title
        }
        
        var imagen = new Image(data);
        
        imagen.save((err)=> {
            if(!err){
                res.redirect("/app/imagenes/"+imagen._id);
            } else {
                res.send(err);
            }
        });
    });

module.exports = router;