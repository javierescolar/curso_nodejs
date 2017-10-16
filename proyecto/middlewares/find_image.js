var Image = require("../models/image").Image;

module.exports = function(req,res,next) {
    
    Image.findById(req.params.id)
        .populate("creator")
        .exec((err,imagen) => {
        if (imagen != null) {
            res.locals.imagen = imagen;
            next();
        } else {
            res.redirect("/app");
        }
        
    });
    
} 