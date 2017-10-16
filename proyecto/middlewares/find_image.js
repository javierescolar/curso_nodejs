var Image = require("../models/image").Image;
var owner_check = require("./image_permission");

module.exports = function(req,res,next) {
    
    Image.findById(req.params.id)
        .populate("creator")
        .exec((err,imagen) => {
        if (imagen != null && owner_check(imagen,req,res)) {
            res.locals.imagen = imagen;
            next();
        } else {
            res.redirect("/app");
        }
        
    });
    
} 